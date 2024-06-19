import React from 'react';
import {Card, CardContent, Typography, CardMedia, Button} from '@mui/material'

function CartCard({name, itemObj, image, handleRemoveCartItems, startDate, returnDate}) {

    const startDateObj = new Date(startDate)
    const returnDateObj = new Date(returnDate)

    const startStr = startDateObj.toLocaleString().split(',')
    const startString = startStr[0]

    const returnStr = returnDateObj.toLocaleString().split(',')
    const returnString = returnStr[0]

    let startDateCopy = startDateObj
    let returnDateCopy = returnDateObj
    let loop = new Date(startDateCopy)

    let totalRentalDays = 0

    while(loop <= returnDateCopy){
        totalRentalDays +=1
        let newDate = loop.setDate(loop.getDate()+1)
        loop = new Date(newDate)
    }

    return (
        <Card sx={{display: 'flex', justifyContent: 'space-around'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{maxHeight: '80px', maxWidth: '80px'}}
            />
            <CardContent>
                <Typography>{name}</Typography>
                <Typography>Start Date: {startString}</Typography>
                <Typography>Return Date: {returnString}</Typography>
                <Typography>Total Rental Days: {totalRentalDays} </Typography>

            </CardContent>
            <Button onClick={()=>handleRemoveCartItems(itemObj)}>Remove From Cart</Button>
        </Card>
    );
}

export default CartCard;