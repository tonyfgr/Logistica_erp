import axios from "../api/axios";
import { createContext, useState } from "react";

const URL = "api/requerimientos/";

export const getRequermientos = async (set) => {
  const res = await axios
    .get(`${URL}`)
    .catch((error) => console.log({ error }));
  set(res.data.content);
  return { requerimientos: res.data };
};

export const postRequerimientos = async (data) => {
  try {
    const response = await axios.post(`${URL}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delRequerimientos = async (id) => {
  try {
    const response = await axios.delete(`${URL}${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};