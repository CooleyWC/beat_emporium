import React from 'react';
import {Card, CardContent, Typography, Box} from '@mui/material'

function UserProfileCard({first_name, last_name, email, location, user}) {
    // console.log('user', user)

    const instrumentNames = user.instruments?.map((instrument)=>{
        return instrument.name
    })
   

    return (
        <Card sx={{backgroundColor: '#d0dfe8', color: 'black', padding: '5%'}}>
            <CardContent>
                <Typography sx={{fontSize: '70px'}}>
                   {`${first_name} ${last_name}`}
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    Email: {email}
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    Location: {location}
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    Instruments You Have Rented:
                </Typography>
                <Box>
                {instrumentNames.map(name=>(
                    <Typography
                        key={name}
                        sx={{paddingLeft: '5%'}}
                    >
                        {name}
                    </Typography>
                ))}
                </Box>
              
            
            </CardContent>
        </Card>
    );
}

export default UserProfileCard;
