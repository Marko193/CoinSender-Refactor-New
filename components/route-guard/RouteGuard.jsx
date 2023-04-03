import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from '../../services/user.service';

export { RouteGuard };

function RouteGuard({ children }) {

    console.log('children', children);

    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        console.log('authorized', authorized);
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

    function authCheck(url) {
        console.log('url', url);
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/auth'];
        const path = url.split('?')[0];
        // if (!userService.userValue && !publicPaths.includes(path)) {
        if (!localStorage.getItem('access_token') && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/auth',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}
