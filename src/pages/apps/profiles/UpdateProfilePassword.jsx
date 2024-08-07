import * as yup from 'yup';
import FormComponent from 'components/custom/form/FormComponent';
import useFormHook from 'components/custom/hooks/useFormHook';
import { useUpdatePasswordMutation } from 'api/service/profile.service';
import useAuth from 'hooks/useAuth';
// ===========================|| DEFAULT PROPS ||===========================
const defaultValues = {
  password: '',
  newPassword: '',
  confirmPassword: ''
};

const UpdateProfilePassword = () => {
  // ===========================|| VALIDATION SCHEMA ||===========================
  const validationSchema = yup.object({
    password: yup.string().required('Password is required'),
    newPassword: yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .min(6, 'Password must be at least 6 characters')
  });

  // ===========================|| CUSTOM HOOKS ||===========================
  // -> USE FORM HOOK
  const { control, formState, handleSubmit, reset } = useFormHook({ validationSchema, defaultValuesProp: defaultValues });

  // ===========================|| RTK MUTATION ||===========================
  // @UPDATE PASSWORD
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  //@ AUTH USER HOOK
  const { user } = useAuth();

  // ===========================|| FORM DATA ||===========================
  const formData = [
    {
      type: 'password',
      name: 'password',
      label: 'Current Password',
      placeholder: 'Enter your current password',
      required: true,
      visibility: true,
      disabled: false
    },
    {
      type: 'password',
      name: 'newPassword',
      label: 'New Password',
      placeholder: 'Enter your new password',
      required: true,
      visibility: true,
      disabled: false
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm your new password',
      required: true,
      visibility: true,
      disabled: false
    }
  ];

  // =========================== FUNCTIONS ===========================
  const formSubmit = (data) => {
    // console.log(data);
    updatePassword({ body: data, id: user?._id });
  };

  return (
    <FormComponent
      {...{
        formTitle: 'Change Password',
        formId: 'change-password',
        formSubmit,
        defaultValuesProp: defaultValues,
        formData,
        validationSchema,
        isUpdate: false,
        isLoading,
        control,
        formState,
        reset,
        handleSubmit,
        column: {
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1
        }
      }}
    />
  );
};

export default UpdateProfilePassword;
