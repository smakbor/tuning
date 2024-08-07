// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { GoldOutlined } from '@ant-design/icons';
import { AccountCircleOutlined } from '@mui/icons-material';
import { roles, routeRoles } from 'utils/constant/roles';

const icons = {
  reseller: AccountCircleOutlined,
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

const reseller = {
  type: 'group',
  // title: 'Reseller',
  children: [
    {
      id: 'resellers',
      title: 'Reseller',
      type: 'collapse',
      icon: AccountCircleOutlined,
      roles: routeRoles.reseller.reseller,
      children: [
        {
          id: 'default',
          title: 'Reseller',
          type: 'item',
          url: '/reseller',
          breadcrumbs: false,
          permissionKey: 'hasReseller',
          roles: routeRoles.reseller.reseller
        }
        // {
        //   id: 'clients-of-all-resellers',
        //   title: 'Clients of All Resellers',
        //   type: 'item',
        //   url: '/reseller/all-clients',
        //   breadcrumbs: false,
        //   permissionKey: 'hasReseller',
        //   roles: routeRoles.reseller.resellerClients
        // }
      ]
    }
  ]
};
export default reseller;
