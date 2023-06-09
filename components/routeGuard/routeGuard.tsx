import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// @ts-ignore
export const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authCheck(url: string) {
    const publicPaths = ['/auth', '/auth-old', '/forgot-password', '/reset-password/[restorePasswordToken]'];
    const path = url.split('?')[0];
    if (!localStorage.getItem('access_token') && !publicPaths.includes(path)) {
      setAuthorized(false);
      await router.push({
        pathname: '/auth',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (authorized && children);
}
