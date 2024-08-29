
const setInitialDate = () => {
    let actualdate = new Date()
    var event = new Date(actualdate);
    return JSON.stringify(event).slice(1,-1)
}

export const ACTION_TYPES = {
    SET_FECHA:"SET_FECHA",
    SET_CLIENTE:"SET_CLIENTE",
    ADD_DETALLE: "ADD_DETALLE",
    LOW_DETALLE: "LOW_DETALLE",
    REMOVE_DETALLE: "REMOVE_DETALLE",
    RESET_VENTA: "RESET_VENTA"
}

export const INITIAL_STATE = {
    venta: {
        fecha:setInitialDate(),
        cliente:{persona:{nombre:""}},
        detalle_venta:[]
    }
}

export const getTotal = (detalle_venta) =>{
    if (detalle_venta != []){
        console.log(detalle_venta)
        let sum = detalle_venta.reduce((amount, item) =>((item.precio_unitario*item.cantidad)*0.18)+(item.precio_unitario*item.cantidad) + amount, 0)
        return sum
    }
    return 0
}


export const ventasReducer = (state, action) => {
    switch(action.type) {
        case ACTION_TYPES.SET_FECHA:
            return {
                ...state,
                venta:{
                    ...state.venta,
                    fecha:action.payload
                }
            }
        case ACTION_TYPES.SET_CLIENTE:
            return {
                ...state,
                venta:{
                    ...state.venta,
                    cliente:action.payload
                }
            }
        case ACTION_TYPES.ADD_DETALLE:
            console.log(state.venta)
            var isInVentaDetalle = state.venta.detalle_venta.some((item)=> action.payload.producto == item.producto)
            if (!isInVentaDetalle) 
                return {
                    ...state,
                    venta:{
                        ...state.venta,
                        detalle_venta:[...state.venta.detalle_venta,action.payload]
                    }
                }
            var item = state.venta.detalle_venta.find((item) => action.payload.producto == item.producto);
            item.cantidad += .5  
            return  {
                ...state,

            }
        case ACTION_TYPES.LOW_DETALLE:
            var isInVentaDetalle = state.venta.detalle_venta.some((item)=> action.payload.producto == item.producto)
            if (isInVentaDetalle) {
                var item = state.venta.detalle_venta.find((item) => action.payload.producto == item.producto)
                if (item.cantidad > 1){
                    item.cantidad -= .5
                    return  {
                        ...state
                    }
                }
                return state
            }
        case ACTION_TYPES.REMOVE_DETALLE:
            var item = state.venta.detalle_venta.find((item) => action.payload.producto == item.producto)
            var index = state.venta.detalle_venta.indexOf(item)
            let detalle_venta = state.venta.detalle_venta.splice(index, 1)
            return{
                ...state,
                venta:{
                    ...state.venta,
                    detalle_venta:[...detalle_venta]
                }
            }
        
        case ACTION_TYPES.RESET_VENTA:
            return{...INITIAL_STATE}

        default:
            return state
    }
}


export const ACTION_SESION_TYPES ={
    SET_FECHA: "SET_FECHA",
    SET_RESPONSABLE:"SET_RESPONSABLE",
    SET_HORA_FIN:"SET_HORA_FIN",
    SET_ALMACEN:"SET_ALMACEN",
    ADD_PUNTO_VENTA: "ADD_PUNTO_VENTA",
    REMOVE_PUNTO_VENTA: "REMOVE_PUNTO_VENTA",
    RESET_PUNTO_VENTA: "RESET_PUNTO_VENTA"
}

export const INITIAL_SESION_STATE = {
    sesion_venta: {
        // estado:false,
        fecha:setInitialDate(),
        almacen:"",
        responsable:"",
        hora_fin:"",
        punto_venta:[]
    }
}

