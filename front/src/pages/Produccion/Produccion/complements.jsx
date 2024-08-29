import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import axios from "axios";

import {
  getProduccionDetalle,
  searcher,
  del,
  patchProduccion,
  postProduccionDetalle,
  postKardexProducto,
  getKardexProducto
} from "../../../services/produccion";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
}) => {
  const [produccion, setProduccion] = useState([]);
  const [kardexData, setKardexData] = useState([]);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      // Llama a la función para obtener los datos de producción
      getProduccionDetalle(setProduccion);
    }
  }, [renderizar]);

  // Lógica de búsqueda y filtrado
  let data = searcher(fields, produccion);

  // Función para manejar la apertura del modal para edición
  const handlePut = async (row) => {
    try {
      // Llama a la función para editar la producción
      await patchProduccion({ /* datos actualizados */ }, row.id);
      // Actualiza el estado para volver a renderizar la tabla
      setRenderizar(!renderizar);
      // Abre el modal para edición
      setOpenModal(true);
      // Establece el elemento seleccionado como el elemento a editar
      setItem(row);
    } catch (error) {
      console.error("Error updating production:", error);
    }
  };

  // Función para manejar la visualización de detalles
  const handleView = (row) => {
    setItemView(row);
  };

  // Función para manejar el borrado de una producción
  const handleDelete = async (id) => {
    try {
      await del(id);
      // Actualiza el estado para volver a renderizar la tabla
      setRenderizar(!renderizar);
    } catch (error) {
      console.error("Error deleting production:", error);
    }
  };

// Función para manejar el cambio de estado de una producción
const cambioEstado = async (row, setKardexData) => {
  try {
    console.log("Creating Kardex entry...");

    // Verifica si el estado actual es "completado"
    if (row.estado === 'completado') {
      // Obtiene todos los registros de KardexProducto para el mismo producto
      const registrosKardex = await getKardexProducto(setKardexData, row.id_producto);

      console.log("Registros Kardex obtenidos:", registrosKardex);

      let saldo = 0;
      if (registrosKardex && registrosKardex.length > 0) {
        // Ordena los registros de KardexProducto por ID de forma descendente
        registrosKardex.sort((a, b) => b.id - a.id);
        // Toma el primer registro (el último en términos de ID)
        const ultimoKardex = registrosKardex[0];
        const ultimoSaldo = parseFloat(ultimoKardex.saldo);
        const cantidadActual = parseFloat(row.cantidad);
        saldo = ultimoSaldo + cantidadActual;
      } else {
        saldo = row.cantidad; // Si no hay registros anteriores, el saldo será igual a la cantidad actual
      }

      console.log("Nuevo saldo calculado:", saldo);

      // Crea el nuevo registro en KardexProducto con el saldo calculado
      const nuevoRegistroKardex = {
        "accion": 'ingreso',
        "cantidad": row.cantidad,
        "saldo": saldo,
        "producto": row.id_producto,
        "produccion": row.id,
        "motivo": 'produccion',
      };

      // Realiza la petición para crear el nuevo registro en KardexProducto
      await postKardexProducto(nuevoRegistroKardex);

      console.log("Kardex entry created successfully!");
    } else {
      console.log("Production state is not 'completado'. Skipping Kardex entry creation.");
    }
  } catch (error) {
    console.error("Error creating Kardex entry:", error);
  }
};




// Función para obtener el último registro en la tabla KardexProducto para un producto dado
const obtenerUltimoKardexProducto = async (idProducto) => {
  try {
    const response = await axios.get(`api/produccion/kardex_producto/${idProducto}/`);
    const kardexProducto = response.data;
    // Retorna el último registro (suponiendo que los registros están ordenados por ID de forma descendente)
    return kardexProducto.length > 0 ? kardexProducto[0] : null;
  } catch (error) {
    console.log("Error fetching last KardexProducto record:", error);
    return null;
  }
};


  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead
          sx={{
            backgroundColor: alpha("#633256", 0.2),
            "&:hover": {
              backgroundColor: alpha("#633256", 0.25),
            },
          }}
        >
          <TableRow>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit", fontStyle: "italic" }}>Item</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">ID</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">ID del Producto</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Nombre del Producto</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Fecha de Inicio</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Fecha Fin</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Cantidad</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Estado</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <ClickAwayListener
          onClickAway={() => {
            // Manejar clics fuera de la fila seleccionada
          }}
        >
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.id_producto}</TableCell>
                <TableCell align="right">{row.nombre_producto}</TableCell>
                <TableCell align="right">{row.fecha_inicio}</TableCell>
                <TableCell align="right">{row.fecha_fin}</TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.estado}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="view" size="small" color="primary">
                    <VisibilityIcon fontSize="inherit" onClick={() => handleView(row)} />
                  </IconButton>
                  <IconButton onClick={() => handlePut(row)} aria-label="edit" size="small" color="success">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)} aria-label="delete" size="small" color="error">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                <IconButton onClick={() => cambioEstado(row, setKardexData)} aria-label="change-state" size="small" color="primary">
                Comprobar estado
              </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ClickAwayListener>
      </Table>
    </TableContainer>
  );
};
