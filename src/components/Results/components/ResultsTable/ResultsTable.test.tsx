import { render, screen } from '@testing-library/react';

import { ResultsTable } from './ResultsTable';

describe('ResultsTable', () => {
  it('renders the table with correct caption and headers', () => {
    render(<ResultsTable contrast={5} />);
    expect(screen.getByText('WCAG Compliance Table')).toBeInTheDocument();
    expect(screen.getByText('Element')).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Meets WCAG AAA/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Meets WCAG AA' })
    ).toBeInTheDocument();
  });

  it('renders correct rows for Small Text, Large Text, and UI Components', () => {
    render(<ResultsTable contrast={5} />);
    expect(screen.getByText('Small Text')).toBeInTheDocument();
    expect(screen.getByText('Large Text')).toBeInTheDocument();
    expect(screen.getByText('UI Components')).toBeInTheDocument();
  });

  it('passes AA for Small Text if contrast >= 4.5', () => {
    render(<ResultsTable contrast={4.5} />);
    const aaCells = screen.getAllByRole('cell');
    // Small Text AA is first cell, should pass
    expect(aaCells[0].textContent).toMatch(/pass|✓/i);
  });

  it('fails AAA for Small Text if contrast < 7', () => {
    render(<ResultsTable contrast={6.9} />);
    const aaaCells = screen.getAllByRole('cell');
    // Small Text AAA is second cell, should fail
    expect(aaaCells[1].textContent).toMatch(/fail|✗/i);
  });

  it('passes all requirements for contrast >= 7', () => {
    render(<ResultsTable contrast={7} />);
    const cells = screen.getAllByRole('cell');
    cells.forEach((cell) => {
      expect(cell.textContent).toMatch(/pass|✓/i);
    });
  });

  it('fails all requirements for contrast < 3', () => {
    render(<ResultsTable contrast={2.9} />);
    const cells = screen.getAllByRole('cell');
    cells.forEach((cell) => {
      expect(cell.textContent).toMatch(/fail|✗/i);
    });
  });
});
