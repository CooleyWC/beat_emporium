import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CartCard from '../cards/CartCard';
import {Box, Typography, Button} from '@mui/material'

function ShoppingCart() {

    const {cartItems, handleRemoveCartItems} = useOutletContext()
    let navigate = useNavigate()

    // console.log('cart items from shopping cart', cartItems)

    const itemsToDisplay = cartItems.map((item)=>{
        
        return (
            
            <CartCard 
                key={item.id}
                itemObj={item}
                name={item.name}
                image={item.image}
                handleRemoveCartItems={handleRemoveCartItems}
            />
        )
    })

    const handleCheckoutClick = ()=>{
        if(cartItems.length == 0){
            console.log('you dont have any items in your cart')
            return
        }
        navigate('/payment_page')
    }

    return (
     
        <Box style={{marginTop: '100px'}}>
          
            <Typography>Shopping Cart</Typography>
        
            {cartItems.length == 0 ? <Typography>No items in cart</Typography> :(
                <>
                <Box>{itemsToDisplay}</Box>
                <Button variant='contained' onClick={handleCheckoutClick}>Checkout</Button>
                </>
            )}
            {/* <Box>{itemsToDisplay}</Box>
            <Button variant='contained' onClick={handleCheckoutClick}>Checkout</Button> */}
       
        </Box>
   
    );
}

export default ShoppingCart;