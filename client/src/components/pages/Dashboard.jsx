import React, {useState} from 'react';
import {Box, Typography, Stack, Button} from '@mui/material'
import { useParams } from 'react-router-dom';
import UserProfileCard from '../cards/UserProfileCard';
import { useAuth } from '../context/AuthProvider';
import RentalCard from '../cards/RentalCard';
import ShoppingCart from '../pages/ShoppingCart';
import Admin from './Admin';
import {useReview} from '../context/ReviewProvider'
import {useNavigate} from 'react-router-dom';
import UserReviewCard from '../cards/UserReviewCard';
import DashDrawer from '../DashDrawer';


// get the drawer to disappear on small screen - probably need to access the window
// dashboard content pushes out of the way of the drawer
// when the drawer disappears for mobile, conditionally add buttons or select drop down for menu


function Dashboard({handleRentalDelete}) {

    const {section} = useParams();

    const [drawerOpen, setDrawerOpen] = useState(false);
   
    let navigate = useNavigate();
    const {user} = useAuth();
    const {handleReviewData} = useReview();

    const drawerWidth = 250

    if(user===null || !user){
        return <p>loading...</p>
    }

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
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
        <Box sx={{display: 'flex'}}>
            {/* side drawer */}
            <Box sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}, display: {xs: 'none', sm: 'block'} }}>
                <DashDrawer  
                    drawerOpen={drawerOpen} 
                    toggleDrawer={toggleDrawer}
                />
            </Box>
            {/* content */}
            <Box
                sx={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    flexGrow: 1, 
                    p:3, 
                    width: {sm: `calc(100% - ${drawerWidth}px)`}, 
                    marginLeft: {xs:0, sm: `${drawerWidth}px`}, 
                    marginTop: '100px',
                    marginLeft: 'auto',
                    marginRight: 'auto'

                
                }}
            >
                <Button sx={{display: {xs: 'block', sm: 'none'}}}>Click Me</Button>
                {(!section || section==='user_profile') && (
                    <UserProfileCard 
                    key={user.id}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    email={user.email}
                    location={user.location}
                />
                )}
                {section === 'upcoming_rentals' && (
                    <Box sx={{width: '100%', borderRadius: '7px'}}>
                        <Stack spacing={1}>
                            {userRentalsMap}
                        </Stack>
                    </Box>
                    )}
                {(section === 'user_reviews' && user.reviews.length>0) && (
                    user.reviews.map((review)=>(
                        <UserReviewCard
                        user={user}
                        review={review} 
                        key={review.id}
                    />
                    ))
                )}
            </Box>
            
        </Box>
        {/* <Box sx={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
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
        </Box> */}
        
        </>
    );
}

export default Dashboard;
