import { SaveFilled } from '@ant-design/icons';
import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import React from 'react';
import LoadingButton from 'components/@extended/LoadingButton';

function MyCredits() {
  return (
    <>
      <MainCard sx={{ height: '78vh' }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <Typography variant="h3">My Credits</Typography>
          </Grid>
          <Grid item lg={6}>
            <MainCard title="My Subscriptions" sx={{ background: '#1e81b0' }}>
              <Grid container spacing={3.5} justifyContent="center">
                <Grid item>
                  <Typography variant="h2" color="black">
                    {' '}
                    Not Active{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                  <Button disabled="false" variant="outlined" color="secondary" type="reset">
                    Reset
                  </Button>
                  <LoadingButton
                    // loading={isLoading}
                    // disabled={isLoading}
                    variant="contained"
                    loadingPosition="end"
                    endIcon={<SaveFilled />}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </Stack> */}
                </Grid>
              </Grid>
              <Typography color="info" variant="body1" component="div">
                <Chip label="Buy Subscription" sx={{ color: 'black' }} />
              </Typography>
            </MainCard>
          </Grid>
          <Grid item lg={6}>
            <MainCard title="My Credits" sx={{ background: '#1e81b0' }}>
              <Grid container spacing={3.5} justifyContent="center">
                <Grid item>
                  <Typography variant="h2"> 0 Credits </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                  <Button disabled="false" variant="outlined" color="secondary" type="reset">
                    Reset
                  </Button>
                  <LoadingButton
                    // loading={isLoading}
                    // disabled={isLoading}
                    variant="contained"
                    loadingPosition="end"
                    endIcon={<SaveFilled />}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </Stack> */}
                </Grid>
              </Grid>
              <Typography color="info" variant="body1" component="div">
                <Chip label="Buy Credits" color="primary" />
              </Typography>
            </MainCard>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default MyCredits;
