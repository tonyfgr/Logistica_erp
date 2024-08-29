import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { getKardexProducto } from '../../services/producto';
import { useParams } from 'react-router-dom'; // Importa useParams

const Kardex = () => {
  const renderRef = useRef(true);
  const [kardex, setKardex] = useState([]);
  const { productId } = useParams(); // Obtén el ID del producto desde los parámetros de la URL

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current = false;
      // Llama a la función para obtener los datos del Kardex por producto
      getKardexProducto(setKardex, productId); // Utiliza el ID del producto obtenido de los parámetros de la URL
    }
  }, [productId]); // Asegúrate de incluir productId en la lista de dependencias

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead
          sx={{
            backgroundColor: alpha('#633256', 0.2),
            '&:hover': {
              backgroundColor: alpha('#633256', 0.25),
            },
          }}
        >
          <TableRow>
            <TableCell sx={{ color: '#633256', fontFamily: 'inherit', fontStyle: 'italic' }}>
              Item
            </TableCell>
            <TableCell sx={{ color: '#633256', fontFamily: 'inherit' }} align="right">
              Producto
            </TableCell>
            <TableCell sx={{ color: '#633256', fontFamily: 'inherit' }} align="right">
              Fecha
            </TableCell>
            <TableCell sx={{ color: '#633256', fontFamily: 'inherit' }} align="right">
              Acción
            </TableCell>
            <TableCell sx={{ color: '#633256', fontFamily: 'inherit' }} align="right">
              Motivo
            </TableCell>
            <TableCell sx={{ color: '#633256', fontFamily: 'inherit' }} align="right">
              Cantidad
            </TableCell>
            <TableCell sx={{ color: '#633256', fontFamily: 'inherit' }} align="right">
              Saldo
            </TableCell>
          </TableRow>
        </TableHead>
        <ClickAwayListener onClickAway={() => {
            // Manejar clics fuera de la fila seleccionada
          }}
        >
          <TableBody>
            {kardex.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: row.accion === 'salida' ? alpha('#FFCDD2', 0.5) : 'inherit',
                }}
              >
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="right">{row.nombre_producto}</TableCell>
                <TableCell align="right">
                  {new Date(row.created_at).toLocaleString()}
                </TableCell>
                <TableCell align="right">{row.accion}</TableCell>
                <TableCell align="right">{row.motivo}</TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.saldo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ClickAwayListener>
      </Table>
    </TableContainer>
  );
};

export default Kardex;