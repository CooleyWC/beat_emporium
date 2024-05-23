import React from 'react';
import {Card, CardContent, Typography, CardMedia, Button} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import { useOutletContext } from 'react-router-dom';


function InstrumentCard({name, description, for_rent, image, model, 
    rent_price, reviews, sale_price, size, instrumentObj}) {

    const {user} = useAuth()
    const{handleCartItems} = useOutletContext();

    const handleAdd = ()=>{
        if(!user){
            alert('You must be logged in to add this to your cart')
        }
        handleCartItems(instrumentObj)
    }

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
            <Button onClick={handleAdd}>Add To Cart</Button>
        </Card>
    );
}

export default InstrumentCard;

