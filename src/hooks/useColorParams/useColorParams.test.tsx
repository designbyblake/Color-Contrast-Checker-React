import { act, renderHook } from '@testing-library/react';
import { Color } from 'src/classes/Color';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useColorParams } from './useColorParams';

// Mock useQueryParams
const mockGetColorsFromParams = vi.fn();
const mockSetColorsToParams = vi.fn();
const mockRemoveColorsParams = vi.fn();

vi.mock('./useColorParams', () => ({
  useColorParams: () => ({
    getColorsFromParams: mockGetColorsFromParams,
    setColorsToParams: mockSetColorsToParams,
    removeColorsParams: mockRemoveColorsParams
  })
}));

describe('useColorParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('mockGetColorsFromParams returns Color instances from params', () => {
    mockGetColorsFromParams.mockReturnValue([
      new Color('abc123'),
      new Color('def456')
    ]);
    const { result } = renderHook(() => useColorParams());

    const colors = result.current.getColorsFromParams();
    expect(colors).toHaveLength(2);
    expect(colors[0]).toBeInstanceOf(Color);
    expect(colors[0].hex).toBe('ABC123');
    expect(colors[1].hex).toBe('DEF456');
    expect(colors[1].rgb[0]).toEqual(222);
    expect(colors[1].rgb[1]).toEqual(244);
    expect(colors[1].rgb[2]).toEqual(86);
  });

  it('mockGetColorsFromParams returns empty array if no params', () => {
    mockGetColorsFromParams.mockReturnValue(undefined);
    const { result } = renderHook(() => useColorParams());
    const colors = result.current.getColorsFromParams();
    expect(colors).toEqual(undefined);
  });

  it('sets colors to params as uppercase comma-separated string', () => {
    const { result } = renderHook(() => useColorParams());
    act(() => {
      result.current.setColorsToParams(['abc123', 'def456']);
    });

    expect(mockSetColorsToParams).toHaveBeenCalledWith(['abc123', 'def456']);
    mockGetColorsFromParams.mockReturnValue([
      new Color('abc123'),
      new Color('def456')
    ]);
    const colors = result.current.getColorsFromParams();
    expect(colors[0].hex).toBe('ABC123');
    expect(colors[1].hex).toBe('DEF456');
  });

  it('removeColorsParams calls removeColorsParams with correct args', () => {
    const { result } = renderHook(() => useColorParams());

    act(() => {
      result.current.removeColorsParams();
    });
  });
});
