import React from 'react';
import {Box, Typography, Grid} from '@mui/material';
// import { useOutletContext } from 'react-router-dom';
import InstrumentCard from '../cards/InstrumentCard';

function Instruments({allInstruments, allReviews}) {
    
    if(allInstruments===null || !allInstruments){
        return <p>loading instruments...</p>
    }

    if(allReviews===null || !allReviews){
        return <p>loading reviews...</p>
    }

    const instrumentCards = 
        <Grid container>
            {allInstruments.map((instrument)=>(
                <Grid item key={instrument.id} xs={12} sm={6} md={3} lg={3}>
                    <InstrumentCard 
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
                        allInstrumentReviews={allReviews}
                    />
                </Grid>
            ))}
        </Grid>

    return (
        <>
        <Box sx={{marginTop: '100px'}}>
            <Typography sx={{fontSize: '50px'}}>
                Instruments
            </Typography>
        </Box>
        <Box sx={{marginBottom: '10px'}}>
            <Typography>Filter goes here</Typography>
        </Box>
        <Box>
            {instrumentCards}
        </Box>
        </>
    );
}

export default Instruments;
