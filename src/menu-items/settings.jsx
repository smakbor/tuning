// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { DeleteOutlined, GoldOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';
import { ImageOutlined } from '@mui/icons-material';
import { roles, routeRoles } from 'utils/constant/roles';

const icons = {
  settings: SettingOutlined,
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

const settings = {
  id: 'settings',
  // title: 'Settings',
  type: 'group',

  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'collapse',
      icon: SettingOutlined,
      roles: routeRoles.settings.settings,
      children: [
        {
          id: 'upload-logo',
          title: 'Upload/Change Logo',
          type: 'item',
          url: '/settings/logo',
          breadcrumbs: false,
          icon: ImageOutlined,
          roles: routeRoles.settings.logo
        },
        {
          id: 'activity-logs',
          title: 'Activity Log',
          type: 'item',
          url: '/settings/activity-logs',
          breadcrumbs: false,
          icon: HistoryOutlined,
          roles: routeRoles.settings.activityLogs
        },
        {
          id: 'trash',
          title: 'Trash',
          type: 'item',
          url: '/settings/trash',
          breadcrumbs: false,
          icon: DeleteOutlined,
          roles: routeRoles.settings.trash
        }
      ]
    }
  ]
};
export default settings;
