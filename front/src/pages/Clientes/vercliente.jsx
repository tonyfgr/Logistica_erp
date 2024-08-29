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
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeckIcon from "@mui/icons-material/Deck";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PinIcon from "@mui/icons-material/Pin";
import KeyIcon from "@mui/icons-material/Key";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const VerCliente = ({ itemView }) => {
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "Nombre", secondary: "" },
    { icon: <FingerprintIcon />, primary: "RUC o DNI", secondary: "" },
    { icon: <DeckIcon />, primary: "Provincia", secondary: "" },
    { icon: <HomeWorkIcon />, primary: "Localidad", secondary: "" },
    { icon: <MyLocationIcon />, primary: "Dirección", secondary: "" },
    { icon: <PinIcon />, primary: "Código Postal", secondary: "" },
    { icon: <KeyIcon />, primary: "Cuenta Bancaria", secondary: "" },
    { icon: <LocalPhoneIcon />, primary: "Teléfono", secondary: "" },
    { icon: <PhoneAndroidIcon />, primary: "Móvil", secondary: "" },
    { icon: <AttachMoneyIcon />, primary: "Forma de Pago", secondary: "" },
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
        } else if (i.primary === "Nombre") {
          return {
            ...i,
            secondary: itemView.persona ? itemView.persona.nombre : itemView.empresa.nombre,
          };
        } else if (i.primary === "RUC o DNI") {
          return {
            ...i,
            secondary: itemView.persona ? itemView.persona.dni : itemView.empresa.ruc,
          };
        } else if (i.primary === "Provincia") {
          return {
            ...i,
            secondary: itemView.persona
              ? itemView.persona.provincia_info?.nombreprovincia
              : itemView.empresa.provincia_info?.nombreprovincia,
          };
        } else if (i.primary === "Localidad") {
          return {
            ...i,
            secondary: itemView.persona
              ? itemView.persona.localidad
              : itemView.empresa.localidad,
          };
        } else if (i.primary === "Dirección") {
          return {
            ...i,
            secondary: itemView.persona
              ? itemView.persona.direccion
              : itemView.empresa.direccion,
          };
        } else if (i.primary === "Código Postal") {
          return {
            ...i,
            secondary: itemView.persona
              ? itemView.persona.codpostal
              : itemView.empresa.codpostal,
          };
        } else if (i.primary === "Cuenta Bancaria") {
          return {
            ...i,
            secondary: itemView.persona
              ? itemView.persona.cuentabancaria
              : itemView.empresa.cuentabancaria,
          };
        } else if (i.primary === "Teléfono") {
          return {
            ...i,
            secondary: itemView.persona
              ? itemView.persona.telefono
              : itemView.empresa.telefono,
          };
        } else if (i.primary === "Móvil") {
          return {
            ...i,
            secondary: itemView.persona ? itemView.persona.movil : itemView.empresa.movil,
          };
        } else if (i.primary === "Forma de Pago") {
          return {
            ...i,
            secondary: itemView.forma_dp_info?.nombrefp,
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
      <Paper elevation={10} className="paper" sx={{ mt: 4, p: 0 }}>
        <Accordion sx={{ p: 5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Cliente seleccionado
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

export default VerCliente;
