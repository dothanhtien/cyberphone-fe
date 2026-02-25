export const formatCurrency = (value: number, locale: string = "vi-VN") => {
  return new Intl.NumberFormat(locale).format(value);
};
