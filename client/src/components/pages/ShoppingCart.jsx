import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CartCard from '../cards/CartCard';

function ShoppingCart() {

    const {cartItems, handleRemoveCartItems} = useOutletContext()
    let navigate = useNavigate()

    console.log(cartItems)

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
        <div style={{marginTop: '100px'}}>
            <h1>Shopping Cart</h1>
            {/* why is this getting an error after adding start and end date to new isntrument obj */}
            <div>{itemsToDisplay}</div>
            <button onClick={handleCheckoutClick}>Checkout</button>
        </div>
    );
}

export default ShoppingCart;