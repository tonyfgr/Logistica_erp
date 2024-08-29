//import axios from "axios";
import axios from "../api/axios";
import { createContext, useState } from "react";
import Clientes from "../pages/Clientes";

const URL = "api/clientes/";

export const getClientes = async (set) => {
  const res_per = await axios
    .get(`${URL}per/`)
    .catch((error) => console.log({ error }));
  const res_emp = await axios
    .get(`${URL}emp/`)
    .catch((error) => console.log({ error }));
  set(res_per.data.content.concat(res_emp.data.content));
  return { clientesPersonas: res_per.data, clientesEmpresas: res_emp.data };
};

export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.codigo
    ? resultData.filter(
        (item) => item.codigo.toString().toLowerCase().includes(fields.codigo.toString().toLowerCase())
      )
    : resultData;
  resultData = fields.dni
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.dni.toString().toLowerCase().includes(fields.dni.toString().toLowerCase())
          
        else return item.empresa.ruc.toString().toLowerCase().includes(fields.dni.toString().toLowerCase())
      })
    : resultData;
    resultData = fields.nombre
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.nombre.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
        else
          return item.empresa.nombre.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())
      })
    : resultData;
  resultData = fields.telefono
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.telefono.toString().toLowerCase().includes(fields.telefono.toString().toLowerCase())
        else
          return item.empresa.telefono.toString().toLowerCase().includes(fields.telefono.toString().toLowerCase())
      })
    : resultData;
  resultData = fields.codprovincia
    ? resultData.filter((item) => {
        if (item.persona) return item.persona.codprovincia == fields.codprovincia;
        else return item.empresa.codprovincia == fields.codprovincia;
      })
    : resultData;
    resultData = fields.localidad
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.localidad.toString().toLowerCase().includes(fields.localidad.toString().toLowerCase())
        else
          return item.empresa.localidad.toString().toLowerCase().includes(fields.localidad.toString().toLowerCase())
      })
    : resultData;

    resultData = fields.radio && fields.radio != ''
    ? resultData.filter((item) => {
        if (fields.radio == 'persona') {
          return item.persona ? true : false
        } else {
          return item.empresa ? true : false
        }
      })
    : resultData
    
    

  return resultData;
};

export const postClienteper = async (data) => {
  try {
    const response = await axios.post(
      "api/clientes/per/",
      data
    );
    // set(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postClienteemp = async (data) => {
  try {
    const response = await axios.post(
      "api/clientes/emp/",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putClienteper = async (id, data) => {
  try {
    const response = await axios.put(
      `api/clientes/mod/per/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putClienteemp = async (id, data) => {
  try {
    const response = await axios.put(
      `api/clientes/mod/emp/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteClienteper = async (id, data) => {
  try {
    const response = await axios.delete(
      `api/clientes/mod/per/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteClienteemp = async (id, data) => {
  try {
    const response = await axios.delete(
      `api/clientes/mod/per/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
