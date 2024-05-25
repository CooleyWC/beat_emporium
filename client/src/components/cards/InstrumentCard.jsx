import React from 'react';
import {Card, CardContent, Typography, CardMedia, Button} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import { useOutletContext } from 'react-router-dom';


function InstrumentCard({name, description, for_rent, image, model, 
    rent_price, reviews, sale_price, size, instrumentObj, currentRentals}) {

    const {user} = useAuth()
    const{handleCartItems, cartItems, handleRemoveCartItems} = useOutletContext();

    const checkIfItemInCart = cartItems.find((item)=>{
        return item.id === instrumentObj.id
    })

    const handleAdd = ()=>{
        if(!user){
            alert('You must be logged in to add this to your cart')
            return
        }
        
        handleCartItems(instrumentObj)
    }

    const handleRemove = ()=>{
        handleRemoveCartItems(instrumentObj)
    }

    const rentalDates = currentRentals.map((rental)=>{
        return (
            {"start": rental.start_date, "end": rental.return_date}
        )
    })

    console.log(name)
    console.log(rentalDates)

    return (
        <Card sx={{maxWidth: '400px', minHeight: '600px', maxHeight: '600px'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{height: '200px'}}
            />
            <CardContent>
                <Typography>
                    {name}
                </Typography>
                <Typography>
                    {model}
                </Typography>
                <Typography>
                    {size}
                </Typography>
                <Typography>
                    {description}
                </Typography>
                <Typography>
                    {rent_price}
                </Typography>
            </CardContent>
            {checkIfItemInCart ? <Button onClick={handleRemove}>Remove From Cart</Button>: <Button onClick={handleAdd}>Add To Cart</Button>}
        </Card>
    );
}

export default InstrumentCard;

