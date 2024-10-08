// third-party
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project import
import useConfig from 'hooks/useConfig';

const dashImage = import.meta.glob('./assets/images/landing');

// ==============================|| LANDING - BROWSER  PAGE ||============================== //

const BrowserBlockPage = () => {
  const theme = useTheme();
  const { presetColor } = useConfig();

  return (
    <Box sx={{ position: 'relative', '& .ReactCompareSlider': { direction: theme.direction } }}>
      <ReactCompareSlider
        className="ReactCompareSlider"
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backdropFilter: undefined,
              background: 'white',
              border: 0,
              color: '#333'
            }}
          />
        }
        itemOne={<ReactCompareSliderImage src={dashImage(`./${presetColor}-dark.jpg`)} />}
        itemTwo={<ReactCompareSliderImage src={dashImage(`./${presetColor}-light.jpg`)} />}
      />
    </Box>
  );
};

export default BrowserBlockPage;
