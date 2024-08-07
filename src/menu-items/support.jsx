// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// roles permission
import { routeRoles } from 'utils/constant/roles';

// assets
import { GoldOutlined } from '@ant-design/icons';

// mui icons
import { GroupsOutlined } from '@mui/icons-material';

const icons = {
  settings: GroupsOutlined,
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

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  roles: routeRoles.support.support,
  children: [
    {
      id: 'support',
      title: 'Support',
      type: 'collapse',
      icon: GroupsOutlined,
      permissionKey: 'support',
      roles: routeRoles.support.support,
      children: [
        {
          id: 'clientTicket',
          title: 'Client Ticket',
          type: 'item',
          url: '/support/client-ticket',
          breadcrumbs: false,
          permissionKey: 'support',
          roles: routeRoles.support.ticket
        },
        {
          id: 'resellerTicket',
          title: 'Reseller Ticket',
          type: 'item',
          url: '/support/reseller-ticket',
          breadcrumbs: false,
          permissionKey: 'support',
          roles: routeRoles.support.resellerTicket
        },
        {
          id: 'subResellerTicket',
          title: 'Sub-Reseller Ticket',
          type: 'item',
          url: '/support/sub-reseller-ticket',
          breadcrumbs: false,
          permissionKey: 'support',
          roles: routeRoles.support.subResellerTicket
        },
        {
          id: 'supportEmployee',
          title: 'Support Employee',
          type: 'item',
          url: '/support/support-employee',
          breadcrumbs: false,
          permissionKey: 'support',
          roles: routeRoles.support.supportEmployee
        },
        {
          id: 'type',
          title: 'Support Type',
          type: 'item',
          url: '/support/type',
          breadcrumbs: false,
          permissionKey: 'support',
          roles: routeRoles.support.type
        },
        {
          id: 'category',
          title: 'Support Category',
          type: 'item',
          url: '/support/category',
          breadcrumbs: false,
          permissionKey: 'support',
          roles: routeRoles.support.category
        },
        {
          id: 'bulletin',
          title: 'Bulletin',
          type: 'item',
          url: '/support/bulletin',
          breadcrumbs: false,
          permissionKey: 'support',
          roles: routeRoles.support.bulletin
        }
      ]
    }
  ]
};
export default support;
