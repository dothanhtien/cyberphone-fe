import { format, formatDistanceToNow } from "date-fns";

export function formatDate(
  date?: string | Date | null,
  outputFormat: string = "yyyy-MM-dd HH:mm:ss"
): string | null {
  if (!date) return null;

  const d = new Date(date);

  return isNaN(d.getTime()) ? null : format(d, outputFormat);
}

export function formatRelative(date?: string | Date | null): string | null {
  if (!date) return null;

  const d = new Date(date);

  return isNaN(d.getTime())
    ? null
    : formatDistanceToNow(d, { addSuffix: true });
}
