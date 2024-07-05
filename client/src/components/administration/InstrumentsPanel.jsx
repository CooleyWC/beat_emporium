import React, {useState} from 'react';
import {Box, Typography, Grid, Stack, Button} from '@mui/material'
import { useAuth } from '../context/AuthProvider'
import AdminInstCard from '../cards/AdminInstCard';
import NewInstrument from '../forms/NewInstrument';

function InstrumentsPanel({allInstruments}) {

    const [newInstrumentClick, setNewInstrumentClick] = useState(null)

    const {user} = useAuth()

    if(user===null || !user){
        return <p>loading...</p>
    }

    if(user.admin !== '1'){
        return <p>You do not have admin access to this page</p>
    }

    if(!allInstruments || allInstruments.length === 0){
        return <p>...loading instruments</p>
    }

    const adminInstrCards = allInstruments.map((instrument)=>{
        return (
            <AdminInstCard
                brand={instrument.brand}
                color={instrument.color}
                key={instrument.id}
                name={instrument.name}
                description={instrument.description}
                for_rent={instrument.for_rent}
                image={instrument.image}
                model={instrument.model}
                rent_price={instrument.rent_price}
                reviews={instrument.reviews}
                sale_price={instrument.sale_price}
                size={instrument.size}
                currentRentals={instrument.rentals}
                instrumentObj={instrument}
                in_stock={instrument.in_stock}
            />
        )
    })

    const viewAddForm = () =>{
        setNewInstrumentClick(true)
    }

    const closeAddForm = () =>{
        setNewInstrumentClick(false)
    }
        
    return (
        <>
        <Box sx={{marginTop: '150px'}}>
            <Typography>Instruments Panel</Typography>
        </Box>
        <Box>
            <Button variant='contained' onClick={viewAddForm}>Add New Instrument</Button>
        </Box>
        <Box>
        {newInstrumentClick && (
            <NewInstrument onNewInstClose={closeAddForm}/>
        )}
        </Box>
        <Box>
            <Stack spacing={1}>
            {adminInstrCards}
            </Stack>
        </Box>
        </>
    );
}

export default InstrumentsPanel;