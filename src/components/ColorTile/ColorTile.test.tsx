import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ColorTile } from './ColorTile';

// Mock CSS module
vi.mock('./ColorTile.module.scss', () => ({
  default: {
    root: 'root',
    block: 'block',
    label: 'label',
    'color-picker': 'color-picker'
  }
}));

// Mock displayRGB utility
vi.mock('src/utilities/colors', () => ({
  displayRGB: (rgb: [number, number, number]) =>
    rgb ? `rgb(${rgb.join(', ')})` : '-'
}));

describe('ColorTile', () => {
  const baseProps = {
    hex: 'FFAA00',
    rgb: [255, 170, 0] as [number, number, number],
    index: 1
  };

  it('renders color input when updateColor and index are provided', () => {
    const updateColor = vi.fn();
    render(<ColorTile {...baseProps} updateColor={updateColor} />);
    const input: HTMLInputElement = screen.getByLabelText('Set a color');
    expect(input).toBeInTheDocument();
    expect(input.value.toUpperCase()).toBe('#FFAA00');
  });

  it('calls updateColor with correct arguments on color change', () => {
    const updateColor = vi.fn();
    render(<ColorTile {...baseProps} updateColor={updateColor} />);
    const input: HTMLInputElement = screen.getByLabelText('Set a color');
    fireEvent.change(input, { target: { value: '#123456' } });
    expect(updateColor).toHaveBeenCalledWith(1, '123456');
  });

  it('renders color block when updateColor is not provided', () => {
    render(<ColorTile {...baseProps} updateColor={undefined} />);
    const block = screen.getByRole('presentation', { hidden: true });
    expect(block).toBeInTheDocument();
  });

  it('shows hex and rgb labels when values are provided', () => {
    render(<ColorTile {...baseProps} updateColor={undefined} />);
    expect(screen.getByText('#FFAA00')).toBeInTheDocument();
    expect(screen.getByText('rgb(255, 170, 0)')).toBeInTheDocument();
  });

  it('shows "-" for missing hex and rgb values', () => {
    render(
      <ColorTile
        hex=''
        rgb={undefined as unknown as [number, number, number]}
        updateColor={undefined}
        index={undefined}
      />
    );
    expect(screen.getAllByText('-').length).toBe(2);
  });
});
