import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Menu } from 'menu-items/dashboard';

import { useSelector } from 'store';
import useConfig from 'hooks/useConfig';
import { HORIZONTAL_MAX_ITEM, MenuOrientation } from 'config';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const theme = useTheme();

  // CHECK PERMISSION HERE
  let filteredRoutes = [...menuItem.items];
  // if (user?.role == 'ADMIN' || user?.role == 'SUPER_ADMIN') {
  //   const allRoutes = [...menuItem.items,];

  //   filteredRoutes = checkPermission(allRoutes, permissions, user, settingData);
  // } else {
  //   filteredRoutes = checkPermission(menuItem.items, permissions, user, settingData);
  // }

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);
  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [menuItems, setMenuItems] = useState({ items: [] });

  useEffect(() => {
    handlerMenuItem();
    // eslint-disable-next-line
  }, []);

  let getMenu = Menu();
  const handlerMenuItem = () => {
    const isFound = filteredRoutes?.some((element) => {
      if (element.id === 'group-dashboard') {
        return true;
      }
      return false;
    });

    if (getMenu?.id !== undefined && !isFound) {
      filteredRoutes.splice(0, 0, getMenu);
      setMenuItems({ items: filteredRoutes });
    }
  };

  useLayoutEffect(() => {
    setMenuItems({ items: filteredRoutes });
  }, []);

  // useMemo(() => {
  //   setMenuItems({ items: filteredRoutes });
  // }, [permissions, user, settingData]);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems?.items?.length - 1;
  let remItems = [];
  let lastItemId;

  //  first it checks menu item is more than giving HORIZONTAL_MAX_ITEM after that get lastItemid by giving horizontal max
  // item and it sets horizontal menu by giving horizontal max item lastly slice menuItem from array and set into remItems

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon
    }));
  }

  const navGroups = menuItems?.items?.slice(0, lastItemIndex + 1).map((item, i) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={i}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={i} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block',
        pb: 5
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
