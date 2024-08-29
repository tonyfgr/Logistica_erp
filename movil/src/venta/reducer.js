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
            item.cantidad += 1  
            return  {
                ...state,

            }
        case ACTION_TYPES.LOW_DETALLE:
            var isInVentaDetalle = state.venta.detalle_venta.some((item)=> action.payload.producto == item.producto)
            if (isInVentaDetalle) {
                var item = state.venta.detalle_venta.find((item) => action.payload.producto == item.producto)
                if (item.cantidad > 1){
                    item.cantidad -= 1
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
