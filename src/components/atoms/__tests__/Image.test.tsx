import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../Image';

describe('Image Component', () => {
  it('renders the ChakraImage with the provided props', () => {
    render(
      <Image
        src="https://example.com/image.jpg"
        alt="Example Image"
        width="200px"
        height="200px"
      />,
    );

    const imgElement = screen.getByAltText('Example Image');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(imgElement).toHaveAttribute('alt', 'Example Image');
    expect(imgElement).toHaveStyle({ width: '200px', height: '200px' });
  });

  it('applies additional props correctly', () => {
    render(
      <Image
        src="https://example.com/image2.jpg"
        alt="Another Image"
        borderRadius="full"
      />,
    );

    const imgElement = screen.getByAltText('Another Image');

    expect(imgElement).toHaveAttribute('src', 'https://example.com/image2.jpg');
    expect(imgElement).toHaveStyle({ borderRadius: 'full' });
  });
});
