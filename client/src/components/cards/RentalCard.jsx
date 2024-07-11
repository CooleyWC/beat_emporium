import React, {useState, useEffect} from 'react';
import { Paper, Typography, Box, Grid, Button } from '@mui/material';

function RentalCard({created_at, instrumentName, instrument_id, return_date, start_date, rentalId, onDeleteRental, onReviewIntent, rentalObj, instrumentObj}) {

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
        paddingLeft: '30px'
    }

    const paperStyle = {
        completed: {
            backgroundColor: complete ? "#dee2e6": "#0a9396",
            color: complete ? "black" : "white",
            display: 'flex',
            justifyContent: 'space-around',
            padding: '30px'
        }
    }

    return (
        <>
     
        <Paper sx={paperStyle.completed}>
            <Box sx={typeStyle}>
                <Typography>Instrument: {instrumentName}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Brand: {instrumentObj.brand}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Receipt Date: {receiptDisplay}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Start Date: {startDisplay}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Return Date: {returnDisplay}</Typography>
            </Box>
            <Box sx={{alignSelf: 'flex-end'}}>
                {complete ? 
                (<Button variant='contained' onClick={()=>onReviewIntent(rentalObj, instrumentObj)}>Review this Instrument</Button>)
                :
                <Button variant='contained' color='error' onClick={()=>onDeleteRental(rentalId)}>Cancel</Button>
                }
            </Box>
        </Paper>
     
        </>
    );
}

export default RentalCard;