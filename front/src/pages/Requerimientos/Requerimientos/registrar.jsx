import { alpha } from "@mui/material/styles";

import "./index.css";
import { useState } from "react";
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
  Tabs,
  Box,
  Autocomplete,
  Card,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

//componentes
import { get, searcher, post_put, del } from "../../../services/mantenimiento";

import PropTypes from "prop-types";

import Swal from "sweetalert2";

const Registar = ({ openModal, setOpenModal }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //para autocomplete
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const top100Films = [{ label: "Logistica" }, { label: "Marketing" }];

  const top101Films = [{ label: "Artículo" }, { label: "Suministro" }];

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="warning"
        sx={{ fontFamily: "inherit", height: "100%" }}
        onClick={handleOpen}
      >
        Registrar
      </Button>
      <Dialog open={open}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Registrar Bien
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Solicitante"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="persona.nombre"
                  />
                  <TextField
                    fullWidth
                    label="Titulo"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="persona.nombre"
                  />
                  <Autocomplete
                    fullWidth
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"
                    disablePortal
                    options={top100Films}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Área solicitante"
                        margin="dense"
                        color="secondary"
                        fullWidth
                      />
                    )}
                  />
                  <Autocomplete
                    fullWidth
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"
                    disablePortal
                    required
                    options={top101Films}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipo de bien"
                        margin="dense"
                        color="secondary"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="persona.nombre"
                  />
                  <Autocomplete
                    fullWidth
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"
                    disablePortal
                    required
                    options={top100Films}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Almacén"
                        margin="dense"
                        color="secondary"
                        fullWidth
                      />
                    )}
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
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Registar;
