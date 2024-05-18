import React from 'react';
import {Box, Typography, Stack} from '@mui/material'
import UserProfileCard from '../cards/UserProfileCard';
import { useAuth } from '../context/AuthProvider';
import RentalCard from '../cards/RentalCard';


function Dashboard() {

    const {user} = useAuth()

    if(user===null || !user){
        return <p>loading...</p>
    }

    const userRentals = user.rentals
    console.log(userRentals)

    const userRentalsMap = userRentals.map((rental)=>{
        return (
            <RentalCard 
                key={rental.id}
                created_at={rental.created_at}
                instrument={rental.instrument.name}
                return_date={rental.return_date}
                start_date={rental.start_date}
            />
        )
    })

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
        <Box>
            <Typography>Rentals go here</Typography>
        </Box>
        <Stack>
            {userRentalsMap}
        </Stack>
        </>
    );
}

export default Dashboard;