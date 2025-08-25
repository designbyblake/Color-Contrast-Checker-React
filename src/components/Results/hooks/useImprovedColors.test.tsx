import { AA_CONTRAST, AAA_CONTRAST } from 'src/constants';
import * as colorsModule from 'src/utilities/colors';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useImprovedColors } from './useImprovedColors';
import * as useImprovedContrastModule from './useImprovedContrast';

vi.mock('src/utilities/colors', () => ({
  ...vi.importActual('src/utilities/colors'),
  contrast: vi.fn()
}));

describe('useImprovedColors', () => {
  const mockChangeContrast = vi.fn();
  const mockChangeContrastBoth = vi.fn();

  beforeEach(() => {
    vi.spyOn(useImprovedContrastModule, 'useImprovedContrast').mockReturnValue({
      changeContrast: mockChangeContrast,
      changeContrastBoth: mockChangeContrastBoth
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty array if original colors pass the contrast', () => {
    // Mock contrast to always return above threshold
    (colorsModule.contrast as jest.Mock).mockReturnValue(AA_CONTRAST + 1);

    const { getNewColors } = useImprovedColors();
    const result = getNewColors([255, 255, 255], [0, 0, 0], AA_CONTRAST);
    expect(result).toEqual([]);
  });

  it('returns empty array if no improved colors pass contrast', () => {
    (colorsModule.contrast as jest.Mock).mockReturnValue(AAA_CONTRAST - 1);

    mockChangeContrast.mockReturnValue({
      rgb1: [100, 100, 100],
      rgb2: [150, 150, 150],
      type: 'lighten'
    });

    mockChangeContrastBoth.mockReturnValue({
      rgb1: [120, 120, 120],
      rgb2: [180, 180, 180],
      type: 'both'
    });

    const { getNewColors } = useImprovedColors();
    const result = getNewColors([100, 100, 100], [150, 150, 150], AAA_CONTRAST);
    expect(result).toEqual([]);
  });
});
