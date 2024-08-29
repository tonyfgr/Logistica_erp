
import { Link } from "react-router-dom";

import "./index.css";
import { Container, Grid, Card, CardActionArea, Typography } from '@mui/material';

import CustomCard from "../../components/Card";
//iconos
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ApiIcon from '@mui/icons-material/Api';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { purple } from '@mui/material/colors';

const Comerciales = () => {

    const cart_items = [
        { url: "/comerciales/clientes", icono: SupportAgentIcon, name: "CLIENTE" },
        { url: "#proveedor", icono: ArrowRightIcon, name: "PROVEEDOR" },
    ];

    return (
        <Container>
            <Grid container spacing={4}>

                {cart_items.map((item) => (
                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ minWidth: 300}}>
                            <CardActionArea>
                                <Link to={item.url}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <item.icono sx={{ fontSize: "60px", color: purple[900] }} />
                                        </Grid>
                                        <Grid item xs={12} sm={8} md={8}>
                                            <Typography sx={{ fontSize: 30 }} color="text.secondary">
                                                {item.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Link>
                            </CardActionArea>
                        </Card >
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Comerciales;