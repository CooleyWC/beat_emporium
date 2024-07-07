import React from 'react';
import {Card, CardContent, Typography} from '@mui/material'

function UserProfileCard({first_name, last_name, email, location}) {
    return (
        <Card sx={{backgroundColor: '#780000', color: '#fdf0d5'}}>
            <CardContent>
                <Typography sx={{fontSize: '50px'}}>
                    {`${first_name} ${last_name}`}
                </Typography>
                <Typography>
                    {email}
                </Typography>
                <Typography>
                    {location}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserProfileCard;
