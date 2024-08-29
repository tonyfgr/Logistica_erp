import { useState, useRef, useEffect } from "react";
import "./index.css";

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
  Box,
  Container,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { alpha } from "@mui/material/styles";

//Componentes
import { get } from "../../services/mantenimiento";
import { Tabla } from "./complements";
import AddForm from "./addform";
import VerProveedor from "./verproveedor";

const Proveedores = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [putItem, setPutItem] = useState({});
  const [value, setValue] = useState("");
  const [itemView, setItemView] = useState({});

  //Listado de proveedores y provincias
  const [provincias, setProvincias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});

  //Buscador
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
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
              className="paper-container"
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
                  Buscar Proveedor
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
                      onChange={handlerSearcher}
                      name="codigo"
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      label="RUC"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      onChange={handlerSearcher}
                      name="ruc"
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      label="Nombre"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      onChange={handlerSearcher}
                      name="nombre"
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      label="Teléfono"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      onChange={handlerSearcher}
                      name="telefono"
                      variant="filled"
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
                    <br />
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
            <VerProveedor itemView={itemView} />
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
        </Grid>
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
            />
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default Proveedores;
