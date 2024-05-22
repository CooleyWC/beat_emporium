import React, {useState, useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import {Box} from '@mui/material'

const stripePromise = loadStripe('pk_test_51PIh6FRooiRlSIbzyMN3RxjtLClLzzjm4d0L2Ne7QjysYBIYx1lNYpVe2lWFgSL3UF2aj97ZkMufZRVTpzhWeZiF009APCTydE');

const PaymentPage = () =>{

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        return fetch("/create_checkout_session", {
          method: "POST",
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