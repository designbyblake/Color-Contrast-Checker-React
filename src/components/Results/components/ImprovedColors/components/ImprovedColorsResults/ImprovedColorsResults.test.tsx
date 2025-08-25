import { fireEvent, render, screen } from '@testing-library/react';
import { contrast } from 'src/utilities/colors';
import { describe, expect, it, vi } from 'vitest';

import { ImprovedColorsResults } from './ImprovedColorsResults';

describe('ImprovedColorsResults', () => {
  const mockSetColorsAndFlag = vi.fn();
  const mockColors = [
    {
      hex1: '#ffffff',
      rgb1: [255, 255, 255],
      hex2: '#000000',
      rgb2: [0, 0, 0],
      contrastRatio: contrast([255, 255, 255], [0, 0, 0])
    },
    {
      hex1: '#ff0000',
      rgb1: [255, 0, 0],
      hex2: '#00ff00',
      rgb2: [0, 255, 0],
      contrastRatio: contrast([255, 0, 0], [0, 255, 0])
    }
  ];

  it('renders the title', () => {
    render(
      <ImprovedColorsResults
        title='Test Title'
        colors={mockColors}
        setColorsAndFlag={mockSetColorsAndFlag}
      />
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Test Title'
    );
  });

  it('renders all color pairs', () => {
    render(
      <ImprovedColorsResults
        title='Colors'
        colors={mockColors}
        setColorsAndFlag={mockSetColorsAndFlag}
      />
    );
    expect(screen.getAllByText('Update colors')).toHaveLength(
      mockColors.length
    );
  });

  it('calls setColorsAndFlag with correct arguments when button is clicked', () => {
    render(
      <ImprovedColorsResults
        title='Colors'
        colors={mockColors}
        setColorsAndFlag={mockSetColorsAndFlag}
      />
    );
    const buttons = screen.getAllByRole('button', { name: 'Update colors' });
    fireEvent.click(buttons[0]);
    expect(mockSetColorsAndFlag).toHaveBeenCalledWith(
      {
        hex1: mockColors[0].hex1,
        rgb1: mockColors[0].rgb1,
        hex2: mockColors[0].hex2,
        rgb2: mockColors[0].rgb2
      },
      true
    );
  });
});
