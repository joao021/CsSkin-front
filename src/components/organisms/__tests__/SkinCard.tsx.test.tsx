import { render, screen, fireEvent } from '@testing-library/react';
import SkinCard from '../SkinCard';

describe('SkinCard Component', () => {
  const defaultProps = {
    name: 'AK-47 | Redline',
    image: '/ak47_redline.png',
    price: 100,
    float: '0.05',
    category: 'Rifle',
  };

  it('should render the skin name, category, price, and float', () => {
    render(<SkinCard {...defaultProps} />);

    expect(screen.getByText('AK-47 | Redline')).toBeInTheDocument();

    expect(screen.getByText('Category: Rifle')).toBeInTheDocument();

    expect(screen.getByText('Price: $100.00')).toBeInTheDocument();

    expect(screen.getByText('Float: 0.05')).toBeInTheDocument();
  });

  it('should render the image with the correct src and alt attributes', () => {
    render(<SkinCard {...defaultProps} />);

    const image = screen.getByAltText('AK-47 | Redline');
    expect(image).toHaveAttribute('src', '/ak47_redline.png');
  });

  it('should display the fallback image when the image fails to load', () => {
    render(<SkinCard {...defaultProps} />);

    const image = screen.getByAltText('AK-47 | Redline');

    fireEvent.error(image);

    expect(image).toHaveAttribute('src', '/image_unavailable.png');
  });

  it('should not display float when it is not provided', () => {
    const { float, ...propsWithoutFloat } = defaultProps;

    render(<SkinCard {...propsWithoutFloat} />);

    expect(screen.queryByText(/Float:/)).not.toBeInTheDocument();
  });
});
