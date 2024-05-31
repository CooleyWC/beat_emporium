import React, {useState} from 'react';
import {Box, Typography} from '@mui/material'
import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import {useCart} from '../context/CartProvider'

function PaymentResult() {

    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    const {cartItems} = useCart()
    const {user} = useAuth();


    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id')
        fetch(`/session_status?session_id=${sessionId}`)
        .then((res)=>res.json())
        .then((data)=>{
            setStatus(data.status);
            setCustomerEmail(data.customer_email)
           
            // addRental()
        });
    }, [])


    // const rentalObjArr = cartItems.map((instrument)=>{
    //     return({
    //       "user_id": user.id,
    //       "instrument_id": instrument.id,
    //       "created_at": new Date(),
    //       "start_date": instrument.start_date.$d,
    //       "return_date": instrument.end_date.$d
    //     })
    //   })

    // console.log('from payment result',rentalObjArr)

    // const addRental = (rentalObjArr)=>{
    //     rentalPost(rentalObjArr)
    // }


    if (status === null){
        return (
            <section id='loading' style={{marginTop: '200px'}}>
                <p>loading</p>
            </section>
        )
    }

    if (status === 'open'){
        return (
            <section id='pay fail' style={{marginTop: '200px'}}>
                <p>the payment failed</p>
            </section>
        )
    }

    if (status === 'complete'){
        // addRental()

        // addRental function here
        // in the .then, clear out the cartItems

        return (
            <section id='success' style={{marginTop: '200px'}}>
                <p>{`we appreciate your business - check your email: ${customerEmail} for receipt`}</p>
            </section>
        )
    }

    

    return null
}

export default PaymentResult;