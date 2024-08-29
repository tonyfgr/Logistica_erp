import { useState, Fragment, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "./index.css";

import { Grid, TextField, Divider, IconButton } from "@mui/material";

//Componentes
import Typography from "@mui/material/Typography";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import {
  ACTION_TYPES,
  getTotal,
  ACTION_PUNTO_VENTA_TYPES,
  getTotalPuntoVenta,
} from "./reducerVenta";

const Table = ({
  state,
  dispatch,
  sesionIniciada,
  setSesionIniciada,
  statePuntoVenta,
  dispatchPuntoVenta,
  click
}) => {
  const [rowIndex, setRowIndex] = useState(-1);
  const [columnIndex, setColumnIndex] = useState(-1);
  const [totalPuntoVenta, setTotalPuntoVenta] = useState(0);
  const [totalVenta, setTotalVenta] = useState(0);
  const rows = !sesionIniciada
    ? state.venta.detalle_venta
    : statePuntoVenta.punto_venta.detalle_punto_venta;
  const handleChange = (i, prop, value) => {
    rows[i][prop] = parseInt(value, 10);
  };

  const setTotal = () => {
    if (!sesionIniciada) {
      let payload = getTotal(state.venta.detalle_venta);
      var action = {
        type: ACTION_TYPES.SET_TOTAL,
        payload,
      };
      dispatch(action);
    } else {
      let payload = getTotalPuntoVenta(statePuntoVenta.punto_venta.detalle_punto_venta);
      var action = {
        type: ACTION_PUNTO_VENTA_TYPES.SET_PRECIO_TOTAL,
        payload,
      };
      dispatchPuntoVenta(action);
    }
  };

  const handleExit = () => {
    setRowIndex(-1);
    setColumnIndex(-1);
  };
  const handleDelete = (id) => {
    console.log(id);
    let payload = {
      producto: id,
    };
    var action = {
      type: !sesionIniciada
        ? ACTION_TYPES.REMOVE_DETALLE
        : ACTION_PUNTO_VENTA_TYPES.REMOVE_DETALLE_PUNTO_VENTA,
      payload,
    };
    console.log(action);
    !sesionIniciada ? dispatch(action) : dispatchPuntoVenta(action);
  };

  useEffect(() => {
    !sesionIniciada
      ? setTotalVenta(getTotal(state.venta.detalle_venta))
      : setTotalPuntoVenta(
          getTotalPuntoVenta(statePuntoVenta.punto_venta.detalle_punto_venta)
        );

    setTotal()
  },[click]);

  return (
    <List sx={{ overflow: "scroll" }}>
      <ListItem
        sx={{
          backgroundColor: "#DF9035",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs>
            <Typography sx={{ fontFamily: "inherit", color: "white" }}>
              Producto
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              align="right"
              sx={{ fontFamily: "inherit", color: "white" }}
            >
              PKG
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              align="right"
              sx={{ fontFamily: "inherit", color: "white" }}
            >
              Cantidad
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              align="right"
              sx={{ fontFamily: "inherit", color: "white" }}
            >
              Precio
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              align="right"
              sx={{ fontFamily: "inherit", color: "white" }}
            >
              Eliminar
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />

      <ClickAwayListener
        onClickAway={() => {
          handleExit();
        }}
      >
        <div>
          {rows.map((item, i) => (
            <div key={i}>
              <ListItem key={i}>
                <Grid container spacing={1}>
                  <Grid item xs>
                    {item.nombre}
                  </Grid>
                  <Grid
                    item
                    xs
                    onClick={() => {
                      setRowIndex(i);
                      setColumnIndex(1);
                    }}
                  >
                    <Typography align="right">
                      {rowIndex == i && columnIndex == 1 ? (
                        <TextField
                          type="number"
                          size="small"
                          color="secondary"
                          defaultValue={rows[i]["unidad"]}
                          onChange={(e) =>
                            handleChange(i, "unidad", e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key == "Enter") {
                              handleExit();
                            }
                          }}
                        />
                      ) : (
                        item.unidad
                      )}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    onClick={() => {
                      setRowIndex(i);
                      setColumnIndex(2);
                    }}
                  >
                    <Typography align="right">
                      {rowIndex == i && columnIndex == 2 ? (
                        <TextField
                          type="number"
                          size="small"
                          color="secondary"
                          defaultValue={rows[i]["cantidad"]}
                          onChange={(e) =>
                            handleChange(i, "cantidad", e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key == "Enter") {
                              handleExit();
                            }
                          }}
                        />
                      ) : (
                        item.cantidad
                      )}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    onClick={() => {
                      setRowIndex(i);
                      setColumnIndex(3);
                    }}
                  >
                    <Typography align="right">
                      {rowIndex == i && columnIndex == 3 ? (
                        <TextField
                          type="number"
                          size="small"
                          color="secondary"
                          defaultValue={rows[i]["precio_unitario"]}
                          onChange={(e) =>
                            handleChange(i, "precio_unitario", e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key == "Enter") {
                              handleExit();
                            }
                          }}
                        />
                      ) : (
                        "S/. " + item.precio_unitario
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs align="right">
                    <IconButton onClick={() => handleDelete(item.producto)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </div>
          ))}
        </div>
      </ClickAwayListener>
      <ListItem>
        <Grid container spacing={1}>
          <Grid item xs></Grid>
          <Grid item xs>
            <Typography align="center" sx={{ fontFamily: "inherit" }}>
              Subtotal
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="right" sx={{ fontFamily: "inherit" }}>
              S/.{" "}
              {!sesionIniciada
                ? getTotal(state.venta.detalle_venta).toFixed(2)
                : getTotalPuntoVenta(
                    statePuntoVenta.punto_venta.detalle_punto_venta
                  ).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
      <ListItem>
        <Grid container spacing={1}>
          <Grid item xs></Grid>
          <Grid item xs>
            <Typography align="center" sx={{ fontFamily: "inherit" }}>
              Impuestos
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="right" sx={{ fontFamily: "inherit" }}>
              18%
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
      <ListItem>
        <Grid container spacing={1}>
          <Grid item xs></Grid>
          <Grid item xs>
            <Typography align="center" sx={{ fontFamily: "inherit" }}>
              Total
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="right" sx={{ fontFamily: "inherit" }}>
              S/. {!sesionIniciada ? totalVenta.toFixed(2) : totalPuntoVenta.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export default Table;
