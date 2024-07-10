import React from 'react';
import {Box, Typography, Stack} from '@mui/material'
import UserProfileCard from '../cards/UserProfileCard';
import { useAuth } from '../context/AuthProvider';
import RentalCard from '../cards/RentalCard';
import ShoppingCart from '../pages/ShoppingCart';
import Admin from './Admin';
import {useReview} from '../context/ReviewProvider'
import {useNavigate} from 'react-router-dom';
import UserReviewCard from '../cards/UserReviewCard';


function Dashboard({handleRentalDelete}) {
   
    let navigate = useNavigate();
    const {user} = useAuth();
    const {handleReviewData} = useReview();

    if(user===null || !user){
        return <p>loading...</p>
    }

    const userRentals = user.rentals

    const handleDelete = (id)=>{
        fetch(`/api/rental_by_id/${id}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if(res.ok){
                handleRentalDelete(id)
            }
        })
    }

    const reviewIntent = (rentalObj, instrumentObj)=>{
        const reviewIntentObj = {
            userId: user.id,
            rentalId: rentalObj.id,
            rentalStartDate: rentalObj.start_date,
            rentalReturnDate: rentalObj.return_date,
            instrumentId: instrumentObj.id,
            instrumentName: instrumentObj.name,
        }
        handleReviewData(reviewIntentObj)
        navigate('/review_form')
    }

    const userRentalsMap = userRentals.map((rental)=>{
        return (
            <RentalCard 
                key={rental.id}
                rentalObj={rental}
                instrumentObj={rental.instrument}
                rentalId={rental.id}
                created_at={rental.created_at}
                instrumentName={rental.instrument.name}
                instrument_id={rental.instrument.id}
                return_date={rental.return_date}
                start_date={rental.start_date}
                onDeleteRental={handleDelete}
                onReviewIntent={reviewIntent}
            />
        )
    })

    return (
        <>
        <Box sx={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
            <Typography sx={{fontSize: '55px'}}>Dashboard</Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
            <UserProfileCard 
                key={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                location={user.location}
            />
        </Box>
        <Box sx={{marginTop: '10px', marginBottom: '10px'}}>
            <Typography sx={{fontSize: '30px'}}>Your Rentals</Typography>
        </Box>
        <Box sx={{width: '100%', borderRadius: '7px'}}>
        <Stack spacing={1}>
            {userRentalsMap}
        </Stack>
        </Box>
        <Box>
            <ShoppingCart />
        </Box>
        <Box>
            <Typography sx={{fontSize: '30px'}}>Your Reviews</Typography>
            {user.reviews.length ? (
                user.reviews.map((review)=>(
                    <UserReviewCard
                        user={user}
                        review={review} 
                        key={review.id}
                    />
                ))

            ) : (<Typography sx={{marginLeft: '10px'}}>(you have not written any reviews)</Typography>)}
        </Box>
        <Box>
        {user.admin == '1' && <Admin />}
        </Box>
       
        </>
    );
}

export default Dashboard;
