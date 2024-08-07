import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormLabel, Grid, TextField, Menu, MenuItem, Stack, Typography } from '@mui/material';

// project import
import ProfileTab from './ProfileTab';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Avatar from 'components/@extended/Avatar';

import { facebookColor, linkedInColor, twitterColor, ThemeMode } from 'config';

// assets
import { FacebookFilled, LinkedinFilled, MoreOutlined, TwitterSquareFilled, CameraOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';

//  mui icons
import BackupIcon from '@mui/icons-material/Backup';
import { useUpdateAvatarMutation } from 'api/service/profile.service';
import { LoadingButton } from '@mui/lab';

const avatarImage = import.meta.glob('./assets/images/users');

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = ({ focusInput }) => {
  // use Auth Hook
  const { user } = useAuth();

  //  use theme form mui
  const theme = useTheme();

  // image selected for profile avatar update
  const [selectedImage, setSelectedImage] = useState(undefined);

  //use imageUpload mutation
  const [imageUpload, { isLoading }] = useUpdateAvatarMutation();

  // set Avatar in profile
  const [avatar, setAvatar] = useState(import.meta.env.VITE_APP_FILE_SERVER_URL + user?.avatar?.url || avatarImage[`./default.png`]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //  Profile update image handler
  const handleImageSubmit = () => {
    if (selectedImage) {
      const uploadData = new FormData();
      uploadData.append('avatar', selectedImage);
      imageUpload({ body: uploadData, id: user?._id, setSelectedImage });
    }
  };

  //image handle Change
  const handleImageChange = (file) => {
    setSelectedImage(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e) => handleImageChange(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              {(selectedImage || isLoading) && (
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  loadingPosition="end"
                  color="primary"
                  startIcon={<BackupIcon />}
                  onClick={handleImageSubmit}
                >
                  {(!isLoading && 'upload') || (isLoading && 'uploading..')}
                </LoadingButton>
              )}
              <Typography variant="h5">{user?.name}</Typography>
              <Typography color="secondary">{user?.role}</Typography>
            </Stack>
            {/* <Stack direction="row" spacing={3} sx={{ '& svg': { fontSize: '1.15rem', cursor: 'pointer' } }}>
              <TwitterSquareFilled style={{ color: twitterColor }} />
              <FacebookFilled style={{ color: facebookColor }} />
              <LinkedinFilled style={{ color: linkedInColor }} />
            </Stack> */}
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        {/* <Grid item xs={12} sm={6} md={12}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">86</Typography>
              <Typography color="secondary">Post</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">40</Typography>
              <Typography color="secondary">Project</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">4.5K</Typography>
              <Typography color="secondary">Members</Typography>
            </Stack>
          </Stack>
        </Grid> */}
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

ProfileTabs.propTypes = {
  focusInput: PropTypes.func
};

export default ProfileTabs;
