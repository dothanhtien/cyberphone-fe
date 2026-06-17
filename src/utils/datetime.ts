import dayjs from "@/lib/dayjs";

const DEFAULT_TZ = "Asia/Ho_Chi_Minh";

export function parseDateOfBirth(
  dob: string | null | undefined,
): Date | undefined {
  if (!dob) return undefined;
  const [y, m, d] = dob.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? undefined : date;
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDateTime(
  value?: string | Date,
  options?: {
    format?: string;
    timezone?: string;
    fallback?: string;
  },
) {
  if (!value) return options?.fallback ?? "-";

  const format = options?.format ?? "YYYY-MM-DD HH:mm:ss";
  const tz = options?.timezone ?? DEFAULT_TZ;

  return dayjs(value).tz(tz).format(format);
}
