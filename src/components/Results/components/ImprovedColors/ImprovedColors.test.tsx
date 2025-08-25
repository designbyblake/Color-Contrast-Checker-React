import { render, screen } from '@testing-library/react';
import { useImprovedColors } from 'src/components/Results/hooks';
import { describe, expect, it, vi } from 'vitest';

import { ImprovedColors } from './ImprovedColors';

vi.mock('src/components/Results/hooks', () => ({
  useImprovedColors: vi.fn()
}));

vi.mock(
  'src/components/Results/components/ImprovedColors/components/ImprovedColorsResults',
  () => ({
    ImprovedColorsResults: ({ title }: { title: string }) => <div>{title}</div>
  })
);

const defaultProps = {
  hex1: 'FFFFFF',
  hex2: '000000',
  rgb1: [255, 255, 255],
  rgb2: [0, 0, 0],
  setColorsAndFlag: vi.fn()
};

describe('ImprovedColors', () => {
  it('renders null when all updated colors arrays are empty', () => {
    const getNewColors = vi.fn().mockReturnValue([]);
    (useImprovedColors as jest.Mock).mockReturnValue({ getNewColors });

    const { container } = render(<ImprovedColors {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders UI Updates section when updatedUIColors is not empty', () => {
    const getNewColors = vi
      .fn()
      .mockImplementationOnce(() => [{ id: 1 }])
      .mockImplementation(() => []);
    (useImprovedColors as jest.Mock).mockReturnValue({ getNewColors });

    render(<ImprovedColors {...defaultProps} />);
    expect(screen.getByText('UI Updates')).toBeInTheDocument();
    expect(screen.queryByText('AA Updates')).not.toBeInTheDocument();
    expect(screen.queryByText('AAA Updates')).not.toBeInTheDocument();
  });

  it('renders AA Updates section when updatedAAColors is not empty', () => {
    const getNewColors = vi
      .fn()
      .mockImplementationOnce(() => [])
      .mockImplementationOnce(() => [{ id: 2 }])
      .mockImplementation(() => []);
    (useImprovedColors as jest.Mock).mockReturnValue({ getNewColors });

    render(<ImprovedColors {...defaultProps} />);
    expect(screen.getByText('AA Updates')).toBeInTheDocument();
    expect(screen.queryByText('UI Updates')).not.toBeInTheDocument();
    expect(screen.queryByText('AAA Updates')).not.toBeInTheDocument();
  });

  it('renders AAA Updates section when updatedAAAColors is not empty', () => {
    const getNewColors = vi
      .fn()
      .mockImplementationOnce(() => [])
      .mockImplementationOnce(() => [])
      .mockImplementationOnce(() => [{ id: 3 }]);
    (useImprovedColors as jest.Mock).mockReturnValue({ getNewColors });

    render(<ImprovedColors {...defaultProps} />);
    expect(screen.getByText('AAA Updates')).toBeInTheDocument();
    expect(screen.queryByText('UI Updates')).not.toBeInTheDocument();
    expect(screen.queryByText('AA Updates')).not.toBeInTheDocument();
  });

  it('renders all sections when all updated colors arrays are not empty', () => {
    const getNewColors = vi
      .fn()
      .mockImplementationOnce(() => [{ id: 1 }])
      .mockImplementationOnce(() => [{ id: 2 }])
      .mockImplementationOnce(() => [{ id: 3 }]);
    (useImprovedColors as jest.Mock).mockReturnValue({ getNewColors });

    render(<ImprovedColors {...defaultProps} />);
    expect(screen.getByText('UI Updates')).toBeInTheDocument();
    expect(screen.getByText('AA Updates')).toBeInTheDocument();
    expect(screen.getByText('AAA Updates')).toBeInTheDocument();
  });

  it('renders heading with correct hex values', () => {
    const getNewColors = vi
      .fn()
      .mockImplementationOnce(() => [{ id: 1 }])
      .mockImplementationOnce(() => [])
      .mockImplementationOnce(() => []);
    (useImprovedColors as jest.Mock).mockReturnValue({ getNewColors });

    render(<ImprovedColors {...defaultProps} />);
    expect(
      screen.getByText(
        'Suggested Colors to meet WCAG Contrast for #FFFFFF - #000000'
      )
    ).toBeInTheDocument();
  });
});
