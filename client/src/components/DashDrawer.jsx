import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box} from '@mui/material'

function DashDrawer({drawerOpen, toggleDrawer}) {

    let navigate = useNavigate();

    const drawerWidth = 250

    return (
        <Drawer  variant='permanent' anchor='left' open={drawerOpen}  onClose={()=>toggleDrawer()} sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
            <Box sx={{ width: drawerWidth }}  role='presentation'>
                <List sx={{marginTop: '75px'}}>
                    <ListItem>
                        <ListItemButton
                            onClick={()=>{
                                navigate('/dashboard/user_profile') 
                                }}
                        >
                            <ListItemText>
                                Profile
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton 
                            onClick={()=>{
                                navigate('/dashboard/upcoming_rentals') 
                                }}>
                            <ListItemText>
                                Upcoming Rentals
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                            onClick={()=>{
                                navigate('/dashboard/previous_rentals')
                                }}
                            >
                                Previous Rentals
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                            onClick={()=>{
                                navigate('/dashboard/user_reviews')
                                }}
                            >
                                Your Reviews
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default DashDrawer;