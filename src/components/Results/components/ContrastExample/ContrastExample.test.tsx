import { render, screen } from '@testing-library/react';

import { ContrastExample } from './ContrastExample';
import styles from './ContrastExample.module.scss';

describe('ContrastExample', () => {
  it('renders two Contrast components with swapped colors', () => {
    render(<ContrastExample color1='#000000' color2='#ffffff' />);
    const contrastComponents = screen.getAllByTestId('contrast-component');
    expect(contrastComponents).toHaveLength(2);
  });

  it('passes correct props to the first Contrast component', () => {
    render(<ContrastExample color1='#123456' color2='#abcdef' />);
    const contrastComponents = screen.getAllByTestId('contrast-component');
    expect(contrastComponents[0]).toHaveAttribute('data-color1', '#123456');
    expect(contrastComponents[0]).toHaveAttribute('data-color2', '#abcdef');
  });

  it('passes correct props to the second Contrast component', () => {
    render(<ContrastExample color1='#123456' color2='#abcdef' />);
    const contrastComponents = screen.getAllByTestId('contrast-component');
    expect(contrastComponents[1]).toHaveAttribute('data-color1', '#abcdef');
    expect(contrastComponents[1]).toHaveAttribute('data-color2', '#123456');
  });

  it('applies the correct styles class', () => {
    const { container } = render(
      <ContrastExample color1='#000' color2='#fff' />
    );
    expect(container.firstChild).toHaveClass(styles.examples);
  });
});
