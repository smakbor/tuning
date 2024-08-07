import { Button, Chip, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmEmail() {
  return (
    <MainCard sx={{ height: '100vh' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <MainCard
            title="Confirmation"
            sx={{ height: '40vh', width: '40vw', marginTop: '10rem', textAlign: 'center', border: '1px solid white' }}
          >
            <Typography variant="h3" color="gray">
              Please check your email for a link to log into your account.
              <span className="font-bold">You need to open the link from the email in the same browser.</span>
            </Typography>

            <Link to="/auth/confirm-login?token=8b72cda3d1b87f41c5043c8074b6d9c5f5794b494c0c95c2391f99a136e1cca3">
              <Button variant="outlined">Login</Button>
            </Link>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default ConfirmEmail;
