import * as yup from 'yup';
import useAuth from 'hooks/useAuth';
import { useUpdateProfileMutation } from 'api/service/profile.service';
import FormComponent from 'components/custom/form/FormComponent';
import useFormHook from 'components/custom/hooks/useFormHook';
import { useState } from 'react';
import { Box } from '@mui/material';

const ProfileEdit2 = () => {
  const { user } = useAuth();

  // update Profile mutation
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // form data defaultProps
  const [defaultValuesProp] = useState({
    name: user?.name,
    // mobile: user?.mobile,
    // gender: user?.gender,
    nid: user?.nid,
    division: user?.division,
    district: user?.district,
    thana: user?.thana,
    address: user?.address,
    companyName: user?.companyName
  });

  // Validation Schema of yup
  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    // mobile: yup
    //   .string()
    //   .matches(/^01[3-9]\d{8}$/, 'Phone number is not valid')
    //   .min(11)
    //   .max(15)
    //   .required('Phone Number is Required'),
    // gender: yup.string().required('Gender is Required'),
    nid: yup.string(),
    division: yup.string().required('Division is Required'),
    district: yup.string().required('District is Required'),
    thana: yup.string().required('Thana is Required'),
    address: yup.string(),
    companyName: yup.string()
  });

  const { control, formState, handleSubmit, reset } = useFormHook({ validationSchema, defaultValuesProp });

  // Data of Form
  const formData = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'name'
    },
    // {
    //   type: 'text',
    //   name: 'mobile',
    //   label: 'Mobile',
    //   placeholder: 'Enter your mobile',
    //   required: true,
    //   value: '',
    //   size: 'large',
    //   visibility: true,
    //   disabled: false,
    //   id: 'mobile'
    // },
    // {
    //   type: 'radio',
    //   name: 'gender',
    //   label: 'Gender',
    //   direction: 'row',
    //   placeholder: 'Select your gender',
    //   required: true,
    //   value: '',
    //   size: 'large',
    //   visibility: true,
    //   disabled: false,
    //   id: 'gender',
    //   options: [
    //     { value: 'MALE', label: 'Male' },
    //     { value: 'FEMALE', label: 'Female' }
    //   ]
    // },
    {
      type: 'text',
      name: 'nid',
      label: 'Nid Number',
      placeholder: 'Enter your Nid Number',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'nid'
    },
    {
      type: 'single-select',
      name: 'division',
      label: 'Division',
      placeholder: 'Enter your Division',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'division',
      options: [
        { value: 'dhaka', label: 'Dhaka' },
        { value: 'chittagong', label: 'Chittagong' },
        { value: 'rajshahi', label: 'Rajshahi' },
        { value: 'sylhet', label: 'Sylhet' },
        { value: 'khulna', label: 'Khulna' },
        { value: 'barishal', label: 'Barishal' },
        { value: 'rangpur', label: 'Rangpur' },
        { value: 'mymensingh', label: 'Mymensingh' }
      ]
    },
    {
      type: 'single-select',
      name: 'district',
      label: 'District',
      placeholder: 'Enter your District',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'district',
      options: [
        { value: 'dhaka', label: 'Dhaka' },
        { value: 'chittagong', label: 'Chittagong' },
        { value: 'rajshahi', label: 'Rajshahi' },
        { value: 'sylhet', label: 'Sylhet' },
        { value: 'khulna', label: 'Khulna' },
        { value: 'barishal', label: 'Barishal' },
        { value: 'rangpur', label: 'Rangpur' },
        { value: 'mymensingh', label: 'Mymensingh' }
      ]
    },
    {
      type: 'single-select',
      name: 'thana',
      label: 'Thana',
      placeholder: 'Enter your Thana',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      options: [
        { value: 'dhaka', label: 'Dhaka' },
        { value: 'chittagong', label: 'Chittagong' },
        { value: 'rajshahi', label: 'Rajshahi' },
        { value: 'sylhet', label: 'Sylhet' }
      ]
    },
    {
      type: 'text',
      name: 'address',
      label: 'Address',
      placeholder: 'Enter your Address',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false
    },
    {
      type: 'text',
      name: 'companyName',
      label: 'Company Name',
      placeholder: '',
      required: true,
      visibility: true,
      value: '',
      size: 'large',
      disabled: user?.role !== 'MERCHANT',
      id: 'companyName'
    }
  ];

  // form Submit
  const formSubmit = (data) => {
    updateProfile({ body: data, id: user?._id });
  };

  return (
    <Box>
      <FormComponent
        formId="update_profile"
        formTitle="Profile"
        formSubmit={formSubmit}
        formData={formData}
        isUpdate={false}
        isLoading={isLoading}
        control={control}
        handleSubmit={handleSubmit}
        reset={reset}
        formState={formState}
        column={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2
        }}
      />
    </Box>
  );
};

export default ProfileEdit2;
