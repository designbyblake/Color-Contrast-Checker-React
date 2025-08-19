import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useQueryParams } from './useQueryParams';

describe('useQueryParams', () => {
  const originalLocation = window.location;
  const originalReplaceState = window.history.replaceState;

  beforeEach(() => {
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

  afterEach(() => {
    // @ts-expect-error  Mock window.location
    window.location = originalLocation;
    window.history.replaceState = originalReplaceState;
    vi.clearAllMocks();
  });

  it('getParams returns null if param does not exist', () => {
    window.location.search = '?foo=bar';
    const { getParams } = useQueryParams();
    expect(getParams('baz')).toBeNull();
  });

  it('getParams returns value if param exists', () => {
    window.location.search = '?foo=bar&baz=qux';
    const { getParams } = useQueryParams();
    expect(getParams('foo')).toBe('bar');
    expect(getParams('baz')).toBe('qux');
  });

  it('setParams sets a new param', () => {
    window.location.search = '';
    const { setParams } = useQueryParams();
    setParams('foo', 'bar');
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/test-path?foo=bar'
    );
  });

  it('setParams updates an existing param', () => {
    window.location.search = '?foo=bar';
    const { setParams } = useQueryParams();
    setParams('foo', 'baz');
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/test-path?foo=baz'
    );
  });

  it('removeParams removes a param', () => {
    window.location.search = '?foo=bar&baz=qux';
    const { removeParams } = useQueryParams();
    removeParams('foo');
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/test-path?baz=qux'
    );
  });

  it('removeParams removes all params if allParamsRemoved is true', () => {
    window.location.search = '?foo=bar&baz=qux';
    const { removeParams } = useQueryParams();
    removeParams('foo', true);
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/test-path'
    );
  });

  it('removeParams does nothing if param does not exist', () => {
    window.location.search = '?foo=bar';
    const { removeParams } = useQueryParams();
    removeParams('baz');
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/test-path?foo=bar'
    );
  });
});
