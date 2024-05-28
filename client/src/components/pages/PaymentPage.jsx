import React, {useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import {Box} from '@mui/material'
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const stripePromise = loadStripe('pk_test_51PIh6FRooiRlSIbzyMN3RxjtLClLzzjm4d0L2Ne7QjysYBIYx1lNYpVe2lWFgSL3UF2aj97ZkMufZRVTpzhWeZiF009APCTydE');

const PaymentPage = () =>{

  const {cartItems} = useOutletContext()
  const {user} = useAuth()

  if(!cartItems || cartItems.length == 0){
    return (
      <div style={{marginTop: '100px'}}>
        <p>...loading cart items</p>
      </div>
    )
  }
  
  const cartIds = cartItems.map((item)=>{
    return (
      {"id": item.id}
    )
  })

  // console.log('cart items from payment page', cartItems)

  const rentalObjArr = cartItems.map((instrument)=>{
    return({
      "user_id": user.id,
      "instrument_id": instrument.id,
      "created_at": new Date(),
      "start_date": instrument.start_date.$d,
      "return_date": instrument.end_date.$d
    })
  })

  const fetchClientSecret = useCallback(() => {
     
      return fetch("/create_checkout_session", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          items: cartIds,
          rentalsArr: rentalObjArr
        })
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log('before add rental')
          // addRental()
          return data.clientSecret});
    }, []);


  // console.log(rentalObjArr)

  // const addRental = (rentalObjArr)=>{
  //   rentalPost(rentalObjArr)
  // }
  
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
