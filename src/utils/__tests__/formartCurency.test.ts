import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('should format a number as USD currency', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('should handle negative values correctly', () => {
    expect(formatCurrency(-500)).toBe('($500.00)');
  });

  it('should format decimal values', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
