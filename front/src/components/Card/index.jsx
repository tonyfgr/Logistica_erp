
import { Link } from "react-router-dom";

import { Paper, Grid, Button, Card, CardActionArea, Typography } from '@mui/material';
import { Fragment } from 'react';

//iconos
import { purple } from '@mui/material/colors';

const CustomCard = ({nombre, url, icono}) => {
    return (
        <Card>
            <CardActionArea>
                <Link to={url}>
                    <Grid container>
                        <Grid item xs={12} sm={4} md={4}>
                            <icono sx={{ fontSize: "60px", color: purple[900] }}/>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            {nombre}
                        </Grid>
                    </Grid>
                </Link>
            </CardActionArea>
        </Card >
    )
}

export default CustomCard;


