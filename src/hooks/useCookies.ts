import { useCallback, useMemo } from 'react';
import Cookies, { CookieGetOptions, CookieSetOptions } from 'universal-cookie/es6';

const useCookies = () => {
  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const setCookie = useCallback(
    (name: string, value: string | unknown, options?: CookieSetOptions) => {
      cookies.set(name, value, options);
    },
    [cookies]
  );

  const removeCookie = useCallback(
    (name: string, options?: CookieSetOptions) => {
      cookies.remove(name, options);
    },
    [cookies]
  );

  const getCookie = useCallback(
    <T>(name: string, options?: CookieGetOptions): T => {
      return cookies.get<T>(name, options);
    },
    [cookies]
  );

  return { setCookie, removeCookie, getCookie };
};

export default useCookies;
