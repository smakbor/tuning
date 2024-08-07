import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LockOutlined, PhoneOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Payments } from '@mui/icons-material';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/profiles/user/update/personal-info':
      selectedTab = 0;
      break;
    case '/profiles/user/update/password':
      selectedTab = 1;
      break;
    case '/profiles/user/update/phone':
      selectedTab = 2;
      break;
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/profiles/user/update/personal-info')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/profiles/user/update/password')}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      {/* <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, '/profiles/user/update/phone')}>
        <ListItemIcon>
          <PhoneOutlined />
        </ListItemIcon>
        <ListItemText primary="Change Mobile Number" />
      </ListItemButton> */}
      {/* 
      <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3, '/profiles/user/update/payment-gateway')}>
        <ListItemIcon>
          <Payments />
        </ListItemIcon>
        <ListItemText primary="Payment Gateway" />
      </ListItemButton> */}
    </List>
  );
};

export default ProfileTab;
