import "./index.css";
import "../../../fonts/poppins.ttf";
import { alpha } from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete, FormControl, InputLabel, Select, MenuItem, Box
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";
import { get, searcher } from "../../../services/mantenimiento";
import AddForm from "./addform";
import { useRef } from "react";
import VerCategoria from "./verproduccion";
import VerArticulo from "./verproduccion";
import { Container } from "@mui/system";

//Componentes pra el input de fecha
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import VerProduccion from "./verproduccion";
import Estados from "./estados";
import Notificaciones from "./notificaciones";



const Produccion = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [itemView, setItemView] = useState({});

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});
  const handlerSearcher = (e, val) => {
    console.log(e.target)
    if (e.$d) {
      setValue(e);
      var fechaInicio = new Date(e.$d)
      var offsetPeru = -5; 
      var fechaPeru = new Date(fechaInicio.getTime() + offsetPeru * 60 * 60 * 1000);
      var fechaConvertida = fechaPeru.toISOString().slice(0, 10);
      fields.fechaInicio = fechaConvertida
    } else {
      const { name, value } = e.target;
      setFields({ ...fields, [name]: value });
    }
    val && setFields({...fields, ...val})
  };
  const handleClean = () => {
    searchform.reset();
    setFields({})
  };



  //para el input de fecha
  const [value, setValue] = useState(dayjs(new Date()));

  const handleChange = (newValue) => {
      setValue(newValue);
  };

  useEffect(() => {
    
  },[])
  return (
    <section>
      <div>
        <Grid container spacing={4} style={{ marginTop: '10px'}}>
        
        <Grid item xs={12} sm={12} md={12} xl={3}>
          <Notificaciones />
        </Grid>
          <Grid item xs={12} sm={12} md={5} xl={4}>
            
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
                  Buscar producción
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                    <TextField
                      fullWidth
                      label="N° de producción"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="codigo"
                      id="textfields"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                      label="Fecha de inicio"
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      onChange={handlerSearcher}
                      name="fechaInicio"
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
                    
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                      variant="filled"
                    >
                      <InputLabel>Estado de producción</InputLabel>
                      <Select
                        label="Estado de producción"
                        size="small"
                        color="secondary"
                        id="textfields"
                        onChange={handlerSearcher}
                        defaultValue=""
                        name="estProduccion"
                        variant="filled"
                      >
                        <MenuItem key={1} value={'No Iniciado'}>
                          No Iniciado
                        </MenuItem>
                        <MenuItem key={2} value={'En proceso'}>
                          En proceso
                        </MenuItem>
                        <MenuItem key={3} value={'Terminado'}>
                          Terminado
                        </MenuItem>
                        <MenuItem key={4} value={'Saliendo'}>
                          Saliendo
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Button
                          fullWidth
                          id="textfields"
                          color="secondary"
                          variant="contained"
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
          <Grid item xs={12} sm={12} md={6} xl={4}>
            <VerProduccion itemView={itemView}/>
          </Grid>
          
          <Grid item xs={12} sm={12} md={1} sx={{ mt: 0 }}>
            <AddForm
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
              openModal={openModal}
              setOpenModal={setOpenModal}
              item={item}
              setItem={setItem}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12} sx={{ mt: -5 }}>
            <Box sx={{ overflow: "auto" }}>
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
          </Grid>
        </Grid>

         <Estados/>            

      </div>
      
    </section>
  );
};
export default Produccion;
