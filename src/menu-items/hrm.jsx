// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useSelector } from 'store';

// assets
import { GoldOutlined } from '@ant-design/icons';
import { PeopleAltOutlined, SettingsOutlined } from '@mui/icons-material';
import { roles, routeRoles } from 'utils/constant/roles';

const icons = {
  dashboard: PeopleAltOutlined,
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

const hrm = {
  id: 'hrm',
  title: 'HRM',
  permissionKey: 'employee',
  type: 'group',
  roles: routeRoles.employee.employee,
  children: [
    {
      id: 'employee',
      title: 'Employee',
      type: 'item',
      icon: PeopleAltOutlined,
      url: '/employee',
      breadcrumbs: false,
      permissionKey: 'employee',
      roles: routeRoles.employee.employee
    },
    {
      id: 'employee-setting',
      title: 'Employee Setting',
      type: 'collapse',
      breadcrumbs: false,
      icon: SettingsOutlined,
      children: [
        {
          id: 'employeeRole',
          title: 'Role',
          type: 'item',
          url: '/employee/role',
          breadcrumbs: false,
          roles: routeRoles.employee.employeeRole
        },
        {
          id: 'pay-head',
          title: 'Pay Head',
          type: 'item',
          url: '/employee/pay-head',
          breadcrumbs: false,
          roles: routeRoles.employee.payHead
        },
        {
          id: 'employee-salary',
          title: 'Employee Salary',
          type: 'item',
          url: '/employee/salary',
          breadcrumbs: false,
          roles: routeRoles.employee.employeeSalary
        }
        // {
        //   id: 'employee-salary',
        //   title: 'Employee Salary',
        //   type: 'item',
        //   url: '/employee/salary',
        //   breadcrumbs: false
        // }
      ]
    }
  ]
};
export default hrm;
