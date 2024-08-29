import { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { get } from "../../../services/mantenimiento";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { ACTION_SESION_TYPES } from "../Venta/reducerVenta";
import "./form.css";
import Swal from "sweetalert2";
import UserRequest from "../../../components/User/Requests/UserRequest";

const FormSesion = ({
  tipo,
  setTipo,
  stateSesion,
  dispatchSesion,
  sesionIniciada,
  setSesionIniciada,
  itemCaja
}) => {
  const user = UserRequest()
  const[almacenes, setAlmacenes] = useState([])
  const handleChange = (e, value, ac) => {
    let action = {
      type: ac,
    };
    switch (ac) {
      case ACTION_SESION_TYPES.SET_FECHA:
        var event = new Date(e.$d);
        let date = JSON.stringify(event);
        date = date.slice(1, -1);
        action.payload = date;
        dispatchSesion(action);
        break;

      case ACTION_SESION_TYPES.SET_RESPONSABLE:
        action.payload = e.target.value;
        dispatchSesion(action);
        break;

      case ACTION_SESION_TYPES.SET_ALMACEN:
        console.log(e.target.value);
        action.payload = e.target.value;
        dispatchSesion(action);
        break;
      default:
        console.log("Acción no definida");
    }
  };

  const handleClick = () => {
    Swal.fire({
      title: "Quieres habrir una sesion de venta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Sesion Iniciada",
          "La sesion de compra fue iniciada correctamente",
          "success"
        );
        setSesionIniciada(true);
      }
    });
  };

  const handleClickReturn = () => {
    setTipo(true);
  };

  useEffect(() => {
    const URL_M = "api/mantenimientos/almacenes/";
    get(setAlmacenes, URL_M);
  }, []);

  return (
    <>
      <Box
        component="form"
        textAlign="center"
        sx={{
          paddingLeft: "16rem",
          paddingRight: "16rem"
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              label="Nombre Encargado"
              variant="standard"
              onChange={(e, value) => {
                handleChange(e, value, ACTION_SESION_TYPES.SET_RESPONSABLE);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl
              fullWidth
              margin="dense"
              size="small"
              color="secondary"
            >
              <InputLabel>Almacén</InputLabel>
              <Select
                className="almacenInput"
                label="Almacen"
                size="small"
                color="secondary"
                id="textfields"
                defaultValue=""
                name="almacen"
                onChange={(e, value) => {
                  handleChange(e, value, ACTION_SESION_TYPES.SET_ALMACEN);
                }}
              >
                <MenuItem value="">all</MenuItem>
                {almacenes.map((item, i) => (
                  <MenuItem key={1} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              type="number"
              label="Monto Inicial"
              variant="standard"
              disabled
              value={itemCaja.monto_actual}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">S/.</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha"
                name="fecha"
                inputFormat="DD/MM/YYYY"
                value={stateSesion.sesion_venta.fecha}
                disabled
                onChange={(value) => {
                  handleChange(value, null, ACTION_SESION_TYPES.SET_FECHA);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    variant="filled"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleClick}
              sx={{ mt: 1 }}
            >
              Iniciar Sesion
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FormSesion;
