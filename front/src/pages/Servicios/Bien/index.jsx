import "./index.css";
import "../../../fonts/poppins.ttf";
import { alpha } from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Paper,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box, FormControl, InputLabel, Select, MenuItem, Radio
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";

import { useRef } from "react";
import Notificaciones from "./notificaciones";
import VerMayor500 from "./vermayor500";
import VerMenor500 from "./vermenor500";
import { Tabla } from "./complements";

const Bien = () => {
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
    'En progreso',
    'Denegado',
    'Completado',
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
                  Buscar órden de bien
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                    {/* Filtrado de estado */}
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
                      name="bien_estado"
                      
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

                    {/* Limpiar formulario */}
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
          <Grid item xs={12} sm={12} md={6} xl={4}>
            
          </Grid>
        </Grid>

        {/* Tabla de datos de ordenes de bien */}
        <Grid item xs={12} sm={12} md={12} xl={12} sx={{ mt: 2 }}>
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <Tabla
                fields={fields}
                render={render}
                renderizar={renderizar}
                setRenderizar={setRenderizar}
              />
            </Box>
          </Box>
        </Grid>
      
        {/* <Grid container spacing={1} sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={6}>
            <VerMayor500/>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <VerMenor500
              fields={fields}
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
            />
          </Grid>
        </Grid> */}
        
        
        
      </div>
    </section>
  );
};
export default Bien;
