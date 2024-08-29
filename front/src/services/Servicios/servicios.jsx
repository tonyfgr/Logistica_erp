import axios from "../../api/axios"

const SERVICIOS_URL = "api/ordenes/servicio/"
const SERVICIOS_DOCUMENTOS_URL = "api/ordenes/serviciodocumentos/"

export const cotizacionInitialState = {orden_servicio:[{}]}

export function transformToFormData (values) {
    const formData = new FormData();
    values.mayor_500 && formData.append('mayor_500', values.mayor_500);
    formData.append('servicio_nombre', values.servicio_nombre);
    formData.append('servicio_estado', values.servicio_estado);
    formData.append('requerimiento', values.requerimiento);
    
    values.orden_servicio.forEach((value, index) => {
        formData.append(`orden_servicio[${index}][proveedor_id]`, value.empresa_servicio);
        formData.append(`orden_servicio[${index}][propuesta_documentos_servicio][servicio_cotizacion_documento]`, value.propuesta_documentos_servicio.servicio_cotizacion_documento);
        formData.append(`orden_servicio[${index}][propuesta_documentos_servicio][propuesta_tecnica_documento]`, value.propuesta_documentos_servicio.propuesta_tecnica_documento);
        formData.append(`orden_servicio[${index}][propuesta_documentos_servicio][propuesta_economica_documento]`, value.propuesta_documentos_servicio.propuesta_economica_documento);
    });    
    return formData
}

export const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.servicio_estado && fields.servicio_estado != 'Todos' 
        ? resultData.filter((item) =>
            item.servicio_estado == fields.servicio_estado
            )
        : resultData;
    resultData = fields.mayor_500 && fields.mayor_500 != 'Todos'
        ? resultData.filter((item) => 
            fields.mayor_500 == "Menor a 500" ? item.mayor_500 == false : fields.mayor_500 == "Ninguno" ? item.mayor_500 == null : item.mayor_500 == true
        )
        : resultData
    return resultData;
};

export const postServicios = async (data) => {
    try {
        const response = await axios.post(SERVICIOS_URL, data);
        
        return response.data
    } catch (error) {
        console.log(error)

        return error
    }
}

export const getServicios = async (set) => {
    axios.get(SERVICIOS_URL)
     .then(res => {if (res.status == 200) set(res.data.content)})
     .catch(err => console.log(err))
}

export const deleteServicio = async (id) =>{
    try{
        const response = await axios.delete(`${SERVICIOS_URL}${id}/`);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
  }

  export const patchOrdenServicio = async (id, data) => {
    try {
      const responsePatch = await axios.patch(`${SERVICIOS_URL}${id}/`, data);
      return responsePatch.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  export const patchOrdenServicioCotizacion = async (id, data) => {
    try {
      const responsePatch = await axios.patch(`${SERVICIOS_DOCUMENTOS_URL}${id}/`, data);
      return responsePatch.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };