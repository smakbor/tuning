// material-ui
import { Box, useMediaQuery, useTheme } from '@mui/material';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import Customization from './Customization';
import MobileSection from './MobileSection';
import { ThemeMode } from 'config';
import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';
import useAuth from 'hooks/useAuth';
import { useGetCreditsQuery, useGetSubscriptionQuery } from 'api/service/subscription.service';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { menuOrientation } = useConfig();

  // -> AUTH CONTEXT

  //auth
  const { dbUserId } = useAuth();

  //rtk
  const { data: credits = [], isLoading: isCreditLoading } = useGetCreditsQuery(dbUserId, {
    skip: !dbUserId
  });
  const { data: subscription = [], isLoading: isSubscriptionLoading } = useGetSubscriptionQuery(dbUserId, {
    skip: !dbUserId
  });

  // ===========================|| CUSTOM HOOKS ||=========================== //
  // -> THEME HOOK
  const theme = useTheme();
  // -> DRAWER HOOK

  // -> MEDIA QUERY
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // -> THEME MODE
  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {/* {!downLG && <Search user={user} />}
      {downLG && <Search user={user} />} */}
      <Search />

      {/* {!downLG && megaMenu}
      {!downLG && localization} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Box sx={{ width: '15rem' }}> Subscriptions: 0</Box>
      <Box sx={{ width: '15rem' }}> EVC Number: 0</Box>
      <Box sx={{ width: '10rem' }}> Credits: {credits.length === 0 ? 0 : credits[0]?.credits}</Box>

      <Notification />

      {/* <Message /> */}
      <Customization />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
