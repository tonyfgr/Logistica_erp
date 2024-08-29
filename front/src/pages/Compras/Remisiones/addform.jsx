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
  AlertTitle
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
//iconos
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from '@mui/icons-material/Description';
//componentes

import { BuildRemissionPayload, postRemision } from "../../../services/compras";
import UserRequest from "../../../components/User/Requests/UserRequest";

import Swal from "sweetalert2";


const AddForm = ({
  itemView,
  setItemView,
  row,
  idCompra, 
  detalle_compra, 
  renderizar, 
  setRenderizar,
  render
}) => {
  const user = UserRequest()
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const URL = "api/mantenimientos/provincias/";
  const handleOpenPost = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false)
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'articulo', headerName: 'Nombre', minWidth:130, valueFormatter: ({value}) => `${value.articulo.nombre}/${value.nombre}` },
    { field: 'almacen', headerName: 'Almacen', minWidth:130, valueFormatter: ({value}) => value?value.nombre:'-' },
    { field: 'unidad', headerName: 'Uds./Paq', type: 'number', },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number' },
    { field: 'precio_unitario', headerName: 'Precio', type: 'number', valueFormatter: ({value}) => `S./ ${value}` },
    { field: 'subtotal', headerName: 'Subtotal', type: 'number', valueFormatter: ({value}) => `S./ ${value}` },
    
  ];
  
  console.log(detalle_compra)
  const rows = detalle_compra.map(item => {
    item.subtotal = item.precio_unitario * item.cantidad 
    return item
  })

  const handleSelectedRows = (idsArray) => {
    setSelectedRows(idsArray)
  }

  const handleDoRemission = async () => {
    var payload = BuildRemissionPayload(idCompra, selectedRows)
    payload.trabajador = user.trabajador.id
    try {
      const res = await postRemision(payload)
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se realizó la remisión",
      })
      if (itemView.id && itemView.id == idCompra) setItemView(res.content)
      setRenderizar(!renderizar)
      render.current = true;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    }
    setOpenModal(false);
  }


  return (
    <>
      <IconButton
        aria-label="delete"
        color="secondary"
        size="small"
        onClick={handleOpenPost}
        disabled={row?.borrado?true:false}
      >
      <DescriptionIcon fontSize="inherit" />
      </IconButton>
      <Dialog open={openModal} maxWidth={'xl'}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Nueva Remisión
          </Typography>
        </DialogTitle>
        <DialogContent>
                {/*item.id && <input type="hidden" name="cod" value={item.id}/>*/}
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        isRowSelectable={(params) => params.row.remision_hecha == false}
                        onRowSelectionModelChange={handleSelectedRows}
                      />
                    </div>
                  </Grid>
                  { row.estado_remision == "Hecha" ?
                    <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
                    <Alert severity="success">
                    <AlertTitle>
                      Remisiones Completas
                    </AlertTitle>
                    </Alert>
                    </Grid>
                    :
                    <>
                    <Grid item xs={12} sm={6} md={6} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      id="btnClick"
                      size="medium"
                      color="secondary"
                      className="navbar-btn-single"
                      variant="contained"
                      type="submit"
                      onClick={handleDoRemission}
                    >
                      <span>Registrar</span>
                    </Button>
                    </Grid>
                  <Grid item xs={12} sm={6} md={6} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      id="btnClick"
                      size="medium"
                      color="error"
                      className="navbar-btn-single"
                      variant="contained"
                      onClick={handleClose}
                    >
                      <span>Cancelar</span>
                    </Button>
                  </Grid>
                  </>}
              </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
