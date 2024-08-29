import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

import {
  Paper,
  Grid,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";

//Componentes
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';


import { ACTION_TYPES } from "./reducerCompra";
import { useEffect, useRef } from "react";
import { getProveedores } from "../../../services/Proveedores";

const Paso1 = ({state, dispatch}) => {
    const navigate = useNavigate()
    const render = useRef(true);
    const [dataProveedores, setDataProveedores] = useState([])

    //Registering date and proveedor id in the state
    const handleChange =(e, value, ac) => {
      let action = {
        type: ac,
      }
      switch(ac){
        case ACTION_TYPES.SET_FECHA:
          var event = new Date(e.$d);
          let date = JSON.stringify(event)
          date = date.slice(1,-1)
          action.payload = date
          dispatch(action);
          break;

        case ACTION_TYPES.SET_PROVEEDOR:
          if (value.id) {
            action.payload = value
            dispatch(action)
          }
          break;
        default:
          console.log("Acción no definida")
      }
    }
    useEffect(()=>{
      if (render.current){
        render.current = false;
        getProveedores(setDataProveedores)
      }
    },[])


    return (
        <section>
            <div className="container">
                  <Paper sx={{p:5}} elevation={20}>
                    <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={8} md={9}>
                          <Autocomplete
                            disableClearable
                            id="textfields"
                            options={dataProveedores}
                            getOptionLabel={(option) => {
                              if (option.persona) return option.persona.nombre
                              return option.empresa.nombre
                            }}
                            onChange={(e, value) => {handleChange(e, value, ACTION_TYPES.SET_PROVEEDOR)}}
                            value={state.compra.proveedor}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                focused
                                fullWidth
                                type="text"
                                label="Nombre del proveedor"
                                size="small"
                                color="secondary"
                                margin="none"
                                name="proveedor"
                                id="textfields"
                              />
                            )}
                          />
                          </Grid>
                          <Grid item xs={12} sm={4} md={3}>
                            <Button variant="outlined" fullWidth color="primary" sx={{ height:'100%'}} onClick={()=>navigate("/proveedores/")}>
                              <AddIcon/>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="Fecha"
                          name="fecha"
                          inputFormat="DD/MM/YYYY"
                          value={state.compra.fecha}
                          onChange={( value)=>{handleChange(value, null, ACTION_TYPES.SET_FECHA)}}
                          renderInput={(params) => <TextField 
                            {...params} 
                            fullWidth
                            size="small"
                            color="secondary"
                            id="textfields"
                            margin="dense"
                            variant="filled"
                            />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                          fullWidth
                          label={"RUC PROVEEDOR"}
                          focused
                          type="number"
                          size="small"
                          color="action"
                          margin="dense"
                          id="textfields"
                          disable="true"
                          variant="filled"
                          value={state.compra.proveedor ? state.compra.proveedor.ruc : ""}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
            </div>
        </section>
  );
};
export default Paso1;