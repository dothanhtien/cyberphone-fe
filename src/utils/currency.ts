export const formatCurrency = (
  value: number | string,
  locale: string = "vi-VN",
) => {
  if (!value && value !== 0) return "";
  return new Intl.NumberFormat(locale).format(Number(value));
};

export const parseCurrency = (
  value: string | number | null | undefined,
): number | undefined => {
  if (value === null || value === undefined) return undefined;

  if (typeof value === "number") {
    return Number.isNaN(value) ? undefined : value;
  }

  const cleaned = value
    .replace(/\s/g, "")
    .replace(/[.,]/g, "")
    .replace(/[^\d-]/g, "");

  if (cleaned === "" || cleaned === "-") return undefined;

  const numberValue = Number(cleaned);

  return Number.isNaN(numberValue) ? undefined : numberValue;
};
