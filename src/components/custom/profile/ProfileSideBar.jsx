import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormLabel, Grid, TextField, Stack, Typography, Chip } from '@mui/material';

// project import

import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

import { ThemeMode } from 'config';

// assets
import { CameraOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';

//  mui icons
import BackupIcon from '@mui/icons-material/Backup';
import { useUpdateAvatarMutation } from 'api/service/profile.service';
import { LoadingButton } from '@mui/lab';
import ProfileSideBarTabs from 'components/custom/profile/ProfileSideBarTabs';

const avatarImage = import.meta.glob('/assets/images/users');

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileSideBar = ({ tabInfo, profileInfo }) => {
  // use Auth Hook
  const { user } = useAuth();

  //  use theme form mui
  const theme = useTheme();

  // image selected for profile avatar update
  const [selectedImage, setSelectedImage] = useState(undefined);

  //use imageUpload mutation
  const [imageUpload, { isLoading }] = useUpdateAvatarMutation();

  // set Avatar in profile
  const [avatar, setAvatar] = useState(
    user?.avatar?.url ? import.meta.env.VITE_APP_FILE_SERVER_URL + user?.avatar?.url : avatarImage[`./default.png`]
  );

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

  return (
    <Box component="div" sx={{ position: 'sticky', top: '5rem' }}>
      <MainCard>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              {profileInfo?.role && <Chip label={profileInfo?.role} size="small" color="primary" />}
            </Stack>
            <Stack spacing={2.5} alignItems="center">
              <FormLabel
                htmlFor="change-avatar"
                sx={{
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  '&:hover .MuiBox-root': { opacity: 1 },
                  cursor: 'pointer'
                }}
              >
                <Avatar
                  alt={profileInfo?.name}
                  src={
                    profileInfo?.avatar ? import.meta.env.VITE_APP_FILE_SERVER_URL + profileInfo?.avatar?.url : avatarImage[`./default.png`]
                  }
                  sx={{ width: 124, height: 124, border: '1px dashed' }}
                />
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
                <Typography variant="h5">{profileInfo?.name}</Typography>
                <Typography color="secondary">{profileInfo?.role}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />

          <Grid item xs={12}>
            <ProfileSideBarTabs array={tabInfo} />
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
};

ProfileSideBar.propTypes = {
  focusInput: PropTypes.func,
  tabInfo: PropTypes.array.isRequired,
  profileInfo: PropTypes.object.isRequired
};

export default ProfileSideBar;
