import { alpha } from "@mui/material/styles";

import {
    Paper,
    Grid,
    TextField,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
    Alert, AlertTitle
  } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";

import { useNavigate } from 'react-router-dom';

import { useRef } from "react";
import Registar from "../../Requerimientos/Requerimientos/registrar";

import { getArticulosVariantes } from "../../../services/articulos";
  
  const Notificaciones = () => {
    const [articulos, setArticulos] = useState([])
    const [fields, setFields] = useState({});
    const [articulosFilter, setArticulosFilter] = useState([])
    

    const navigate = useNavigate()
    const requerimientos = async () => {
      navigate('/requerimientos/requerimientos')
  }

  useEffect(() => {
    getArticulosVariantes(setArticulos)
    setArticulosFilter(articulos.filter(art => art.cantidad < 50))
  }, [navigate])
  console.log(articulos)
  console.log(articulosFilter)
  

    return (
        <section>
            <Paper
              elevation={10}
              className="paper"
              sx={{
                mt: 0,
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
                  Stocks bajos
                </AccordionSummary>
                {articulosFilter !== undefined ?
                articulosFilter.map(art => (
                  <AccordionDetails>
                    <Alert variant="outlined" severity="warning"
                    action={

                      <Registar/>
                    }>
                        {art.articulo} —  {art.nombre} | <strong>Stock actual: {art.cantidad}</strong>
                    </Alert>
                </AccordionDetails>
                )):(
                  <AccordionDetails>
                    <Alert variant="outlined" severity="warning">
                         <strong>No Hay</strong> Stocks bajos
                    </Alert>
                </AccordionDetails>
                )}
                
              </Accordion>
            </Paper>
        </section>
    );
};
export default Notificaciones;