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
  FormControl,
  InputLabel,
  Select,
  MenuItem, Box
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";
import { get, searcher } from "../../../services/mantenimiento";
import AddForm from "./addform";
import { useRef } from "react";
import Ver from './ver'

const Productos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [itemView, setItemView] = useState({});
  const [fullProduct, setFullProduct] = useState({})

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});
  const [categoria, setCategoria] = useState([]);
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleClean = () => {
    searchform.reset();
    setFields({})
  };

  useEffect(() => {
    const URL = "api/mantenimientos/categoria_productos/";
    get(setCategoria, URL);
  }, []);

  return (
    <section>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={5}>
            <Paper
              elevation={10}
              className="paper"
              sx={{
                mt: 3,
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
                  Buscar Producto
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
                      id="textfields"
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
                      name="nombre"
                      id="textfields"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <TextField
                      fullWidth
                      label="Cantidad"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="cantidad"
                      id="textfields"
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
                      <InputLabel>Categorias</InputLabel>
                      <Select
                        label="Categorias"
                        size="small"
                        color="secondary"
                        id="textfields"
                        onChange={handlerSearcher}
                        defaultValue=""
                        name="categoria"
                        variant="filled"
                      >
                        {categoria.map((item, i) => (
                          <MenuItem key={i} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <br />
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
            <Ver itemView={itemView} setFullProduct={setFullProduct} fullProduct={fullProduct} />
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
                setFullProduct={setFullProduct}
              />
              </Box>
            </Box>
          </Grid>
        </Grid>


      </div>
    </section>
  );
};
export default Productos;