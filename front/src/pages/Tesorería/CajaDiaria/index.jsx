import "./index.css";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import Registro from "./registro";
import dayjs from "dayjs";
import InputAdornment from "@mui/material/InputAdornment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Tabla } from "./complements";

import UserRequest from "../../../components/User/Requests/UserRequest";
import { getLastCaja, patchCaja, postCaja } from "../../../services/caja";
import { formateoFecha } from "../../../services/caja";

const CajaDiaria = () => {
  //para el input de fecha
  const user = UserRequest();

  const [value, setValue] = useState(dayjs(new Date()));
  const [itemCaja, setItemCaja] = useState({
    estado_caja: false,
    registros_caja: [],
  });
  const [render, setRender] = useState(false);
  const [fields, setFields] = useState({});

  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getLastCaja(setItemCaja, "tesoreria");
  }, [render]);

  const handleOpenCloseCaja = async () => {
    if (itemCaja.estado_caja) {
      await patchCaja(itemCaja.id, {
        estado_caja: false,
        responsable_cierre: user.trabajador.id,
      });
    } else {
      await postCaja({
        estado_caja: true,
        responsable_apertura: user.trabajador.id,
      });
    }
    setRender(!render);
  };

  var fechaHoraActual = new Date();
  var fechaHoy = fechaHoraActual.toLocaleDateString();
  var horaHoy = fechaHoraActual.toLocaleTimeString();

  const formatFecha = (fechaOriginal) => {
    var partesFecha = fechaOriginal.split("-");
    var dia = partesFecha[2];
    var mes = partesFecha[1];
    var anio = partesFecha[0];
    return dia + "/" + mes + "/" + anio;
  };

  return (
    <Container>
      <div className="container">
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
          Caja Diaria
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Card elevation={10} sx={{ p: 5 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography fontFamily={"inherit"} align={"center"}>
                  {itemCaja.estado_caja ? "Caja actual" : "Caja"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Card variant="outlined" sx={{ p: 1 }}>
                    <Typography fontFamily={"inherit"} align={"center"}>
                      <strong>{itemCaja.estado_caja ? "Fecha de apertura" : "Fecha"}</strong>{" "}
                      {itemCaja.fecha_apertura
                        ? formatFecha(itemCaja.fecha_apertura)
                        : fechaHoy}
                      ,{" "}
                      {itemCaja.hora_apertura
                        ? itemCaja.hora_apertura.slice(0, 5)
                        : horaHoy}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Card variant="outlined" sx={{ p: 1 }}>
                    <Typography fontFamily={"inherit"} align={"center"}>
                      <strong>{itemCaja.estado_caja ? "Saldo actual" : "Saldo"}</strong> S/.{" "}
                      {itemCaja.monto_actual ? itemCaja.monto_actual.toFixed(2) : "0"}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Card elevation={10} sx={{ p: 5 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography fontFamily={"inherit"} align={"center"}>
                    Acciones
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Registro itemCaja={itemCaja} render={render} setRender={setRender} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Button
                    fullWidth
                    id="textfields"
                    color="secondary"
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={handleOpenCloseCaja}
                  >
                    {itemCaja.estado_caja == true
                      ? "Cerrar Caja"
                      : "Abrir Caja"}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Paper
              elevation={10}
              className="paper"
              sx={{
                py: 2,
                px: 5,
              }}
            >
              <Typography
                fontFamily={"inherit"}
                align={"center"}
                sx={{ mb: 2 }}
              >
                Buscar registro
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Fecha de apertura"
                      inputFormat="DD/MM/YYYY"
                      disabled
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    label="Hora"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="hora"
                    onChange={handlerSearcher}
                    id="textfields"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">hrs.</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    label="Monto"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="monto"
                    onChange={handlerSearcher}
                    id="textfields"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">S/.</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                  >
                    <InputLabel id="prov">Tipo</InputLabel>
                    <Select
                      label="Tipo"
                      fullWidth
                      size="small"
                      color="secondary"
                      id="textfields"
                      name="tipo"
                      onChange={handlerSearcher}
                    >
                      <MenuItem value="">
                        <em>Todos</em>
                      </MenuItem>
                      <MenuItem value="Ventas">Ventas</MenuItem>
                      <MenuItem value="Venta pequeña">Venta pequeña</MenuItem>
                      <MenuItem value="Compras">Compras</MenuItem>
                      <MenuItem value="Otros ingresos">Otros ingresos</MenuItem>
                      <MenuItem value="Otros egresos">Otros egresos</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Box sx={{ overflow: "auto" }}>
              <Box
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <Tabla itemCaja={itemCaja} fields={fields} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default CajaDiaria;
