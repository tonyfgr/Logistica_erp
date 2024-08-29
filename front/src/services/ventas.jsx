// import axios from "axios";
import axios from "../api/axios";

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
      payload.detalle_venta.forEach((detalle) => {
        salidaProd(
          { cantidad: detalle.cantidad },
          detalle.producto,
          detalle.almacen
        )
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const BuildVentaPayload = (venta) => {
  venta.cliente = venta.cliente.id;
  venta.detalle_venta.forEach((item) => {
    delete item.nombre;
  });
  return venta;
};

export const AxiosSesionVenta = (payload) => {
  axios
    .post("api/ventas/sesion/", payload)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const RegistroPuntoVenta = (payload) => {
  axios
    .post("api/ventas/puntoventa/", payload)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const BuildPuntoVentaPayload = (punto_venta) => {
  console.log(punto_venta);
  punto_venta.cliente = punto_venta.cliente.id;
  punto_venta.detalle_punto_venta.forEach((item) => {
    delete item.nombre;
  });
  return punto_venta;
};

export const BuildSesionVentaPayload = (sesion_venta) => {
  // sesion_venta.responsable = sesion_venta.responsable.id
  sesion_venta.punto_venta.forEach((item) => {
    console.log(item);
    item.cliente = item.cliente.id;
  });
  console.log(sesion_venta)
  return sesion_venta;
};

// -------------- Facturas --------------//

export const searcherFacturas = (fields, list) => {
  let resultData = list;
  resultData = fields.cliente
    ? resultData.filter((item) =>
        item.cliente ? item.cliente.id == fields.cliente.id : false
      )
    : resultData;
  resultData = fields.codigo
    ? resultData.filter((item) => item.id == fields.codigo)
    : resultData;
  resultData = fields.numero_factura
    ? resultData.filter((item) =>
        item.numero_factura
          .toString()
          .toLowerCase()
          .includes(fields.numero_factura.toString())
      )
    : resultData;
  resultData = fields.fecha
    ? resultData.filter(
        (item) => item.fecha.slice(0, 10) == fields.fecha.slice(0, 10)
      )
    : resultData;
  return resultData;
};

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

export const getSesionVenta = async (set, url) => {
  try {
    const response = await axios.get(url);
    set(response.data.content);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// REMISIONES

const URL_VENTAS = "api/ventas/"
const URL_REMISIONES = "api/ventas/remision/"
const URL_REMISIONES_DETALLES = "api/ventas/remision/"

export const postRemision = async (payload) => {
    try{
      console.log('remision hecha', payload)
        const response = await axios.post(URL_REMISIONES, payload);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const deleteRemisionDetalle = async (id) =>{
    try{
        const response = await axios.delete(`${URL_REMISIONES_DETALLES}${id}/`);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
  }

export const BuildRemissionPayload = (idVenta, idsArray) => {
    var payload = new Object()
    payload.venta = idVenta
    payload.remision_venta_detalle = idsArray.map(id => {
        var detalle_venta = new Object()
        detalle_venta.venta_detalle = id
        return detalle_venta
    })
    return payload
}

export const getRemisiones = (set) => {
    axios.get(URL_REMISIONES)
     .then(res =>  {if (res.data.status == true) set(res.data.content)})
     .catch((error) => console.log(error))
}

export const deleteRemision = async(id) => {
    try{
        const response = await axios.delete(`${URL_REMISIONES}${id}/`);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

//Buscador Remisiones
export const searcherRemisiones = (fields, list) => {
    let resultData = list;
    resultData = fields.venta
        ? resultData.filter((item) => 
            (item.cliente.toString()).toLowerCase().includes(fields.cliente.toString())
        )
        : resultData;
    resultData = fields.codigo
        ? resultData.filter((item) =>
            item.id == fields.codigo
            )
        : resultData;
    resultData = fields.venta
        ? resultData.filter((item) =>
            item.compra == fields.venta
            )
        : resultData;
    resultData = fields.numero_factura
        ? resultData.filter((item) =>
            (item.numero_factura.toString()).toLowerCase().includes(fields.numero_factura.toString())
            )
        : resultData;
    resultData = fields.fecha
        ? resultData.filter((item) => 
            item.fecha.slice(0, 10) == fields.fecha.slice(0, 10)
        )
        : resultData;
    return resultData;
};


// Punto venta salida de tienda 
export const salidaProd = async (data, productoid, almacenid) => {
  try {
    const response = await axios.patch(`api/ventas/salida/${productoid}/${almacenid}/`, data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};