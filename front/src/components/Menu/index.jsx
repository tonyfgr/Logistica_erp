import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Grid,
  Toolbar,
  List,
  CssBaseline,
  Drawer,
  AppBar,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import "./index.css";

// Logout imports
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { DrawerHeader } from "./extra.jsx";
import { SearchIconWrapper, StyledInputBase, Search } from "./extra.jsx";
import CustomListItem from "./listitem";
import { menuItems } from "../../resources/menuItems";

const outSettings = ["Iniciar", "Registrarme"];
const inSettings = ["Perfil"];
const drawerWidth = 240;

const MenuNavbar = ({ content }, props) => {

    // Logout system
    const navigate = useNavigate()
    
    const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/login')
    }

    const theme = useTheme();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [open, setOpen] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const drawer = (
        <div style={{ background: "#EDECEF", height: "100vh" }}>
        <DrawerHeader>
            <h1 className="logo">ALPACA</h1>
            <Divider />
        </DrawerHeader>
        <List style={{ background: "#EDECEF" }}>
            {menuItems.map((item, index) => (
            <CustomListItem
                onClick={handleDrawerOpen}
                id="items"
                key={item.name}
                name={item.name}
                url={item.url}
                icons={item.icon}
                item={item.item}
                bigOpen={open}
            />
            ))}
        </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
            width: { sm: "calc(100% - 240px)" },
            ml: { sm: `${drawerWidth}px` },
            background: "#EDECEF",
            }}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
            >
                <MenuIcon style={{ color: "black" }} />
            </IconButton>
            <Grid container>
                <Grid item xs={1} sm={9} md={10} lg={11}>
                <div className="buscar">
                    <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Buscar…"
                        inputProps={{ "aria-label": "search" }}
                    />
                    </Search>
                </div>
                </Grid>
                <div className="cuenta">
                <Grid item xs={11} sm={2} md={1}>
                    <Box sx={{ flexGrow: 1 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 2.3 }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://images.unsplash.com/photo-1474904200416-6b2b7926f26f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {inSettings.map((setting) => (
                        <MenuItem
                            key={setting}
                            onClick={handleCloseUserMenu}
                            style={{ color: "0000" }}
                        >
                            {setting}
                        </MenuItem>
                        ))}
                        {/* Login button (provisional) */}
                        <Button variant="text" color="secondary" onClick={signOut}>Logout</Button>
                    </Menu>
                    </Box>
                </Grid>
                </div>
            </Grid>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
        >
            <DrawerHeader />
            {content}
        </Box>
        </Box>
    );
};

export default MenuNavbar;