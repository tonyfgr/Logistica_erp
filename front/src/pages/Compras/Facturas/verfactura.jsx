import { useEffect, useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
  Stack,
  CardActions,
} from "@mui/material";

import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//icons
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DiscountIcon from '@mui/icons-material/Discount';
import StoreIcon from '@mui/icons-material/Store';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import "./index.css";
import Remisiones from "./remisiones";
import { rowSelectionStateInitializer } from "@mui/x-data-grid/internals";


import { formateoFecha } from "../../../services/compras";

const VerFactura = ({itemView, 
  render,
  renderizar,
  setRenderizar,}) => {
  

  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Codigo", secondary: "" },
    { icon: <CalendarMonthIcon />, primary: "Fecha", secondary: "" },
    { icon: <StoreIcon />, primary: "Proveedor", secondary: "" },
    { icon: <InfoIcon />, primary: "Estado", secondary: "" },
    { icon: <InfoIcon />, primary: "Estado Remision", secondary: "" },
    { icon: <DiscountIcon />, primary: "N° Factura", secondary: "" },
    { icon: <InfoIcon />, primary: "Detalle de entrega", secondary: "" },
    { icon: <AttachMoneyIcon />, primary: "Total de compra", secondary: "" },
  ]);

  const [remisiones, setRemisiones] = useState([]);

  const seti = () => {
    const newItem = itemsPer.map((i) => {
      if (!itemView.id) {
        return {
          ...i,
        };
      } else {
        if (i.primary === "Codigo") {
          return {
            ...i,
            secondary: itemView.codigo,
          };
        } else if (i.primary === "Fecha") {
          return {
            ...i,
            secondary: formateoFecha(itemView.fecha),
          };
        } else if (i.primary === "Proveedor") {
          return {
            ...i,
            secondary: itemView.nombre_proveedor,
          };
        }else if (i.primary === "Estado") {
          return {
            ...i,
            secondary: itemView.borrado?"Anulado":"Vigente",
          };
        }
        else if (i.primary === "Estado Remision") {
          return {
            ...i,
            secondary: itemView.estado_remision,
          };
        }
        else if (i.primary === "N° Factura") {
          return {
            ...i,
            secondary: itemView.numero_factura,
          };
        }
        else if (i.primary === "Detalle de entrega") {
          return {
            ...i,
            secondary: itemView.detalle_entrega,
          };
        }
        else if (i.primary === "Total de compra") {
          return {
            ...i,
            secondary: `S/. ${itemView.totalCompra}`,
          };
        }
      }
    });
    setItemsPer(newItem);
    setRemisiones(itemView.remision?itemView.remision:[])
  };

  useEffect(() => {
    seti();
  }, [itemView]);

  const theme = useTheme();

  return (
    <section>
      <Paper
        elevation={10}
        className="paper"
        sx={{
          mt: 4,
          p: 0,
          backgroundColor: alpha("#633256", 0.2),
          "&:hover": {
            backgroundColor: alpha("#633256", 0.25),
          },
        }}
      >
        <Accordion sx={{ p: 5 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Factura seleccionada (Compras)
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ p: 3 }} elevation={0}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  {/*
                    <CardMedia
                      style={{ objectFit:'cover' }}
                      image="https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg"
                    />
                  */}
                  <img src={itemView?.imagen_fac_compra?itemView.imagen_fac_compra:"https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg"} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <CardContent>
                    <List>
                      <Grid container spacing={0}>
                        {itemsPer.map((i, index) => (
                          <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                            <ListItem>
                              <ListItemAvatar>
                              <Avatar sx={{ 
                                backgroundColor: alpha('#633256', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#633256', 0.25),
                                }, color:'#633256'
                                }}>{i.icon}</Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={<span>{i.primary}</span>}
                                secondary={i.secondary}
                              />
                            </ListItem>
                          </Grid>
                        ))}
                      </Grid>
                    </List>
                  </CardContent>
                </Grid>
              </Grid>
              
              <CardActions>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Remisiones
                      itemView = {itemView}
                      remisiones={remisiones}
                      setRemisiones={setRemisiones}
                      render={render}
                      renderizar={renderizar}
                      setRenderizar={setRenderizar}
                    />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </section>
  );
};

export default VerFactura;