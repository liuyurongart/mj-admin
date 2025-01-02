import { useMemo } from 'react';
import { TRoute } from '../../config/routes';

export function useMatchRoute(routes: TRoute[], matchPath: string) {
  const route = useMemo(() => {
    const travel = (list: TRoute[], pPath: string): TRoute | undefined => {
      for (const item of list) {
        const path = pPath + item.path;
        if (path === matchPath) return item;
        if (item?.routes) {
          const result = travel(item.routes, path);
          if (result) return result;
        }
      }
    };
    return travel(routes, '');
  }, [routes, matchPath]);

  return route;
}
