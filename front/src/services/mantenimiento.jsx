// import axios from "axios";
import axios from "../api/axios";

//URLS
const URL = "api/mantenimientos/";
const URL_IMPUESTOS = `${URL}impuestos/`;

export const get = (set, url) => {
  axios
    .get(url)
    .then((res) => {
      if (res.status == 200) set(res.data);
    })
    .catch((error) => console.log(error));
};
export const getInd = (id, set, url) => {
  axios
    .get(`${url}${id}`)
    .then((res) => {
      if (res.status == 200) set(res.data);
    })
    .catch((error) => console.log(error));
};

export const post_put = async (e, item, url) => {
  e.preventDefault();
  const payload = {
    [item.name]: item.value,
  };
  try {
    if (!e.target.cod) {
      try {
        const res = await axios.post(url, payload);
        return res.data;
      } catch (error) {
        return error;
      }
    } else {
      let id = e.target.cod.value;
      try {
        const res = await axios.put(`${url}${id}/`, payload);
        return res.data;
      } catch (error) {
        return error;
      }
    }
  } catch (error) {
    return error;
  }
};

export const del = async (id, url) => {
  let res = await axios
    .delete(`${url}${id}/`)
    .catch((error) => console.log({ error }));
  return res.data;
};

// Busqueda general
export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombre.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
      )
    : resultData;
  return resultData;
};

// Provincias 
export const searcherprov = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombreprovincia.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
      )
    : resultData;
  return resultData;
};

// Forma de pago
export const searcherform = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombrefp.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
      )
    : resultData;
  return resultData;
};

// Entidad
export const searcherent = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombreentidad.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
      )
    : resultData;
  return resultData;
};

export const postIm = async (data, url) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putIm = async (data, url) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Almacen
const URLAL = 'api/mantenimientos/almacenes/';
export const postAlmacen = async (data) => {
  try {
    const response = await axios.post(URLAL, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putAlmacen = async (data, id) => {
  try {
    const response = await axios.put(`api/mantenimientos/almacenes/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searcherAlmacen = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombre.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
      )
    : resultData;
    resultData = fields.ubicacion
    ? resultData.filter((item) =>
        item.ubicacion.toString().toLowerCase().includes(fields.ubicacion.toString().toLowerCase())
      )
    : resultData;
    resultData = fields.abreviacion
    ? resultData.filter((item) =>
        item.abreviacion.toString().toLowerCase().includes(fields.abreviacion.toString().toLowerCase())
      )
    : resultData;
  return resultData;
};

// Areas
const URLAR = 'api/mantenimientos/areas/';
export const postArea = async (data) => {
  try {
    const response = await axios.post(URLAR, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putArea = async (data, id) => {
  try {
    const response = await axios.put(`api/mantenimientos/areas/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searcherArea = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombre.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
      )
    : resultData;
    resultData = fields.abreviacion
    ? resultData.filter((item) =>
        item.abreviacion.toString().toLowerCase().includes(fields.abreviacion.toString().toLowerCase())
      )
    : resultData;
  return resultData;
};