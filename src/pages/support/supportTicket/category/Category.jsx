import {
  useCreateSupportCategoryMutation,
  useGetCategorysQuery,
  useDeleteOrRestoreSupportCategoryMutation,
  useUpdateSupportCategoryMutation
} from 'api/service/support.service';
import useDialog from 'components/custom/hooks/useDialog';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import CategoryDialog from './CategoryDialog';
import * as yup from 'yup';
import { Box } from '@mui/material';
import Table from 'components/custom/table/Table';
import dayjs from 'dayjs';
import { DeleteFilled } from '@ant-design/icons';
import ActionCell from 'components/custom/table/ActionCell';
import DeletionAlert from 'components/custom/alert/DeleteAlert';

const Category = () => {
  //===> USER FROM AUTH CONTEXT
  const { user } = useAuth();

  //===> DIALOG HANDLERS FROM DIALOG HOOK
  const {
    open,
    title,
    handleDialogOpen: handleTypeCreateDialog,
    handleDialogOpen: handleCategoryUpdateDialog,
    handleDialogClose,
    deleteOpen,
    handleDeleteDialogOpen,
    handleDeleteDialogClose
  } = useDialog();

  //========================||QUIRY HOOKS||========================//

  //===> @GET SUPPPORT TICKET CATEGORYS
  const { data: categorys, isLoading: categoryLoading } = useGetCategorysQuery(user?.merchant, {
    skip: !user
  });

  //========================||MUTATION HOOKS||========================//

  //===> @CREATE SUPPORT TICKET CATEGORY
  const [createCategory, { isLoading: categoryCreateLoading }] = useCreateSupportCategoryMutation();
  const [updateCategory, { isLoading: categoryUpdateLoading }] = useUpdateSupportCategoryMutation();

  const [deleteSupportCategory] = useDeleteOrRestoreSupportCategoryMutation();

  // const [deleteSupportCategory] = useDeleteOrRestoreSupportCategoryMutation();
  const [updateSupportCaategory] = useUpdateSupportCategoryMutation();

  //========================||DEFAULT VALUE||========================//
  const DEFAULT_VALUE = {
    name: '',
    remarks: ''
  };

  //========================||LOCAL STATES||========================//

  //---> Default Data For Dialog
  const [defaultData, setDefaultData] = useState(DEFAULT_VALUE);

  //---> Is Update
  const [isUpdate, setIsUpdate] = useState(false);

  //---> Category Data
  const [categoryData, setCategoryData] = useState({});

  const [supportCategoryIdForDelete, setSupportCategoryIdForDelete] = useState();
  //========================||FUNCTION HANDLERS||========================//

  //---> Dialog Close
  const handleCloseDialog = () => {
    setDefaultData(DEFAULT_VALUE);
    handleDialogClose();
    setIsUpdate(false);
  };

  //---> Support Ticket Category Create Dialog
  const handleAddButton = () => {
    setDefaultData(DEFAULT_VALUE);
    setIsUpdate(false);
    handleTypeCreateDialog();
  };

  //---> Ticket Category Create
  const handleCategoryCreate = ({ formValue, setError, reset }) => {
    const data = {
      ...formValue,
      merchant: user?.merchant
    };

    //---> Category create data
    createCategory({ data, handleCloseDialog, setError, reset });
  };
  
  //handle update
  const handleCategoryUpdate = ({ formValue, setError, reset }) => {
    const data = {
      ...formValue,
      merchant: user?.merchant
    };

    //---> Category update data
    updateCategory({ data, handleCloseDialog, setError, reset });
  };

  const updateSupportCategoryDialogHandler = (data) => {
    handleCategoryUpdateDialog();
    setDefaultData({
      _id: data._id,
      name: data.name,
      remarks: data.remarks
    });
    setIsUpdate(true);
  };

  // -> HANDLE DELETE Support Category DIALOG OPEN
  const handleDeleteSupportCategoryDialogOpen = (deleteData) => {
    setSupportCategoryIdForDelete(deleteData._id);
    handleDeleteDialogOpen();
  };

  // -> HANDLE DELETE SupportType SUBMIT
  const handleDeleteSupportCategorySubmit = () => {
    deleteSupportCategory({
      handleDeleteSuccess: () => {
        setSupportCategoryIdForDelete('');
        handleDeleteDialogClose();
      },
      supportCategoryId: supportCategoryIdForDelete,
      merchant: user?.merchant,
      isTrash: true
    });
  };






  //=======================||TABLE COLUMNS||========================//

  //---> MAIN TABLE
  const columns = [
    {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'name',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Remarks',
      Footer: 'Remarks',
      accessor: 'remarks',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'CreateAt',
      Footer: 'CreateAt',
      accessor: 'createdAt',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ row }) => {
        const date = row.original?.createdAt;
        return date && dayjs(date).format('lll');
      }
    },
    {
      id: 'action',
      Footer: 'Actions',
      disableSortBy: true,
      disableFilters: true,
      disableGroupBy: true,
      Aggregated: () => null,
      Header: 'Actions',
      className: 'cell-center',
      // eslint-disable-next-line react/prop-types
      Cell: ({ row }) => {
        return (
          <>
            <ActionCell
              ellipsis={user?.role === 'MERCHANT'}
              row={row}
              isExpandable={false}
              setOpen={updateSupportCategoryDialogHandler}
              permissionKey="SupportEmployeePermissions"
              menuItems={[
                {
                  title: 'Delete',
                  icon: <DeleteFilled />,
                  handleClick: handleDeleteSupportCategoryDialogOpen
                }
              ]}
            />
          </>
        );
      }
    }
  ];

  //=======================||FORM VALIDATION SCHEMA||========================//

  //---> Support Ticket Category Create
  const CreateCategoryValidationSchema = yup.object({
    name: yup.string().required('name is required field'),
    remarks: yup.string()
  });

  //=======================||FORM DATA||========================//

  //---> Support Ticket Category Create
  const CreateCategoryFormData = [
    {
      type: 'text',
      name: 'name',
      label: 'Category Name',
      placeholder: 'Name',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'pppoeProfile'
    },
    {
      type: 'textarea',
      name: 'remarks',
      label: 'Remarks',
      placeholder: 'Remarks',
      required: false,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'pppoeProfile'
    }
  ];

  return (
    <Box>
      <Table
        {...{
          title: 'Support Category',
          subheader: 'List of Support Category',
          hasAction: true,
          columns: columns,
          data: categorys,
          hasSelection: false,
          addButtonLabel: true,
          handleAddButton,
          openDialog: open,
          handleCloseDialog,
          isLoading: categoryLoading,
          hasSerial: true,
          isServerPagination: false,
          isServerFilter: false,
          isExpandable: true,
          rowHiddenName: 'categorys'
        }}
      />

      {/* TICKET CATEGORY CREATE AND UPDATE DIALOG */}
      <CategoryDialog
        {...{
          isUpdate,
          defaultData,
          handleCloseDialog,
          handleCategoryCreate,
          handleCategoryUpdate,
          isLoading: categoryCreateLoading || categoryUpdateLoading,
          formData: CreateCategoryFormData,
          validationSchema: CreateCategoryValidationSchema,
          openDialog: open,
          formTitle: isUpdate ? 'Update Category' : 'Create Category',
          formId: 'supportTicketCategory',
          formType: 'dialog'
        }}
      />
      <DeletionAlert
        title={title}
        open={deleteOpen}
        handleSubmission={handleDeleteSupportCategorySubmit}
        isLoading={false}
        handleClose={handleDeleteDialogClose}
      />
    </Box>
  );
};

export default Category;
