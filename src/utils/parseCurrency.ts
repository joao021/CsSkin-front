export const parseCurrency = (value: string): number => {
  const isNegative = value.includes('-');
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  return isNegative ? -numericValue : numericValue;
};
