// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { GoldOutlined, SettingOutlined } from '@ant-design/icons';

import LanOutlinedIcon from '@mui/icons-material/LanOutlined';

const icons = {
  branch: LanOutlinedIcon,
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

const branch = {
  id: 'branch',
  title: 'Branch',
  type: 'group',
  children: [
    {
      id: 'branch',
      title: 'Branch',
      type: 'collapse',
      icon: LanOutlinedIcon,

      children: [
        {
          id: 'branch',
          title: 'Branch',
          type: 'item',
          url: '/branch',
          breadcrumbs: false
        }
      ]
    }
  ]
};
export default branch;
