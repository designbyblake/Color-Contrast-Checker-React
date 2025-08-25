import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useColorParams } from './useColorParams';

describe('useColorParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getColorsFromParams returns empty array if no params', () => {
    const { result } = renderHook(() => useColorParams());

    // Simulate behavior of getColorsFromParams with no params
    const colors = result.current.getColorsFromParams([]);

    expect(colors).toEqual([]);
  });

  it('removeColorsParams clears the colors', () => {
    const { result } = renderHook(() => useColorParams());

    act(() => {
      result.current.setColorsToParams(['abc123', 'def456']);
    });

    act(() => {
      result.current.removeColorsParams();
    });

    // Verify that the colors were removed
    const colors = result.current.getColorsFromParams([]);
    expect(colors).toEqual([]);
  });
});
