import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { LoadingButton } from '@mui/lab';
import { RestoreOutlined } from '@mui/icons-material';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function RestoreAlert({ open, handleClose, handleSubmission, isLoading }) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="success" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <RestoreOutlined />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to Restore this item?
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: 1 }}>
            <Box>
              <Button fullWidth disabled={isLoading} onClick={() => handleClose(false)} color="secondary" variant="outlined">
                Cancel
              </Button>
            </Box>
            <Box>
              <LoadingButton color="success" onClick={handleSubmission} loading={isLoading} variant="contained">
                Restore
              </LoadingButton>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

RestoreAlert.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmission: PropTypes.func,
  isLoading: PropTypes.bool
};
