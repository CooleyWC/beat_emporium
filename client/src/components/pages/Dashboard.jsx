import React from 'react';
import {Box, Typography} from '@mui/material'
import UserProfileCard from '../cards/UserProfileCard';
import { useAuth } from '../context/AuthProvider';


function Dashboard() {

    const {user} = useAuth()

    if(user===null || !user){
        return <p>loading...</p>
    }

    return (
        <>
        <Box sx={{marginTop: '100px'}}>
            <Typography>Dashboard</Typography>
        </Box>
        <Box>
            <UserProfileCard 
                key={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                location={user.location}
            />
        </Box>
        </>
    );
}

export default Dashboard;