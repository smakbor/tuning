import PropTypes from 'prop-types';

// material-ui
import { List, Typography } from '@mui/material';

// project import
import NavItem from './NavItem';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const navCollapse = item.children?.map((menu, i) => {
    switch (menu.type) {
      case 'item':
        return <NavItem key={i} item={menu} level={1} />;
      default:
        return (
          <Typography key={i} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title && (
          <Typography variant="subtitle1" color="text.primary" sx={{ pl: 3, mb: 1.5 }}>
            {item.title}
          </Typography>
        )
      }
      sx={{ mb: 1 }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
