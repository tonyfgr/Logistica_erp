// import axios from "axios";
import axios from "../api/axios";
import { createContext, useState } from "react";

const ProveedoresContext = createContext();
const URL = "api/proveedores/";
// let [proveedores, setProveerores] = useState([]);

export const getProveedores = async (set) => {
  const res_per = await axios
    .get(`${URL}per`)
    .catch((error) => console.log({ error }));
  const res_emp = await axios
    .get(`${URL}emp`)
    .catch((error) => console.log({ error }));
  set(res_per.data.content.concat(res_emp.data.content));
  return { clientesPersonas: res_per.data, clientesEmpresas: res_emp.data };
};

export const postProveedoresPer = async (prov) => {
  try {
    const response = await axios.post(`${URL}per`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postProveedoresEmp = async (prov) => {
  try {
    const response = await axios.post(`${URL}emp`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putProveedoresPer = async (prov, id) => {
  try {
    const response = await axios.put(`${URL}per/${id}`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putProveedoresEmp = async (prov, id) => {
  try {
    const response = await axios.put(`${URL}emp/${id}`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delProveedoresPer = async (id) => {
  try {
    const response = await axios.delete(`${URL}per/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delProveedoresEmp = async (id) => {
  try {
    const response = await axios.delete(`${URL}emp/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.codigo
    ? resultData.filter(
        (item) => item.codigo.toString().toLowerCase().includes(fields.codigo.toString().toLowerCase())
      )
    : resultData;
  resultData = fields.ruc
    ? resultData.filter((item) => (
      item.ruc.toString().toLowerCase().includes(fields.ruc.toString().toLowerCase())
      
    ))
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
