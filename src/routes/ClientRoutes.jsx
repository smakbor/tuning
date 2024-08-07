import ClientLayout from 'layout/MainLayout/Header/ClientLayout';
import Test from './Card';
import ClientAuthGuard from 'utils/route-guard/ClientAuthGuard';
import Home from './Home';
import ClientLogin from 'pages/auth/ClientLogin';

const ClientRoutes = {
  path: 'isp',
  element: <ClientLayout layout="component" />,

  children: [
    {
      path: 'client',
      element: <Test />
    },
    {
      path: 'login',
      element: <ClientLogin />
    },
    {
      path: 'home',
      element: <Home />
    }
  ]
};

export default ClientRoutes;
