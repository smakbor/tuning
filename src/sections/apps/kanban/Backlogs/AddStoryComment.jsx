import PropTypes from 'prop-types';

import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, TextField } from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'store';
import { addStoryComment } from 'store/reducers/kanban';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { AppstoreOutlined, FileAddOutlined, VideoCameraAddOutlined } from '@ant-design/icons';

import IconButton from 'components/@extended/IconButton';

// ==============================|| KANBAN BACKLOGS - ADD STORY COMMENT ||============================== //

const AddStoryComment = ({ storyId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { comments, userStory } = useSelector((state) => state.kanban);

  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);

  const handleAddStoryComment = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      addNewStoryComment();
    }
  };

  const addNewStoryComment = () => {
    if (comment.length > 0) {
      const newComment = {
        id: `${Date.now()}`,
        comment,
        profileId: 'profile-3'
      };

      dispatch(addStoryComment(storyId, newComment, comments, userStory));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Comment Added successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      setComment('');
    } else {
      setIsComment(true);
    }
  };

  const handleStoryComment = (event) => {
    const newComment = event.target.value;
    setComment(newComment);
    if (newComment.length <= 0) {
      setIsComment(true);
    } else {
      setIsComment(false);
    }
  };

  return (
    <Box sx={{ p: 2, pb: 1.5, border: `1px solid ${theme.palette.divider}` }}>
      <Grid container alignItems="center" spacing={0.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Add Comment"
            value={comment}
            onChange={handleStoryComment}
            sx={{
              mb: 3,
              '& input': { bgcolor: 'transparent', p: 0, borderRadius: '0px' },
              '& fieldset': { display: 'none' },
              '& .MuiFormHelperText-root': {
                ml: 0
              },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'transparent',
                '&.Mui-focused': {
                  boxShadow: 'none'
                }
              }
            }}
            onKeyUp={handleAddStoryComment}
            helperText={isComment ? 'Comment is required.' : ''}
            error={isComment}
          />
        </Grid>
        <Grid item>
          <IconButton>
            <VideoCameraAddOutlined />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <FileAddOutlined />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <AppstoreOutlined />
          </IconButton>
        </Grid>
        <Grid item xs zeroMinWidth />
        <Grid item>
          <Button size="small" variant="contained" color="primary" onClick={addNewStoryComment}>
            Comment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
AddStoryComment.propTypes = {
  storyId: PropTypes.string
};
export default AddStoryComment;
