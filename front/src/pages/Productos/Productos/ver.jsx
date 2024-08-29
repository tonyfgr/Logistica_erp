import { useState } from "react";
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
  Card,
  CardContent,
  CardActions,
  Skeleton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import Variante from "./variantes";

//icons
import NumbersIcon from "@mui/icons-material/Numbers";
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Ver = ({ itemView, setFullProduct, fullProduct }) => {
  const [open, setOpen] = useState(false);
  console.log(itemView)

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
            Producto seleccionado
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ p: 3 }} elevation={0}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {!itemView.id ? (
                    <Skeleton variant="rectangular" height={50} />
                  ) : (
                    <img src={itemView.imagen} width={200} height={200} />
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <CardContent>
                    <List>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                              <ListItem>
                                <ListItemAvatar>
                                <Avatar sx={{ 
                                backgroundColor: alpha('#633256', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#633256', 0.25),
                                }, color:'#633256'
                                }}>
                                  <DriveFileRenameOutlineIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Nombre"
                                  secondary={itemView.nombre}
                                />
                              </ListItem>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                              <ListItem>
                                <ListItemAvatar>
                                <Avatar sx={{ 
                                backgroundColor: alpha('#633256', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#633256', 0.25),
                                }, color:'#633256'
                                }}>
                                    <NumbersIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Cantidad"
                                  secondary={itemView.cantidad}
                                />
                              </ListItem>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                              <ListItem>
                                <ListItemAvatar>
                                <Avatar sx={{ 
                                backgroundColor: alpha('#633256', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#633256', 0.25),
                                }, color:'#633256'
                                }}>
                                    <DescriptionIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Descripcion"
                                  secondary={itemView.descripcion_producto}
                                />
                              </ListItem>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                              <ListItem>
                                <ListItemAvatar>
                                <Avatar sx={{ 
                                backgroundColor: alpha('#633256', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#633256', 0.25),
                                }, color:'#633256'
                                }}>
                                    <CategoryIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Categoria"
                                  secondary={itemView.nombre_categoria}
                                />
                              </ListItem>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </List>
                  </CardContent>
                </Grid>
              </Grid>

              <CardActions>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Variante
                      item={itemView.producto_variante}
                      itemId={itemView.id}
                      prodid={itemView.id}
                      open={open}
                      setOpen={setOpen}
                      setFullProduct={setFullProduct}
                      fullProduct={fullProduct}
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

export default Ver;