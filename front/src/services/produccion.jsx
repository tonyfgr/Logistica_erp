// import axios from "axios";
import axios from "../api/axiosNode";

const URL = 'api/produccion/crear_produccion_producto/';
const URL_DET = 'api/produccion/produccion_producto/';
const URL_KARD_PR = 'api/kardex/kardex_producto/'

export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.codigo
    ? resultData.filter((item) =>
      item.proceso.id.toString().toLowerCase().includes(fields.codigo.toString())
    )
    : resultData;
  resultData = fields.fechaInicio
    ? resultData.filter((item) =>
      item.proceso.fecha_inicio.slice(0, 10) == fields.fechaInicio.slice(0, 10)
    )
    : resultData;
  resultData = fields.estProduccion
    ? resultData.filter((item) =>
      item.proceso.estado.toString().toLowerCase().includes(fields.props.value.toString())
    )
    : resultData;
  return resultData;
};

export const getProduccion = async (set) => {
  try {
    const response = await axios.get(URL);
    set(response.data);
    return response;
  } catch (error) {
    console.log("Error fetching production data:", error);
    return error;
  }
};

export const postProduccion = async (data) => {
  try {
    const response = await axios.post(URL, data);
    return response.data;
  } catch (error) {
    console.log("Error posting production data:", error);
    return error;
  }
};

export const patchProduccion = async (data, id) => {
  try {
    const response = await axios.patch(`${URL_DET}${id}/`, data); // Usar URL_DET para la edición
    return response.data;
  } catch (error) {
    console.log("Error updating production data:", error);
    return error;
  }
};


export const getProduccionDet = async (set, id) => {
  try {
    const response = await axios.get(`${URL}/${id}/`);
    set(response.data);
    return response;
  } catch (error) {
    console.log("Error fetching production detail data:", error);
    return error;
  }
};

export const getProduccionDetalle = async (set) => {
  try {
    const response = await axios.get(URL_DET); // Eliminamos el parámetro `id`
    set(response.data);
    return response;
  } catch (error) {
    console.log("Error fetching production detail data:", error);
    return error;
  }
};


export const del = async (id) => {
  try {
    const response = await axios.delete(`${URL}${id}/`);
    return response.data;
  } catch (error) {
    console.log("Error deleting production data:", error);
    return error;
  }
};

export const patchProduccionDetalle = async (data, id) => {
  try {
    const response = await axios.patch(`${URL_DET}${id}/`, data);
    return response.data;
  } catch (error) {
    console.log("Error updating production detail data:", error);
    return error;
  }
};

export const delProduccionDetalle = async (id) => {
  try {
    const response = await axios.delete(`${URL_DET}${id}/`);
    return response.data;
  } catch (error) {
    console.log("Error deleting production detail data:", error);
    return error;
  }
};

export const postProduccionDetalle = async (data) => {
  try {
    const response = await axios.post(URL_DET, data);
    return response.data;
  } catch (error) {
    console.log("Error posting production detail data:", error);
    return error;
  }
};

export const postKardexProducto = async (data) => {
  try {
    const response = await axios.post('api/kardex/realizar_accion/', data);
    return response.data;
  } catch (error) {
    console.log("Error posting kardex data:", error);
    return error;
  }
};

export const getKardexProducto = async (set, id) => {
  try {
    const response = await axios.get(`${URL_KARD_PR}${id}/`);
    set(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching KardexProducto data:", error);
    return error;
  }
};

export const getAllKardexProductos = async (set) => {
  try {
    const response = await axios.get(URL_KARD_PR);
    set(response.data);
    return response;
  } catch (error) {
    console.log("Error fetching all KardexProductos data:", error);
    return error;
  }
};