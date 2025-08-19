import { render, screen } from '@testing-library/react';

import { WCAG } from './WCAG';

describe('WCAG', () => {
  it('renders the heading', () => {
    render(<WCAG />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'WCAG Compliance Levels'
    );
  });

  it('renders WCAG AA and AAA list items', () => {
    render(<WCAG />);
    expect(screen.getByText(/WCAG AA:/)).toBeInTheDocument();
    expect(screen.getByText(/WCAG AAA:/)).toBeInTheDocument();
  });

  it('renders the large text definition paragraph', () => {
    render(<WCAG />);
    expect(
      screen.getByText(
        /Large text is defined as 18pt \(24px\) and larger, or 14pt \(18.66px\) and larger if bold\./
      )
    ).toBeInTheDocument();
  });
});
