import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Alert,
  AlertTitle,
  Modal,Box
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { DataGrid, renderEditInputCell } from '@mui/x-data-grid';
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from '@mui/icons-material/Description';


import Swal from "sweetalert2";


const AddForm = ({
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false)
  };

  const handlePostPut = async(e) => {
    try {
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró la orden de compra",
      });
    }
    catch(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false)
  }

  //modal
  const [openmodalAhora, setOpenModalAhora] = useState(false);
  const handleOpenModalAhora = () => setOpenModalAhora(true);
  const handleCloseModalAhora = () => setOpenModalAhora(false);

  return (
    <>
      <IconButton
        aria-label="delete"
        color="secondary"
        size="small"
        onClick={handleOpenPost}
      >
      <DescriptionIcon fontSize="inherit" />
      </IconButton>
      <Dialog open={openModal} maxWidth={'xl'}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography align="center" gutterBottom>
                <span>
                  ¿Desea registrar esta orden de compra?
                  </span>
              </Typography>
            </Grid>

            <Grid container spacing={1} sx={{mt:3}}>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <Button
                  fullWidth
                  id="textfields"
                  color="secondary"
                  variant="contained"
                  type="reset"
                  value="limpiar"
                  onClick={handleOpenModalAhora}
                >
                  Generar
                </Button>
                <Modal
                  open={openmodalAhora}
                  onClose={handleCloseModalAhora}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'background.paper',
                      boxShadow: 24,
                      p: 1,
                      borderRadius:2,
                  }}>

                    <Alert variant="outlined" severity="success" sx={{p:4}} onTimeUpdate={5000}>
                      Se registró la orden de compra
                      {/*
                        Swal.fire({
                          icon: "success",
                          title: "Ok",
                          text: "Se registró la orden de compra",
                        }).then(function() {
                          window.location = "/servicios/bien";
                        })
                      */}
                    </Alert>
                  </Box>
                </Modal>
              </Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <Button
                  fullWidth
                  id="textfields"
                  color="error"
                  variant="contained"
                  type="reset"
                  value="limpiar"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
