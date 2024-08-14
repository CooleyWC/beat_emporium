import React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function InstrumentDetails() {

    const params = useParams();
    const instId = params.id
    const [instrumentData, setInstrumentData] = useState({})


    useEffect(()=>{
        fetch(`/api/instrument_by_id/${instId}`)
        .then(res=>res.json())
        .then(data=>setInstrumentData(data))
        .catch(error=>console.error(error))
    }, [instId])

    if(!instrumentData){
        return <p>loading...</p>
    }

    console.log(instrumentData)

    return (
        <div style={{marginTop: '100px'}}>
            <h1>Instrument Details</h1>
            <p>{instrumentData.name}</p>
        </div>
    );
}

export default InstrumentDetails;