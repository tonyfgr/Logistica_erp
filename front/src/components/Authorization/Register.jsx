import { useRef, useEffect, useState} from "react"

import { TextField, Card
        ,Button, Box, useMediaQuery, Grid, InputLabel, Typography, InputAdornment
} from '@mui/material';

import { Formik } from "formik";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

//iconos
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import { Link } from "react-router-dom";

import axios from "../../api/axios"
import { get } from "../../services/mantenimiento";

const REGISTER_URL = 'api/register/'

const Register = () => {
    // const errRef = useRef();

    //Related with user
    const [areas, setAreas] = useState([]);
    const [item, setItem] = useState({})

    // Error messages
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const URL = "api/mantenimientos/areas/";
        get(setAreas, URL);
    }, []);

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(REGISTER_URL, values,
            );
            // TODO: remove console.logs before deployment
            setSuccess(true);
            
            setItem({});

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
                console.log(err)
            }
            // errRef.current.focus();
        }

        console.log(values)
    }

    return (
        <>
            {success ? (
                <section>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={3}>

                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <Card elevation={10} sx={{p:5 , mt:3}}> 
                                <Typography fontFamily={'inherit'} sx={{ color:'#633256' , fontSize:20, pb:3}} align={'center'}>
                                    ¡Listo! Ya puedes iniciar sesión
                                </Typography>
                                
                                <Link to='/'>
                                    <Button
                                        fullWidth
                                        id="textfields"
                                        variant="contained"
                                        type="submit"
                                        sx={{ backgroundColor:'#633256' , "&:hover": {backgroundColor: "#633256" }, mt:2, mb:2  }}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Link>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            
                        </Grid>
                    </Grid>
                </section>
            ) : (
                <section>
                    {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}

                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={3}>

                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <Card elevation={10} sx={{p:5 , mt:3}}> 
                                <Typography fontFamily={'inherit'} sx={{ color:'#633256' , fontSize:20, pb:3}} align={'center'}>
                                    Registro
                                </Typography>
                                <Formik initialValues={item} onSubmit={handleSubmit}>
                                {({ values, handleSubmit, handleChange }) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                        
                                        {/* Name input  */}
                                        <TextField
                                            fullWidth
                                            required 
                                            label={<span>Nombre</span>}
                                            name="trabajador.persona.nombre"
                                            type="text"
                                            size="small"
                                            color="secondary"
                                            margin="dense"
                                            id="textfields"
                                            variant="filled"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            aria-describedby="uidnote"
                                            InputProps={{
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <AlternateEmailIcon/>
                                                </InputAdornment>
                                                ),
                                            }}
                                        />

                                        {/* Username input */}
                                        <TextField
                                            fullWidth
                                            required 
                                            label={<span>Usuario</span>}
                                            name="username"
                                            type="text"
                                            size="small"
                                            color="secondary"
                                            margin="dense"
                                            id="textfields"
                                            variant="filled"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            aria-describedby="uidnote"
                                            InputProps={{
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <AlternateEmailIcon/>
                                                </InputAdornment>
                                                ),
                                            }}
                                        />

                                        {/* Email input */}
                                        <TextField
                                            fullWidth
                                            label={<span>E-mail</span>}
                                            name="email"
                                            type="text"
                                            size="small"
                                            color="secondary"
                                            margin="dense"
                                            id="textfields"
                                            variant="filled"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            required
                                            aria-describedby="uidnote"
                                            InputProps={{
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <PersonIcon/>
                                                </InputAdornment>
                                                ),
                                            }}
                                        />

                                        <Box sx={{
                                            width:'100%',
                                            flexGrow: 1
                                        }}>
                                            {/* Rol select input */}
                                            <Grid container spacing={2} columns={16}>
                                                <Grid item xs={8}>
                                                    <FormControl margin="dense" variant="filled" sx={{ width: '100%'}} size="small">
                                                        <InputLabel id="rol-label" color="secondary"><span>Rol</span></InputLabel>
                                                        <Select
                                                            name="profile_user.rol"
                                                            labelId="rol-label"
                                                            id="textfields"
                                                            color="secondary"
                                                            required
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Ninguno">
                                                                <em>Ninguno</em>
                                                            </MenuItem>
                                                            <MenuItem value="Trabajador"><span>Trabajador</span></MenuItem>
                                                            <MenuItem value="Gerente"><span>Gerente</span></MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* Area select input */}
                                                <Grid item xs={8}>
                                                    <FormControl margin="dense" variant="filled" sx={{ width: '100%' }} size="small">
                                                        <InputLabel id="area-label" color="secondary"><span>Area</span></InputLabel>
                                                        <Select
                                                            name="trabajador.area"
                                                            labelId="area-label"
                                                            id="textfields"
                                                            color="secondary"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={null}>
                                                                <em>Ninguno</em>
                                                            </MenuItem>
                                                            {areas.map((item, i) => {
                                                                return (
                                                                    <MenuItem key={i} value={item.id}><span>{item.nombre}</span></MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                            

                                        {/* Password input */}
                                        <TextField
                                            fullWidth
                                            label={<span>Contraseña</span>}
                                            name="password"
                                            type="password"
                                            size="small"
                                            color="secondary"
                                            margin="dense"
                                            id="textfields"
                                            variant="filled"
                                            onChange={handleChange}
                                            required
                                            aria-describedby="pwdnote"
                                            InputProps={{
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <KeyIcon/>
                                                </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Button
                                            fullWidth
                                            id="submitButton"
                                            variant="contained"
                                            type="submit"
                                            sx={{ backgroundColor:'#633256' , "&:hover": {backgroundColor: "#633256" }, mt:4, mb:2  }}
                                        >
                                            Registro
                                        </Button>
                                        </form>
                                    )
                                }}
                                </Formik>
                                
                                <p>
                                    ¿Ya tienes una cuenta? <br />
                                    <span className="line">
                                        <Link to="/login">¡Inicia sesión!</Link>
                                    </span>
                                </p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            
                        </Grid>
                    </Grid>
                </section>
            )}
        </>
    )
}   

export default Register
