import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

import { Paper, Grid, TextField, Button, Autocomplete } from "@mui/material";

//Componentes
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { ACTION_TYPES, ACTION_PUNTO_VENTA_TYPES } from "./reducerVenta";
import { useEffect, useRef } from "react";
import { getClientes } from "../../../services/clientes";

const Paso1 = ({
  state,
  dispatch,
  sesionIniciada,
  setSesionIniciada,
  statePuntoVenta,
  dispatchPuntoVenta,
}) => {
  const navigate = useNavigate()
  const render = useRef(true);
  const [dataClientes, setDataClientes] = useState([]);
  console.log(sesionIniciada);

  const handleChange = (e, value, ac) => {
    let action = {
      type: ac,
    };

    if (sesionIniciada) {
      console.log("sesion Iniciada");
      switch (ac) {
        case ACTION_PUNTO_VENTA_TYPES.SET_FECHA:
          var event = new Date(e.$d);
          let date = JSON.stringify(event);
          date = date.slice(1, -1);
          action.payload = date;
          dispatchPuntoVenta(action);
          break;

        case ACTION_PUNTO_VENTA_TYPES.SET_CLIENTE:
          if (value.id) {
            action.payload = value;
            dispatchPuntoVenta(action);
          }
          break;
        default:
          console.log("Acción no definida");
      }
    } else {
      console.log("sesion no Iniciada");
      switch (ac) {
        case ACTION_TYPES.SET_FECHA:
          var event = new Date(e.$d);
          let date = JSON.stringify(event);
          date = date.slice(1, -1);
          action.payload = date;
          dispatch(action);
          break;

        case ACTION_TYPES.SET_CLIENTE:
          if (value.id) {
            action.payload = value;
            dispatch(action);
          }
          break;
        default:
          console.log("Acción no definida");
      }
    }
    console.log(action);
  };

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getClientes(setDataClientes);
    }
    console.log(dataClientes)
  }, []);

  return (
    <section>
      <div className="container">
        <Paper sx={{ p: 5 }} elevation={20}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={8} md={9}>
                  <Autocomplete
                    disableClearable
                    options={dataClientes}
                    getOptionLabel={(option) => {
                      // console.log(option)
                      if (option.persona) return option.persona.nombre;
                      return option.empresa.nombre;
                    }}
                    onChange={(e, value) => {
                      handleChange(
                        e,
                        value,
                        !sesionIniciada
                          ? ACTION_TYPES.SET_CLIENTE
                          : ACTION_PUNTO_VENTA_TYPES.SET_CLIENTE
                      );
                    }}
                    value={
                      !sesionIniciada
                        ? state.venta.cliente
                        : statePuntoVenta.punto_venta.cliente
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        focused
                        fullWidth
                        type="text"
                        label="Nombre del cliente"
                        size="small"
                        color="secondary"
                        margin="none"
                        name="proveedor"
                        id="textfields"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ height: "100%" }}
                    onClick={()=>navigate("/clientes/")}
                  >
                    <AddIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fecha"
                  name="fecha"
                  inputFormat="DD/MM/YYYY"
                  value={
                    !sesionIniciada
                      ? state.venta.fecha
                      : statePuntoVenta.punto_venta.fecha
                  }
                  onChange={(value) => {
                    handleChange(value, null, ACTION_TYPES.SET_FECHA);
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
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                fullWidth
                label={"Código Cliente"}
                focused
                type="text"
                size="small"
                color="action"
                margin="dense"
                id="textfields"
                disable="true"
                variant="filled"
                value={
                  !sesionIniciada
                    ? state.venta.cliente.codigo
                    : statePuntoVenta.punto_venta.cliente.codigo
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                fullWidth
                label={"Identificación"}
                type="number"
                size="small"
                focused
                color="action"
                margin="dense"
                id="textfields"
                disable="true"
                variant="filled"
                value={
                  !sesionIniciada
                    ? state.venta.cliente.persona
                      ? state.venta.cliente.persona.dni
                      : state.venta.cliente.empresa.ruc
                    : statePuntoVenta.punto_venta.cliente.persona
                      ? statePuntoVenta.punto_venta.cliente.persona.dni
                      : statePuntoVenta.punto_venta.cliente.empresa.ruc
                }
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </section>
  );
};
export default Paso1;
