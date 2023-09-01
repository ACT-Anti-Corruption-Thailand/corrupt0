export const moneyFormatter = (value: number): string =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

export const histMoneyFormatter = (value: number): string =>
  value === 0.1
    ? "0"
    : Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(value);

export const histMoneyFormatterHideZero = (value: number): string =>
  value === 0.1
    ? ""
    : Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(value);

export const thaiMoneyFormatter = (
  value: number
): [reducedValue: number, unit: string] => {
  if (value < 1_000_000) return [value, "บาท"];
  return [Math.round(value / 10_000) / 100, "ล้านบาท"];
};

export const formatThousands = (value: number, decimalPoints?: number) =>
  value.toLocaleString("th-TH", {
    minimumFractionDigits: decimalPoints ?? 0,
  });

export const formatMillion = (value: number) => Math.round(value / 10_000) / 100;
