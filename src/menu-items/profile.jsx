// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { DashboardOutlined, GoldOutlined } from '@ant-design/icons';
import { HubOutlined } from '@mui/icons-material';
// import { roles } from 'utils/constant/roles';
import { roles, routeRoles } from '../utils/constant/roles';

const icons = {
  dashboard: HubOutlined,
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

const profile = {
  id: 'profile',
  title: 'Others',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profiles/user/update/personal-info',
      breadcrumbs: false,
      icon: DashboardOutlined
    }
    // {
    //   id: 'file',
    //   title: 'Get File',
    //   type: 'item',
    //   permissionKey: 'zone',
    //   url: '/get-solutions',
    //   breadcrumbs: false,
    //   icon: DashboardOutlined
    // }
  ]
};
export default profile;
