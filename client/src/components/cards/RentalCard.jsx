import React from 'react';
import { Paper, Typography, Box, Grid, Button } from '@mui/material';

function RentalCard({created_at, instrument, return_date, start_date, rentalId, onDeleteRental}) {

    const startObj = new Date(start_date)
    const startStr = startObj.toLocaleString().split(',')
    const startDisplay = startStr[0]

    const receiptObj = new Date(created_at)
    const receiptStr = receiptObj.toLocaleString().split(',')
    const receiptDisplay = receiptStr[0]

    const returnObj = new Date(return_date)
    const returnStr = returnObj.toLocaleString().split(',')
    const returnDisplay = returnStr[0]

    const typeStyle = {
        paddingLeft: '10px',
    }

    const paperStyle = {
        backgroundColor: '#e5e5e5'
    }

    const handleRentalDelete = (id)=>{
        console.log('i was clicked', id)
    }

    return (
        <Paper sx={paperStyle}>
            <Box sx={typeStyle}>
                <Typography>Receipt Date: {receiptDisplay}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Instrument: {instrument}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Start Date: {startDisplay}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Return Date: {returnDisplay}</Typography>
            </Box>
            <Box>
                <Button onClick={()=>onDeleteRental(rentalId)}>Cancel</Button>
            </Box>
        </Paper>
    );
}

export default RentalCard;