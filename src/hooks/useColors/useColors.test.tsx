import { act, renderHook } from '@testing-library/react';
import { Color } from 'src/classes/Color';
import { DEFAULT_COLORS } from 'src/constants';
import { describe, expect, it, vi } from 'vitest';

import { useColors } from './useColors';

vi.mock('../useColorParams/useColorParams', () => ({
  useColorParams: () => ({
    getColorsFromParams: vi.fn(() => []),
    setColorsToParams: vi.fn(),
    removeColorsParams: vi.fn()
  })
}));

describe('useColors', () => {
  it('should initialize with DEFAULT_COLORS if no params', () => {
    const { result } = renderHook(() => useColors());
    expect(result.current.colors).toEqual(DEFAULT_COLORS);
  });

  it('should add a new color', () => {
    const { result } = renderHook(() => useColors());
    act(() => {
      result.current.addColor();
    });
    expect(result.current.colors.length).toBe(DEFAULT_COLORS.length + 1);
    expect(
      result.current.colors[result.current.colors.length - 1]
    ).toBeInstanceOf(Color);
  });

  it('should remove a color by index', () => {
    const { result } = renderHook(() => useColors());
    act(() => {
      result.current.removeColor(0);
    });
    expect(result.current.colors.length).toBe(DEFAULT_COLORS.length - 1);
  });

  it('should update a color', () => {
    const { result } = renderHook(() => useColors());
    const newHex = '#123456';
    act(() => {
      result.current.updateColor(0, newHex, true);
    });
    expect(result.current.colors[0].hex).toBe(newHex);
    expect(result.current.changedInput.current).toBe(0);
  });

  it('should reset colors to DEFAULT_COLORS', () => {
    const { result } = renderHook(() => useColors());
    act(() => {
      result.current.addColor();
      result.current.resetColors();
    });
    expect(result.current.colors).toEqual(DEFAULT_COLORS);
    expect(result.current.changedInput.current).toBe(0);
  });

  it('should set changedInput when adding color', () => {
    const { result } = renderHook(() => useColors());
    act(() => {
      result.current.addColor();
    });
    expect(result.current.changedInput.current).toBe(DEFAULT_COLORS.length);
  });
});
