import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import ClientAuthLogin from 'sections/auth/auth-forms/ClientAuthLogin';

// ================================|| LOGIN ||================================ //

const ClientLogin = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{
              mb: { xs: -0.5, sm: 0.5 },
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} to="/auth/signup" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ClientAuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ClientLogin;
