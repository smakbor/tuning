import { Link } from 'react-router-dom';

// project import
import { APP_DEFAULT_PATH } from 'config';

// material-ui
import { Button, Stack, Typography } from '@mui/material';

// assets
import noInternetImg from 'assets/images/maintenance/no-internet.png';

// ==============================|| ERROR 404 - MAIN ||============================== //

function NoInternet() {
  return (
    <Stack gap={3} alignItems="center" justifyContent="center">
      <img src={noInternetImg} alt="no-internet" style={{ height: '60vh' }} />

      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Typography variant="h1">Connection Timeout</Typography>
        <Typography color="textSecondary" align="center" sx={{ width: { xs: '73%', sm: '90%' } }}>
          Please check your internet connection or try again later.
        </Typography>
        <Button component={Link} to={APP_DEFAULT_PATH} variant="contained">
          Back To Home
        </Button>
      </Stack>
    </Stack>
  );
}

export default NoInternet;
