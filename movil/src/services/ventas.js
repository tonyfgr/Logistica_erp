import axios from "../../../front/src/api/axios";

//Buscador de productos
export const searcher = (fields, list) => {
  console.log(fields)
  console.log(list)
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        (item.producto.toString() + item.nombre.toString())
          .toLowerCase()
          .includes(fields.nombre.toString())
      )
    : resultData;
  resultData = fields.categoria
    ? resultData.filter((item) => {
        console.log(item.id);
        console.log(fields.categoria);
        item.categoria == fields.categoria;
      })
    : resultData;
  resultData = fields.almacen
    ? resultData.filter(item => item.ubicacion_producto.some(ubi => ubi.almacen.id === fields.almacen ))
    : resultData;
  console.log(resultData);
  return resultData;
};

// Registro de la venta
export const RegistroVenta = (payload) => {
  axios
    .post("api/ventas/", payload)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const BuildVentaPayload = (venta) => {
  venta.cliente = venta.cliente.id;
  venta.detalle_venta.forEach((item) => {
    delete item.nombre;
  });
  return venta;
};


// -------------- Facturas --------------//

export const getVenta = async (set, url) => {
  try {
    const response = await axios.get(url);
    set(response.data.content);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delVenta = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// -------------- Productos --------------//

export const get = async (set, url) => {
  try {
    const response = await axios.get(url);
    set(response.data.content);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// -------------- Mantenimiento --------------//

export const getMan = (set, url) => {
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


// -------------- Cliente --------------//

export const getClientes = async (set) => {
  const res_per = await axios
    .get("api/clientes/per/")
    .catch((error) => console.log({ error }));
  const res_emp = await axios
    .get("api/clientes/emp/")
    .catch((error) => console.log({ error }));
  set(res_per.data.content.concat(res_emp.data.content));
  return { clientesPersonas: res_per.data, clientesEmpresas: res_emp.data };
};


// -------------- Caja --------------//

export const postCaja = async (data) => {
  try {
    const response = await axios.post('api/cajadiaria/', data);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};


export const patchCaja = async (id, data) => {
  try {
    const responsePatch = await axios.patch('api/cajadiaria/' + `${id}/`, data);
    return responsePatch.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getLastCaja = async (set, tipo) => {
  try {
    const responseLast = await axios.get("api/cajadiaria/ultimacaja/" + tipo + "/");

    if (responseLast.data.status !== false) {
      set(responseLast.data.content);
    }

    return responseLast.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};