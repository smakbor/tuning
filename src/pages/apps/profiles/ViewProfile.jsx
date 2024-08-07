import PropTypes from 'prop-types';

// material-ui
import {
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { EnvironmentOutlined, EyeInvisibleOutlined, EyeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';
import { getDistrict, getDivision, getThana } from 'utils/convertAddressOptions';
import CustomTab from 'components/custom/tab/CustomTab';
import CustomTabBody from 'components/custom/tab/CustomTabBody';
import { useState } from 'react';
import { useGetEmployeeRoleQuery } from 'api/service/employee.service';
import handleClickToCopyClipBoard from 'utils/handleClickToCopyClipBoard';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const ProfileView = ({ singleProfileInfo, title }) => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // ============ Hooks ============
  const { user } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // -> GET PROFILE DATA FROM SINGLE PROFILE INFO OR USER
  const data = singleProfileInfo ? singleProfileInfo : user;

  // -> @GET EMPLOYEE ROLE
  const { data: roles } = useGetEmployeeRoleQuery(user?.merchant, {
    skip: !user?.merchant
  });

  // -> PERMISSION FORM DATA
  const tabData = singleProfileInfo
    ? [{ menuTitle: 'Personal Details' }, { menuTitle: 'Address' }]
    : [{ menuTitle: 'Personal Details' }, { menuTitle: 'Address' }];

  // -> ROLE FIND FUNCTION
  const getRoleNameById = (roleId) => {
    const role = roles?.find((role) => role?._id === roleId);
    return role?.role;
  };

  console.log(import.meta.env.VITE_APP_FILE_SERVER_URL + data?.avatar?.url);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {(data?.role || data?.authRole) && (
                    <Stack direction="row" justifyContent="flex-end">
                      <Chip label={data?.role ? data?.role : getRoleNameById(data?.authRole)} size="small" color="primary" />
                    </Stack>
                  )}
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar
                      alt={data?.name}
                      size="xl"
                      src={data?.avatar?.url ? import.meta.env.VITE_APP_FILE_SERVER_URL + data?.avatar?.url : data?.name}
                    />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{data?.name}</Typography>
                      <Typography color="secondary">{data?.companyName}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    {data?.email && (
                      <ListItem>
                        <ListItemIcon>
                          <MailOutlined />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">{data?.email}</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{data?.mobile}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {data?.address && (
                      <ListItem>
                        <ListItemIcon>
                          <EnvironmentOutlined />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">{data?.address}</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8}>
        <CustomTab
          componentTitle={singleProfileInfo ? title : 'Profile Info'}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabMenus={tabData}
        >
          <CustomTabBody tabIndex={tabIndex} index={0}>
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Full Name</Typography>
                      <Typography>{data?.name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Company name</Typography>
                      <Typography>{data?.companyName || 'N/A'}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Gender</Typography>
                      <Typography>{data?.gender}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">NID</Typography>
                      <Tooltip title="Click To Copy NID" placement="left" arrow>
                        <Typography
                          sx={{ ':hover': { color: 'primary.main', cursor: 'pointer', borderRadius: 1 } }}
                          onClick={() => handleClickToCopyClipBoard(data?.nid, 'NID')}
                        >
                          {data?.nid}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Phone</Typography>
                      <Tooltip title="Click To Copy Phone" placement="left" arrow>
                        <Typography
                          sx={{ ':hover': { color: 'primary.main', cursor: 'pointer', borderRadius: 1 } }}
                          onClick={() => handleClickToCopyClipBoard(data?.mobile, 'Phone')}
                        >
                          {data?.mobile}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  </Grid>
                  {/* {data?.password && (
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Password</Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Tooltip title="Click To Copy Password" placement="left" arrow>
                            <Typography
                              sx={{ ':hover': { color: 'primary.main', cursor: 'pointer', borderRadius: 1 } }}
                              onClick={() => handleClickToCopyClipBoard(data?.password, 'Password')}
                              variant="body2"
                            >
                              {isShowPassword ? data?.password : 'xxxxxxxx'}
                            </Typography>
                          </Tooltip>
                          <IconButton onClick={() => setIsShowPassword(!isShowPassword)} size="small">
                            {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined fontSize="small" />}
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Grid>
                  )} */}
                  {data?.email && (
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Tooltip title="Click To Copy Email" placement="left" arrow>
                          <Typography
                            sx={{ ':hover': { color: 'primary.main', cursor: 'pointer', borderRadius: 1 } }}
                            onClick={() => handleClickToCopyClipBoard(data?.email, 'Email')}
                          >
                            {data?.email}
                          </Typography>
                        </Tooltip>
                      </Stack>
                    </Grid>
                  )}
                </Grid>
              </ListItem>
            </List>
          </CustomTabBody>
          <CustomTabBody tabIndex={tabIndex} index={1}>
            <List sx={{ py: 0 }}>
              <ListItem divider>
                <Grid container spacing={matchDownMD ? 0.5 : 3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Division</Typography>
                      <Typography>{getDivision(data?.division)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">District</Typography>
                      <Typography>{getDistrict(data?.district)}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={matchDownMD ? 0.5 : 3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Thana</Typography>
                      <Typography>{getThana(data?.thana)}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </CustomTabBody>

          {/* {singleProfileInfo && (
            <CustomTabBody tabIndex={tabIndex} index={2}>
              <Permission singleProfileInfo={singleProfileInfo} />
            </CustomTabBody>
          )} */}
        </CustomTab>
      </Grid>
    </Grid>
  );
};

ProfileView.propTypes = {
  singleProfileInfo: PropTypes.object,
  title: PropTypes.string
};

export default ProfileView;
