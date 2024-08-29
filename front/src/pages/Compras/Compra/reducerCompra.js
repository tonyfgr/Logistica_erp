
const setInitialDate = () => {
    let actualdate = new Date()
    var event = new Date(actualdate);
    return JSON.stringify(event).slice(1,-1)
}

export const ACTION_TYPES = {
    SET_FECHA: "SET_FECHA",
    SET_ORDEN_BIEN: "SET_ORDEN_BIEN",
    SET_PROVEEDOR: "SET_PROVEEDOR",
    ADD_DETALLE: "ADD_DETALLE",
    LOW_DETALLE: "LOW_DETALLE",
    REMOVE_DETALLE: "REMOVE_DETALLE",
    RESET_COMPRA: "RESET_COMPRA",
}

export const INITIAL_STATE = {
    compra: {
        fecha:setInitialDate(),
        orden_bien:"",
        proveedor:{persona:{nombre:""}},
        detalle_compra: [],
    }
}

export const getTotal = (detalle_compra) =>{
    if (detalle_compra != []){
        let sum = detalle_compra.reduce((amount, item) => item.precio_unitario*item.cantidad + amount, 0)
        return sum
    }
    return 0
}


export const comprasReducer = (state, action) => {
    switch(action.type) {
        case ACTION_TYPES.SET_FECHA:
            return {
                ...state,
                compra:{
                    ...state.compra,
                    fecha:action.payload
                }
            }
        case ACTION_TYPES.SET_ORDEN_BIEN:
            return {
                ...state,
                compra:{
                    ...state.compra,
                    orden_bien:action.payload
                }
            }
        case ACTION_TYPES.SET_PROVEEDOR:
            return {
                ...state,
                compra:{
                    ...state.compra,
                    proveedor:action.payload
                }
            }
        case ACTION_TYPES.ADD_DETALLE:
            var isInCompraDetalle = state.compra.detalle_compra.some((item)=> action.payload.articulo == item.articulo)
            if (!isInCompraDetalle) 
                return {
                    ...state,
                    compra:{
                        ...state.compra,
                        detalle_compra:[...state.compra.detalle_compra,action.payload]
                    }
                }
            var item = state.compra.detalle_compra.find((item) => action.payload.articulo == item.articulo);
            item.cantidad += .5  
            return  {
                ...state,

            }
        case ACTION_TYPES.LOW_DETALLE:
            var isInCompraDetalle = state.compra.detalle_compra.some((item)=> action.payload.articulo == item.articulo)
            if (isInCompraDetalle) {
                var item = state.compra.detalle_compra.find((item) => action.payload.articulo == item.articulo)
                if (item.cantidad > 1){
                    item.cantidad -= .5
                    return  {
                        ...state
                    }
                }
                return state
            }
        case ACTION_TYPES.REMOVE_DETALLE:
            var item = state.compra.detalle_compra.find((item) => action.payload.articulo == item.articulo)
            var index = state.compra.detalle_compra.indexOf(item)
            let detalle_compra = state.compra.detalle_compra.splice(index, 1)
            return{
                ...state,
                compra:{
                    ...state.compra,
                    detalle_compra:[...detalle_compra]
                }
            }
        
        case ACTION_TYPES.RESET_COMPRA:
            return{...INITIAL_STATE}

        default:
            return state
    }
}