export const sesionVentaReducer = (state, action) => {
    switch(action.type) {
        case ACTION_SESION_TYPES.SET_FECHA:
            return {
                ...state,
                sesion_venta:{
                    ...state.sesion_venta,
                    fecha:action.payload
                }
            }
        case ACTION_SESION_TYPES.SET_HORA_FIN:
            return {
                ...state,
                sesion_venta:{
                    ...state.sesion_venta,
                    hora_fin:action.payload
                }
            }
        case ACTION_SESION_TYPES.SET_ALMACEN:
            return {
                ...state,
                sesion_venta:{
                    ...state.sesion_venta,
                    almacen:action.payload
                }
            }
        case ACTION_SESION_TYPES.SET_RESPONSABLE:
            return {
                ...state,
                sesion_venta:{
                   ...state.sesion_venta,
                    responsable:action.payload
                }
            }
        case ACTION_SESION_TYPES.ADD_PUNTO_VENTA:
            
            return {
                ...state,
                sesion_venta:{
                    ...state.sesion_venta,
                    punto_venta:[...state.sesion_venta.punto_venta,action.payload]
                }
            }
        case ACTION_SESION_TYPES.REMOVE_PUNTO_VENTA:
            var item = state.sesion_venta.punto_venta.find((item) => action.payload.punto_venta == item.punto_venta)
            var index = state.sesion_venta.punto_venta.indexOf(item)
            let punto_venta = state.sesion_venta.punto_venta.splice(index, 1)
            return{
                ...state,
                punto_venta:{
                    ...state.sesion_venta,
                    punto_venta:[...punto_venta]
                }
            }
        
        case ACTION_SESION_TYPES.RESET_SESION_VENTA:
            return{...INITIAL_SESION_STATE}

        default:
            return state
    }
}

export const ACTION_PUNTO_VENTA_TYPES ={
    SET_FECHA: "SET_FECHA",
    SET_CLIENTE:"SET_CLIENTE",
    ADD_DETALLE_PUNTO_VENTA: "ADD_DETALLE_PUNTO_VENTA",
    LOW_DETALLE_PUNTO_VENTA: "LOW_DETALLE_PUNTO_VENTA",
    REMOVE_DETALLE_PUNTO_VENTA: "REMOVE_DETALLE_PUNTO_VENTA",
    RESET_PUNTO_VENTA: "RESET_PUNTO_VENTA"
}

export const INITIAL_PUNTO_VENTA_STATE = {
    punto_venta:{
        fecha:setInitialDate(),
        cliente:{persona:{nombre:""}},
        detalle_punto_venta:[]
    }
}

export const getTotalPuntoVenta = (detalle_punto_venta) =>{
    if (detalle_punto_venta != []){
        let sum = detalle_punto_venta.reduce((amount, item) => ((item.precio_unitario*item.cantidad)*0.18)+(item.precio_unitario*item.cantidad) + amount, 0)
        return sum
    }
    return 0
}


export const puntoVentasReducer = (state, action) => {
    console.log(state)
    switch(action.type) {
        case ACTION_PUNTO_VENTA_TYPES.SET_FECHA:
            return {
                ...state,
                punto_venta:{
                    ...state.punto_venta,
                    fecha:action.payload
                }
            }
        case ACTION_PUNTO_VENTA_TYPES.SET_CLIENTE:
            return {
                ...state,
                punto_venta:{
                    ...state.punto_venta,
                    cliente:action.payload
                }
            }
        case ACTION_PUNTO_VENTA_TYPES.ADD_DETALLE_PUNTO_VENTA:
            console.log(state.punto_venta)
            var isInPuntoVentaDetalle = state.punto_venta.detalle_punto_venta.some((item)=> action.payload.producto == item.producto)
            if (!isInPuntoVentaDetalle) 
                return {
                    ...state,
                    punto_venta:{
                        ...state.punto_venta,
                        detalle_punto_venta:[...state.punto_venta.detalle_punto_venta,action.payload]
                    }
                }
            var item = state.punto_venta.detalle_punto_venta.find((item) => action.payload.producto == item.producto);
            item.cantidad += .5  
            return  {
                ...state,

            }
        case ACTION_PUNTO_VENTA_TYPES.LOW_DETALLE_PUNTO_VENTA:
            var isInPuntoVentaDetalle = state.punto_venta.detalle_punto_venta.some((item)=> action.payload.producto == item.producto)
            if (isInPuntoVentaDetalle) {
                var item = state.punto_venta.detalle_punto_venta.find((item) => action.payload.producto == item.producto)
                if (item.cantidad > 1){
                    item.cantidad -= .5
                    return  {
                        ...state
                    }
                }
                return state
            }
        case ACTION_PUNTO_VENTA_TYPES.REMOVE_DETALLE_PUNTO_VENTA:
            var item = state.punto_venta.detalle_punto_venta.find((item) => action.payload.producto == item.producto)
            var index = state.punto_venta.detalle_punto_venta.indexOf(item)
            let detalle_venta = state.punto_venta.detalle_punto_venta.splice(index, 1)
            return{
                ...state,
                punto_venta:{
                    ...state.venta,
                    detalle_punto_venta:[...detalle_venta]
                }
            }
        
        case ACTION_PUNTO_VENTA_TYPES.RESET_PUNTO_VENTA:
            return{...INITIAL_PUNTO_VENTA_STATE}

        default:
            return state
    }
}