import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
  it('renders the ChakraInput with the provided props', () => {
    render(<Input placeholder="Enter your name" width="200px" />);

    const inputElement = screen.getByPlaceholderText('Enter your name');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveStyle({ width: '200px' });
  });

  it('applies additional props correctly', () => {
    render(<Input placeholder="Enter password" type="password" />);

    const inputElement = screen.getByPlaceholderText('Enter password');

    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('renders with default value', () => {
    render(<Input placeholder="Enter age" defaultValue="30" />);

    const inputElement = screen.getByPlaceholderText('Enter age');

    expect(inputElement).toHaveValue('30');
  });
});
