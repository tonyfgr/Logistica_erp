//Style
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled, useTheme, alpha } from "@mui/material/styles";
//User profile style
import { Avatar , FormControlLabel, FormGroup, IconButton, Switch} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
//Functionality
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import UserRequest from '../Requests/UserRequest';


export default function UserProfile() {
    const [open, setOpen] = useState(false);
    const [auth, setAuth] = useState(false);
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    //Getting user data through its request
    const user = UserRequest()

    //Handle dialog functions
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* Boton para acceder a la pagina de perfil */}
            <Button variant="contained" color="secondary" onClick={handleClickOpen} size='small' fullWidth
            sx={{
                backgroundColor: "#633256",
                "&:hover": {
                  backgroundColor: alpha("#633256", 0.25),
                  color:"#633256",
                },
              }}>
                <span>Ver más</span>
            </Button>

            {/* Pagina de perfil mediante el uso de Dialog  */}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch
                        checked={auth}
                        onChange={handleChange}
                        aria-label="login switch"
                        color='secondary'
                        />
                    }
                    label={auth ? 'Salir del Modo Edición' : 'Modo Edición'}
                    />
                </FormGroup>


                    {auth ? (
                        <>
                        <Avatar
                            alt={user?.username}
                            sx={{ width: 100, height: 100, mx: 'auto', my:4}}
                        ><IconButton component="label"><input hidden accept="image/*" type="file" /><FileUploadIcon/></IconButton></Avatar>
                        <TextField
                            fullWidth
                            focused
                            label={<span>Nombre</span>}
                            size="small"
                            color="secondary"
                            margin="dense"
                            defaultValue={user?.username}
                            sx={{textAlign:'center', mx:'auto'}}
                        />

                        <TextField
                            fullWidth
                            focused
                            label={<span>Email</span>}
                            margin="dense"
                            size="small"
                            color="secondary"
                            defaultValue={user?.email}
                            InputLabelProps={{
                                shrink: true,
                              }}
                        />
                        <TextField
                            label={<span>Rol</span>}
                            fullWidth
                            focused
                            size="small"
                            color="secondary"
                            defaultValue={user?.profile_user?.rol}
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                              }}
                        />

                        <TextField
                            label={<span>Área</span>}
                            defaultValue={user?.profile_user?.area}
                            margin="dense"
                            size="small"
                            color="secondary"
                            fullWidth
                            focused
                            InputLabelProps={{
                                shrink: true,
                              }}
                        />
                        </>
                        ):(
                        <>
                        <Avatar
                            alt={user?.username}
                            src="https://images.unsplash.com/photo-1474904200416-6b2b7926f26f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            sx={{ width: 100, height: 100, mx: 'auto'}}
                        />

                        <h2 style={{textAlign:'center'}}>{user?.username}</h2>
                        <TextField
                            id="filled-read-only-input"
                            fullWidth
                            label={<span>Email</span>}
                            margin="dense"
                            size="small"
                            value={user?.email}

                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField
                            id="filled-read-only-input"
                            label={<span>Rol</span>}
                            fullWidth
                            size="small"
                            value={user?.profile_user?.rol}
                            margin="dense"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField
                            id="filled-read-only-input"
                            label={<span>Área</span>}
                            value={user?.profile_user?.area}
                            margin="dense"
                            size="small"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        </>
                    )}

                    <DialogActions sx={{m:1}}>
                        <Button onClick={handleClose} fullWidth
                        sx={{
                            backgroundColor: alpha("#633256", 0.25),
                                color:"#633256",
                            "&:hover": {
                                backgroundColor: "#633256",
                                color:"white",
                            },
                        }}><span>Cancelar</span></Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </div>
    );
}
