import React from 'react';
import {Card, CardContent, Typography, CardMedia, Button} from '@mui/material'

function CartCard({name, itemObj, image, handleRemoveCartItems}) {

    // const rentalDates = currentRentals.map((rental)=>{
    //     return (
    //         {"start": rental.start_date, "end": rental.return_date}
    //     )
    // })

    // console.log(name)
    // console.log(rentalDates)

    return (
        <Card>
            <CardMedia 
                component='img'
                image={image}
                sx={{maxHeight: '80px', maxWidth: '80px'}}
            />
            <CardContent>
                <Typography>{name}</Typography>

            </CardContent>
            <Button onClick={()=>handleRemoveCartItems(itemObj)}>Remove From Cart</Button>
        </Card>
    );
}

export default CartCard;