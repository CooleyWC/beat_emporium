import React, {useState} from 'react';
import {Box, Typography} from '@mui/material'
import { useEffect } from 'react';

function PaymentResult() {

    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id')

        fetch(`/session_status?session_id=${sessionId}`)
        .then((res)=>res.json())
        .then((data)=>{
            setStatus(data.status);
            setCustomerEmail(data.customer_email)
            console.log(status)
        });
    }, [])

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
        return (
            <section id='success' style={{marginTop: '200px'}}>
                <p>{`we appreciate your business - check your email: ${customerEmail} for receipt`}</p>
            </section>
        )
    }

    return null
}

export default PaymentResult;