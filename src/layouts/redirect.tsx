import { useMatchRoute } from '@/utils/useMatchRoute';
import { Navigate, useAccess, useLocation, useModel } from '@umijs/max';
import { find, isEqual } from 'es-toolkit/compat';
import routes from '../../config/routes';

export default function Redirect() {
  const allAccess = useAccess();
  const { pathname, search } = useLocation();
  const { initialState } = useModel('@@initialState');
  const matchedRoute = useMatchRoute(routes, pathname);

  if (!(initialState?.userInfo && matchedRoute)) return;

  const redirectRoute = find(matchedRoute?.routes, ({ path, access }) => {
    if (isEqual(path, '')) return false;
    return access ? allAccess[access as keyof typeof allAccess] : true;
  });

  const { path: redirectPath } = redirectRoute ?? {};

  if (redirectPath) {
    const to = `${pathname}/${redirectPath}${search}`.replace(/\/+/g, '/');
    return <Navigate to={to} />;
  } else {
    return <Navigate to="/404" />;
  }
}
