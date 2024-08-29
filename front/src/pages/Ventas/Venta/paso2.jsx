import { alpha } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import "./index.css";

import {
  Paper,
  Grid,
  Button,
  Badge,
  ButtonGroup,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";

import {
  postKardexProducto,
  getKardexProducto
} from "../../../services/produccion";

//Componentes
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import SearcherProductos from "./searcher";
import { ACTION_TYPES, ACTION_PUNTO_VENTA_TYPES } from "./reducerVenta";
import Table from "./table";
import { searcher } from "../../../services/ventas";
import { get } from "../../../services/producto";

const Paso2 = ({
  state,
  dispatch,
  sesionIniciada,
  setSesionIniciada,
  stateSesion,
  dispatchSesion,
  statePuntoVenta,
  dispatchPuntoVenta,
}) => {
  const [count, setCount] = useState({});
  const [ultimoSaldo, setUltimoSaldo] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [kardexData, setKardexData] = useState([]);

  const obtenerUltimoSaldo = async (idProducto) => {
    try {
      const registrosKardex = await getKardexProducto(setKardexData, idProducto);
      if (registrosKardex && registrosKardex.length > 0) {
        registrosKardex.sort((a, b) => b.id - a.id);
        const ultimoKardex = registrosKardex[0];
        const saldo = parseFloat(ultimoKardex.saldo);
        console.log("Nuevo saldo calculado:", saldo);
        return saldo;
      }
    } catch (error) {
      console.log("Error al obtener el último saldo:", error);
    }
    return 0;
  };

  const handleAdd = async (item) => {
    const newCount = { ...count };
    newCount[item.id] = (newCount[item.id] || 0) + 1;
    const nuevoSaldo = await obtenerUltimoSaldo(item.id);

    if (newCount[item.id] > nuevoSaldo) {
      alert("¡La cantidad seleccionada supera el límite del último saldo!");
      return;
    }

    setCount(newCount);

    let payload = {
      nombre: `${item.producto}/${item.nombre}`,
      producto: item.id,
      unidad: 1,
      cantidad: 1,
      precio_unitario: item.precio_venta,
    };
    const action = {
      type: !sesionIniciada
        ? ACTION_TYPES.ADD_DETALLE
        : ACTION_PUNTO_VENTA_TYPES.ADD_DETALLE_PUNTO_VENTA,
      payload,
    };
    !sesionIniciada ? dispatch(action) : dispatchPuntoVenta(action);
    setUltimoSaldo((prev) => ({ ...prev, [item.id]: nuevoSaldo }));

  };

  const handleRemove = async (item) => {
    const newCount = { ...count };
    if (newCount[item.id] > 0) {
      newCount[item.id] -= 1;
    }

    setCount(newCount);

    let payload = {
      producto: item.id,
    };
    const action = {
      type: !sesionIniciada
        ? ACTION_TYPES.LOW_DETALLE
        : ACTION_PUNTO_VENTA_TYPES.LOW_DETALLE_PUNTO_VENTA,
      payload,
    };
    !sesionIniciada ? dispatch(action) : dispatchPuntoVenta(action);
  };

  // para el buscador de productos
  const render = useRef(true);
  const [fields, setFields] = useState({});
  const URL = "api/productos/variantes/";
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      get(setProductos, URL);
    }
  }, []);
  let data = searcher(fields, productos);
  console.log(data);

  return (
    <>
      {/* From searcher.jsx */}
      <SearcherProductos fields={fields} setFields={setFields} />
      <br></br>
      <section>
        <div className="container">
          <Paper sx={{ p: 5 }} elevation={20}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={7}>
                <Grid container spacing={2}>
                  {data.map((item, i) => (
                    <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                      <Card
                        sx={{
                          backgroundColor: alpha("#985024", 0.2),
                          "&:hover": {
                            backgroundColor: alpha("#985024", 0.25),
                          },
                        }}
                      >
                        <CardHeader
                          title={
                            <Typography fontFamily={"inherit"}>
                              +{item.producto + "/" + item.nombre}
                            </Typography>
                          }
                          subheader={
                            <Typography variant="body2" color="text.secondary">
                              $ {item.precio_final}
                            </Typography>
                          }
                          action={
                            <Badge
                              color="secondary"
                              badgeContent={1}
                              sx={{ right: 20, top: 10 }}
                            ></Badge>
                          }
                        />
                        <CardMedia sx={{ height: 140 }} image={item.imagen} />
                        <CardContent>
                          <CardActions>
                            <ButtonGroup fullWidth>
                              <Button
                                fullWidth
                                color="secondary"
                                aria-label="reduce"
                                onClick={() => handleRemove(item)}
                              >
                                <RemoveIcon fontSize="small" />
                              </Button>
                              <Button
                                fullWidth
                                color="secondary"
                                aria-label="increase"
                                onClick={() => handleAdd(item)}
                                disabled={count[item.id] >= (ultimoSaldo[item.id] || 0)}
                              >
                                <AddIcon fontSize="small" />
                              </Button>
                            </ButtonGroup>
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5} minWidth="400px">
                {/* From tabla.jsx */}
                <Table
                  state={state}
                  dispatch={dispatch}
                  sesionIniciada={sesionIniciada}
                  setSesionIniciada={setSesionIniciada}
                  statePuntoVenta={statePuntoVenta}
                  dispatchPuntoVenta={dispatchPuntoVenta}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </section>
    </>
  );
};

export default Paso2;
