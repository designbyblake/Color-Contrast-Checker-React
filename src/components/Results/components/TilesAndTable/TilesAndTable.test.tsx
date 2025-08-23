import { render, screen } from '@testing-library/react';

import { TilesAndTable } from './TilesAndTable';

describe('TilesAndTable', () => {
  const defaultProps = {
    hex1: '#ffffff',
    hex2: '#000000',
    rgb1: [255, 255, 255],
    rgb2: [0, 0, 0],
    contrastRatio: '21'
  };

  it('renders two ColorTile components with correct props', () => {
    render(<TilesAndTable {...defaultProps} />);
    const colorTiles = screen.getAllByTestId('color-tile');
    expect(colorTiles).toHaveLength(2);
  });

  it('renders ResultsTable with parsed contrastRatio', () => {
    render(<TilesAndTable {...defaultProps} />);
    const resultsTable = screen.getByTestId('results-table');
    expect(resultsTable).toBeInTheDocument();
  });

  it('passes correct props to ColorTile', () => {
    render(<TilesAndTable {...defaultProps} />);
    expect(screen.getAllByTestId('color-tile')[0]).toHaveAttribute(
      'data-hex',
      defaultProps.hex1
    );
    expect(screen.getAllByTestId('color-tile')[1]).toHaveAttribute(
      'data-hex',
      defaultProps.hex2
    );
  });

  it('passes correct contrast value to ResultsTable', () => {
    render(<TilesAndTable {...defaultProps} />);
    expect(screen.getByTestId('results-table')).toHaveAttribute(
      'data-contrast',
      '21'
    );
  });
});
