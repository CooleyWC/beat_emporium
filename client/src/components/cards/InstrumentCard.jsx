import React from 'react';
import {Card, CardContent, Typography, CardMedia} from '@mui/material' 

function InstrumentCard({name, description, for_rent, image, model, rent_price, reviews, sale_price, size}) {
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
        </Card>
    );
}

export default InstrumentCard;


// key={instrument.id}
//                         name={instrument.name}
//                         description={instrument.description}
//                         for_rent={instrument.for_rent}
//                         image={instrument.image}
//                         model={instrument.modal}
//                         rent_price={instrument.rent_price}
//                         reviews={instrument.reviews}
//                         sale_price={instrument.sale_price}
//                         size={instrument.size}