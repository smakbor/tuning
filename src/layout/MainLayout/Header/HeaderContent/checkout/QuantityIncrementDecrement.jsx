import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const QuantityIncrementDecrement = ({ itemId, quantity, updateQuantity }) => {
  const [value, setValue] = useState(quantity);
  const theme = useTheme();

  const incrementHandler = () => {
    setValue(value - 1);
    updateQuantity({ id: itemId, quantity: value - 1 });
  };

  const decrementHandler = () => {
    setValue(value + 1);
    updateQuantity({ id: itemId, quantity: value + 1 });
  };

  return (
    <Stack direction="row">
      <Button
        key="three"
        variant="text"
        disabled={value <= 1}
        onClick={incrementHandler}
        sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important', '&:hover': { bgcolor: 'transparent' } }}
      >
        <MinusOutlined style={{ fontSize: 'inherit' }} />
      </Button>
      <Typography key="two" sx={{ p: '9px 15px', border: `1px solid ${theme.palette.grey.A800}`, borderRadius: 1 }}>
        {value}
      </Typography>
      <Button
        key="one"
        variant="text"
        onClick={decrementHandler}
        sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important', '&:hover': { bgcolor: 'transparent' } }}
      >
        <PlusOutlined style={{ fontSize: 'inherit' }} />
      </Button>
    </Stack>
  );
};

QuantityIncrementDecrement.propTypes = {
  itemId: PropTypes.number,
  quantity: PropTypes.number,
  updateQuantity: PropTypes.func
};

export default QuantityIncrementDecrement;
