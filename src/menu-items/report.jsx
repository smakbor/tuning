// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { GoldOutlined } from '@ant-design/icons';

// mui icons
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { roles, routeRoles } from 'utils/constant/roles';

const icons = {
  settings: AssessmentOutlinedIcon,
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

const report = {
  id: 'report',
  // title: 'Report',
  type: 'group',
  children: [
    {
      id: 'report',
      title: 'Report',
      type: 'collapse',
      icon: AssessmentOutlinedIcon,
      roles: routeRoles.report.report,
      permissionKey: 'report',
      children: [
        // {
        //   id: 'collection',
        //   title: 'Collection',
        //   type: 'item',
        //   url: '/report/collection',
        //   breadcrumbs: false
        // },
        // {
        //   id: 'deposit',
        //   title: 'Deposit',
        //   type: 'item',
        //   url: '/report/deposit',
        //   breadcrumbs: false,
        //   permissionKey: 'deposit'
        // },
        {
          id: 'reseller-collection',
          title: 'Reseller Collection',
          type: 'item',
          url: '/report/reseller-collection',
          breadcrumbs: false,
          permissionKey: 'report',
          roles: routeRoles.report.resellerCollection
        },
        {
          id: 'bill-report',
          title: 'Bill Report',
          type: 'item',
          url: '/report/bill-report',
          breadcrumbs: false,
          permissionKey: 'report',
          roles: routeRoles.report.billReport
        },
        {
          id: 'commission',
          title: 'Commission',
          type: 'item',
          url: '/report/commission',
          breadcrumbs: false,
          permissionKey: 'report',
          roles: routeRoles.report.commission
        },
        {
          id: 'reseller-balance-statement',
          title: 'Balance Statement',
          type: 'item',
          url: '/report/reseller-balance-statement',
          breadcrumbs: false,
          permissionKey: 'report',
          roles: routeRoles.report.resellerBalanceStatment
        }
      ]
    }
  ]
};
export default report;
