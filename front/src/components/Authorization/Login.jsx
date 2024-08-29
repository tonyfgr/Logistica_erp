import { useRef, useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { TextField, Card
    ,Button, Box, useMediaQuery, Grid, InputLabel, Typography, InputAdornment
 } from '@mui/material';


import { Link, useNavigate, useLocation } from "react-router-dom"
//iconos
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

import axios from "../../api/axios"
const LOGIN_URL = 'api/login/'

const Login = () => {
    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/"

    const userRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        userRef.current;
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({email: email, password: password}), {
                headers: { 'Content-Type':'application/json' },
                withCredentials: true
            })

            console.log(JSON.stringify(response?.data))

            const access = response?.data?.accessToken
            setAuth({email, password, access})

            setEmail('')
            setPassword('')
            navigate(from, {replace:true})
        } catch(err) {
            if(!err?.response){
                setErrorMessage('No server response')
                console.log(err)
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing email or password')
            } else if (err.response?.status === 401){
                setErrorMessage('Unauthorized')
            } else {
                setErrorMessage('Login failed')
            }

            errRef.current
        }
    }

    return (
        <div>
            <p ref={errRef} className={errorMessage ? "Error message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={3}>

                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <Card elevation={10} sx={{p:5 , mt:3}}> 
                        <Typography fontFamily={'inherit'} sx={{ color:'#633256' , fontSize:20, pb:3}} align={'center'}>
                            Iniciar sesión
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                required 
                                label={<span>E-mail</span>}
                                type="text"
                                size="small"
                                color="secondary"
                                margin="dense"
                                id="textfields"
                                variant="filled"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <PersonIcon/>
                                      </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label={<span>Contraseña</span>}
                                type="password"
                                size="small"
                                color="secondary"
                                margin="dense"
                                id="textfields"
                                variant="filled"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required 
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
                                id="login-button"
                                variant="contained"
                                type="submit"
                                sx={{ backgroundColor:'#633256' , "&:hover": {backgroundColor: "#633256" }, mt:4, mb:2  }}
                            >
                                Ingresar
                            </Button>
                            
                        </form>
                        <p>
                            ¿Necesitas una cuenta? <br />
                            <span className="line">
                                <Link to="/register">¡Regístrate!</Link>
                            </span>
                        </p>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;