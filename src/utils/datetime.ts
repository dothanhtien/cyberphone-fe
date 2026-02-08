import dayjs from "@/lib/dayjs";

const DEFAULT_TZ = "Asia/Ho_Chi_Minh";

export function formatDateTime(
  value?: string | Date,
  options?: {
    format?: string;
    timezone?: string;
    fallback?: string;
  },
) {
  if (!value) return options?.fallback ?? "-";

  const format = options?.format ?? "YYYY-MM-DD HH:mm";
  const tz = options?.timezone ?? DEFAULT_TZ;

  return dayjs(value).tz(tz).format(format);
}
