import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';

function RentalCard({created_at, instrument, return_date, start_date}) {

    const typeStyle = {
        paddingLeft: '10px',
    }

    const paperStyle = {
        backgroundColor: '#e5e5e5'
    }

    return (
        <Paper sx={paperStyle}>
            <Box sx={typeStyle}>
                <Typography>Receipt Date: {created_at}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Instrument: {instrument}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Start Date: {start_date}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Return Date: {return_date}</Typography>
            </Box>
        </Paper>
    );
}

export default RentalCard;