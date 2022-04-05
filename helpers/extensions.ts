export const getDateFormated = (date: Date) => {
  const tempDate = new Date(date);
  return `${toTwoDigitNumber(tempDate.getDate())}.${toTwoDigitNumber(
    tempDate.getMonth() + 1
  )}.${tempDate.getFullYear()} ${toTwoDigitNumber(
    tempDate.getHours()
  )}:${toTwoDigitNumber(tempDate.getMinutes())}`;
};

const toTwoDigitNumber = (number: number) => {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

export const toDecimalFormat = (number: number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

export const textToDecimalFormat = (text: string) => {
  const number = Number(text);
  return (Math.round(number * 100) / 100).toFixed(2);
};
