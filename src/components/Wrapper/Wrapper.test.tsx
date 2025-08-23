import { render, screen } from '@testing-library/react';

import { Wrapper } from './Wrapper';
import styles from './Wrappers.module.scss';
describe('Wrapper', () => {
  it('renders children inside a div with the correct class', () => {
    render(
      <Wrapper>
        <span>Test Child</span>
      </Wrapper>
    );
    const child = screen.getByText('Test Child');
    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass(styles.wrapper);
  });

  it('renders multiple children', () => {
    render(
      <Wrapper>
        <span>Child 1</span>
        <span>Child 2</span>
      </Wrapper>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
