import React from 'react';
import {Box, Typography} from '@mui/material'
import {useCart} from '../context/CartProvider'

function Home() {

    const {cartItems} = useCart()
    console.log('home', cartItems)


    return (
        <>
        <Box sx={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
            <Typography sx={{fontSize: '45px'}}>
                Rent Your Percussion Items Here
            </Typography>
        </Box>
        
        </>
    );
}

export default Home;