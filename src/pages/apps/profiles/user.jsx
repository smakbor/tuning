import { useRef } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';
import { Outlet } from 'react-router';

// project import
import ProfileCard from 'sections/apps/profiles/user/ProfileCard';
import ProfileTabs from 'sections/apps/profiles/user/ProfileTabs';
import MainCard from 'components/MainCard';

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4">Profile</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileCard focusInput={focusInput} />
        </Grid>
        <Grid item xs={12} md={3}>
          <ProfileTabs focusInput={focusInput} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet context={inputRef} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
