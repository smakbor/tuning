// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { DashboardOutlined, GoldOutlined } from '@ant-design/icons';
import { roles, routeRoles } from 'utils/constant/roles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const icons = {
  dashboard: DashboardOutlined,
  components: GoldOutlined
};

// ==============================|| MENU ITEMS - API ||============================== //

export const Menu = () => {
  const { menu } = useSelector((state) => state.menu);

  const SubChildrenLis = (SubChildrenLis) => {
    return SubChildrenLis?.map((subList) => {
      return {
        ...subList,
        title: <FormattedMessage id={`${subList.title}`} />,
        icon: icons[subList.icon]
      };
    });
  };

  const itemList = (subList) => {
    let list = {
      ...subList,
      title: <FormattedMessage id={`${subList.title}`} />,
      icon: icons[subList.icon]
    };

    if (subList.type === 'collapse') {
      list.children = SubChildrenLis(subList.children);
    }
    return list;
  };

  const withoutMenu = menu?.children?.filter((item) => item.id !== 'no-menu');

  const ChildrenList = withoutMenu?.map((subList) => {
    return itemList(subList);
  });

  const menuList = {
    ...menu,
    title: <FormattedMessage id={`${menu.title}`} />,
    icon: icons[menu.icon],
    children: ChildrenList
  };

  return menuList;
};

const dashboard = {
  id: 'dashboard',
  title: 'General',
  type: 'group',
  roles: routeRoles.dashboard.dashboard,
  children: [
    {
      id: 'dashboards',
      breadcrumbs: false,
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: DashboardOutlined
      // children: [
      //   {
      //     id: 'dashboard',
      //     title: <FormattedMessage id="dashboard" />,
      //     type: 'item',
      //     url: '/dashboard/statistics',
      //     breadcrumbs: false,
      //     roles: [roles.EMPLOYEE, roles.ADMIN, roles.RESELLER]
      //   },
      //   {
      //     id: 'default',
      //     title: <FormattedMessage id="default" />,
      //     type: 'item',
      //     url: '/dashboard/default',
      //     breadcrumbs: false,
      //     roles: [roles.MERCHANT, roles.EMPLOYEE, roles.ADMIN]
      //   },
      //   {
      //     id: 'analytics',
      //     title: <FormattedMessage id="analytics" />,
      //     type: 'item',
      //     url: '/dashboard/analytics',
      //     breadcrumbs: false,
      //     roles: [roles.EMPLOYEE, roles.ADMIN]
      //   }
      // ]
    },
    {
      id: 'file',
      title: 'Get File',
      type: 'item',
      url: '/get-solutions',
      breadcrumbs: false,
      icon: CloudDownloadIcon
    }
    // {
    //   id: 'test',
    //   title: 'Test',
    //   type: 'item',
    //   url: '/test',
    //   breadcrumbs: false,
    //   icon: DashboardOutlined
    // }
  ]
};
export default dashboard;
