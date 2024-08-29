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
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';

const VerRequerimiento = ({ itemView }) => {
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "Area solicitante", secondary: "" },
    { icon: <InfoIcon />, primary: "Fecha Registro", secondary: "" },
    { icon: <DescriptionIcon />, primary: "Tipo", secondary: "" }
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
            secondary: itemView.id,
          };
        } else if (i.primary === "Area solicitante") {
          return {
            ...i,
            secondary: itemView.area_solicitante.nombre,
          };
        } 
       else if (i.primary === "Fecha Registro") {
        return {
          ...i,
          secondary: itemView.fecha_registro,
        };
       } else if (i.primary === "Tipo") {
          return {
            ...i,
            secondary: itemView.tipo,
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
        sx={{p: 0}}
      >
        <Accordion sx={{ p:5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Requerimiento seleccionado
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

export default VerRequerimiento;