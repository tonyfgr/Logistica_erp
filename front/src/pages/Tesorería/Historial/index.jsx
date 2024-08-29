import { alpha } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card,
  Typography,
  Container
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Registro from "./registro";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Tabla } from "./complements";
import VerCajaDiaria from "./ver";
import { getCaja } from "../../../services/caja";

const Historial = () => {
  //para el input de fecha
  const [date, setDate] = useState(dayjs(new Date()));
  const [date2, setDate2] = useState(dayjs(new Date()));

  const [itemView, setItemView] = useState({registros_caja:[]});
  const [fields, setFields] = useState([]);

  const [cajas, setCajas] = useState([]);

  const render = useRef(true)
  const [renderizar, setRenderizar] = useState(true)

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleClean = () => {
    searchform.reset();
    setFields({})
    setDate(dayjs(new Date()))
    setDate2(dayjs(new Date()))
  };

  useEffect(() => {
    getCaja(setCajas)
  }, [])

  console.log(fields)

  return (
    <Container>
      <div className="container" >
        <Typography
              fontFamily={"inherit"}
              align={"center"}
              sx={{
                mt: 3,
                p: 3,
                backgroundColor: alpha("#633256", 0.2),
                "&:hover": {
                  backgroundColor: alpha("#633256", 0.25),
                },
              }}
            >
              Historial
            </Typography>
        <Grid container spacing={4} sx={{ marginTop: '10px'}}>
          <Grid item xs={12} sm={12} md={6} xl={6}>
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
                  Buscar Cajas Diarias
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                    <TextField
                     fullWidth
                     label="Código de caja"
                     type="text"
                     size="small"
                     color="secondary"
                     margin="dense"
                     name="codigo"
                     id="textfields"
                     onChange={handlerSearcher}
                     variant="filled"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                      label="Fecha de apertura"
                      inputFormat="DD/MM/YYYY"
                      value={date}
                      onChange={(newValue) => {
                        var event = new Date(newValue.$d);
                        let date = JSON.stringify(event);
                        date = date.slice(1, 11);
                        setDate(newValue)
                        setFields({ ...fields, fecha_apertura: date })
                      }}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                      label="Fecha de cierre"
                      inputFormat="DD/MM/YYYY"
                      value={date2}
                      onChange={(newValue) => {
                        var event = new Date(newValue.$d);
                        let date = JSON.stringify(event);
                        date = date.slice(1, 11);
                        setDate2(newValue)
                        setFields({ ...fields, fecha_cierre: date })
                      }}
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
                    <TextField
                     fullWidth
                     label="Saldo de apertura"
                     type="number"
                     size="small"
                     color="secondary"
                     margin="dense"
                     name="monto_inicial"
                     id="textfields"
                     onChange={handlerSearcher}
                     variant="filled"
                    />
                    <TextField
                     fullWidth
                     label="Saldo de cierre"
                     type="number"
                     size="small"
                     color="secondary"
                     margin="dense"
                     name="monto_final"
                     id="textfields"
                     onChange={handlerSearcher}
                     variant="filled"
                    />
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
            <VerCajaDiaria itemView={itemView} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Box sx={{ overflow: "auto" }}>
              <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Tabla
                  fields={fields}
                  render = {render}
                  renderizar={renderizar}
                  itemView = {itemView}
                  setItemView = {setItemView}
                />
            </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default Historial;
