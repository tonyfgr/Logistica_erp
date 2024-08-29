import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { styled, useTheme, alpha } from "@mui/material/styles";
// Datos del perfil de usuario
import UserProfile from './UserProfile';
import UserRequest from '../Requests/UserRequest'

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { Typography , List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton} from '@mui/material';


const GeneralUserData = () => {
    const user = UserRequest()

    return (
        <div>
            <Box sx={{
                flexGrow: 1,
                width: '100%'
            }}>
                <Paper variant='outlined' sx={{
                    p:2
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12}>
                                <Typography
                                    sx={{  }}
                                    component="span"
                                >
                                    {<strong>Usuario</strong>}
                                </Typography>
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    <ListItem alignItems="flex-start" secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                             <UserProfile/>
                                            </IconButton>
                                        }>
                                        <ListItemAvatar>
                                        <Avatar alt={user?.username} src="https://images.unsplash.com/photo-1474904200416-6b2b7926f26f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary={<strong>{user?.username}</strong>}
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {<span>{user?.email}</span>}
                                            </Typography>
                                            {<span> -- {user?.profile_user?.rol}</span>}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />

                                </List>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default GeneralUserData;
