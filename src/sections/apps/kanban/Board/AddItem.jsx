import PropTypes from 'prop-types';

import { useState } from 'react';

// material-ui
import { Button, Grid, TextField, Stack, Tooltip, Box } from '@mui/material';

// third-party
import dayjs from 'dayjs';

// project imports
import { openSnackbar } from 'store/reducers/snackbar';
import SubCard from 'components/MainCard';
import { useDispatch, useSelector } from 'store';
import { addItem } from 'store/reducers/kanban';
import IconButton from 'components/@extended/IconButton';

// assets
import { CalculatorOutlined, CloseOutlined, TeamOutlined } from '@ant-design/icons';

// ==============================|| KANBAN BOARD - ADD ITEM ||============================== //

const AddItem = ({ columnId }) => {
  const dispatch = useDispatch();

  const [addTaskBox, setAddTaskBox] = useState(false);
  const { columns, items, userStory } = useSelector((state) => state.kanban);
  const handleAddTaskChange = () => {
    setAddTaskBox((prev) => !prev);
  };

  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(false);

  const handleAddTask = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      addTask();
    }
  };

  const addTask = () => {
    if (title.length > 0) {
      const newItem = {
        id: `${Date.now()}`,
        title,
        dueDate: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
        image: false,
        assign: '',
        description: '',
        priority: 'low',
        attachments: []
      };

      dispatch(addItem(columnId, columns, newItem, items, '0', userStory));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Task Added successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      handleAddTaskChange();
      setTitle('');
    } else {
      setIsTitle(true);
    }
  };

  const handleTaskTitle = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    if (newTitle.length <= 0) {
      setIsTitle(true);
    } else {
      setIsTitle(false);
    }
  };

  return (
    <Grid container alignItems="center" spacing={1} sx={{ marginTop: 1 }}>
      {addTaskBox && (
        <Grid item xs={12}>
          <SubCard content={false}>
            <Box sx={{ p: 2, pb: 1.5, transition: 'background-color 0.25s ease-out' }}>
              <Grid container alignItems="center" spacing={0.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="Add Task"
                    value={title}
                    onChange={handleTaskTitle}
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
                    onKeyUp={handleAddTask}
                    helperText={isTitle ? 'Task title is required.' : ''}
                    error={isTitle}
                  />
                </Grid>
                <Grid item>
                  <IconButton>
                    <TeamOutlined />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <CalculatorOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs zeroMinWidth />
                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title="Cancel">
                      <IconButton size="small" color="error" onClick={handleAddTaskChange}>
                        <CloseOutlined />
                      </IconButton>
                    </Tooltip>
                    <Button variant="contained" color="primary" onClick={addTask} size="small">
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </SubCard>
        </Grid>
      )}
      {!addTaskBox && (
        <Grid item xs={12}>
          <Button variant="dashed" color="secondary" fullWidth onClick={handleAddTaskChange}>
            Add Task
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
AddItem.propTypes = {
  columnId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};
export default AddItem;
