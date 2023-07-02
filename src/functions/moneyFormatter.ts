export const moneyFormatter = (value: number): string =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

export const thaiMoneyFormatter = (
  value: number
): [reducedValue: number, unit: string] => {
  if (value < 1_000_000) return [value, "บาท"];
  return [Math.round(value / 10_000) / 100, "ล้านบาท"];
};
