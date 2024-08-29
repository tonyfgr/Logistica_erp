import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import { Tabla } from './complements';

const drawerBleeding = 20;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  left: 'calc(50% - 15px)',
}));

const Notificaciones = ({ window, state, dispatch}) => {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <section>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={toggleDrawer(true)} fullWidth sx={{backgroundColor: alpha("#633256", 0.5), color:'white',
          "&:hover": {
            backgroundColor: alpha("#633256", 0.25),
          },
        }}><span>Ver requerimientos aprobados</span></Button>
        </Box>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ m: 2}}> <span><strong>Órdenes de Compra Pendientes</strong></span></Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              pt:6,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Tabla state={state} dispatch={dispatch}/>

          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </section>
  );
};

Notificaciones.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Notificaciones;
