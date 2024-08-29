
import axios from "../api/axios";

//---------------Compra-----------------//

//Buscador de articulos
export const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.nombre
        ? resultData.filter((item) =>
            (item.articulo.toString()+item.nombre.toString()).toLowerCase().includes(fields.nombre.toString())
            )
        : resultData;
    resultData = fields.categoria
        ? resultData.filter((item) => 
            item.categoria == fields.categoria
        )
        : resultData;
    resultData = fields.almacen
        ? resultData.filter((item) => {
            if (item.almacen) {
                return item.almacen.id == fields.almacen
            } else {
                return false
            }
        })
        : resultData;
    return resultData;
};

// Registro de la compra

const URL_COMPRAS = "api/compras/"

export const RegistroCompra = async (payload) => {
    try {
        const response = await axios.post(URL_COMPRAS, payload)
        return response.data
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const BuildCompraPayload =(compra)=>{
    compra.proveedor = compra.proveedor.id
    compra.detalle_compra.forEach(item => {
        delete item.nombre
    })
    return compra
}

//---------------Facturas-----------------//

//Buscador Facturas
export const searcherFacturas = (fields, list) => {
    let resultData = list;
    resultData = fields.proveedor
        ? resultData.filter((item) => 
            item.proveedor ? item.proveedor.id == fields.proveedor.id : false
        )
        : resultData;
    resultData = fields.codigo
        ? resultData.filter((item) =>
            item.id == fields.codigo
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


//Peticiones Axios
const URL_REMISIONES = `${URL_COMPRAS}remisiones/`
const URL_REMISIONES_DETALLES = `${URL_COMPRAS}remisiones_detalles/`

export const getCompras = (set) => {
    axios.get(URL_COMPRAS)
     .then(res =>  {if (res.data.status == true) set(res.data.content)})
     .catch((error) => console.log(error))
}

export const putCompra = async(id, payload) => {
    try{
        const response = await axios.patch(`${URL_COMPRAS}${id}/`, payload);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const postRemision = async (payload) => {
    try{
        console.log(payload)
        const response = await axios.post(URL_REMISIONES, payload);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const deleteCompra = async (id) => {
    try{
        const response = await axios.delete(`${URL_COMPRAS}${id}/`);
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

export const formateoFecha = (date) => {
    const fecha = new Date(date)
    const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'America/Lima'
      };
    const fechaFormateada = fecha.toLocaleString('es-ES', options);
    return fechaFormateada
}

export const BuildRemissionPayload = (idCompra, idsArray) => {
    var payload = new Object()
    payload.compra = idCompra
    payload.remision_compra_detalle = idsArray.map(id => {
        var detalle_compra = new Object()
        detalle_compra.compra_detalle = id
        return detalle_compra
    })
    return payload
}

//---------------Remisones-----------------//

//Buscador Remisiones
export const searcherRemisiones = (fields, list) => {
    let resultData = list;
    resultData = fields.proveedor
        ? resultData.filter((item) => 
            (item.proveedor.toString()).toLowerCase().includes(fields.proveedor.toString())
        )
        : resultData;
    resultData = fields.codigo
        ? resultData.filter((item) =>
            item.id == fields.codigo
            )
        : resultData;
    resultData = fields.compra
        ? resultData.filter((item) =>
            item.compra == fields.compra
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
