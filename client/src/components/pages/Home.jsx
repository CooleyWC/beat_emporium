import React from 'react';
import {Box, Typography, Card, CardMedia} from '@mui/material'

function Home() {
    return (
        <>
        <Box sx={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
            <Typography sx={{fontSize: '45px'}}>
                Rent Your Percussion Items Here
            </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Card sx={{maxWidth: '900px'}}>
                <CardMedia
                    component='img'
                    src='https://images.unsplash.com/photo-1626962131635-47fdba78fe77?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

                >
                </CardMedia>
            </Card>
        </Box>
        
        </>
    );
}

export default Home;