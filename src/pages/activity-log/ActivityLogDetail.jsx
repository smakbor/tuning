import { UserOutlined } from '@ant-design/icons';
import { CreateOutlined, DeleteOutline, UpdateOutlined } from '@mui/icons-material';
import { Box, Chip, FormControl, Grid, List, ListItem, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const ActivityLogDetail = ({ activityLogDialogData }) => {
  // -> DESTRUCTURE  activityLogDialogData
  const { merchant } = activityLogDialogData;
  // -> REMOVE KEYS
  const removeKeys = ['_id', 'isTrash', 'updatedAt', 'merchant', 'branch', 'user'];
  return (
    <Box>
      <List sx={{ py: 0 }}>
        <ListItem sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary" variant="h5">
                  Name:{' '}
                  <Typography component="span" variant="body1">
                    {merchant?.name}
                  </Typography>
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              {activityLogDialogData?.role === 'MERCHANT' ? (
                <Chip icon={<UserOutlined />} label={activityLogDialogData?.role} variant="light" color="success" />
              ) : activityLogDialogData?.role === 'RESELLER' ? (
                <Chip icon={<UserOutlined />} label={activityLogDialogData?.role} variant="light" color="primary" />
              ) : (
                <Chip icon={<UserOutlined />} label={activityLogDialogData?.role} variant="light" />
              )}
            </Grid>
          </Grid>
        </ListItem>

        <ListItem sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary" variant="h5">
                  Description:{' '}
                  <Typography component="span" variant="body1">
                    {activityLogDialogData?.description}
                  </Typography>
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {activityLogDialogData?.action === 'DELETE' ? (
                <Chip icon={<DeleteOutline fontSize="small" />} label={activityLogDialogData?.action} variant="light" color="error" />
              ) : activityLogDialogData?.action === 'CREATE' ? (
                <Chip icon={<CreateOutlined fontSize="small" />} label={activityLogDialogData?.action} variant="light" color="info" />
              ) : activityLogDialogData?.action === 'UPDATE' ? (
                <Chip icon={<UpdateOutlined fontSize="small" />} label={activityLogDialogData?.action} variant="light" color="warning" />
              ) : (
                <Chip label={activityLogDialogData?.action} />
              )}
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography color="secondary" variant="h5">
                Date:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="secondary" variant="body1">
                {activityLogDialogData?.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <Grid container spacing={2}>
            {activityLogDialogData?.data?.map((item, index) => {
              if (item?.old && Object.keys(item.old).some((key) => !removeKeys.includes(key))) {
                return (
                  <Grid item key={index} xs={12} md={6}>
                    <MainCard>
                      <Stack spacing={1}>
                        <Typography variant="h5">Old:</Typography>

                        {Object.keys(item.old).map((key, index) => {
                          if (!removeKeys.includes(key)) {
                            return (
                              <FormControl sx={{ width: '100%' }} key={index}>
                                <Typography color="secondary">
                                  <Typography component="span" textTransform="capitalize">
                                    {key}
                                  </Typography>{' '}
                                  : {item.old[key] || 'N/A'}
                                </Typography>
                              </FormControl>
                            );
                          }
                        })}
                      </Stack>
                    </MainCard>
                  </Grid>
                );
              } else {
                return null;
              }
            })}

            {activityLogDialogData?.data?.map((item, index) => {
              if (item?.new && Object.keys(item.new).some((key) => !removeKeys.includes(key))) {
                return (
                  <Grid key={index} item xs={12} md={6}>
                    <MainCard>
                      <Stack spacing={1}>
                        <Typography variant="h5">New:</Typography>

                        {Object.keys(item.new).map((key, index) => {
                          if (!removeKeys.includes(key)) {
                            return (
                              <FormControl sx={{ width: '100%' }} key={index}>
                                <Typography color="secondary">
                                  <Typography component="span" textTransform="capitalize">
                                    {key}
                                  </Typography>{' '}
                                  : {item.new[key] || 'N/A'}
                                </Typography>
                              </FormControl>
                            );
                          }
                        })}
                      </Stack>
                    </MainCard>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </ListItem>
      </List>
    </Box>
  );
};

ActivityLogDetail.propTypes = {
  activityLogDialogData: PropTypes.object
};

export default ActivityLogDetail;
