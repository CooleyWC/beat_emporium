import React, {useCallback, useState} from 'react';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

function PaymentResult({newRentalPost, stageRentals}) {

    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    // new
    const [data, setData] = useState(null)

    let navigate = useNavigate()

    // const stripeSeshStatus = useCallback(()=>{
    //     const queryString = window.location.search;
    //     const urlParams = new URLSearchParams(queryString);
    //     const sessionId = urlParams.get('session_id')
    //     fetch(`/session_status?session_id=${sessionId}`)
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         setStatus(data.status);
    //         setCustomerEmail(data.customer_email)
    // })
    // }, [status])

    // stripeSeshStatus()
    // console.log('payment result rendered')

    useEffect(()=>{
        if(status==='complete'){

            console.log('stage rentals called here')
            stageRentals()
        } 
    }, [status])

    useEffect(()=>{
        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id')
        fetch(`/session_status?session_id=${sessionId}`)
        .then((res)=>res.json())
        .then((data)=>{
            setStatus(data.status);
            setCustomerEmail(data.customer_email)

        });
    }, [])

    const handleDashClick = ()=>{
        navigate('/dashboard')
    }

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
                <button onClick={handleDashClick}>Back To Dashboard</button>
            </section>
        )
    }

    return null
}

export default PaymentResult;