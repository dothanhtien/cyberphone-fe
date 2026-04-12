import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { RefreshTokenResponse } from "@/features/auth/types";
import { useAuthStore } from "@/stores/auth";

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedQueueItem[] = [];

  constructor(baseUrl?: string) {
    this.instance = axios.create({
      baseURL: baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL || "",
      timeout: 10000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private processQueue(error: unknown, token?: string) {
    this.failedQueue.forEach((item) => {
      if (error) {
        item.reject(error);
      } else {
        item.resolve(token!);
      }
    });
    this.failedQueue = [];
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = useAuthStore.getState().accessToken;

          if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest: InternalAxiosRequestConfig & {
          _retry?: boolean;
        } = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
          return Promise.reject(error);
        }

        if (typeof window === "undefined") {
          return Promise.reject(error);
        }

        const { setAccessToken, clearSession } = useAuthStore.getState();

        if (this.isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.instance(originalRequest);
          });
        }

        originalRequest._retry = true;
        this.isRefreshing = true;

        try {
          const res = await this.instance.post<RefreshTokenResponse>(
            "/auth/refresh-token",
            {},
            { withCredentials: true, _retry: true } as AxiosRequestConfig & {
              _retry: boolean;
            },
          );
          const { accessToken: newAccessToken } = res.data;

          setAccessToken(newAccessToken);

          this.instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          this.processQueue(null, newAccessToken);

          return this.instance(originalRequest);
        } catch (refreshError) {
          this.processQueue(refreshError);

          clearSession();

          if (typeof window !== "undefined") {
            const loginPath = "/auth/login";
            if (window.location.pathname !== loginPath) {
              window.location.href = loginPath;
            }
          }

          return Promise.reject(refreshError);
        } finally {
          this.isRefreshing = false;
        }
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(
      url,
      data,
      config,
    );
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch(
      url,
      data,
      config,
    );
    return response.data;
  }
}

export const apiClient = new ApiClient();
