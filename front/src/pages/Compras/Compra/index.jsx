import { alpha } from "@mui/material/styles";
import { useState, Fragment, useReducer, useEffect } from "react";
import "./index.css";

import { Paper, Grid, Button, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
//Componentes

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import Paso1 from "./paso1";
import Paso2 from "./paso2";

const steps = ["Registro", "Agregar Artículo"];

//Registration's Fuctionality
import { INITIAL_STATE, comprasReducer, ACTION_TYPES } from "./reducerCompra";
import { RegistroCompra, BuildCompraPayload } from "../../../services/compras";
import Swal from "sweetalert2";
import Notificaciones from "./notificaciones";
import { getLastCaja } from "../../../services/caja";
import UserRequest from "../../../components/User/Requests/UserRequest";

const Compra = () => {
  const user = UserRequest()
  const navigate = useNavigate();

  //Registration's Fuctionality
  const [state, dispatch] = useReducer(comprasReducer, INITIAL_STATE);

  //Steps's Functionality
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [itemCaja, setItemCaja] = useState({ estado_caja: false });

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
      setSkipped(newSkipped);
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
    dispatch({ type: ACTION_TYPES.RESET_COMPRA });
    setActiveStep(0);
  };

  const handleRegister = async () => {

    if (Reflect.has(state.compra.proveedor, "id") && state.compra.detalle_compra.length) {
      var egresos_compra = {
        "responsable": user.trabajador.id,
        "caja": itemCaja.id,
        "tipo": "Compras"
      }
      console.log(state.compra)
      var payload = BuildCompraPayload(state.compra);
      payload.egresos_compra = egresos_compra
      await RegistroCompra(payload);
      handleNext();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Proveedor o articulos NO válidos",
      });
    }
  };

  useEffect(() => {
    getLastCaja(setItemCaja, "compras")
  }, [])

  return (
    <section>
      <div className="container">
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>

              
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
                  Nueva Compra
                </Typography>
                <Grid item xs={12} sm={12} md={12}>
                    <Notificaciones state={state} dispatch={dispatch}/>
                </Grid>
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
                <Paper sx={{ p: 5 }} elevation={20}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Alert severity="success" sx={{ p: 3 }}>
                        <AlertTitle>
                          Se logró registrar la orden de compra
                        </AlertTitle>
                      </Alert>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        id="textfields"
                        color="secondary"
                        fullWidth
                        onClick={handleReset}
                      >
                        Nueva Compra
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        id="textfields"
                        color="secondary"
                        fullWidth
                        onClick={()=>navigate("/compras/facturas")}
                      >
                        Ver facturas
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Fragment>
            ) : activeStep + 1 === 1 ? (
              <Fragment>
                <Paso1 state={state} dispatch={dispatch} />
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
                    {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Paso2 state={state} dispatch={dispatch} />
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
                    <Button
                      onClick={handleRegister}
                      id="textfields"
                      variant="contained"
                      color="secondary"
                    >
                      Terminar
                    </Button>
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
      </div>
    </section>
  );
};
export default Compra;
