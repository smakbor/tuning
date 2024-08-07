import PropTypes from 'prop-types';
// mui import
import { Box, Button, Grid, List, ListItem, Stack, Typography, useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';

const CollectionDetails = ({ handleCloseDialog }) => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ px: 3, pt: 3, pb: 2 }} direction="row" justifyContent="space-between">
            <Typography variant="h5">Report View</Typography>
            <Button color="error" onClick={handleCloseDialog}>
              Close
            </Button>
          </Stack>
          <MainCard>
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">ID</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Agent</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Name</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Collector</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Package</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Start Date</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Bill</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">End Date</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Due</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Monthly</Typography>
                      <Typography>{}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard title="Node">
            <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, sed!</Typography>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

CollectionDetails.propTypes = {
  handleCloseDialog: PropTypes.func
};

export default CollectionDetails;
