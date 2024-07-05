import React from 'react';
import {Card, CardContent, Typography, CardMedia, Button} from '@mui/material'

function AdminInstCard({color, name, description, for_rent, image, model, rent_price, 
    reviews, sale_price, size, currentRentals, instrumentObj, in_stock, onDeleteInstr}) {
    
    return (
        <Card sx={{display: 'flex', justifyContent: 'flex-start', width:'100%'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{maxHeight: '80px', maxWidth: '80px', alignSelf: 'flex-start'}}
            
            />
            <CardContent>
                <Typography>{name}</Typography>
                <Typography>{description}</Typography>
                <Typography>{size}</Typography>
                <Typography>{color}</Typography>
                <Button variant='contained' onClick={()=>{onDeleteInstr(instrumentObj.id)}} color='error'>Delete</Button>

            </CardContent>

        </Card>
    );
}

export default AdminInstCard;
