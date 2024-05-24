import React, {useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import {Box} from '@mui/material'
import { useOutletContext } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PIh6FRooiRlSIbzyMN3RxjtLClLzzjm4d0L2Ne7QjysYBIYx1lNYpVe2lWFgSL3UF2aj97ZkMufZRVTpzhWeZiF009APCTydE');

const PaymentPage = () =>{

  const {cartItems} = useOutletContext()
  console.log(`from payment page: ${cartItems}`)

  const fetchClientSecret = useCallback(() => {
     
      return fetch("/create_checkout_session", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          items: [
          {id: 1, quantity: 1},
          {id: 2, quantity: 2},
          ]
        })
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);
  
    const options = {fetchClientSecret};
  
    return (
      <Box sx={{marginTop: '100px'}} id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </Box>
    )

}

export default PaymentPage
