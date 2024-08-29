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

import { useRef } from "react";
import VerServicio from "./verservicio";
import Registar from "./registrar";
  
  const Notificaciones = ({
    render,
    renderizar,
    setRenderizar
  }) => {
    const [openModal, setOpenModal] = useState(false);
    const [item, setItem] = useState({});
    const [itemView, setItemView] = useState({});

    const [fields, setFields] = useState({});
    const handlerSearcher = (e) => {
      const { name, value } = e.target;
      setFields({ ...fields, [name]: value });
    };
    const handleClean = () => {
      searchform.reset();
    };
  
    const top101Films = [
      { label: 'No Iniciado'},
      { label: 'Aprobado'},
      { label: 'En proceso'},
      { label: 'Denegado'},
  
    ];
  
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
                  Órdenes de Servicios Pendientes
                </AccordionSummary>
                <AccordionDetails>
                    <Alert variant="outlined" severity="warning"
                    action={
                        <Registar
                        render={render}
                        renderizar={renderizar}
                        setRenderizar={setRenderizar}
                        />
                      }>
                        Nombre del servicio (Tipo) — <strong>Estado del servicio</strong>
                    </Alert>
                </AccordionDetails>
              </Accordion>
            </Paper>
        </section>
    );
};
export default Notificaciones;