import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {AppBar, Container, Typography, Toolbar, IconButton, Button, Box, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './context/AuthProvider';
import {useState} from 'react'

const isUser = [
    {
        page: 'Instruments',
        route: '/instruments',
    },
    {
        page: 'Dashboard',
        route: '/dashboard',
    }
]

const noUser = [
    {
        page: 'Instruments',
        route: '/instruments',
    },
    {
        page: 'Login',
        route: '/login'
    }
]

function NavBar() {

    const [newUsers, setNewUsers] = useState([])

    const {user, logout} = useAuth();

    const [anchorElNav, setAnchorElNav] = React.useState(null)

    const handleOpenNavMenu = (e)=>{
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = ()=>{
        setAnchorElNav(null)
    }

    const handleLogoutClick = ()=>{
        console.log('logout clicked')
    }

    return (
        <AppBar position='fixed'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'Helvetica',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Cooley's Beat Emporium
                    </Typography>

                    <Box sx={{flexGrow:1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'},}}
                        >
                            {user?(
                                isUser.map(({page, route})=>(
                                    <MenuItem
                                        key={page}
                                        component={NavLink}
                                        to={route}
                                        onClick={handleCloseNavMenu}
                                    >
                                        {page}
                                    </MenuItem>
                                )))
                                : (
                                    noUser.map(({page, route})=>(
                                        <MenuItem
                                            key={page}
                                            component={NavLink}
                                            to='/'
                                        >
                                            {page}
                                        </MenuItem>
                                    ))
                                )}
                                    {user && (
                                        <MenuItem
                                            onClick={handleLogoutClick}
                                            component={NavLink}
                                            to='/'
                                        >
                                            Logout
                                        </MenuItem>
                                    )}
                        </Menu>
                    </Box>
                    {/* next screen size */}
                    <Typography
                        variant='h5'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr:2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'helvetica',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Cooley's Beat Emporium
                    </Typography>
                    
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'flex-end'}}>
                        {user ? (
                            isUser.map(({page, route})=>(
                                <Button
                                    key={page}
                                    component={NavLink}
                                    to={route}
                                    sx={{my:2, color: 'white', display: 'block',
                                        '&: hover': {
                                            backgroundColor: 'white',
                                            color: 'black'
                                        }}}
                                        onClick={handleCloseNavMenu}
                                >
                                    <Typography>
                                        {page}
                                    </Typography>
                                </Button>
                            ))
                        )
                        :(
                            noUser.map(({page, route})=>(
                                <Button
                                    key={page}
                                    component={NavLink}
                                    to={route}
                                    sx={{my:2, color: 'white', display: 'block',
                                        '&: hover': {
                                            backgroundColor: 'white',
                                            color: 'black'
                                        }}}
                                        onClick={handleCloseNavMenu}
                                >
                                    <Typography>
                                        {page}
                                    </Typography>
                                </Button>
                            ))
                        )}
                        {user && (
                            <Button
                                component={NavLink}
                                to='/'
                                sx={{my:2, color: 'white', display: 'block',
                                        '&: hover': {
                                            backgroundColor: 'white',
                                            color: 'black'
                                        }}}
                                        onClick={()=>{
                                            handleLogoutClick();
                                            handleCloseNavMenu();
                                        }}
                            >
                                <Typography>
                                    Logout
                                </Typography>

                            </Button>
                        )}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;