import { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Box,
  Autocomplete,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
//componentes
import { get, searcher, post_put, del } from "../../../services/mantenimiento";

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
import { Formik } from "formik";
import { getProduccionDet, postProduccionDetalle } from "../../../services/produccion";

const AddFormDetalles = ({ nuevoDetalle, detalle, completo }) => {
  const [open, setOpen] = useState(false);
  const [aggOption, setAggOption] = useState();
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

  console.log(completo) 

  const estadosProduccion = [
    { id: 1, nombre: "No Iniciado" },
    { id: 2, nombre: "En proceso" },
    { id: 3, nombre: "Terminado" },
    { id: 4, nombre: "Saliendo" },
  ];

  const handlePost = async(val) => {
    console.log(val)
    val.produccion_id = completo.id
    console.log(val)
    try {
      await postProduccionDetalle(val);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró la nueva produccion",
      });
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  }

  const initialValues = {
    cod_producto_id:0,
    estdo_produccion_prod:'',
    produccion_id:0
  }

  useEffect(() => {
    getProduccionDet(setAggOption, completo.id)
  }, []);
  console.log(aggOption)

  return (
    <>
      <Button color="secondary" variant="contained" onClick={handleOpen}>
        <span>Añadir</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          maxWidth={"md"}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "white",
            transform: "translate(-50%, -50%)",
            p: 5,
          }}
        >
          <h2 id="parent-modal-title">Nuevo producto de producción</h2>
          <Formik initialValues={initialValues} onSubmit={handlePost}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl
                        fullWidth
                        margin="dense"
                        size="small"
                        color="secondary"
                      >
                        <InputLabel>Estado</InputLabel>
                        <Select
                          label="Embalaje"
                          size="small"
                          color="secondary"
                          id="textfields"
                          name={"estdo_produccion_prod"}
                          onChange={handleChange}
                          // value={values.embalaje}
                        >
                          {estadosProduccion.map((item, i) => (
                            <MenuItem key={i} value={item.nombre}>
                              {item.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl
                        fullWidth
                        margin="dense"
                        size="small"
                        color="secondary"
                      >
                        <InputLabel>Producto</InputLabel>
                        <Select
                          label="Productos"
                          size="small"
                          color="secondary"
                          id="textfields"
                          name={'cod_producto_id'}
                          onChange={handleChange}
                          // value={`values.embalaje`}
                        >
                          {aggOption.proceso.detalles.filter(det => det.estdo_produccion_prod === "No Iniciado").map((item, i) => (
                            <MenuItem key={i} value={item.cod_producto_id.id}>
                              {item.cod_producto_id.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                      <Button
                        fullWidth
                        id="btnClick"
                        size="medium"
                        color="secondary"
                        className="navbar-btn-single"
                        variant="contained"
                        type="submit"
                      >
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
                </form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default AddFormDetalles;
