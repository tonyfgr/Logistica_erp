import axios from "../../api/axios";

const BIENES_URL = "api/ordenes/bien/"
const BIENES_DOCUMENTOS_URL = "api/ordenes/biendocumentos/"

export const cotizacionInitialState = {orden_bien:[{}]}

export function transformToFormData (values) {
    const formData = new FormData();
    values.mayor_500 && formData.append('mayor_500', values.mayor_500);
    formData.append('bien_nombre', values.bien_nombre);
    formData.append('bien_estado', values.bien_estado);
    formData.append('requerimiento', values.requerimiento);
    
    values.orden_bien.forEach((value, index) => {
        formData.append(`orden_bien[${index}][proveedor_id]`, value.proveedor_id);
        formData.append(`orden_bien[${index}][propuesta_documentos_bien][bien_cotizacion_documento]`, value.propuesta_documentos_bien.bien_cotizacion_documento);
        formData.append(`orden_bien[${index}][propuesta_documentos_bien][propuesta_tecnica_documento]`, value.propuesta_documentos_bien.propuesta_tecnica_documento);
        formData.append(`orden_bien[${index}][propuesta_documentos_bien][propuesta_economica_documento]`, value.propuesta_documentos_bien.propuesta_economica_documento);
    });
    
    return formData
}

export const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.bien_estado && fields.bien_estado != 'Todos' 
        ? resultData.filter((item) =>
            
            item.bien_estado == fields.bien_estado
            )
        : resultData;
    resultData = fields.mayor_500 && fields.mayor_500 != 'Todos'
        ? resultData.filter((item) => 
            fields.mayor_500 == "Menor a 500" ? item.mayor_500 == false : fields.mayor_500 == "Ninguno" ? item.mayor_500 == null : item.mayor_500 == true
        )
        : resultData
    return resultData;
};




export const postBienes = async (data) => {
    try {
        const response = await axios.post(BIENES_URL, data);
        
        return response.data
    } catch (error) {
        console.log(error)

        return error
    }
}

export const getBienes = async (set) => {
    axios.get(BIENES_URL)
     .then(res => {if (res.status == 200) set(res.data.content)})
     .catch(err => console.log(err))
}

export const deleteBien = async (id) =>{
    try{
        const response = await axios.delete(`${BIENES_URL}${id}/`);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
  }

  export const patchOrdenBien = async (id, data) => {
    try {
      const responsePatch = await axios.patch(`${BIENES_URL}${id}/`, data);
      return responsePatch.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  export const patchOrdenBienCotizacion = async (id, data) => {
    try {
      const responsePatch = await axios.patch(`${BIENES_DOCUMENTOS_URL}${id}/`, data);
      return responsePatch.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };