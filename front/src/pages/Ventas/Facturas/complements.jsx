//para la tabla;
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Autocomplete,
  Button,
} from "@mui/material";

import { styled, useTheme, alpha } from "@mui/material/styles";

import { formateoFecha } from "../../../services/compras";

import { useState, useEffect, useMemo, useCallback, Fragment } from "react";
import { useExpanded, useTable } from "react-table";
// import {
//   get,
//   searcherprov,
//   post_put,
//   del,
// } from "../../../services/mantenimiento";
import {
  getVenta,
  getSesionVenta,
  searcherFacturas,
  delVenta,
} from "../../../services/ventas";
import AddForm from "../Remisiones/addform";

const SubRowAsync = ({ row, rowProps, visibleColumns, data }) => {
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    console.log(row.original.punto_venta);
    const timer = setTimeout(() => {
      setNewData(row.original.punto_venta);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <TableRow>
        <TableCell />
        <TableCell colSpan={visibleColumns.length - 1}>Loading...</TableCell>
      </TableRow>
    );
  }

  // error handling here :)

  return (
    <>
      {newData.map((x, i) => {
        return (
          <TableRow {...rowProps} key={`${rowProps.key}-expanded-${i}`}>
            {row.cells.map((cell) => {
              return (
                <TableCell {...cell.getCellProps()}>
                  {cell.render(cell.column.SubCell ? "SubCell" : "Cell", {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

const ChildTable = ({ columns: userColumns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded // We can useExpanded to track the expanded state
    // for sub components too!
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table
        {...getTableProps()}
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead
          sx={{
            backgroundColor: alpha("#633256", 0.2),
            "&:hover": {
              backgroundColor: alpha("#633256", 0.25),
            },
          }}
        >
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  sx={{
                    color: "#633256",
                    fontFamily: "inherit",
                    fontStyle: "italic",
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              // Use a React.Fragment here so the table markup is still valid
              <Fragment key={rowProps.key}>
                <TableRow {...rowProps}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {/* We could pass anything into this */}
                {row.isExpanded &&
                  renderRowSubComponent({ row, rowProps, visibleColumns })}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  itemView,
  setItemView,
  sesionCambio,
}) => {
  const URL_VENTA = "api/ventas/";
  const URL_SESION = "api/ventas/sesion/";
  const [provincias, setProvincias] = useState([]);
  const [facturasVentas, setFacturasVentas] = useState([]);
  const [facturasSesionVentas, setFacturasSesionVentas] = useState([]);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getVenta(setFacturasVentas, URL_VENTA);
      getSesionVenta(setFacturasSesionVentas, URL_SESION);
    }
  }, [renderizar]);

  let data = searcherFacturas(
    fields,
    !sesionCambio ? facturasVentas : facturasSesionVentas
  );

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
  };

  const handleView = (row) => {
    setItemView(row);
  };

  const handleActiveDeactive = async (row) => {
    try {
      Swal.fire({
        title: row?.borrado
          ? "¿Desea activar la orden de compra?"
          : "¿Desea anular la orden de compra?",
        showDenyButton: true,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await await delVenta(`URL_VENTA${row.id}`);
          Swal.fire(
            row?.borrado
              ? "Orden de Compra Activada"
              : "Orden de Compra Anulada",
            "",
            "info"
          );
          render.current = true;
          setRenderizar(!renderizar);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "v" : ">"}
          </span>
        ),
        SubCell: () => null,
      },
      {
        Header: "Factura Venta",
        columns: [
          {
            Header: "Item",
            accessor: (d) => 1,
          },
          {
            Header: "Codigo",
            accessor: (d) => d.codigo,
          },
          {
            Header: "N° de factura",
            accessor: (d) => d.age,
          },
          {
            Header: "Fecha de Venta",
            accessor: (d) => d.fecha,
          },
          {
            Header: "Cliente",
            accessor: (d) => d.nombre_cliente,
          },
          {
            Header: "Remision",
            accessor: (d) => d.estado_remision,
          },
          {
            Header: "Estado",
            accessor: (d) => (d.borrado ? "Anulado" : "Vigente"),
          },
          {
            Header: "Acciones",
            accessor: (d) => (
              <>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleView(d)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                {/* <IconButton
              disabled={d?.borrado ? true : false}
              onClick={() => handlePut(d)}
              aria-label="delete"
              size="small"
              color="success"
            >
              <EditIcon fontSize="inherit" />
            </IconButton> */}

                <IconButton
                  onClick={() => handleActiveDeactive(d)}
                  aria-label="delete"
                  size="small"
                  color={d?.borrado ? "success" : "error"}
                >
                  {d.borrado ? (
                    <CheckCircleIcon fontSize="inherit" />
                  ) : (
                    <DeleteIcon fontSize="inherit" />
                  )}
                </IconButton>
                
                {d.estado_remision !== 'Hecha' && d.estado_remision ? (
                  <AddForm
                    itemView={itemView}
                    setItemView={setItemView}
                    row={d}
                    idVenta={d.id}
                    detalle_venta={d.detalle_venta}
                    renderizar={renderizar}
                    setRenderizar={setRenderizar}
                    render={render}
                  />
                ) : (
                  <></>
                )}
              </>
            ),
          },
        ],
      },
    ],
    []
  );
  const renderRowSubComponent = useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
      />
    ),
    []
  );

  return (
    <>
      <ChildTable
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </>
  );
};
