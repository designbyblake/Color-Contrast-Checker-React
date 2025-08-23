import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useQueryParams } from './useQueryParams';

// Mocks
const mockGetParams = vi.fn();
const mockSetParams = vi.fn();
const mockRemoveParams = vi.fn();

vi.mock('./useQueryParams', () => ({
  useQueryParams: () => ({
    getParams: mockGetParams,
    setParams: mockSetParams,
    removeParams: mockRemoveParams
  })
}));

describe('useQueryParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState = vi.fn();
  });

  it('getParams returns null if param does not exist', () => {
    mockGetParams.mockReturnValue(null);
    const { result } = renderHook(() => useQueryParams());
    expect(result.current.getParams('baz')).toBeNull();
  });

  it('getParams returns value if param exists', () => {
    mockGetParams.mockReturnValue('qux');
    const { result } = renderHook(() => useQueryParams());
    expect(result.current.getParams('baz')).toBe('qux');
  });

  it('setParams sets a new param', () => {
    const { result } = renderHook(() => useQueryParams());
    act(() => {
      result.current.setParams('test', 'abc123,def456');
    });
    expect(mockSetParams).toHaveBeenCalledWith('test', 'abc123,def456');
  });

  it('removeParams removes a param', () => {
    const { result } = renderHook(() => useQueryParams());
    act(() => {
      result.current.removeParams('foo');
    });
    expect(mockRemoveParams).toHaveBeenCalledWith('foo');
  });

  it('removeParams removes all params if allParamsRemoved is true', () => {
    const { result } = renderHook(() => useQueryParams());
    act(() => {
      result.current.removeParams('foo', true);
    });
    expect(mockRemoveParams).toHaveBeenCalledWith('foo', true);
  });
});
