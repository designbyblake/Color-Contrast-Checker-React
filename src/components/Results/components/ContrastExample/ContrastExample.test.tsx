import { render, screen } from '@testing-library/react';

import { ContrastExample } from './ContrastExample';
import styles from './ContrastExample.module.scss';

describe('ContrastExample', () => {
  it('renders two Contrast components with swapped colors', () => {
    render(<ContrastExample hex1='#000000' hex2='#ffffff' />);
    const contrastComponents = screen.getAllByTestId('contrast-component');
    expect(contrastComponents).toHaveLength(2);
  });

  it('passes correct props to the first Contrast component', () => {
    render(<ContrastExample hex1='#123456' hex2='#abcdef' />);
    const contrastComponents = screen.getAllByTestId('contrast-component');
    expect(contrastComponents[0]).toHaveAttribute('data-color1', '#123456');
    expect(contrastComponents[0]).toHaveAttribute('data-color2', '#abcdef');
  });

  it('passes correct props to the second Contrast component', () => {
    render(<ContrastExample hex1='#123456' hex2='#abcdef' />);
    const contrastComponents = screen.getAllByTestId('contrast-component');
    expect(contrastComponents[1]).toHaveAttribute('data-color1', '#abcdef');
    expect(contrastComponents[1]).toHaveAttribute('data-color2', '#123456');
  });

  it('applies the correct styles class', () => {
    const { container } = render(<ContrastExample hex1='#000' hex2='#fff' />);
    expect(container.firstChild).toHaveClass(styles.examples);
  });
});
