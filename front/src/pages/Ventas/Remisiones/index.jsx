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
  Box,
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";

import AddForm from "./addform";
import { useRef } from "react";
import VerRemision from "./verremision";

//Componentes pra el input de fecha
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Remisiones = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [itemView, setItemView] = useState({});

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});
  const handlerSearcher = (e) => {
    if (e.$d) {
      setValue(e);
      var fecha = new Date(e.$d)
      var offsetPeru = -5; 
      var fechaPeru = new Date(fecha.getTime() + offsetPeru * 60 * 60 * 1000);
      var fechaConvertida = fechaPeru.toISOString().slice(0, 10);
      fields.fecha = fechaConvertida
    } else {
      const { name, value } = e.target;
      setFields({ ...fields, [name]: value });
    }
  };

  const handleClean = () => {
    searchform.reset();
    setFields({})
  };

  //para el input de fecha
  const [value, setValue] = useState(dayjs(new Date()));

  //console.log(fields,"=================================")
    
  return (
    <section>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              elevation={10}
              className="paper"
              sx={{
                mt: 4,
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
                  Buscar Remisiones (Compras)
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                  <TextField
                      fullWidth
                      label="Codigo"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="codigo"
                      variant="filled"
                      id="textfields"
                      onChange={handlerSearcher}
                    />
                    <TextField
                      fullWidth
                      label="Código Orden de Compra"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="compra"
                      variant="filled"
                      id="textfields"
                      onChange={handlerSearcher}
                    />
                    <TextField
                      fullWidth
                      label="Nombre de proveedor"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="cliente"
                      variant="filled"
                      id="textfields"
                      onChange={handlerSearcher}
                    />
                     <TextField
                      fullWidth
                      label="N° de factura"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="numero_factura"
                      id="textfields"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Fecha"
                        inputFormat="DD/MM/YYYY"
                        value={value}
                        onChange={handlerSearcher}
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
          <Grid item xs={12} sm={12} md={6}>
            <VerRemision itemView={itemView} />
          </Grid>
        </Grid>
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
      </div>
    </section>
  );
};
export default Remisiones;