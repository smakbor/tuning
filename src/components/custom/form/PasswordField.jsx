import PropTypes from 'prop-types';
import React from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';

const PasswordField = ({ field, item, error }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleTogglePasswordVisibility = () => {
    const input = inputRef.current;
    setShowPassword((prevShowPassword) => !prevShowPassword);

    if (input) {
      // set cursor position to end of input field
      const position = input.value.length;
      console.log(position);
      input.focus();
      input.setSelectionRange(position, position);
    }
  };

  return (
    <OutlinedInput
      {...field}
      size={item.size}
      inputRef={(e) => {
        field.ref(e);
        inputRef.current = e;
      }}
      placeholder={item.placeholder}
      value={field.value}
      onChange={(e) => (item.extraOnchange ? item.extraOnchange(e.target.value) : field.onChange(e.target.value))}
      error={Boolean(error)}
      disabled={item.disabled}
      type={showPassword ? 'text' : item.type}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleTogglePasswordVisibility}
            onMouseDown={(e) => e.preventDefault()}
            edge="end"
            color="secondary"
          >
            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </IconButton>
        </InputAdornment>
      }
      fullWidth
      {...(item.type === 'textarea' && {
        multiline: true,
        minRows: 5
      })}
      inputProps={{
        ...(item.type === 'number' && { onWheel: (e) => e.currentTarget.blur() })
      }}
    />
  );
};

PasswordField.propTypes = {
  field: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  error: PropTypes.any
};

export default PasswordField;
