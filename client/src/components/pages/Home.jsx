import React from 'react';
import {Box, Typography} from '@mui/material'

function Home() {


    return (
        <>
        <Box sx={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
            <Typography sx={{fontSize: '45px'}}>
                Rent Your Percussion Items Here
            </Typography>
        </Box>
        
        </>
    );
}

export default Home;