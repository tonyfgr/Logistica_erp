import { useState , Fragment, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import './index.css';

import {
  Grid,
  TextField,
  Divider,
  IconButton
} from "@mui/material";

//Componentes
import Typography from '@mui/material/Typography';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  ClickAwayListener from "@mui/base/ClickAwayListener";
import { ACTION_TYPES ,getTotal } from "./reducerCompra";




const Table =({state, dispatch})=> {

    const[rowIndex, setRowIndex] = useState(-1)
    const[columnIndex, setColumnIndex] = useState(-1)
    const rows = state.compra.detalle_compra
    const handleChange = (i, prop, value) => {
        rows[i][prop] = parseInt(value,10) 
    }
    const handleExit = () => {
        setRowIndex(-1);
        setColumnIndex(-1)
    }
    const handleDelete = (id) => {
        let payload = {
            articulo: id,
        }
        var action = {
            type: ACTION_TYPES.REMOVE_DETALLE,
            payload
        }
        dispatch(action)
    }

    return (
        <List sx={{ overflow:'scroll'}}>
            <ListItem
            sx={{
                backgroundColor: "#DF9035"}}>
            <Grid container spacing={1}>
                <Grid item xs>
                <Typography sx={{fontFamily:"inherit", color:'white'}}>
                    Artículo
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                    PKG
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                    Cantidad
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                    Precio
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                    Eliminar
                </Typography>
                </Grid>
            </Grid>
            </ListItem>
            <Divider/>
            
            <ClickAwayListener onClickAway={()=>{
                handleExit()
            }}>
                <div>
                
                {rows.map((item, i) => (
                    <div key={i}>
                    <ListItem key={i}>
                    <Grid container spacing={1} >
                        <Grid item xs >
                        {item.nombre}
                        </Grid>
                        <Grid item xs 
                        onClick={()=>{setRowIndex(i); setColumnIndex(1)}}>
                        <Typography align="right">
                        {rowIndex==i && columnIndex==1 ?
                        <TextField
                        type="number"
                        size="small"
                        color="secondary"
                        defaultValue={rows[i]["unidad"]}
                        onChange={(e) => handleChange(i, "unidad", e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key =="Enter"){handleExit()};
                        }}
                        />
                        :item.unidad
                        }
                        </Typography>
                        </Grid>
                        <Grid item xs 
                        onClick={()=>{setRowIndex(i); setColumnIndex(2)}}>
                        <Typography align="right" >
                        {rowIndex==i && columnIndex==2 ?
                        <TextField
                        type="number"
                        size="small"
                        color="secondary"
                        defaultValue={rows[i]["cantidad"]}
                        onChange={(e) => handleChange(i, "cantidad", e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key =="Enter"){handleExit()};
                        }}
                        />
                        :item.cantidad
                        }
                        </Typography>
                        </Grid>
                        <Grid item xs
                        onClick={()=>{setRowIndex(i); setColumnIndex(3)}}>
                        <Typography align="right">
                        {rowIndex==i && columnIndex==3 ?
                        <TextField
                        type="number"
                        size="small"
                        color="secondary"
                        defaultValue={rows[i]["precio_unitario"]}
                        onChange={(e) => handleChange(i, "precio_unitario", e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key =="Enter"){handleExit()};
                        }}
                        />
                        :'S/. ' +item.precio_unitario
                        }
                        </Typography>
                        </Grid>
                        <Grid item xs  align="right">
                            <IconButton
                                size="small"
                                onClick={()=>handleDelete(item.articulo )}>
                            <DeleteOutlineIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    </ListItem>
                    <Divider/>
                    </div>
                ))}
                </div>                            
            </ClickAwayListener>
            <ListItem>
            <Grid container spacing={1}>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                <Typography align="center" sx={{fontFamily:"inherit"}}>
                    Subtotal
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography align="right" sx={{fontFamily:"inherit"}}>
                    S/. {getTotal(state.compra.detalle_compra).toFixed(2)}
                </Typography>
                </Grid>
            </Grid>
            </ListItem>
            <Divider/>
            <ListItem>
            <Grid container spacing={1}>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                <Typography align="center" sx={{fontFamily:"inherit"}}>
                    Impuestos
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography align="right" sx={{fontFamily:"inherit"}}>
                    18%
                </Typography>
                </Grid>
            </Grid>
            </ListItem>
            <Divider/>
            <ListItem>
            <Grid container spacing={1}>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                <Typography align="center" sx={{fontFamily:"inherit"}}>
                    Total
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography align="right" sx={{fontFamily:"inherit"}}>
                    S/. {getTotal(state.compra.detalle_compra).toFixed(2)}
                </Typography>
                </Grid>
            </Grid>
            </ListItem>
        </List>
    )
}

export default Table