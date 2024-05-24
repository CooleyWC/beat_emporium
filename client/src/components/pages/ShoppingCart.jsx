import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {

    const {cartItems, handleRemoveCartItems} = useOutletContext()
    let navigate = useNavigate()

    // make this a card and them import it
    const itemsToDisplay = cartItems.map((item)=>{
        return (
            <div key={item.id}>
                {item.id}
                {item.name}
                <button onClick={()=>handleRemoveCartItems(item)}>Remove From Cart</button>
            </div>
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
            <div>{itemsToDisplay}</div>
            <button onClick={handleCheckoutClick}>Checkout</button>
        </div>
    );
}

export default ShoppingCart;