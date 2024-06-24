import React, {useState, useEffect} from 'react';
import { Paper, Typography, Box, Grid, Button } from '@mui/material';

function RentalCard({created_at, instrument, instrument_id, return_date, start_date, rentalId, onDeleteRental, onReviewIntent}) {

    const todayDate = new Date()

    const [complete, setComplete] = useState(false)

    const startObj = new Date(start_date)
    const startStr = startObj.toLocaleString().split(',')
    const startDisplay = startStr[0]

    const receiptObj = new Date(created_at)
    const receiptStr = receiptObj.toLocaleString().split(',')
    const receiptDisplay = receiptStr[0]

    const returnObj = new Date(return_date)
    const returnStr = returnObj.toLocaleString().split(',')
    const returnDisplay = returnStr[0]

    useEffect(()=>{
        if(todayDate > returnObj){
            setComplete(true)
        }
    }, [])

    const typeStyle = {
        paddingLeft: '10px',
    }

    const paperStyle = {
        completed: {
            backgroundColor: complete ? "#dee2e6": "#caf0f8"
        }
        // backgroundColor: '#e5e5e5'
    }


    return (
        <Paper sx={paperStyle.completed}>
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
                {complete ? 
                (<Button onClick={()=>onReviewIntent(rentalId, instrument_id)}>Review this Instrument</Button>)
                :
                <Button onClick={()=>onDeleteRental(rentalId)}>Cancel</Button>
                }
            </Box>
        </Paper>
    );
}

export default RentalCard;