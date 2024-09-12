import { parseCurrency } from '../parseCurrency';

describe('parseCurrency', () => {
  it('should parse a currency string to a number', () => {
    expect(parseCurrency('$1,000.00')).toBe(1000);
  });

  it('should parse a negative currency string correctly', () => {
    expect(parseCurrency('-$500.00')).toBe(-500);
  });

  it('should parse a string with decimals correctly', () => {
    expect(parseCurrency('$1,234.56')).toBe(1234.56);
  });

  it('should return 0 for an invalid currency string', () => {
    expect(parseCurrency('invalid')).toBe(0);
  });

  it('should handle currency with no decimals', () => {
    expect(parseCurrency('$1000')).toBe(1000);
  });

  it('should handle a string with no currency symbols or commas', () => {
    expect(parseCurrency('1234.56')).toBe(1234.56);
  });

  it('should return 0 for an empty string', () => {
    expect(parseCurrency('')).toBe(0);
  });
});
