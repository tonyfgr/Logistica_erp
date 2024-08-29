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
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CategoryIcon from '@mui/icons-material/Category';
import "./index.css";
import Variantes from "./variantes";

const VerArticulo = ({itemView, almacenes, embalajes}) => {
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "Nombre", secondary: "" },
    { icon: <DescriptionIcon />, primary: "Descripción", secondary: "" },
    { icon: <PersonIcon />, primary: "Proveedor", secondary: "" },
    { icon: <BookmarkIcon />, primary: "Marca", secondary: "" },
    { icon: <CategoryIcon />, primary: "Categoría", secondary: "" },
  ]);
  const [variantes, setVariantes] = useState([])

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
            secondary: itemView.nombre,
          };
        } else if (i.primary === "Descripción") {
          return {
            ...i,
            secondary: itemView.descripcion,
          };
        } else if (i.primary === "Proveedor") {
          return {
            ...i,
            secondary: itemView.nombre_proveedor || '-',
          };
        } else if (i.primary === "Marca") {
          return {
            ...i,
            secondary: itemView.marca,
          };
        } else if (i.primary === "Categoría") {
          return {
            ...i,
            secondary: itemView.nombre_categoria || '-',
          };
        }
      }
    });
    setItemsPer(newItem);
    setVariantes(itemView.variantes)
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
          mt: 3,
          p: 0,
          backgroundColor: alpha("#633256", 0.2),
          "&:hover": {
            backgroundColor: alpha("#633256", 0.25),
          },
        }}
      >
        <Accordion sx={{ p: 5 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Artículo seleccionado
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ p: 3 }} elevation={0}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img
                    src={itemView.imagen}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <CardContent>
                    <List>
                      <Grid container spacing={0}>
                        {itemsPer.map((i, index) => (
                          <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
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
                    <Variantes 
                      almacenes={almacenes}
                      itemView={itemView}
                      variantes={variantes}
                      setVariantes={setVariantes}
                      embalajes={embalajes}
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

export default VerArticulo;