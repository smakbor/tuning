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

const subscriptions = {
  id: 'subscriptions',
  title: 'Subscriptions',
  type: 'group',
  children: [
    {
      id: 'subs',
      title: 'Shop',
      type: 'item',
      url: '/subscriptions',
      breadcrumbs: false,
      icon: DashboardOutlined
    }
    // {
    //   id: 'credits',
    //   title: 'My Credits',
    //   type: 'item',
    //   url: '/credits',
    //   breadcrumbs: false,
    //   icon: DashboardOutlined
    // }
  ]
};
export default subscriptions;
