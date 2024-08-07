// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { GoldOutlined } from '@ant-design/icons';
import { HubOutlined } from '@mui/icons-material';
import { roles, routeRoles } from 'utils/constant/roles';

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

const supperAdmin = {
  id: 'superAdmin',
  title: 'Supper Admin',
  type: 'group',
  roles: routeRoles.supperAdmin.supperAdmin,
  children: [
    {
      id: 'superAdmin',
      title: 'Super Admin',
      type: 'collapse',
      icon: HubOutlined,

      children: [
        {
          id: 'superAdmin',
          title: 'Admin',
          type: 'item',
          permissionKey: 'supper_admin',
          url: '/super-admin/admin',
          breadcrumbs: false,
          roles: [roles.SUPER_ADMIN]
        }
      ]
    }
  ]
};
export default supperAdmin;
