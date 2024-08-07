// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = ({ user }) => (
  <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
    <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
      <Stack htmlFor="header-search" sx={{ cursor: 'pointer' }}>
        <Typography ml={{ ml: 2 }} variant="h6">
          {user?.role ? user?.role : 'User'}
        </Typography>
      </Stack>
      {/* <OutlinedInput
        size="small"
        id="header-search"
        startAdornment={
          <InputAdornment position="start" sx={{ mr: -0.5 }}>
            <SearchOutlined />
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          'aria-label': 'weight'
        }}
        placeholder="Ctrl + K"
      /> */}
    </FormControl>
  </Box>
);

export default Search;
