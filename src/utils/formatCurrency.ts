export const formatCurrency = (value: number): string => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(value));

  return value < 0 ? `(${formattedValue})` : formattedValue;
};
