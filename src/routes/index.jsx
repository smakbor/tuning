import { lazy, useEffect, useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import Loadable from 'components/Loadable';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Error404 from 'pages/maintenance/Error404';
import ClientRoutes from './ClientRoutes';
import useAuth from 'hooks/useAuth';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/Dashboard')));

// ==============================|| ROUTING RENDER ||============================== //

function ThemeRoutes() {
  //PERMISSION
  const { user } = useAuth();

  const [filteredRoutes, setFilteredRoutes] = useState({ ...MainRoutes });
  const { children, ...rest } = MainRoutes;

  // const updatedRoutes = checkPermission(children, permissions, user, settingData);
  // useEffect(() => {
  //   setFilteredRoutes({ ...rest, children: updatedRoutes });
  // }, [permissions, user, settingData]);

  return useRoutes([
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        }
      ]
    },
    LoginRoutes,
    ComponentsRoutes,
    filteredRoutes,
    ClientRoutes,

    {
      path: '*',
      element: <Error404 />
    }
  ]);
}

export default ThemeRoutes;
