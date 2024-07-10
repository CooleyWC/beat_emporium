import React from 'react';
// import { useOutletContext } from 'react-router-dom';
import {useCart} from '../context/CartProvider'
import { useNavigate } from 'react-router-dom';
import CartCard from '../cards/CartCard';
import {Box, Typography, Button} from '@mui/material'

function ShoppingCart() {

    const {cartItems, handleRemoveCartItems} = useCart()
    let navigate = useNavigate()

    // console.log('cart items from shopping cart', cartItems)

    const itemsToDisplay = cartItems.map((item)=>{
        return ( 
            <CartCard 
                key={item.id}
                itemObj={item}
                name={item.name}
                image={item.image}
                startDate={item.start_date}
                returnDate={item.end_date}
                handleRemoveCartItems={handleRemoveCartItems}
            />
        )
    })

    const handleCheckoutClick = ()=>{
        navigate('/payment_page')
    }

    return (
     
        <Box style={{marginTop: '10px'}}>
            <Typography sx={{fontSize: '30px'}}>Shopping Cart</Typography>
                {cartItems.length == 0 ? <Typography sx={{marginLeft: '10px'}}>(no items in cart)</Typography> :(
                <>
                <Box>{itemsToDisplay}</Box>
                <Button variant='contained' onClick={handleCheckoutClick}>Checkout</Button>
                </>
            )}
        </Box>
   
    );
}

export default ShoppingCart;