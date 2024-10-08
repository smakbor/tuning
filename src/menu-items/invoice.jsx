// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { GoldOutlined } from '@ant-design/icons';
import { DocumentScannerOutlined } from '@mui/icons-material';
import { routeRoles } from 'utils/constant/roles';

const icons = {
  dashboard: <DocumentScannerOutlined />,
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

const invoice = {
  id: 'invoice',
  // title: 'Invoice',
  type: 'group',
  roles: routeRoles.merchantInvoices.invoice,
  children: [
    {
      id: 'invoice',
      title: 'Invoice',
      type: 'item',
      icon: DocumentScannerOutlined,
      url: '/invoice/list',
      breadcrumbs: false,
      permissionKey: 'invoice',
      roles: routeRoles.merchantInvoices.invoice
    }
  ]
};
export default invoice;
