import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function DeletionAlert({ title, open, handleClose, handleSubmission, isLoading, children }) {
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
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteFilled />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to delete this item?
            </Typography>
            <Typography align="center">
              Deleting this item will remove it from its current location. The item will no longer be accessible from its current directory.
            </Typography>
          </Stack>

          <Box>{children}</Box>

          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: 1 }}>
            <Box>
              <Button fullWidth disabled={isLoading} onClick={() => handleClose(false)} color="secondary" variant="outlined">
                Cancel
              </Button>
            </Box>
            <Box>
              <LoadingButton color="error" onClick={handleSubmission} loading={isLoading} variant="contained">
                Deleted
              </LoadingButton>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

DeletionAlert.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmission: PropTypes.func,
  isLoading: PropTypes.bool
};
