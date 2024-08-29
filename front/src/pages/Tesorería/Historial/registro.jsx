import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogTitle,
  Tab, Box,
  Autocomplete, Modal, FormControl, InputLabel, Select, MenuItem, Card
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

//para la tabla
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Registro = ({ openModal, setOpenModal}) => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleClean = () => {
    searchform.reset();
  };
  

   //para el input de fecha
   const [value, setValue] = useState(dayjs(new Date()));

   const handleChange = (newValue) => {
       setValue(newValue);
   };

  return (
    <>
        <Button 
        color="secondary"
        variant="contained"
        onClick={handleOpen} fullWidth
        sx={{ m:1}}><span>Registro</span></Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
                
            <Box maxWidth={'md'} sx={{ position: 'absolute', top: '50%', left: '50%', backgroundColor:'white' , transform: 'translate(-50%, -50%)', p:3}}>
            <h2 id="parent-modal-title">Caja Diaria</h2>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                  label="Fecha"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  readOnly
                  onChange={handleChange}
                  renderInput={(params) => <TextField 
                    {...params} 
                    fullWidth
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    variant="filled"
                    />}
                  />
                </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <TextField
                      fullWidth
                      label="Saldo Inicial"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                      variant="filled"
                      inputProps={{
                        step: "0.1"
                      }}
                      defaultValue="0.0"
                      onChange={handlerSearcher}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={12} md={12} >
                    <Card variant="outlined">
                      <Grid container spacing={2} direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item>
                          <FormControl margin="dense" fullWidth>
                            <FormLabel fullWidth
                              id="demo-row-radio-buttons-group-label"
                              color="secondary"
                            >
                            </FormLabel>
                            <RadioGroup fullWidth
                              row
                              name="radio"
                              onChange={handlerSearcher}
                            >
                              <FormControlLabel fullWidth                       
                                labelPlacement="start"
                                value="ingreso"
                                control={<Radio color="secondary" fullWidth/>}
                                label={<span>Ingreso</span>}
                              />
                              <FormControlLabel fullWidth
                                labelPlacement="start"
                                value="salida"
                                control={<Radio color="secondary" fullWidth/>}
                                label={<span>Salida</span>}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                

                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                    >
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        label="Tipo"
                        size="small"
                        color="secondary"
                        id="textfields"
                        onChange={handlerSearcher}
                        defaultValue=""
                        name="codprovincia"
                      >
                        <MenuItem key={1} value={1}>
                          Factura
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                          Boleta
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                          Sin documento
                        </MenuItem>
                        
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      label="Código"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                      onChange={handlerSearcher}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                      <Card variant="outlined" sx={{px:3}}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <FormControl margin="dense">
                                <FormLabel
                                  id="demo-row-radio-buttons-group-label"
                                  color="secondary"
                                >
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="radio"
                                  onChange={handlerSearcher}
                                >
                                  <FormControlLabel                        
                                    labelPlacement="start"
                                    value="soles"
                                    control={<Radio color="secondary" />}
                                    label={<span>Soles</span>}
                                  />
                                  <FormControlLabel
                                    labelPlacement="start"
                                    value="dolares"
                                    control={<Radio color="secondary" />}
                                    label={<span>Dólares</span>}
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                  fullWidth
                                  label="Tipo de cambio"
                                  type="number"
                                  size="small"
                                  color="secondary"
                                  margin="dense"
                                  name="nombre"
                                  id="textfields"
                                  inputProps={{
                                    step: "0.1"
                                  }}
                                  defaultValue="0.0"
                                />
                            </Grid>
                        </Grid>
                      </Card>
                  </Grid>
                  
                  
                 
                  <Grid item xs={12} sm={12} md={6}>
                  <TextField
                      fullWidth
                      label="Observaciones"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <TextField
                      fullWidth
                      label="Monto"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                      inputProps={{
                        step: "0.1"
                      }}
                      defaultValue="0.0"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                    <Button
                      fullWidth
                      id="btnClick"
                      size="medium"
                      color="secondary"
                      className="navbar-btn-single"
                      variant="contained"
                      type="submit">
                      <span>Registrar</span>
                    </Button>
                    </Grid>
                  <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                    <Button
                      fullWidth
                      id="btnClick"
                      size="medium"
                      color="error"
                      className="navbar-btn-single"
                      variant="contained"
                      onClick={handleClose}
                    >
                      <span>Cancelar</span>
                    </Button>
                  </Grid>
                </Grid>
            </Box>
        </Modal>
    </>
  );
};

export default Registro;