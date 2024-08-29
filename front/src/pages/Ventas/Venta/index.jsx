import { alpha } from "@mui/material/styles";
import { useState, Fragment, useReducer, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./index.css";

import { Grid, Button, Alert, AlertTitle } from "@mui/material";

//Componentes
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import { blue } from "@mui/material/colors";
import Paso1 from "./paso1";
import Paso2 from "./paso2";

const steps = ["Registro", "Agregar producto"];

import {
  INITIAL_STATE,
  ventasReducer,
  ACTION_TYPES,
  INITIAL_SESION_STATE,
  puntoVentasReducer,
  ACTION_SESION_TYPES,
  INITIAL_PUNTO_VENTA_STATE,
  sesionVentaReducer,
  ACTION_PUNTO_VENTA_TYPES,
} from "./reducerVenta";

import {
  RegistroVenta,
  BuildVentaPayload,
  BuildPuntoVentaPayload,
  BuildSesionVentaPayload,
  RegistroPuntoVenta,
  AxiosSesionVenta
} from "../../../services/ventas";

import SeleccionVenta from "../PuntoVenta";

import SesionVenta from "../PuntoVenta/sesionVenta";

import Swal from "sweetalert2";

import { salidaProd } from "../../../services/ventas";
import UserRequest from "../../../components/User/Requests/UserRequest";
import { getLastCaja } from "../../../services/caja";

const Venta = () => {
  const user = UserRequest()

  const [itemCaja, setItemCaja] = useState({ estado_caja: false });

  //Registration's Fuctionality
  const [state, dispatch] = useReducer(ventasReducer, INITIAL_STATE);
  const [stateSesion, dispatchSesion] = useReducer(
    sesionVentaReducer,
    INITIAL_SESION_STATE
  );
  const [statePuntoVenta, dispatchPuntoVenta] = useReducer(
    puntoVentasReducer,
    INITIAL_PUNTO_VENTA_STATE
  );

  //Steps's Functionality
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [tipo, setTipo] = useState(false);
  const [sesionIniciada, setSesionIniciada] = useState(false);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    if (itemCaja.estado_caja === true) {
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes abrir una caja antes de hacer la compra.",
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    console.log("sesion", stateSesion)
    if (!sesionIniciada) {
      dispatch({
        type: ACTION_TYPES.RESET_VENTA,
      });
    } else {
      dispatchPuntoVenta({
        type: ACTION_PUNTO_VENTA_TYPES.RESET_PUNTO_VENTA,
      });
    }
    setActiveStep(0);
  };

  const handleRegister = () => {
    if (Reflect.has(state.venta.cliente, "id") && state.venta.detalle_venta.length) {
      var ingreso_venta = {
        "responsable": user.trabajador.id,
        "caja": itemCaja.id,
        "tipo": "Ventas"
      }
      
      var payload = BuildVentaPayload(state.venta);
      payload.ingreso_venta = ingreso_venta
      RegistroVenta(payload);
      console.log(payload)
      handleNext();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cliente o productos NO válidos",
      });
    }
  };

  console.log("fuera",stateSesion)

  const handleRegisterPuntoVenta = async() => {
    let event = new Date();
    let date = JSON.stringify(event);
    date = date.slice(1, -1);
    dispatchSesion({
      type: ACTION_SESION_TYPES.SET_HORA_FIN,
      payload: date
    });
    dispatchSesion({
      type: ACTION_SESION_TYPES.ADD_PUNTO_VENTA,
      payload: BuildPuntoVentaPayload(statePuntoVenta.punto_venta)
    });
    console.log(statePuntoVenta)
    statePuntoVenta.punto_venta.detalle_punto_venta.forEach((det)=>{
      console.log(det)
      console.log(stateSesion)
      salidaProd({"cantidad":det.cantidad}, det.producto, stateSesion.sesion_venta.almacen)
    })
    handleNext();
  };

  const closeSesion = () => {
    console.log(stateSesion);
    console.log(statePuntoVenta);
    if (
      stateSesion.sesion_venta.punto_venta.length
    ) {
      console.log(stateSesion.sesion_venta)
      
      var ingreso_sesion_venta = {
        "responsable": user.trabajador.id,
        "caja": itemCaja.id,
        "tipo": "Venta pequeña"
      }

      var payload = stateSesion.sesion_venta;
      payload.ingreso_sesion_venta = ingreso_sesion_venta
      AxiosSesionVenta(payload);

      Swal.fire({
        icon: "success",
        title: "Sesion de Venta Cerrada",
        text: "La sesión de Venta se cerró correctamente",
      });
      setSesionIniciada(false)
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "No se registró ninguna venta.",
      });
    }
  };

  useEffect(() => {
    getLastCaja(setItemCaja, "ventas")
  }, [])

  return (
    <section>
      <div className="container">
        {!tipo ? (
          <Grid container spacing={4}>
            {!sesionIniciada ? (
              <>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    fontFamily={"inherit"}
                    align={"center"}
                    sx={{
                      m: 5,
                      p: 3,
                      backgroundColor: alpha("#633256", 0.2),
                      "&:hover": {
                        backgroundColor: alpha("#633256", 0.25),
                      },
                    }}
                  >
                    Nueva Venta
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <SeleccionVenta
                    tipo={tipo}
                    setTipo={setTipo}
                    sesionIniciada={sesionIniciada}
                    setSesionIniciada={setSesionIniciada}
                    itemCaja={itemCaja}
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  fontFamily={"inherit"}
                  align={"center"}
                  sx={{
                    m: 5,
                    p: 3,
                    backgroundColor: alpha("#633256", 0.2),
                    "&:hover": {
                      backgroundColor: alpha("#633256", 0.25),
                    },
                  }}
                >
                  Punto de Venta{" "}
                  <Typography
                    variant="h4"
                    style={{ textTransform: "uppercase" }}
                  >
                    {stateSesion.sesion_venta.responsable}
                  </Typography>
                </Typography>

                <Box
                  align={"center"}
                >
                  <Button
                    id="textfields"
                    variant="contained"
                    color="error"
                    onClick={closeSesion}
                  >
                    Cerrar Sesion Venta
                  </Button>
                </Box>
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12}>
              <Stepper activeStep={activeStep} sx={{ p: 5 }}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption" fontFamily={"inherit"}>
                        Opcional
                      </Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>
                        <span>{label}</span>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <Fragment>
                  <Alert
                    severity="success"
                    sx={{ p: 3, m: 5 }}
                    action={
                      <Button
                        variant="contained"
                        id="textfields"
                        onClick={handleReset}
                      >
                        Nueva Venta
                      </Button>
                    }
                  >
                    <AlertTitle>
                      Se logró registrar la orden de venta
                    </AlertTitle>
                  </Alert>
                </Fragment>
              ) : activeStep + 1 === 1 ? (
                <Fragment>
                  <Paso1
                    state={state}
                    dispatch={dispatch}
                    sesionIniciada={sesionIniciada}
                    setSesionIniciada={setSesionIniciada}
                    statePuntoVenta={statePuntoVenta}
                    dispatchPuntoVenta={dispatchPuntoVenta}
                  />
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 5 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button onClick={handleSkip} sx={{ mr: 1 }}>
                        Saltar
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      id="textfields"
                      variant="contained"
                      color="secondary"
                    >
                      {activeStep === steps.length - 1
                        ? "Terminar"
                        : "Siguiente"}
                    </Button>
                  </Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Paso2
                    state={state}
                    dispatch={dispatch}
                    sesionIniciada={sesionIniciada}
                    setSesionIniciada={setSesionIniciada}
                    statePuntoVenta={statePuntoVenta}
                    dispatchPuntoVenta={dispatchPuntoVenta}
                    stateSesion={stateSesion}
                    dispatchSesion={dispatchSesion}
                  />
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 5 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      id="textfields"
                      variant="contained"
                    >
                      Volver
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                        id="textfields"
                        variant="contained"
                      >
                        Saltar
                      </Button>
                    )}

                    {activeStep === steps.length - 1 ? (
                      <>
                        <Button
                          onClick={
                            !sesionIniciada
                              ? handleRegister
                              : handleRegisterPuntoVenta
                          }
                          id="textfields"
                          variant="contained"
                          color="secondary"
                        >
                          Terminar
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleNext}
                        id="textfields"
                        variant="contained"
                        color="secondary"
                      >
                        Siguiente
                      </Button>
                    )}
                  </Box>
                </Fragment>
              )}
            </Grid>
          </Grid>
        ) : (
          <>
            <SesionVenta
              setTipo={setTipo}
              tipo={tipo}
              stateSesion={stateSesion}
              dispatchSesion={dispatchSesion}
              sesionIniciada={sesionIniciada}
              setSesionIniciada={setSesionIniciada}
              itemCaja = {itemCaja}
            />
          </>
        )}
      </div>
    </section>
  );
};
export default Venta;
