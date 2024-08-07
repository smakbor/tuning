import { SettingOutlined } from '@ant-design/icons';
import { Button, Stack, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const BulkOperation = ({ bulkOperationActionButtons }) => {
  // ====================== PACKAGE HOOKS ======================
  // -> REFS
  const menuRef = useRef();
  // -> MATERIAL-UI HOOKS
  const theme = useTheme();
  // -> LOCAL STATES
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <Stack
      ref={menuRef}
      direction="row"
      gap={2}
      alignItems="center"
      p={1}
      borderRadius={2}
      position="fixed"
      boxShadow={10}
      top={'50vh'}
      right={-5}
      sx={{
        transform: 'translateY(-50%)',
        zIndex: 800,
        background: theme.palette.background.paper,
        transition: 'right 0.5s ease-in-out',
        right: isOpenMenu ? -5 : -(menuRef.current?.offsetWidth - 5) || -200
      }}
    >
      <Box position="relative" ml={2} height={300}>
        <Box
          position="absolute"
          top={'50%'}
          sx={{
            transform: 'translateY(-50%)',
            zIndex: 999,
            background: theme.palette.background.paper,
            padding: 1,
            // CREATE BORDER RADIUS AS TRIANGLE
            clipPath: 'polygon(50% 0%, 100% 0, 100% 35%, 100% 70%, 100% 100%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)'
          }}
          left={-60}
        >
          <IconButton
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            sx={{
              animation: 'spin 3s linear infinite',
              '@keyframes spin': {
                from: { transform: 'rotate(0deg)' },
                to: { transform: 'rotate(360deg)' }
              }
            }}
            size="large"
            shape="rounded"
          >
            <SettingOutlined />
          </IconButton>
        </Box>

        <Stack justifyContent="center" gap={1} sx={{ height: 300, overflowY: 'auto' }} borderRadius={1}>
          {bulkOperationActionButtons.map(({ label, icon, handleClick }, index) => (
            <Button color="warning" variant="outlined" startIcon={icon} onClick={handleClick} key={index}>
              {label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

BulkOperation.propTypes = {
  bulkOperationActionButtons: PropTypes.array
};

export default BulkOperation;
