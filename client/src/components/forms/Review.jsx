import React from 'react';
import {Typography, Box, FormControl, TextField, Grid, Button} from '@mui/material'
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useReview } from '../context/ReviewProvider';
import {useNavigate} from 'react-router-dom';

function Review({afterReviewPost}) {

    let navigate = useNavigate()

    const {reviewData} = useReview()

    if(!reviewData){
        return <p>...loading</p>
    }
  
    const reviewSchema = yup.object({
        content: yup
            .string('Write your review')
            .min(10, 'Must be at least 10 characters')
            .max(150, 'Must be no longer than 150 charachters')
            .required('Your review must have content in order to submit')
    })

    const submitReview = async (values) =>{
        let nowDate = new Date().toISOString()

        const reviewPostObj={
            user_id:reviewData.userId,
            instrument_id:reviewData.instrumentId,
            rental_id:reviewData.rentalId,
            created_at: nowDate,
            content: values.content
        }

        try{
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(reviewPostObj)
            })
            const revResData = await res.json()

            if(!res.ok){
                console.log('error submitting review')
            } else {
                afterReviewPost(revResData)
                navigate('/dashboard')
            }
        } catch {
            console.error('error submitting review')
        }
    }

    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema: reviewSchema,
        onSubmit: submitReview,
    })

    return (
        <Box sx={{marginTop: '100px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid item>
            <Typography>Review</Typography>
            <Typography>Instrument: {reviewData.instrumentName}</Typography>
            <Typography>Rental Return Date: {reviewData.rentalReturnDate}</Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
                <Grid item >
                <FormControl>
                    <TextField
                      
                        rows={10}
                        id='content'
                        name='content'
                        label='Write your review here'
                        type='text'
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        error={formik.touched.content && Boolean(formik.errors.content)}
                        helperText={formik.touched.content && formik.errors.content}
                    >

                    </TextField>
                </FormControl>
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' size='large' sx={{marginTop: '10px'}}>Submit</Button>
                </Grid>
            </form>
            </Grid>
        </Box>

    );
}

export default Review;