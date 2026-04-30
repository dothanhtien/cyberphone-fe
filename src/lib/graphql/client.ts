import { GraphQLClient } from "graphql-request";
import type { RequestDocument, RequestOptions, Variables } from "graphql-request";
import { useAuthStore } from "@/stores/auth";

const endpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  `${process.env.NEXT_PUBLIC_GRAPHQL_URL}/graphql`;

const client = new GraphQLClient(endpoint, {
  credentials: "include",
});

export async function gqlRequest<T, V extends Variables = Variables>(
  document: RequestDocument,
  variables?: V,
): Promise<T> {
  const headers: Record<string, string> = {};

  if (typeof window !== "undefined") {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return client.request<T, V>({
    document,
    variables,
    requestHeaders: headers,
  } as unknown as RequestOptions<V, T>);
}
