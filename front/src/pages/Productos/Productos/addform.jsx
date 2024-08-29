import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
//componentes
import { get } from "../../../services/mantenimiento";
import { postProd, putProd, artget } from "../../../services/producto";

import { Field, FieldArray, Formik } from "formik";

import Swal from "sweetalert2";
import { Box } from "@mui/system";

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
}) => {
  const [catProd, setCatProd] = useState([]);
  const [art, setArt] = useState([]);
  const [vArt, setVArt] = useState([]);
  const [filterVarianteArt, setFilterVarianteArt] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);

  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

  const InSubmit = async (val) => {
    console.log(val);
    let { categoria } = val;
    let dataToSubmit;
    dataToSubmit = {
      categoria: categoria ? categoria.id : null,
    };
    let formData = new FormData();
    if (!item.id) {
      formData.append("nombre", val.nombre);
      formData.append("descripcion_producto", val.descripcion_producto);
      formData.append("categoria", val.categoria);
      formData.append("imagen", val.imagen);
      val.producto_variante.forEach((it, index) => {
        formData.append(
          `producto_variante[${index}].nombre`,
          val.producto_variante[index].nombre
        );
        formData.append(
          `producto_variante[${index}].descripcion`,
          val.producto_variante[index].descripcion
        );
        formData.append(
          `producto_variante[${index}].color`,
          val.producto_variante[index].color
        );
        formData.append(
          `producto_variante[${index}].talla`,
          val.producto_variante[index].talla
        );
        formData.append(
          `producto_variante[${index}].costo_produccion`,
          val.producto_variante[index].costo_produccion
        );
        formData.append(`producto_variante[${index}].precio_final`, 0);
        it.ubicacion_producto.forEach((u, ubi)=>{
          formData.append(
            `producto_variante[${index}].ubicacion_producto[${ubi}].almacen`,
            val.producto_variante[index].ubicacion_producto[ubi].almacen
          )
          formData.append(
            `producto_variante[${index}].ubicacion_producto[${ubi}].cantidad`,
            val.producto_variante[index].ubicacion_producto[ubi].cantidad
          )
        })
        it.producto_detalle.forEach((i, ind) => {
          formData.append(
            `producto_variante[${index}].producto_detalle[${ind}].articulo`,
            val.producto_variante[index].producto_detalle[ind].articulo
          );
          formData.append(
            `producto_variante[${index}].producto_detalle[${ind}].cantidad`,
            val.producto_variante[index].producto_detalle[ind].cantidad
          );
        });
      });
    } else {
      let { nombre, descripcion, cantidad, categoria, imagen } = val;
      dataToSubmit = {
        nombre,
        descripcion,
        cantidad,
        categoria,
        imagen,
        ...dataToSubmit,
      };
      typeof dataToSubmit.imagen === "string" && delete dataToSubmit.imagen;
    }
    try {
      !item.id
        ? await postProd(formData)
        : await putProd(dataToSubmit, item.id);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el impuesto",
      });
      if (item.id) setItem({});
      setRenderizar(!renderizar);
      render.current = true;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false);
  };

  const varianteHandleChange = (event, newValue) => {
    setFilterVarianteArt(
      vArt.filter((item) => item.articulo === newValue.nombre)
    );
  };

  useEffect(() => {
    const URL = "api/mantenimientos/categoria_productos/";
    const URLA = "api/articulos/";
    const URLAV = "api/articulos/variantes/";
    const URL_ALMACEN = "api/mantenimientos/almacenes/";
    get(setCatProd, URL);
    get(setAlmacenes, URL_ALMACEN);
    artget(setArt, URLA);
    artget(setVArt, URLAV);
  }, []);

  console.log(item);

  return (
    <>
      <IconButton
        aria-label="delete"
        color="secondary"
        size="large"
        onClick={handleOpenPost}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Dialog open={openModal}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            {item.id ? "Editar Producto" : "Nuevo Producto"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
            <Formik initialValues={item} onSubmit={InSubmit}>
              {({ values, handleSubmit, handleChange, setFieldValue }) => {
                const [imagenURL, setImagenURL] = useState(values.imagen || "");
                return (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={5}>
                        <Button
                          sx={{ height: "100%" }}
                          fullWidth
                          component="label"
                          id="textfields"
                          size="small"
                          color="primary"
                          variant="outlined"
                        >
                          {values.imagen ? (
                            <img src={imagenURL} alt="Imagen seleccionada" />
                          ) : (
                            "Subir Imagen"
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            name="imagen"
                            onChange={(e) => {
                              setFieldValue([e.target.name], e.target.files[0]);
                              setImagenURL(
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                          />
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12} md={7}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="nombre"
                          onChange={handleChange}
                          value={values.nombre}
                        />
                        <TextField
                          fullWidth
                          label="Descripcion"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="descripcion_producto"
                          onChange={handleChange}
                          value={values.descripcion_producto}
                        />
                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                        >
                          <InputLabel>Categorias</InputLabel>
                          <Select
                            label="Categorias"
                            size="small"
                            color="secondary"
                            id="textfields"
                            name="categoria"
                            onChange={handleChange}
                            value={values.categoria}
                          >
                            {catProd.map((item, i) => (
                              <MenuItem key={i} value={item.id}>
                                {item.nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {!item.id && (
                        <Grid item xs={12} sm={12} md={12}>
                          <FieldArray
                            name="producto_variante"
                            render={(arrayHelpers) => (
                              <>
                                {values.producto_variante &&
                                values.producto_variante.length > 0 ? (
                                  values.producto_variante.map(
                                    (variante, index) => (
                                      <Box
                                        key={index}
                                        sx={{
                                          p: 2,
                                          border: "1px dashed purple",
                                        }}
                                      >
                                        <Button
                                          fullWidth
                                          component="label"
                                          variant="outlined"
                                          color="secondary"
                                          startIcon={<RemoveCircleIcon />}
                                          sx={{ marginTop: "0.5rem" }}
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        ></Button>
                                        <Grid container>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <TextField
                                              fullWidth
                                              label="Nombre"
                                              required
                                              size="small"
                                              color="secondary"
                                              id="textfields"
                                              margin="dense"
                                              name={`producto_variante.${index}.nombre`}
                                              onChange={handleChange}
                                              value={variante.nombre}
                                            />
                                            <TextField
                                              fullWidth
                                              label="Descripcion"
                                              required
                                              size="small"
                                              color="secondary"
                                              id="textfields"
                                              margin="dense"
                                              name={`producto_variante.${index}.descripcion`}
                                              onChange={handleChange}
                                              value={variante.descripcion}
                                            />
                                          </Grid>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <TextField
                                              fullWidth
                                              label="Color"
                                              required
                                              size="small"
                                              color="secondary"
                                              id="textfields"
                                              margin="dense"
                                              name={`producto_variante.${index}.color`}
                                              onChange={handleChange}
                                              value={variante.color}
                                            />
                                            <TextField
                                              fullWidth
                                              label="Talla"
                                              required
                                              size="small"
                                              color="secondary"
                                              id="textfields"
                                              margin="dense"
                                              name={`producto_variante.${index}.talla`}
                                              onChange={handleChange}
                                              value={variante.talla}
                                            />
                                            <TextField
                                              fullWidth
                                              label="Costos de Produccion"
                                              required
                                              size="small"
                                              color="secondary"
                                              id="textfields"
                                              margin="dense"
                                              name={`producto_variante.${index}.costo_produccion`}
                                              onChange={handleChange}
                                              value={variante.costo_manufactura}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    S/.
                                                  </InputAdornment>
                                                  
                                                ),
                                                step: 0.1,
                                              }}
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <FieldArray
                                              name={`producto_variante.${index}.ubicacion_producto`}
                                              render={(array) => (
                                                <>
                                                  {variante.ubicacion_producto !==
                                                  undefined ? (
                                                    variante.ubicacion_producto.map(
                                                      (ubicacion, u) => (
                                                        <Box
                                                          key={u}
                                                          sx={{
                                                            p: 2,
                                                            border:
                                                              "1px dashed skyblue",
                                                          }}
                                                        >
                                                          <Button
                                                            fullWidth
                                                            component="label"
                                                            variant="outlined"
                                                            color="primary"
                                                            startIcon={
                                                              <RemoveCircleIcon />
                                                            }
                                                            sx={{
                                                              marginTop:
                                                                "0.5rem",
                                                            }}
                                                            onClick={() =>
                                                              array.remove(u)
                                                            }
                                                          ></Button>

                                                          <Grid container>
                                                            <Grid item xs={12}>
                                                              <FormControl
                                                                fullWidth
                                                                margin="dense"
                                                                size="small"
                                                                color="secondary"
                                                              >
                                                                <InputLabel>
                                                                  Almacén
                                                                </InputLabel>
                                                                <Select
                                                                  label="Almacén"
                                                                  size="small"
                                                                  color="secondary"
                                                                  id="textfields"
                                                                  name={`producto_variante.${index}.ubicacion_producto.${u}.almacen`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                  // value={
                                                                  //   variante.almacen
                                                                  //     ? variante.almacen
                                                                  //     : ""
                                                                  // }
                                                                >
                                                                  {almacenes.map(
                                                                    (
                                                                      item,
                                                                      i
                                                                    ) => (
                                                                      <MenuItem
                                                                        key={i}
                                                                        value={
                                                                          item.id
                                                                        }
                                                                      >
                                                                        {
                                                                          item.nombre
                                                                        }
                                                                      </MenuItem>
                                                                    )
                                                                  )}
                                                                </Select>
                                                              </FormControl>
                                                            </Grid>
                                                            <Grid
                                                              item
                                                              xs={6}
                                                            ></Grid>
                                                          </Grid>
                                                          <TextField
                                                            fullWidth
                                                            label="Cantidad"
                                                            required
                                                            size="small"
                                                            color="secondary"
                                                            id="textfields"
                                                            margin="dense"
                                                            name={`producto_variante.${index}.ubicacion_producto.${u}.cantidad`}
                                                            value={
                                                              ubicacion.cantidad
                                                            }
                                                            onChange={
                                                              handleChange
                                                            }
                                                          />
                                                        </Box>
                                                      )
                                                    )
                                                  ) : (
                                                    <></>
                                                  )}
                                                  <Button
                                                    fullWidth
                                                    component="label"
                                                    variant="outlined"
                                                    color="primary"
                                                    startIcon={
                                                      <AddCircleIcon />
                                                    }
                                                    sx={{ marginTop: "0.5rem", marginBottom:"0.5rem" }}
                                                    onClick={() =>
                                                      array.push("")
                                                    }
                                                  >
                                                    Almacenes
                                                  </Button>
                                                </>
                                              )}
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <FieldArray
                                              name={`producto_variante.${index}.producto_detalle`}
                                              render={(array) => (
                                                <>
                                                  {variante.producto_detalle !==
                                                  undefined ? (
                                                    variante.producto_detalle.map(
                                                      (detalle, i) => (
                                                        <Box
                                                          key={i}
                                                          sx={{
                                                            p: 2,
                                                            border:
                                                              "1px dashed green",
                                                          }}
                                                        >
                                                          <Button
                                                            fullWidth
                                                            component="label"
                                                            variant="outlined"
                                                            color="success"
                                                            startIcon={
                                                              <RemoveCircleIcon />
                                                            }
                                                            sx={{
                                                              marginTop:
                                                                "0.5rem",
                                                            }}
                                                            onClick={() =>
                                                              array.remove(i)
                                                            }
                                                          ></Button>

                                                          <Grid container>
                                                            <Grid item xs={6}>
                                                              <Autocomplete
                                                                sx={{ mt: 1 }}
                                                                size="small"
                                                                color="secondary"
                                                                options={art}
                                                                getOptionLabel={(
                                                                  option
                                                                ) => {
                                                                  if (option)
                                                                    return option.nombre;
                                                                  return "";
                                                                }}
                                                                onChange={
                                                                  varianteHandleChange
                                                                }
                                                                renderInput={(
                                                                  params
                                                                ) => (
                                                                  <TextField
                                                                    {...params}
                                                                    color="secondary"
                                                                    label="Articulos"
                                                                    inputProps={{
                                                                      ...params.inputProps,
                                                                    }}
                                                                  />
                                                                )}
                                                                // value={
                                                                //   detalle
                                                                //     .articulo[0]
                                                                //     .nombre
                                                                // }
                                                              />
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                              <FormControl
                                                                fullWidth
                                                                margin="dense"
                                                                size="small"
                                                                color="secondary"
                                                              >
                                                                <InputLabel>
                                                                  Variante
                                                                </InputLabel>
                                                                <Select
                                                                  label="Categorias"
                                                                  size="small"
                                                                  color="secondary"
                                                                  id="textfields"
                                                                  name={`producto_variante.${index}.producto_detalle.${i}.articulo`}
                                                                  // value={detalle.articulo.variante}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  {filterVarianteArt.map(
                                                                    (
                                                                      item,
                                                                      i
                                                                    ) => (
                                                                      <MenuItem
                                                                        key={i}
                                                                        value={
                                                                          item.id
                                                                        }
                                                                      >
                                                                        {
                                                                          item.nombre
                                                                        }
                                                                      </MenuItem>
                                                                    )
                                                                  )}
                                                                </Select>
                                                              </FormControl>
                                                            </Grid>
                                                          </Grid>
                                                          <TextField
                                                            fullWidth
                                                            label="Cantidad"
                                                            required
                                                            size="small"
                                                            color="secondary"
                                                            id="textfields"
                                                            margin="dense"
                                                            type="number"
                                                            name={`producto_variante.${index}.producto_detalle.${i}.cantidad`}
                                                            value={
                                                              detalle.cantidad
                                                            }
                                                            onChange={
                                                              handleChange
                                                            }
                                                          />
                                                        </Box>
                                                      )
                                                    )
                                                  ) : (
                                                    <></>
                                                  )}
                                                  <Button
                                                    fullWidth
                                                    component="label"
                                                    variant="outlined"
                                                    color="success"
                                                    startIcon={
                                                      <AddCircleIcon />
                                                    }
                                                    sx={{ marginTop: "0.5rem" }}
                                                    onClick={() =>
                                                      array.push("")
                                                    }
                                                  >
                                                    Articulos
                                                  </Button>
                                                </>
                                              )}
                                            />
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    )
                                  )
                                ) : (
                                  <></>
                                )}
                                <Button
                                  fullWidth
                                  component="label"
                                  variant="outlined"
                                  color="secondary"
                                  startIcon={<AddCircleIcon />}
                                  sx={{ marginTop: "0.5rem" }}
                                  onClick={() => arrayHelpers.push("")}
                                >
                                  Variantes
                                </Button>
                              </>
                            )}
                          />
                        </Grid>
                      )}

                      <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                        <Button
                          fullWidth
                          id="btnClick"
                          size="medium"
                          color="secondary"
                          className="navbar-btn-single"
                          variant="contained"
                          type="submit"
                        >
                          <span>{item.id ? "Editar" : "Registrar"}</span>
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
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
                    </Grid>
                  </form>
                );
              }}
            </Formik>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
