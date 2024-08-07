// material-ui
import { Button, FormHelperText, Grid, Stack, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import UploadAvatar from 'components/third-party/dropzone/Avatar';

// third-party
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateLogoMutation } from 'api/service/profile.service';
import useAuth from 'hooks/useAuth';
import LoadingButton from 'components/@extended/LoadingButton';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const MediaUpload = () => {
  const validationSchema = yup.object().shape({
    logoFile: yup.mixed().required('Logo is required.')
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });
  const { user } = useAuth();
  const [updateLogo, { isLoading: isLogoUploadLoading }] = useUpdateLogoMutation();

  const onSubmit = async (data) => {
    // Handle form submission for all three forms
    // if (data.multiFiles) {
    //   const multiFileData = new FormData();
    //   multiFileData.append('MultiFiles', data.multiFiles[0]);
    // }

    // if (data.nidFile) {
    //   const nidCopyData = new FormData();
    //   nidCopyData.append('nidFile', data.nidFile[0]);
    // }

    if (data.logoFile) {
      const formData = new FormData();
      formData.append('logo', data.logoFile[0]);
      updateLogo({ id: user._id, body: formData });
    }
  };

  return (
    <Grid container spacing={3}>
      {/* logo file upload  */}
      <Grid item xs={12} md={6} lg={4}>
        <MainCard title="Upload/Change Logo">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1.5} alignItems="center">
                  <Controller
                    name="logoFile"
                    control={control}
                    render={({ field }) => {
                      return (
                        <UploadAvatar
                          setFieldValue={setValue}
                          previewImg={user?.logo?.url ? import.meta.env.VITE_APP_FILE_SERVER_URL + user?.logo?.url : ''}
                          file={field.value}
                          error={!!errors.logoFile}
                        />
                      );
                    }}
                  />
                  {errors.logoFile && (
                    <FormHelperText error id="logoFile-helper-text">
                      {errors.logoFile.message}
                    </FormHelperText>
                  )}
                  <Stack spacing={0}>
                    <Typography align="center" variant="caption" color="secondary">
                      {/* Allowed 'image/*' */}
                    </Typography>
                    <Typography align="center" variant="caption" color="secondary">
                      *.png, *.jpeg, *.jpg, *.pdf
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Button size="small" color="error" onClick={() => setValue('logoFile', null)}>
                    reset
                  </Button>
                  <LoadingButton loading={isLogoUploadLoading} size="small" type="submit" variant="contained">
                    Submit
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default MediaUpload;
