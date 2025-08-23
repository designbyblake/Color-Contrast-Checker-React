export const useQueryParams = () => {
  const getParams = (paramKey: string): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramKey);
  };

  const setParams = (paramKey: string, paramValue: string): void => {
    const params = new URLSearchParams(window.location.search);
    params.set(paramKey, paramValue);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  const removeParams = (paramKey: string, allParamsRemoved?: boolean): void => {
    const params = new URLSearchParams(window.location.search);
    params.delete(paramKey);
    if (allParamsRemoved) {
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };
  return { getParams, setParams, removeParams };
};
