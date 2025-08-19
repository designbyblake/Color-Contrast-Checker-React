import { render, screen } from '@testing-library/react';

import { Hero } from './Hero';
import styles from './Hero.module.scss';
describe('Hero', () => {
  it('renders the section with correct class', () => {
    render(<Hero />);
    const section = screen.getAllByTestId('hero')[0];

    expect(section).toBeVisible();
    expect(section).toHaveClass(styles.hero);
  });

  it('renders the heading with icon and text', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Contrast Checker');
    const icon = heading.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Check the contrast ratio between two colors to ensure your text is readable./i
      )
    ).toBeInTheDocument();
  });
});
