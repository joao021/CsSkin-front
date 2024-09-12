import { render } from '@testing-library/react';
import MyApp from '../_app';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  ChakraProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('MyApp Component', () => {
  it('renders the ChakraProvider and passes the correct theme', () => {
    const { container } = render(
      <MyApp Component={() => <div>Test Component</div>} pageProps={{}} />,
    );

    expect(ChakraProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: theme,
      }),
      expect.anything(),
    );
  });

  it('renders the passed component with pageProps', () => {
    const TestComponent = jest.fn(() => <div>Test Component</div>);

    const pageProps = { test: 'value' };
    render(<MyApp Component={TestComponent} pageProps={pageProps} />);

    expect(TestComponent).toHaveBeenCalledWith(
      expect.objectContaining(pageProps),
      {},
    );
  });

  it('renders the children of the passed component', () => {
    const { getByText } = render(
      <MyApp
        Component={() => <div>Test Component Content</div>}
        pageProps={{}}
      />,
    );

    expect(getByText('Test Component Content')).toBeInTheDocument();
  });
});
