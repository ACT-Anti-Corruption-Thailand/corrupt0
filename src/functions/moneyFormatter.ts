export const moneyFormatter = (value: number) => {
  if (value > 1000000000) {
    return Number((value / 1000000000).toFixed(2)).toString() + "B";
  } else if (value > 1000000) {
    return Number((value / 1000000).toFixed(2)).toString() + "M";
  } else if (value > 1000) {
    return Number((value / 1000).toFixed(2)).toString() + "K";
  } else {
    return value.toString();
  }
};

export const thaiMoneyFormatter = (value: number) => {
  if (value > 1000000) {
    return Number((value / 1000000).toFixed(2)).toString() + " ล้านบาท";
  }
};
