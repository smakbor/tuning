import { Grid, InputLabel, Switch, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
const RenderInputWithHeader = (header, inputComponent) => {
  return inputComponent;
};
const PermissionInput = ({ formFields, control, isTrue }) => {
  const AllInput = [];
  formFields.map((item) => {
    let inputComponent = '';
    if (item.visibility) {
      inputComponent = (
        <>
          <Grid item key={item.id} xs={12} sm={12} md={6} lg={3}>
            <InputLabel>{item.label}</InputLabel>
            <Controller
              name={item?.name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Switch
                  {...field}
                  checked={isTrue ? field.value : false}
                  disabled={item.disabled}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </Grid>
        </>
      );
    }
    return AllInput.push(RenderInputWithHeader(item.header, inputComponent));
  });
  return AllInput;
};
export default PermissionInput;
