import "./index.css";
import "../../fonts/poppins.ttf";

import {
  Paper,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  Button,
  FormLabel,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { alpha } from "@mui/material/styles";

//Componentes
import { useState, useRef, useEffect, userRef } from "react";
import { Tabla } from "./complements";
import { get } from "../../services/mantenimiento";
import AddForm from "./addform";

import VerCliente from "./vercliente";
import { Box } from "@mui/system";

const Clientes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [itemView, setItemView] = useState({});
  const [putItem, setPutItem] = useState({});
  const [value, setValue] = useState("");
  const [clienteId, setClienteId] = useState("");
  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});

  //Listado de clientes y provincias
  const [provincias, setProvincias] = useState([]);

  //Buscador
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
    console.log(fields)
  };

  
  //limpiar registros
  const handleClean = () => {
    searchform.reset();
    setFields({}) 
  };

  useEffect(() => {
    const URL = "api/mantenimientos/provincias/";
    get(setProvincias, URL);
  }, []);

  return (
    <Container>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={5}>
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
                  Buscar Cliente
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                    <TextField
                      fullWidth
                      label="Código"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      name="codigo"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <TextField
                      fullWidth
                      label="RUC/DNI"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      name="dni"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <TextField
                      fullWidth
                      label="Nombre"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      name="nombre"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <TextField
                      fullWidth
                      label="Teléfono"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      name="telefono"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                      variant="filled"
                    >
                      <InputLabel>Provincia</InputLabel>
                      <Select
                        label="Provincia"
                        size="small"
                        color="secondary"
                        id="textfields"
                        onChange={handlerSearcher}
                        defaultValue=""
                        name="codprovincia"
                      >
                        <MenuItem value={null}>
                            <em>all</em>
                          </MenuItem>
                        {provincias.map((item, i) => (
                          <MenuItem key={i} value={item.id}>
                            {item.nombreprovincia}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Localidad"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      onChange={handlerSearcher}
                      name="localidad"
                      variant="filled"
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
                          value=""
                          control={<Radio color="secondary" />}
                          label="all"
                        />
                        <FormControlLabel
                          labelPlacement="start"
                          value="persona"
                          control={<Radio color="secondary" />}
                          label="persona"
                        />
                        <FormControlLabel
                          labelPlacement="start"
                          value="empresa"
                          control={<Radio color="secondary" />}
                          label="empresa"
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
            <VerCliente itemView={itemView} />
          </Grid>
          <Grid item xs={12} sm={12} md={1} sx={{ mt: 4 }}>
            <AddForm
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
              openModal={openModal}
              setOpenModal={setOpenModal}
              item={item}
              setItem={setItem}
              value={value}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ overflow: "auto" }}>
              <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Tabla
                  fields={fields}
                  render={render}
                  renderizar={renderizar}
                  setRenderizar={setRenderizar}
                  setOpenModal={setOpenModal}
                  value={value}
                  setValue={setValue}
                  setItem={setItem}
                  setItemView={setItemView}
                  setPutItem={setPutItem}
                  clienteId={clienteId}
                  setClienteId={setClienteId}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Clientes;
