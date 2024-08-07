import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const DashboardCard = ({
  title,
  color,
  accessorValue,
  icon,
  extraHighlightColor = null,
  extraTextStart,
  extraTextEnd,
  extraHighlightText,
  subInfos,
  minCardHeight
}) => {
  const theme = useTheme();

  return (
    <MainCard
      contentSX={{ p: 2.25 }}
      sx={{
        boxShadow: 3,
        minHeight: minCardHeight || 180
      }}
    >
      <Stack gap={0.5}>
        <Stack
          direction="row"
          sx={{
            background: `linear-gradient(45deg, ${
              theme.palette.mode === 'light' ? theme.palette[color || 'primary'].dark : theme.palette[color || 'primary'].light
            },${theme.palette.mode === 'light' ? theme.palette[color || 'primary'].light : theme.palette[color || 'primary'].dark})`,
            padding: 1,
            borderRadius: 1
          }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" fontWeight="bold" color={'white'}>
              {title}
            </Typography>
            <Typography variant="h2" color={`white`}>
              {accessorValue}
            </Typography>
          </Box>

          <Chip
            icon={icon}
            color={color || 'primary'}
            variant="combined"
            sx={{
              '& .MuiChip-label': {
                paddingLeft: 0
              },
              boxShadow: 2,
              padding: 1,
              border: 'none',
              height: 50
            }}
          />
        </Stack>
        <Divider />

        {subInfos &&
          subInfos?.map((subInfo, index) => {
            return (
              <Stack direction="row" justifyContent="space-between" key={index}>
                <Typography variant="body1" component="div" color={subInfo.color || 'textSecondary'}>
                  {subInfo.title} :
                </Typography>
                <Typography variant="body1" component="div" color={subInfo.color || 'textSecondary'}>
                  {subInfo.value} {subInfo.unit}
                </Typography>
              </Stack>
            );
          })}
      </Stack>
      {(!!extraTextStart || !!extraTextEnd) && (
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="textSecondary">
            {extraTextStart}{' '}
            <Typography component="span" variant="caption" sx={{ color: `${extraHighlightColor || 'primary'}.main` }}>
              {extraHighlightText}
            </Typography>{' '}
            {extraTextEnd}
          </Typography>
        </Box>
      )}
    </MainCard>
  );
};

DashboardCard.propTypes = {
  accessorValue: PropTypes.node.isRequired,
  color: PropTypes.string,
  extraHighlightColor: PropTypes.string,
  extraHighlightText: PropTypes.node,
  extraTextEnd: PropTypes.node,
  extraTextStart: PropTypes.node,
  icon: PropTypes.node,
  minCardHeight: PropTypes.number,
  subInfos: PropTypes.array,
  title: PropTypes.node.isRequired
};

export default DashboardCard;
