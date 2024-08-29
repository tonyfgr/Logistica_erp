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
  Grid
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import StyleIcon from '@mui/icons-material/Style';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Swal from "sweetalert2";
import './index.css';
import Detalles from "./detalles";

const VerProduccion = ({itemView}) => {
  const [openModal, setOpenModal] = useState(false);

  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código (N° de producción)", secondary: "" },
    { icon: <LocalOfferIcon />, primary: "Producto", secondary: "" },
    { icon: <ProductionQuantityLimitsIcon />, primary: "Cantidad", secondary: "" },
    { icon: <PlayCircleFilledIcon />, primary: "Fecha de inicio", secondary: "" },
    { icon: <PauseCircleIcon />, primary: "Fecha de fin", secondary: "" },
    { icon: <StyleIcon />, primary: "Estado", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "N° de factura", secondary: "" },
    { icon: <ProductionQuantityLimitsIcon />, primary: "N° de productos", secondary: "" },
  ]);

  const seti = () => {
    const newItem = itemsPer.map((i) => {
      if (!itemView.id) {
        return {
          ...i,
        };
      } else {
        if (i.primary === "Código (N° de producción)") {
          return {
            ...i,
            secondary: itemView.id,
          };
        } else if (i.primary === "Producto") {
          return {
            ...i,
            secondary: `${itemView.producto.nombre} (Código: ${itemView.id_producto})`,
          };
        } else if (i.primary === "Cantidad") {
          return {
            ...i,
            secondary: itemView.cantidad,
          };
        } else if (i.primary === "Fecha de inicio") {
          return {
            ...i,
            secondary: itemView.fecha_inicio,
          };
        } else if (i.primary === "Fecha de fin") {
          return {
            ...i,
            secondary: itemView.fecha_fin,
          };
        } else if (i.primary === "Estado") {
          return {
            ...i,
            secondary: itemView.estado,
          };
        } else if (i.primary === "N° de factura") {
          return {
            ...i,
            secondary: itemView.factura_clie_id.numero_factura,
          };
        } else if (i.primary === "N° de productos") {
          return {
            ...i,
            secondary: itemView.detalles.length,
          };
        } 
      }
    });
    setItemsPer(newItem);
  };

  useEffect(()=>{
    seti();
  },[itemView]);

  const theme = useTheme();

  return (
    <section>
      <Paper
        elevation={10}
        className="paper"
        sx={{
          p: 0,
          backgroundColor: alpha("#633256", 0.2),
          "&:hover": {
            backgroundColor: alpha("#633256", 0.25),
          },
        }}
      >
        <Accordion sx={{ p:5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            Producción seleccionada
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <Grid container spacing={0}>
                {itemsPer.map((i) => (
                  <Grid key={i.primary} item xs={12} sm={6} md={6}>
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
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Detalles detalle={itemView.detalles} completo={itemView}/>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </section>
  );
};

export default VerProduccion;
