import React from 'react';
import { render, screen } from '@testing-library/react';
import Select from '../Select';

describe('Select Component', () => {
  it('renders the ChakraSelect with provided options', () => {
    render(
      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>,
    );

    const selectElement = screen.getByRole('combobox');

    expect(selectElement).toBeInTheDocument();
  });

  it('applies additional props correctly', () => {
    render(
      <Select placeholder="Select option" isDisabled>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>,
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeDisabled();
  });

  it('renders with a default value', () => {
    render(
      <Select placeholder="Select option" defaultValue="option2">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>,
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('option2');
  });
});
