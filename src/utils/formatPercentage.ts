export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
};
