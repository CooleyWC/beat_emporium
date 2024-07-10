import React from 'react';
import {Box, Typography, Card, CardContent} from '@mui/material'

function UserReviewCard({review, user}) {

    if(!review){
        return <p>...loading review</p>
    }

    if(!user){
        return <p>...loading user</p>
    }
 

    const instrumentsArr = user.instruments.map((instrument)=>{
        return instrument
    })
    

    const matchingInstrument = instrumentsArr.filter((instrument)=>{
        if(instrument.id===review.instrument_id){
            // console.log('instrument name', instrument.name)
            return instrument
        }
    })

    if(!matchingInstrument){
        return <p>...there was a problem matching an instrument to this review</p>
    }

    const instrumentNameMatch = matchingInstrument[0].name

    const createdDate = review.created_at.split(' ')
    const createdStr = createdDate[0]

    return (
        <Card>
            <CardContent>
                {matchingInstrument && (
                    <Typography>Instrument: {instrumentNameMatch}</Typography>
                )}
                <Typography>Date of Review: {createdStr}</Typography>
                <Typography>Review: {review.content}</Typography>
            </CardContent>
        </Card>
    );
}

export default UserReviewCard;