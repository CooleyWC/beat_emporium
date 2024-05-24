import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {

    const {cartItems} = useOutletContext()

    let navigate = useNavigate()
    // console.log(`from shopping cart: ${cartItems}`)

    // make this a card and them import it
    const itemsToDisplay = cartItems.map((item)=>{
        return (
            <div key={item.id}>
                {item.id}
                {item.name}
            </div>
        )
    })

    const handleCheckoutClick = ()=>{
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