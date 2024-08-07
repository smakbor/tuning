import * as yup from 'yup';
import FormComponent from 'components/custom/form/FormComponent';
import useFormHook from 'components/custom/hooks/useFormHook';
import { useUpdateMobileNumberMutation } from 'api/service/profile.service';
import useAuth from 'hooks/useAuth';

const UpdateProfilePhone = () => {
  // ===========================|| VALIDATION SCHEMA ||===========================
  const validationSchema = yup.object({
    mobile: yup.string().required('Mobile Number is required')
  });

  // ===========================|| CUSTOM HOOKS ||===========================
  // -> USE AUTH HOOK
  const { user } = useAuth();

  // ===========================|| DEFAULT PROPS ||===========================
  const defaultValues = {
    mobile: user?.mobile
  };

  // -> USE FORM HOOK
  const { control, formState, handleSubmit, reset } = useFormHook({ validationSchema, defaultValuesProp: { ...defaultValues } });

  // ===========================|| RTK MUTATION ||===========================
  // @UPDATE PASSWORD
  const [updateMobileNumber, { isLoading }] = useUpdateMobileNumberMutation();

  // ===========================|| FORM DATA ||===========================
  const formData = [
    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile',
      placeholder: 'Enter your mobile',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'mobile'
    }
  ];

  // =========================== FUNCTIONS ===========================
  const formSubmit = (data) => {
    updateMobileNumber({ body: data, id: user?._id });
  };

  return (
    <>
      <FormComponent
        {...{
          formTitle: 'Update Phone Number',
          formId: 'update-phone',
          formSubmit,
          // defaultValuesProp: defaultValues,
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
    </>
  );
};

export default UpdateProfilePhone;
