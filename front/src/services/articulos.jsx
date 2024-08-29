//import axios from "axios";
import axios from "../api/axios";

const URL = 'api/articulos/'

export const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.codigo
        ? resultData.filter((item) =>
            item.id == fields.codigo
            )
        : resultData;
    resultData = fields.nombre
        ? resultData.filter((item) =>{
            return item.nombre.toString().toLowerCase().includes(fields.nombre.toString().toLowerCase())}
            )
        : resultData;
    resultData = fields.proveedor
        ? resultData.filter((item) => 
            item.proveedor ? item.proveedor.id == fields.proveedor.id : false
        )
        : resultData;
    resultData = fields.marca && fields.marca!=''
        ? resultData.filter((item) =>
            item.marca.toString().toLowerCase().includes(fields.marca.toString().toLowerCase())
            )
        : resultData;
    resultData = fields.categoria
        ? resultData.filter((item) => 
            item.categoria ? item.categoria.id == fields.categoria.id : false
            )
        : resultData;
    resultData = fields.almacen
        ? resultData.filter((item) => 
            item.variantes ? item.variantes.some(i=>{
              return i.almacen ? i.almacen.id==fields.almacen.id: false})
              : 
              false
            )
        : resultData;
    
    return resultData;
};


export function transformObjectToFormData(obj) {
  const formData = new FormData();

  function flattenObj(obj, path = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newPath = path ? `${path}[${key}]` : key;
        if (value === null) {
          formData.append(newPath, '');
        } else if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(newPath, value[i]);
          }
        } else if (value instanceof File) {
          formData.append(newPath, value);
        } else if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              flattenObj(value[i], `${newPath}[${i}]`);
            }
          } else {
            flattenObj(value, newPath);
          }
        } else {
          const numericValue = parseFloat(value);
          formData.append(newPath, isNaN(numericValue) ? value : numericValue);
        }
      }
    }
  }

  flattenObj(obj);
  return formData;
}

export const getArticulos = (set) => {
    axios
    .get(URL)
    .then((res) => {
      if (res.status == 200) set(res.data.content);
    })
    .catch((error) => console.log(error));
}

export const postArticulo = async (data) =>{
    try{
        const response = await axios.post(URL ,data,{headers: {
            'Content-Type': 'multipart/form-data'
          }});
        return response.data
        
    } catch (error) {
        console.log(error);
        return error
    }
}

export const putArticulo = async (id, data) =>{
    try{
        const response = await axios.patch(`${URL}${id}/`, data,{headers: {
          'Content-Type': 'multipart/form-data'
        }});
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const deleteArticulo = async (id) =>{
  try{
      const response = await axios.delete(`${URL}${id}/`);
      return response.data
  } catch (error) {
      console.log(error);
      return error
  }
}

//Articulos variantes
const URL_AV = 'api/articulos/variantes/'

export const variantesInitialValue = {
  nombre:"",
  precio_unitario:0,
  embalaje:null,
  cantidad:0,
  ubicacion:"",
  almacen:null,
  descripcion:""
}

export const getArticulosVariantes = (set) => {
  axios
  .get(URL_AV)
  .then((res) => {
    if (res.status == 200) set(res.data.content);
  })
  .catch((error) => console.log(error));
}

export const postArticulosVariantes = async (data) => {
  try{
    const response = await axios.post(URL_AV ,data);
    return response.data
  } catch (error) {
    console.log(error);
    return error
  }
}

export const putArticulosVariantes = async (id, data) => {
  try{
    const response = await axios.patch(`${URL_AV}${id}/` ,data);
    return response.data
  } catch (error) {
    console.log(error);
    return error
  }
}

export const deleteArticuloVariante = async (id) =>{
  try{
      const response = await axios.delete(`${URL_AV}${id}/`);
      return response.data
  } catch (error) {
      console.log(error);
      return error
  }
}