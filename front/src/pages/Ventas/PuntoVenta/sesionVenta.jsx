import { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  IconButton,
  Button,
  Box,
  Container,
} from "@mui/material";

import FormSesion from "./formSesion";


const SesionVenta = ({
  setTipo,
  tipo,
  stateSesion,
  dispatchSesion,
  sesionIniciada,
  setSesionIniciada,
  itemCaja
}) => {
  const handleCancelClick = () => {
    setTipo(false);
  };

  return (
    <>
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
        PUNTO DE VENTA
      </Typography>

      <Box>
        <FormSesion
          setTipo={setTipo}
          tipo={tipo}
          stateSesion={stateSesion}
          dispatchSesion={dispatchSesion}
          sesionIniciada={sesionIniciada}
          setSesionIniciada={setSesionIniciada}
          itemCaja = {itemCaja}
        />
      </Box>

      <Box textAlign="center">
        <Button color="error" variant="contained" onClick={handleCancelClick}>
          {!sesionIniciada ? "Cancelar" : "Regresar"}
        </Button>
      </Box>
    </>
  );
};

export default SesionVenta;
