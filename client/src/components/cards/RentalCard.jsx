import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';

function RentalCard({created_at, instrument, return_date, start_date}) {
    return (
        <Paper>
            <Box>
                <Typography>Receipt Date: {created_at}</Typography>
            </Box>
            <Box>
                <Typography>Instrument: {instrument}</Typography>
            </Box>
            <Box>
                <Typography>Rental Start Date: {start_date}</Typography>
            </Box>
            <Box>
                <Typography>Rental Return Date: {return_date}</Typography>
            </Box>
        </Paper>
    );
}

export default RentalCard;