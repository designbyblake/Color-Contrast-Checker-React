import { render, screen } from '@testing-library/react';

import { Contrast } from './Contrast';

describe('Contrast', () => {
  it('renders the root container', () => {
    render(<Contrast color1='ffffff' color2='000000' />);
    const root = screen.getByText(/Large Sample Text/i).closest('div');
    expect(root).toBeInTheDocument();
  });

  it('applies the correct background color', () => {
    render(<Contrast color1='123456' color2='abcdef' />);
    const textExample = screen.getByText(/Large Sample Text/i).parentElement;
    expect(textExample).toHaveStyle({ backgroundColor: '#123456' });
  });

  it('applies the correct text color to all paragraphs', () => {
    render(<Contrast color1='ffffff' color2='ff0000' />);
    const paragraphs = screen.getAllByText(/sample text|Lorem Ipsum/i);
    paragraphs.forEach((p) => {
      expect(p).toHaveStyle({ color: '#ff0000' });
    });
  });

  it('renders all expected text', () => {
    render(<Contrast color1='000000' color2='ffffff' />);
    expect(
      screen.getByText(/Large Sample Text 18pt or 24px/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Small sample text at 14pt or 18px/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Lorem Ipsum is simply dummy text/i)
    ).toBeInTheDocument();
  });
});
