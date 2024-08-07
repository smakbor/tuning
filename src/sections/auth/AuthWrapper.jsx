import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Stack } from '@mui/material';

// project import
import AuthFooter from 'components/cards/AuthFooter';
// import Logo from 'components/logo';
import AuthCard from './AuthCard';
import car from '../../assets/images/background_car.jpg';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      backgroundImage: `url(${car})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      // responsive width
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: {
              xs: 'calc(100vh - 210px)',
              sm: 'calc(100vh - 134px)',
              md: 'calc(100vh - 112px)'
            }
          }}
        >
          <Grid item margin={1} sx={{ marginTop: '-2rem' }}>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
