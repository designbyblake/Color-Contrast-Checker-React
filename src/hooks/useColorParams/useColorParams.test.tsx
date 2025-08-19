import { act, renderHook } from '@testing-library/react';
import { Color } from 'src/classes/Color';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useColorParams } from './useColorParams';

// Mock useQueryParams
const getParams = vi.fn();
const setParams = vi.fn();
const removeParams = vi.fn();

vi.mock('../useQueryParams', () => ({
  useQueryParams: () => ({
    getParams,
    setParams,
    removeParams
  })
}));

beforeEach(() => {
  getParams.mockReset();
  setParams.mockReset();
  removeParams.mockReset();
  // @ts-expect-error  Mock window.location to avoid actual URL changes in tests
  // This is necessary because we are testing URL manipulation
  // and we don't want to affect the real browser history.
  delete window.location;

  window.location = {
    // @ts-expect-error  Mock window.location
    search: '',
    pathname: '/test-path'
  };
  window.history.replaceState = vi.fn();
});

describe('useColorParams', () => {
  it('getColorsFromParams returns Color instances from params', () => {
    getParams.mockReturnValue('abc123,def456');
    window.location.search = '?colors=abc123,def456';
    const { getColorsFromParams } = useColorParams();
    const colors = getColorsFromParams();
    expect(colors).toHaveLength(2);
    expect(colors[0]).toBeInstanceOf(Color);
    expect(colors[0].hex).toBe('ABC123');
    expect(colors[1].hex).toBe('DEF456');
    expect(colors[1].rgb[0]).toEqual(222);
    expect(colors[1].rgb[1]).toEqual(244);
    expect(colors[1].rgb[2]).toEqual(86);
  });

  it('getColorsFromParams returns empty array if no params', () => {
    getParams.mockReturnValue(undefined);
    const { result } = renderHook(() => useColorParams());
    const colors = result.current.getColorsFromParams();
    expect(colors).toEqual([]);
  });

  it('setColorsToParams sets colors param as uppercase comma-separated string', () => {
    const { result } = renderHook(() => useColorParams());

    act(() => {
      result.current.setColorsToParams(['abc123', 'def456']);
    });
    const test = result.current.getColorsFromParams();
    expect(test).toEqual('ABC123,DEF456');
  });

  it('removeColorsParams calls removeParams with correct args', () => {
    const { result } = renderHook(() => useColorParams());
    act(() => {
      result.current.removeColorsParams();
    });
    expect(removeParams).toHaveBeenCalledWith('colors', true);
  });
});
