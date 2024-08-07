import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileUploader } from 'react-drag-drop-files';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  styled,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useGetSolutionQuery } from 'api/service/solution.service';
import { useGetCarsQuery } from 'api/service/car.service';
import { useGetControllersQuery } from 'api/service/controller.service';
import { useCheckSolutionMutation, useDownloadScriptMutation, useHandleAutomatisationMutation } from 'api/service/script.service';
import { useRequestSolutionMutation } from 'api/service/solution-request.service';
import useAuth from 'hooks/useAuth';
import { Card, Form } from 'react-bootstrap';
import UploadSingleFile from 'components/third-party/dropzone/SingleFile';
import SolutionTabs from './SolutionTabs';
import adblue from './pics/adblue.png';
import coldStart from './pics/coldstart.png';
import cylinderondemand from './pics/cylinderondemand.png';
import decat from './pics/decat.png';
import dpf from './pics/dpf.png';
import dtc from './pics/dtc.png';
import e85 from './pics/e85.png';
import egr from './pics/egr.png';
import exhaustflaps from './pics/exhaustflaps.png';
import flaps from './pics/flaps.png';
import hardcut from './pics/hardcut.png';
import hotstart from './pics/hotstart.png';
import launchcontrol from './pics/launchcontrol.png';
import opf from './pics/opf.png';
import popandbang from './pics/popandbang.png';
import sportdisplay from './pics/sportdisplay.png';
import stage1 from './pics/stage1.png';
import stage2 from './pics/stage2.png';
import startstop from './pics/startstop.png';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const solutionPng = {
  adblue,
  coldStart,
  cylinderondemand,
  decat,
  dpf,
  dtc,
  e85,
  egr,
  exhaustflaps,
  flaps,
  hardcut,
  hotstart,
  launchcontrol,
  opf,
  popandbang,
  sportdisplay,
  stage1,
  stage2,
  startstop
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function GetSolution() {
  const { dbUserId } = useAuth();

  //rtx query
  const { data: solutions = [] } = useGetSolutionQuery();
  const { data: cars = [] } = useGetCarsQuery();
  const { data: controllers = [] } = useGetControllersQuery();
  const [handleAutomatisationMutation, { isLoading: fileSubmitLoading }] = useHandleAutomatisationMutation();
  const [handleRequestSolutionMutation, { isLoading: requestSolutionLoading }] = useRequestSolutionMutation();
  const [handleDownloadScriptMutation, { isLoading: downloadScriptLoading }] = useDownloadScriptMutation();
  const [handleCheckSolution, { isLoading: checkingSolutionLoading }] = useCheckSolutionMutation();

  const [requestModal, setRequestModal] = useState(false);
  const [autoFile, setAutoFile] = useState(null);
  const [reviewAutoFile, setReviewAutoFile] = useState(null);

  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [filename, setFilename] = useState('');

  const [make, setMake] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedController, setSelectedController] = useState('');

  const [Id, setId] = useState('');
  const [confirmModelShow, setConfirmModelShow] = useState(false);
  const [comments, setComments] = useState('');
  const [kess3Info, setKess3Info] = useState(null);
  const [possible, setPossible] = useState([]);
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const [selectedSolutionsRequest, setSelectedSolutionRequest] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [binFile, setBinFile] = useState('');
  const [solutionModal, setSolutionModal] = useState(true);
  const [isSlaveFile, setIsSlaveFile] = useState(false);

  const [makeType, setMakeType] = useState('');

  function replaceSpecialCharacters(fileName) {
    // Regular expression to match any special character except underscore (_),(.) and hyphen (-)
    const regex = /[^a-zA-Z0-9. ]/g;
    const str = fileName.replace(regex, '-');
    return str.replace(/--/g, '-');
  }
  const handleChange = (file) => {
    setAutoFile(file?.[0]);
    setReviewAutoFile(file);
  };

  function bytesToKb(bytes) {
    const megabytes = bytes / 1024;
    return megabytes.toFixed(2); // Round to two decimal places
  }

  const showErrorMessage = () => {
    toast.error('Give complete details', {
      position: 'top-center'
    });
  };
  const requiredFileMessage = () => {
    toast.error('Please upload a file', {
      position: 'top-center'
    });
  };

  const showErrorMessageSolution = () => {
    toast.error('Choose Solution Type', {
      position: 'top-center'
    });
  };

  const showLimitError = () => {
    toast.error('Your Daily solution limit reached', {
      position: 'top-center'
    });
  };

  const showLowCredits = () => {
    toast.error('You have not enough credits for this solution', {
      position: 'top-center'
    });
  };

  const handleSelectedEcu = (event) => {
    setSelectedController(event.target.value);
  };

  const handleAutomatisation = async (e) => {
    e.preventDefault();

    if (!makeType || !make || !selectedController) {
      showErrorMessage();
      return;
    }
    if (!autoFile) {
      requiredFileMessage();
      return;
    }

    const { data } = await handleCheckSolution({ car: selectedCar, controller: selectedController, makeType });
    if (data.exist) {
      const formData = new FormData();
      formData.append('makeType', makeType);
      formData.append('car', selectedCar);
      formData.append('controller', selectedController);
      formData.append('file', autoFile, replaceSpecialCharacters(autoFile.name));
      formData.append('fuel', '');
      formData.append('isSlaveFile', isSlaveFile);
      formData.append('userId', dbUserId);

      try {
        const { data } = await handleAutomatisationMutation(formData);
        if (data.solutions.length === 0) {
          setRequestModal(true);
        } else {
          setPossible(data.solutions);
          setBinFile(data.binFile);
          setFilename(data.filename);
          setSolutionModal(true);

          if (isSlaveFile) {
            setKess3Info({ ...data.kess3Info, isSlaveFile });
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setRequestModal(true);
    }
  };

  const requestSubmitHandler = async (e) => {
    e.preventDefault();

    if (!selectedSolutionsRequest.length) {
      showErrorMessageSolution();
    } else {
      const form = e.target;
      const formData = new FormData();
      formData.append('makeType', makeType);
      formData.append('make', selectedCar);
      formData.append('ecu', selectedController);
      formData.append('file', autoFile, replaceSpecialCharacters(autoFile.name));
      formData.append('comments', comments);
      formData.append('solution', selectedSolutionsRequest);
      formData.append('userId', dbUserId);

      try {
        const { data } = await handleRequestSolutionMutation(formData);

        if (data.id) {
          setId(data.id);
          form.reset();
          setRequestModal(false);
          setOpenRequestModal(true);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  async function handleDownload(e) {
    e.preventDefault();

    const formData = {
      kess3Info,
      files: selectedFile,
      filename,
      binFile,
      car: selectedCar,
      controller: selectedController,
      userId: dbUserId,
      solutions: selectedSolutions
    };
    if (!selectedFile.length) {
      showErrorMessageSolution();
      return;
    }

    try {
      const { data } = await handleDownloadScriptMutation(formData);
      if (data.message === 'limit') {
        showLimitError();
      } else if (data.message === 'lowcredits') {
        showLowCredits();
      } else {
        downloadFileFromBackend(`${import.meta.env.VITE_APP_BACKEND_URL}/solutions/${data.file}`, data.file);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  function downloadFileFromBackend(filePath, downloadFileFilename) {
    try {
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = filePath;
      link.download = downloadFileFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const handleCheckboxChange = (solutionName, handleCheckboxFile) => {
    const isSolutionSelected = selectedSolutions.includes(solutionName);

    if (isSolutionSelected) {
      setSelectedSolutions((prevSelected) => prevSelected.filter((selected) => selected !== solutionName));
      setSelectedFile((prevSelected) => prevSelected.filter((selected) => selected !== handleCheckboxFile));
    } else {
      setSelectedSolutions((prevSelected) => [...prevSelected, solutionName]);
      setSelectedFile((prevSelected) => [...prevSelected, handleCheckboxFile]);
    }
  };

  const handleCheckboxChangeInModal = (solutionName) => {
    const isSolutionSelected = selectedSolutionsRequest.includes(solutionName);

    if (isSolutionSelected) {
      setSelectedSolutionRequest((prevSelected) => prevSelected.filter((selected) => selected !== solutionName));
    } else {
      setSelectedSolutionRequest((prevSelected) => [...prevSelected, solutionName]);
    }
  };

  const handleCarChange = (event) => {
    const selectedValue = event.target.value;
    const selectedText = event.target.options[event.target.selectedIndex].text;
    setMake(selectedValue);
    setSelectedCar(selectedText);
  };
  const handleMakeTypeChange = (event) => {
    setMakeType(event.target.value);
  };

  const makeTypes = [
    {
      name: 'Car',
      value: 'CAR'
    },
    {
      name: 'Bike ',
      value: 'BIKE'
    },
    {
      name: 'Truck/Agri/Construction',
      value: 'TRUCK-AGRI-CONSTRUCTION'
    }
  ];

  return (
    <>
      <Grid container sx={{ paddingLeft: '.8rem', paddingRight: '.8rem' }}>
        <Grid item md={12}>
          <Box sx={{ marginBottom: '1rem' }}>
            <Typography variant="h4">Choose Your ECU / TCU</Typography>
          </Box>
          <Form onSubmit={handleAutomatisation}>
            <MainCard sx={{ height: '33vh' }}>
              <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
                <Grid item md={4} lg={4}>
                  <Form.Group controlId="mySelect">
                    <Form.Select
                      style={{ padding: '.5rem', background: '#201c1c', color: '#fffefe' }}
                      value={makeType}
                      onChange={handleMakeTypeChange}
                    >
                      <option value="">Select Type</option>
                      {makeTypes.map((item) => {
                        console.log(item);
                        return (
                          <option value={item.value} key={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Grid>

                <Grid item md={4} lg={4}>
                  <Form.Group controlId="mySelect">
                    <Form.Select
                      style={{ padding: '.5rem', background: '#201c1c', color: '#fffefe' }}
                      className="main-text-color"
                      value={make}
                      onChange={handleCarChange}
                    >
                      <option value="">Select make</option>
                      {cars.map((item) => {
                        if (item.makeType === makeType) {
                          return (
                            <option value={item.Id} key={item.Id}>
                              {item.carname}
                            </option>
                          );
                        }
                      })}
                    </Form.Select>
                  </Form.Group>
                </Grid>

                <Grid item lg={4}>
                  <Form.Group controlId="mySelect">
                    <Form.Select
                      style={{ padding: '.5rem', background: '#201c1c', color: '#fffefe' }}
                      value={selectedController}
                      onChange={handleSelectedEcu}
                    >
                      <option value="">Select controller</option>
                      {controllers.map((item, index) => {
                        if (item.makeId === +make) {
                          return (
                            <option value={item.controllername} key={index} style={{ padding: '1rem' }}>
                              {item.controllername}
                            </option>
                          );
                        }
                      })}
                    </Form.Select>
                  </Form.Group>
                </Grid>
              </Grid>

              <Grid container columnSpacing={3}>
                <Grid item md={6}>
                  <Box>
                    {/* <FileUploader
                        handleChange={(files) => {
                          handleChange(files);
                        }}
                        name="file"
                        multiple={false}
                        style={{ color: '#000' }}
                      /> */}
                    <UploadSingleFile setFieldValue={handleChange} file={reviewAutoFile} />
                  </Box>
                </Grid>

                <Grid container item lg={6} columnSpacing={2}>
                  <Grid item md={6} lg={6}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '85px',
                        border: isSlaveFile ? '1px solid blue' : '1px solid gray',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderRadius: '5px'

                        // background: '#2094fc'
                      }}
                      onClick={() => setIsSlaveFile(!isSlaveFile)}
                    >
                      {/* <input
                      onChange={() => setIsSlaveFile(!isSlaveFile)}
                      className="form-check-input"
                      type="checkbox"
                      id="isSlaveFile"
                      checked={isSlaveFile}
                    />
                    <label className="form-check-label" htmlFor="isSlaveFile">
                      Slave
                    </label> */}
                      <FormControlLabel
                        // required
                        onChange={() => setIsSlaveFile(!isSlaveFile)}
                        checked={isSlaveFile}
                        control={<Checkbox />}
                        label="Kess 3 Slave"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '85px',
                        border: '1px solid gray',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderRadius: '5px'
                      }}
                    >
                      <FormControlLabel
                        // required
                        // onChange={() => setIsSlaveFile(!isSlaveFile)}
                        // checked={isSlaveFile}
                        control={<Checkbox />}
                        label="Autotuner Slave"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12} lg={12}>
                    {/* <Button
                      style={{
                        backgroundColor: 'white',
                        maxWidth: '350px',
                        color: 'black'
                      }}
                    >
                      {fileSubmitLoading ? <MDBSpinner /> : <span>Check for tuning and solutions</span>}
                    </Button> */}
                    <LoadingButton
                      color="primary"
                      loading={fileSubmitLoading}
                      loadingPosition="end"
                      // startIcon={<SaveIcon />}
                      variant="contained"
                      type="submit"
                      sx={{ width: '100%', padding: '.9rem', marginTop: '.9rem' }}
                    >
                      <span>CHECK SOLUTIONS </span>
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={6}>
                  {autoFile && (
                    <Box sx={{ display: 'flex', margin: '.8rem' }}>
                      <Box>
                        <UploadFileIcon />
                      </Box>
                      <Box style={{ width: '100%' }}>
                        <Typography variant="h5">{autoFile.name}</Typography>
                        <Typography variant="h5">{bytesToKb(autoFile.size)} KB</Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setAutoFile(null);
                            setReviewAutoFile(null);
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </MainCard>
          </Form>
          {solutionModal ? (
            <div className="main-content mt-64">
              <Box sx={{ marginTop: '1rem' }}>
                <Box sx={{ marginBottom: '1rem' }}>
                  <Typography variant="h4">Choose Your ECU / TCU</Typography>
                </Box>
                {/* <Box>
                  <SolutionTabs />
                </Box> */}
              </Box>
              <MainCard title="Choose Your Solution " sx={{ marginTop: '1rem' }}>
                <Grid container>
                  <Grid item md={4}>
                    <Box sx={{ background: '#186cdc', padding: '.8rem', borderRadius: '8px', textAlign: 'center' }}>Deactivations</Box>

                    {/* <Box sx={{ marginTop: '.5rem' }} onClick={() => setChecked(!check)}>
                      <Card sx={{ padding: '.1rem', boxShadow: '20rem', background: 'white', marginBottom: '.7rem' }}>
                        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <Box sx={{ marginLeft: '.5rem' }}>
                            <Checkbox id="hello" checked={check} onChange={(e) => setChecked(e.target.checked)} />
                          </Box>
                          <Box>
                            <img
                              alt="adblue"
                              height="45px"
                              width="45px"
                              src={solutionPng['adblue']}
                              style={{ borderRadius: '5px', marginLeft: '-1rem' }}
                            />
                          </Box>

                          <Box>
                            <Typography variant="h6" sx={{ color: 'black', fontWeight: '800' }}>
                              AdbBlue
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Box> */}

                    {solutions
                      .filter((item) => item.category === 'Deactivation' && possible.some((p) => p.solution === item.solutionname))
                      .map((solution, index) => {
                        const label = 'Automatic';
                        return (
                          // <FormControlLabel
                          //   key={index}
                          //   name="deactivationGroup"
                          //   value={solution.solutionname}
                          //   control={<Checkbox />}
                          //   id={solution.solutionname}
                          //   checked={selectedSolutions.includes(solution.solutionname)}
                          //   onChange={() => {
                          //     const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                          //     handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                          //   }}
                          //   label={
                          //     <span>
                          //       {solution.solutionname}
                          //       <span
                          //         style={{
                          //           color: 'white',
                          //           backgroundColor: 'green',
                          //           borderRadius: '5px',
                          //           padding: '5px',
                          //           fontSize: '12px',
                          //           marginLeft: '3px'
                          //         }}
                          //       >
                          //         {label}
                          //       </span>
                          //     </span>
                          //   }
                          // />
                          <>
                            <Box sx={{ marginTop: '.5rem' }}>
                              <Card
                                sx={{ padding: '.1rem', boxShadow: '20rem', background: 'white', marginBottom: '.7rem' }}
                                onClick={() => {
                                  const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                                  handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                                }}
                              >
                                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                  <Box sx={{ marginLeft: '.5rem' }}>
                                    <Checkbox
                                      id={solution.solutionname}
                                      name="deactivationGroup"
                                      value={solution.solutionname}
                                      checked={selectedSolutions.includes(solution.solutionname)}
                                      onChange={() => {
                                        const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                                        handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                                      }}
                                    />
                                  </Box>
                                  <Box>
                                    <img
                                      alt="adblue"
                                      height="45px"
                                      width="45px"
                                      src={solutionPng[solution.solutionname]}
                                      style={{ borderRadius: '5px', marginLeft: '-1rem' }}
                                    />
                                  </Box>

                                  <Box>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: '800' }}>
                                      {solution.solutionname}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Card>
                            </Box>
                          </>
                        );
                      })}
                  </Grid>
                  <Grid item md={4}>
                    <Box sx={{ background: '#186cdc', padding: '.8rem', borderRadius: '8px', textAlign: 'center', marginLeft: '.5rem' }}>
                      Tuning
                    </Box>

                    {solutions
                      .filter((item) => item.category === 'Tuning' && possible.some((p) => p.solution === item.solutionname))
                      .map((solution, index) => {
                        const label = 'Automatic'; // Since we are only including automatic solutions in the filter
                        return (
                          // <FormControlLabel
                          //   labelStyle={{ textAlign: 'left' }}
                          //   key={index}
                          //   style={{
                          //     textAlign: 'left',
                          //     marginLeft: '10px'
                          //   }}
                          //   name="deactivationGroup"
                          //   control={<Checkbox />}
                          //   value={solution.solutionname}
                          //   id={solution.solutionname}
                          //   checked={selectedSolutions.includes(solution.solutionname)}
                          //   onChange={() => {
                          //     const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                          //     handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                          //   }}
                          //   label={
                          //     <span>
                          //       {solution.solutionname}
                          //       <span
                          //         style={{
                          //           color: 'white',
                          //           backgroundColor: 'green',
                          //           borderRadius: '5px',
                          //           padding: '5px',
                          //           fontSize: '12px',
                          //           marginLeft: '3px'
                          //         }}
                          //       >
                          //         {label}
                          //       </span>
                          //     </span>
                          //   }
                          // />

                          <>
                            <Box sx={{ marginTop: '.5rem' }}>
                              <Card
                                sx={{ padding: '.1rem', boxShadow: '20rem', background: 'white', marginBottom: '.7rem' }}
                                onClick={() => {
                                  const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                                  handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                                }}
                              >
                                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                  <Box sx={{ marginLeft: '.5rem' }}>
                                    <Checkbox
                                      id={solution.solutionname}
                                      name="deactivationGroup"
                                      value={solution.solutionname}
                                      checked={selectedSolutions.includes(solution.solutionname)}
                                      onChange={() => {
                                        const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                                        handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                                      }}
                                    />
                                  </Box>
                                  <Box>
                                    <img
                                      alt="adblue"
                                      height="45px"
                                      width="45px"
                                      src={solutionPng[solution.solutionname]}
                                      style={{ borderRadius: '5px', marginLeft: '-1rem' }}
                                    />
                                  </Box>

                                  <Box>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: '800' }}>
                                      {solution.solutionname}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Card>
                            </Box>
                          </>
                        );
                      })}
                  </Grid>
                  <Grid item md={4}>
                    <Box sx={{ background: '#186cdc', padding: '.8rem', borderRadius: '8px', textAlign: 'center', marginLeft: '.5rem' }}>
                      Miscle
                    </Box>

                    {solutions
                      .filter((item) => item.category === 'Miscle' && possible.some((p) => p.solution === item.solutionname))
                      .map((solution, index) => {
                        const label = 'Automatic';

                        return (
                          // <FormControlLabel
                          //   key={index}
                          //   name="deactivationGroup"
                          //   control={<Checkbox />}
                          //   value={solution.solutionname}
                          //   id={solution.solutionname}
                          //   checked={selectedSolutions.includes(solution.solutionname)}
                          //   onChange={() => {
                          //     const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                          //     handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                          //   }}
                          //   label={
                          //     <span>
                          //       {solution.solutionname}{' '}
                          //       <span
                          //         style={{
                          //           color: 'white',
                          //           backgroundColor: 'green',
                          //           borderRadius: '5px',
                          //           padding: '5px',
                          //           fontSize: '12px',
                          //           marginLeft: '3px'
                          //         }}
                          //       >
                          //         {label}
                          //       </span>
                          //     </span>
                          //   }
                          // />
                          <>
                            <Box sx={{ marginTop: '.5rem' }}>
                              <Card
                                sx={{ padding: '.1rem', boxShadow: '20rem', background: 'white', marginBottom: '.7rem' }}
                                onClick={() => {
                                  const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                                  handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                                }}
                              >
                                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                  <Box sx={{ marginLeft: '.5rem' }}>
                                    <Checkbox
                                      id={solution.solutionname}
                                      name="deactivationGroup"
                                      value={solution.solutionname}
                                      checked={selectedSolutions.includes(solution.solutionname)}
                                      onChange={() => {
                                        const possibleObject = possible.find((item) => item.solution === solution.solutionname);
                                        handleCheckboxChange(solution.solutionname, possibleObject.fileName);
                                      }}
                                    />
                                  </Box>
                                  <Box>
                                    <img
                                      alt="adblue"
                                      height="45px"
                                      width="45px"
                                      src={solutionPng[solution.solutionname]}
                                      style={{ borderRadius: '5px', marginLeft: '-1rem' }}
                                    />
                                  </Box>

                                  <Box>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: '800' }}>
                                      {solution.solutionname}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Card>
                            </Box>
                          </>
                        );
                      })}
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    margin: '20px',
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  columnSpacing={2}
                >
                  <Grid item md={3}>
                    <Button
                      sx={{
                        width: '100%',
                        marginTop: '5px'
                      }}
                      variant="contained"
                      onClick={() => {
                        setConfirmModelShow(true);
                      }}
                    >
                      Download File
                    </Button>
                  </Grid>
                  <Grid item md={3}>
                    <Button
                      style={{
                        width: '100%',
                        marginTop: '5px'
                      }}
                      variant="contained"
                      onClick={() => {
                        setRequestModal(true);
                      }}
                    >
                      Request Solution
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
            </div>
          ) : (
            ''
          )}
        </Grid>
      </Grid>

      <BootstrapDialog onClose={() => setRequestModal(false)} aria-labelledby="customized-dialog-title" open={requestModal}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          OPEN NEW REQUEST
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setRequestModal(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form onSubmit={requestSubmitHandler}>
            <Grid container style={{ marginTop: '25px' }} spacing={2}>
              <Grid item md={4}>
                <p className="ml-5">Deactivations</p>
                <div className="ml-5">
                  {solutions
                    .filter((item) => item.category === 'Deactivation')
                    .map((solution, index) => (
                      <div key={index}>
                        <FormControlLabel
                          name="deactivationGroup"
                          value={solution.solutionname}
                          control={<Checkbox />}
                          id={solution.solutionname}
                          checked={selectedSolutionsRequest.includes(solution.solutionname)}
                          onChange={() => handleCheckboxChangeInModal(solution.solutionname)}
                          label={<span>{solution.solutionname}</span>}
                        />
                      </div>
                    ))}
                </div>
              </Grid>
              <Grid item md={4}>
                <p className="ml-5">Tuning</p>
                <div className="ml-5">
                  {solutions
                    .filter((item) => item.category === 'Tuning')
                    .map((solution, index) => (
                      <div key={index}>
                        <FormControlLabel
                          name="flexCheck"
                          value={solution.solutionname}
                          id={solution.solutionname}
                          control={<Checkbox />}
                          checked={selectedSolutionsRequest.includes(solution.solutionname)}
                          onChange={() => handleCheckboxChangeInModal(solution.solutionname)}
                          label={<span>{solution.solutionname}</span>}
                        />
                      </div>
                    ))}
                </div>
              </Grid>
              <Grid item md={4}>
                <p className="ml-5">Miscellaneous</p>
                <div className="ml-5">
                  {solutions
                    .filter((item) => item.category === 'Miscle')
                    .map((solution, index) => (
                      <div key={index}>
                        <FormControlLabel
                          control={<Checkbox />}
                          name="flexCheck"
                          value={solution.solutionname}
                          checked={selectedSolutionsRequest.includes(solution.solutionname)}
                          onChange={() => handleCheckboxChangeInModal(solution.solutionname)}
                          id={solution.solutionname}
                          label={<span>{solution.solutionname}</span>}
                        />
                      </div>
                    ))}
                </div>
              </Grid>
              <Grid item md={12}>
                <Form.Control
                  className="mt-3"
                  as="textarea"
                  placeholder="Your Comments"
                  rows={4}
                  id="card"
                  name="comments"
                  onChange={(event) => setComments(event.target.value)}
                />
              </Grid>
            </Grid>
            {/* <div className="center">
              <MDBBtn className="mt-3">{requestSolutionLoading ? <MDBSpinner /> : <span>Open New Request</span>}</MDBBtn>
            </div> */}
            <DialogActions>
              <Button autoFocus>Open New Request</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <BootstrapDialog onClose={() => setOpenRequestModal(false)} aria-labelledby="customized-dialog-title" open={openRequestModal}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          OPEN NEW REQUEST
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenRequestModal(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div>
            <p style={{ marginTop: '30px' }}>Your request was opened successfully.</p>
            <h3 style={{ marginTop: '15px', marginBottom: '15px' }}>The request number is #{Id}</h3>
            <p style={{ marginBottom: '40px' }}>
              Our team will process your file and get in
              <br /> touch with you as soon as possible.
            </p>
          </div>
        </DialogContent>
      </BootstrapDialog>

      <BootstrapDialog size="lg" onClose={() => setConfirmModelShow(false)} open={confirmModelShow}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="3">CONFIRMATION</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setConfirmModelShow(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className="py-1">
            <p>
              you are aware not all solutions are legal. This software is intended for testing purposes only and should not be used on
              public roads. Please note that the checksum has not been corrected.
            </p>
          </div>

          {/* <MDBBtn
            style={{
              backgroundColor: '#c9273f',
              color: 'white',
              marginRight: '10px'
            }}
            onClick={handleDownload}
          >
            {downloadScriptLoading ? <MDBSpinner /> : <span>Confirm</span>}
          </MDBBtn>
          <MDBBtn
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={() => {
              setConfirmModelShow(false);
            }}
          >
            Cancel
          </MDBBtn> */}
          <DialogActions>
            <Button autoFocus variant="contained" color="primary" onClick={handleDownload}>
              Confirm
            </Button>
            <Button
              autoFocus
              onClick={() => {
                setConfirmModelShow(false);
              }}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </BootstrapDialog>

      <BootstrapDialog aria-labelledby="customized-dialog-title" open={fileSubmitLoading || checkingSolutionLoading}>
        <div className="file-submit-modal">
          <i className="fa-solid fa-gear" />
          <br />
          <br />
          <div className="file-submit-col">
            <h3 className="file-submit__headline">Please wait. Our AI is checking your file.</h3>
          </div>
        </div>
      </BootstrapDialog>
    </>
  );
}

export default GetSolution;
