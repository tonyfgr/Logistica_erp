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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
//icons
import NumbersIcon from "@mui/icons-material/Numbers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Variante from "./variantes";
import { formatearFechaTabla } from "../../../services/caja";

const VerCajaDiaria = ({itemView}) => {
  const [open, setOpen] = useState(false);
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <EventIcon />, primary: "Fecha Apertura", secondary: "" },
    { icon: <QueryBuilderIcon />, primary: "Hora Apertura", secondary: "" },
    { icon: <EventIcon />, primary: "Fecha Cierre", secondary: "" },
    { icon: <QueryBuilderIcon />, primary: "Hora Cierre", secondary: "" },
    { icon: <AttachMoneyIcon />, primary: "Saldo Apertura", secondary: "" },
    { icon: <AttachMoneyIcon />, primary: "Saldo Cierre", secondary: "" }
  ]);

  const seti = () => {
    const newItem = itemsPer.map((i) => {
      if (!itemView.id) {
        return {
          ...i,
        };
      } else {
        if (i.primary === "Código") {
          return {
            ...i,
            secondary: itemView.codigo,
          };
        } else if (i.primary === "Fecha Apertura") {
          return {
            ...i,
            secondary: formatearFechaTabla(itemView.fecha_apertura,)
          };
        } else if (i.primary === "Hora Apertura") {
          return {
            ...i,
            secondary: itemView.hora_apertura.slice(0,5),
          };
        } else if (i.primary === "Fecha Cierre") {
          return {
            ...i,
            secondary: formatearFechaTabla(itemView.fecha_cierre),
          };
        } else if (i.primary === "Hora Cierre") {
          return {
            ...i,
            secondary: itemView.hora_cierre.slice(0,5),
          };
        } 
        else if (i.primary === "Saldo Apertura") {
          return {
            ...i,
            secondary: `S/. ${itemView.monto_inicial.toFixed(2)}`,
          };
        } 
        else if (i.primary === "Saldo Cierre") {
          return {
            ...i,
            secondary: itemView.monto_final ? `S/. ${itemView.monto_final.toFixed(2)}` : "Aún abierta",
          };
        } 
      }
    });
    setItemsPer(newItem);
  };

  useEffect(()=>{
    seti()
  },[itemView])

  return (
    <section>
      <Paper
        elevation={10}
        className="paper"
        sx={{
          p: 0
        }}
      >
        <Accordion sx={{ p:5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Caja Diaria Seleccionada
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <Grid container spacing={0}>
                {itemsPer.map((i) => (
                    <Grid key={i.primary} item xs={12} sm={6} md={6} lg={6}>
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
                  <Variante
                    item={itemView.registros_caja}
                    open={open}
                    setOpen={setOpen}
                  />
              </Grid>
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </section>
  );
};

export default VerCajaDiaria;