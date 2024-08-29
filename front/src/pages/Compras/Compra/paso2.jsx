import { alpha } from "@mui/material/styles";
import { useState , useEffect, useRef } from "react";
import './index.css';

import {
  Paper,
  Grid,
  Button,
  Badge,
  ButtonGroup, Card, CardMedia, CardContent, CardActions, CardHeader
} from "@mui/material";

//Componentes
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import SearcherArticulos from "./searcher";
import { ACTION_TYPES } from "./reducerCompra";
import Table from "./table";
import { searcher } from "../../../services/compras";
import { getArticulosVariantes } from "../../../services/articulos";



const Paso2 = ({state, dispatch}) => {

    //para la cuenta
    const handleAdd = (item) => {
        //building the payload
        let payload = {
            nombre: `${item.articulo}/${item.nombre}`,
            articulo: item.id,
            unidad: 1,
            cantidad: 1,
            precio_unitario: item.precio_unitario,
        }
        var action = {
            type: ACTION_TYPES.ADD_DETALLE,
            payload
        }
        dispatch(action)
    }

    const handleRemove = (item) => {
        let payload = {
            articulo: item.id,
        }
        var action = {
            type: ACTION_TYPES.LOW_DETALLE,
            payload
        }
        dispatch(action)
    }


    //para el buscador de articulos
    const render = useRef(true);
    const [fields, setFields] = useState({}); 
    const URL = "api/articulos/variantes/";
    const [articulos, setArticulos] = useState([]);
    useEffect(() => {
        if (render.current) {
        render.current = false;
        getArticulosVariantes(setArticulos, URL);
        }
    }, []);
    
    let data = searcher(fields, articulos);

    return (
        <>
        {/* From searcher.jsx */}
        <SearcherArticulos fields={fields} setFields={setFields}/>
        <br></br>
        <section>
            <div className="container">
            <Paper sx={{p:5}} elevation={20}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={7}>
                    <Grid container spacing={2}>
                        {data.map((item, i) => (
                            <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                            <Card  sx={{ 
                                backgroundColor: alpha('#633256', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#633256', 0.25),
                                },
                                }}>
                                <CardHeader
                                title={
                                    <Typography fontFamily={"inherit"}>
                                    {item.articulo+'/'+item.nombre}
                                    </Typography>
                                }
                                subheader={
                                    <Typography variant="body2" color="text.secondary">
                                    $ {item.precio_unitario}
                                    </Typography>
                                }
                                action={
                                    <Badge color="secondary" badgeContent={1} sx={{right:20 , top:10}}>
                                    </Badge>
                                } 
                                />
                                <CardMedia
                                sx={{ height: 140 }}
                                image={item.imagen}
                                />
                                <CardContent>
    
                                <CardActions>
                                    <ButtonGroup fullWidth >
                                    <Button fullWidth
                                        color="secondary"
                                        aria-label="reduce"
                                        onClick={()=>handleRemove(item)}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button fullWidth
                                        color="secondary"
                                        aria-label="increase"
                                        onClick={()=>handleAdd(item)}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                    </ButtonGroup>
                                </CardActions>
                                </CardContent>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} minWidth="400px" >
                    {/* From tabla.jsx */}
                    <Table state={state} dispatch={dispatch}/> 
                    </Grid>
                </Grid>
            </Paper>
            </div>
        </section>
        </>
        
  );
};
export default Paso2;