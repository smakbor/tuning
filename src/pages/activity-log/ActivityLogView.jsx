import PropTypes from 'prop-types';

// material-ui
import { TableCell, TableRow } from '@mui/material';
import Transitions from 'components/@extended/Transitions';
// import ProfileView from 'pages/apps/profiles/ViewProfile';

const ActivityLogView = ({ data }) => {
  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` }, overflow: 'hidden' }}>
      <TableCell colSpan={12} sx={{ p: 2.5, overflow: 'hidden' }}>
        <Transitions type="slide" direction="down" in={true}>
          {/* <ProfileView title="Employee Details" singleProfileInfo={data} /> */}
        </Transitions>
      </TableCell>
    </TableRow>
  );
};
// propTypes
ActivityLogView.propTypes = {
  data: PropTypes.object
};

export default ActivityLogView;
