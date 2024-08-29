import "./index.css";
import "../../../fonts/poppins.ttf";
import { alpha } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from "@mui/icons-material/Numbers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box, Autocomplete,  FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";

import { useRef } from "react";
import VerServicio from "./verservicio";
import Notificaciones from "./notificaciones";

const Servicios = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [itemView, setItemView] = useState({});

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleClean = () => {
    searchform.reset();
    setFields({})
  };

  const stateList = [
    'Todos',
    'Solicitando cotización',
    'Aprobado',
    'En proceso',
    'Denegado',
    'Ninguno'

  ];

  const cotizacionList = [
    'Todos',
    'Menor a 500',
    'Mayor a 500',
    'Ninguno'
  ]

  return (
    <section>
      <div className="container" style={{ marginTop: '30px'}}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Notificaciones
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              elevation={10}
              className="paper"
              sx={{
                p: 0,
                backgroundColor: alpha("#8D4C32", 0.2),
                "&:hover": {
                  backgroundColor: alpha("#8D4C32", 0.25),
                },
              }}
            >
              <Accordion sx={{ p: 5 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Buscar órdenes de servicios
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                   
                    
                  <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                      variant="filled"
                    >
                      <InputLabel>Estado</InputLabel>
                      <Select
                      label="Estado"
                      size="small"
                      color="secondary"
                      id="textfields"
                      onChange={handlerSearcher}
                      name="servicio_estado"
                      
                      >
                        {stateList.map((item, i) => (
                          <MenuItem key={i} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Filtrado de cotizacion (mayor o menor a 500) */}
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                      variant="filled"
                    >
                      <InputLabel>Cotizacion</InputLabel>
                      <Select
                      label="Cotizacion"
                      size="small"
                      color="secondary"
                      id="textfields"
                      onChange={handlerSearcher}
                      name="mayor_500"
                      >
                        {cotizacionList.map((item, i) => (
                          <MenuItem key={i} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>     
                   
                    
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Button
                          fullWidth
                          id="textfields"
                          color="secondary"
                          variant="contained"
                          type="reset"
                          value="limpiar"
                          onClick={handleClean}
                        >
                          Limpiar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6} xl={4}>
            <VerServicio itemView={itemView} />
          </Grid> */}
        </Grid>
        <Box sx={{ overflow: "auto",  mt: 4 }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Tabla
              fields={fields}
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
              setOpenModal={setOpenModal}
              setItem={setItem}
              setItemView={setItemView}
            />
          </Box>
        </Box>
      </div>
    </section>
  );
};
export default Servicios;
