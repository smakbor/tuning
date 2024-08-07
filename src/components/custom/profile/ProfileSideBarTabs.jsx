import { PropTypes } from 'prop-types';
import { Fragment, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileSideBarTabs = ({ array }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // search params
  const [searchParams] = useSearchParams();

  // page query
  const pageInfo = searchParams.get('page-info');

  // selected index state
  const [selectedPage, setSelectedPage] = useState(pageInfo);

  //  list item handler
  const handleListItemClick = (index, route) => {
    setSelectedPage(index);
    navigate(route);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      {array.map((item, index) => {
        return (
          <Fragment key={index}>
            <ListItemButton selected={selectedPage === item.path} onClick={() => handleListItemClick(item.path, item.url)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Fragment>
        );
      })}
    </List>
  );
};

ProfileSideBarTabs.propTypes = {
  array: PropTypes.array
};

export default ProfileSideBarTabs;
