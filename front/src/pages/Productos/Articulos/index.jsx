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
  Autocomplete,
  Box
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";
import { get, searcher } from "../../../services/mantenimiento";
import AddForm from "./addform";
import { useRef } from "react";

import VerArticulo from "./verarticulo";
import { variantesInitialValue } from "../../../services/articulos";


const Articulos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({"variantes":[{...variantesInitialValue}]});
  const [itemView, setItemView] = useState({"variantes":[]});
  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);

  //Autocomplete options
  const [proveedores, setProveedores] = useState()
  const [categorias, setCategorias] = useState()
  const [almacenes, setAlmacenes] = useState()
  const [embalajes, setEmbalajes] = useState()

  const [fields, setFields] = useState({});
  const handlerSearcher = (e, val) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
    val && setFields({...fields, ...val})
  };
  
  const handleClean = () => {
    searchform.reset();
    setFields({})
  };

  useEffect(()=>{
    const URL_M = "api/mantenimientos/almacenes/";
    const URL_E = "api/mantenimientos/embalajes/";
    get(setEmbalajes, URL_E)
    get(setAlmacenes, URL_M)
  },[])


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
                  Buscar artículos
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
                      name="codigo"
                      id="textfields"
                      onChange={handlerSearcher}
                      variant="filled"
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
                      onChange={handlerSearcher}
                      variant="filled"
                    />
                    <Autocomplete
                      disablePortal
                      options={proveedores || []}
                      getOptionLabel = {(option) => {
                        if (option.persona) return option.persona.nombre 
                        if (option.empresa) return option.empresa.nombre
                        return ''
                      }}
                      size="small"
                      id="textfields"
                      variant="filled"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Proveedor" 
                          margin="dense" 
                          color="secondary"
                          variant="filled"
                          fullWidth />}
                      onChange={(e, value) => handlerSearcher(e, {"proveedor": value})}
                    />
                    <TextField
                      fullWidth
                      label="Marca"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="marca"
                      id="textfields"
                      onChange={handlerSearcher}
                      variant="filled"
                    />
                    <Autocomplete
                      disablePortal
                      options={categorias || []}
                      getOptionLabel={(option)=>{
                        if (option) return option.nombre 
                        return ''}}
                      size="small"
                      id="textfields"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Categoría" 
                          margin="dense" 
                          color="secondary" 
                          fullWidth 
                          variant="filled"
                        />}
                      onChange={(e, value) => handlerSearcher(e, {"categoria": value})}
                    />
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
            <VerArticulo 
              itemView={itemView} 
              almacenes={almacenes}
              setAlmacenes={setAlmacenes}
              embalajes={embalajes}/>
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
              proveedores={proveedores}
              setProveedores={setProveedores}
              categorias={categorias}
              setCategorias={setCategorias}
              almacenes={almacenes}
              embalajes={embalajes}
            />
          </Grid>
        

          <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
            <Autocomplete
              disablePortal
              options={almacenes || []}
              getOptionLabel={(option)=>{
                if (option) return option.nombre 
                return ''}}
              size="small"
              id="textfields"
              name="almacen"
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  label="Almacén" 
                  margin="dense" 
                  color="secondary" 
                  fullWidth 
                />}
              onChange={(e, value) => handlerSearcher(e, {"almacen": value})}
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
      </div>
      
    </section>
  );
};
export default Articulos;