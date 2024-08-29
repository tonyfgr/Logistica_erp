// import axios from "axios";
import axios from "../api/axios";
import { createContext, useState } from "react";

const TrabajadoresContext = createContext();
const URL = "api/trabajadores/";
// let [Trabajadores, setdataeerores] = useState([]);

const setInitialDate = () => {
  let actualdate = new Date();
  var event = new Date(actualdate);
  return JSON.stringify(event).slice(1, -1);
};

export const initialState = {
  fecha_nacimiento: setInitialDate(),
};

export const getTrabajadores = async (set) => {
  const res = await axios
    .get(`${URL}`)
    .catch((error) => console.log({ error }));
  set(res.data.content);
  return { trabajadores: res.data };
};

export const postTrabajadores = async (data) => {
  try {
    const response = await axios.post(`${URL}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putTrabajadores = async (id, data) => {
  try {
    const response = await axios.put(`${URL}${id}/`, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delTrabajadores = async (id) => {
  try {
    const response = await axios.delete(`${URL}${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searcher = (fields, list) => {
  //console.log(list);
  let resultData = list;
  resultData = fields.codigo
    ? resultData.filter((item) => {
        return item.codigo
          .toString()
          .toLowerCase()
          .includes(fields.codigo.toString().toLowerCase());
      })
    : resultData;
  resultData = fields.nombre
    ? resultData.filter((item) => {
        return item.persona.nombre
          .toString()
          .toLowerCase()
          .includes(fields.nombre.toString().toLowerCase());
      })
    : resultData;
  resultData = fields.dni
    ? resultData.filter((item) => {
        return item.persona.dni
          .toString()
          .toLowerCase()
          .includes(fields.dni.toString().toLowerCase());
      })
    : resultData;
  resultData = fields.area
    ? resultData.filter((item) => {
        return (
          item.area?.toString() == fields.area.toString()
        );
      })
    : resultData;
  return resultData;
};
