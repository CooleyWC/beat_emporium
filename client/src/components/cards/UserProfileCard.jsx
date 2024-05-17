import React from 'react';
import {Card, CardContent, Typography} from '@mui/material'

function UserProfileCard({first_name, last_name, email, location}) {
    return (
        <Card>
            <CardContent>
                <Typography>
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

// key={user.id}
//                 first_name={user.first_name}
//                 last_name={user.lase_name}
//                 email={user.email}
//                 location={user.location}