import "./index.css";
import "../../../fonts/poppins.ttf";
import { alpha } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  Accordion,
  FormControlLabel,
  FormLabel,
  AccordionSummary,
  RadioGroup,
  AccordionDetails,
  Box,
  Autocomplete,
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";

import AddForm from "./addform";
import { useRef } from "react";
import VerRequerimiento from "./verrequerimiento";

const Requerimientos = () => {
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
  };
  const top100Films = [
    { label: 'Logistica'},
    { label: 'Marketing'},
    { label: 'Aministración'},
    { label: 'Mantenimiento'},
  ];

  const top101Films = [
    { label: 'No Iniciado'},
    { label: 'Aprobado'},
    { label: 'En proceso'},
    { label: 'Denegado'},

  ];

  return (
    <section>
      <div className="container" style={{ marginTop: '30px'}}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={5} xl={3}>
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
                  Buscar requerimientos
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                    <Autocomplete
                      fullWidth
                     
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                      onChange={handlerSearcher}
                      disablePortal
                      options={top100Films}
                      renderInput={(params) => <TextField {...params} variant="filled" label="Área" margin="dense" color="secondary" fullWidth />}
                  
                    />
                    <Autocomplete
                      fullWidth

                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                      onChange={handlerSearcher}
                      disablePortal
                      options={top101Films}
                      renderInput={(params) => <TextField {...params} variant="filled" label="Estado" margin="dense" color="secondary" fullWidth />}

                    />
                    <FormControl margin="dense">
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        color="secondary"
                      >
                        Tipo
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="radio"
                        onChange={handlerSearcher}
                      >
                        <FormControlLabel                        
                          labelPlacement="start"
                          value="bien"
                          control={<Radio color="secondary" />}
                          label="Bien"
                        />
                        <FormControlLabel
                          labelPlacement="start"
                          value="servicio"
                          control={<Radio color="secondary" />}
                          label="Servicio"
                        />
                       
                      </RadioGroup>
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
          <Grid item xs={12} sm={12} md={6} xl={4}>
            <VerRequerimiento itemView={itemView} />
          </Grid>
          <Grid item xs={12} sm={12} md={1} xl={1} sx={{ mt: 4 }}>
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
export default Requerimientos;
