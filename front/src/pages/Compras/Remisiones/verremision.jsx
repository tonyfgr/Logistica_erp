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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

import { formateoFecha } from "../../../services/compras";

const VerRemision = ({ itemView }) => {
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <NumbersIcon />, primary: "Compra", secondary: "" },
    { icon: <PersonIcon />, primary: "Trabajador", secondary: "" },
    { icon: <CalendarMonthIcon />, primary: "Fecha", secondary: "" },
    { icon: <InfoIcon />, primary: "Total Remision", secondary: "" }
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
        } else if (i.primary === "Compra") {
          return {
            ...i,
            secondary: itemView.codigo_compra,
          };
        } else if (i.primary === "Trabajador") {
          return {
            ...i,
            secondary: itemView.trabajador?itemView.trabajador:'-',
          };
        } else if (i.primary === "Fecha") {
          return {
            ...i,
            secondary: formateoFecha(itemView.fecha),
          };
        } else if (i.primary === "Total Remision") {
          return {
            ...i,
            secondary: `S/. ${itemView.totalRemision}`,
          };
        }
      }
    });
    setItemsPer(newItem);
  };

  useEffect(() => {
    seti();
  }, [itemView]);

  return (
    <section>
      <Paper
        elevation={10}
        className="paper"
        sx={{mt: 4,p: 0}}
      >
        <Accordion sx={{ p:5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Remisión seleccionada (Compras)
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
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
          </AccordionDetails>
        </Accordion>
      </Paper>
    </section>
  );
};

export default VerRemision;