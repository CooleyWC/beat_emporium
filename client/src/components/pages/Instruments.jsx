import React from 'react';
import {Box, Typography, Grid} from '@mui/material';


function Instruments() {


    
    // const instrumentCards = 
        // <Grid containter>
        // </Grid>

    return (
        <>
        <Box sx={{marginTop: '100px'}}>
            <Typography sx={{fontSize: '50px'}}>
                Instruments
            </Typography>
        </Box>
        <Box sx={{marginBottom: '10px'}}>
            <Typography>Filter goes here</Typography>
        </Box>
        <Box>
            <Typography>Instrument Cards Go Here</Typography>
        </Box>
        </>
    );
}

export default Instruments;