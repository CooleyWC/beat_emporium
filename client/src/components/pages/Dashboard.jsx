import React from 'react';
import {Box, Typography, Stack} from '@mui/material'
import UserProfileCard from '../cards/UserProfileCard';
import { useAuth } from '../context/AuthProvider';
import RentalCard from '../cards/RentalCard';
import ShoppingCart from '../pages/ShoppingCart';
import Admin from './Admin';
import {useCart} from '../context/CartProvider'


function Dashboard({handleRentalDelete, handleReviewIntent}) {

    const {user} = useAuth()
    const {cartItems} = useCart()
    // console.log(cartItems)

    if(user===null || !user){
        return <p>loading...</p>
    }

    const userRentals = user.rentals
    // console.log('dashboard', userRentals)

    const handleDelete = (id)=>{
        console.log('from dashboard delete', id)
        // delete api
        fetch(`/api/rental_by_id/${id}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if(res.ok){
                handleRentalDelete(id)
            }
        })
    }

    const reviewIntent = (rentalId, instrumentId)=>{
        const reviewIntentObj = {
            user_id: user.id,
            rental_id: rentalId,
            instrument_id: instrumentId
        }
        handleReviewIntent(reviewIntentObj)
    }

    const userRentalsMap = userRentals.map((rental)=>{
        return (
            <RentalCard 
                key={rental.id}
                rentalId={rental.id}
                created_at={rental.created_at}
                instrument={rental.instrument.name}
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
        <Box sx={{marginTop: '100px'}}>
            <Typography sx={{fontSize: '20px'}}>Dashboard</Typography>
        </Box>
        <Box>
            <UserProfileCard 
                key={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                location={user.location}
            />
        </Box>
        <Box>
            <Typography sx={{fontSize: '20px'}}>Your Rentals</Typography>
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
        {user.admin == '1' && <Admin />}
        </Box>
        </>
    );
}

export default Dashboard;



// import React from 'react';
// import {Box, Typography, Stack} from '@mui/material'
// import UserProfileCard from '../cards/UserProfileCard';
// import { useAuth } from '../context/AuthProvider';
// import RentalCard from '../cards/RentalCard';
// import ShoppingCart from '../pages/ShoppingCart';
// import Admin from './Admin';


// function Dashboard() {

//     const {user} = useAuth()

//     if(user===null || !user){
//         return <p>loading...</p>
//     }

//     const userRentals = user.rentals
//     // console.log(userRentals)

//     const userRentalsMap = userRentals.map((rental)=>{
//         return (
//             <RentalCard 
//                 key={rental.id}
//                 created_at={rental.created_at}
//                 instrument={rental.instrument.name}
//                 return_date={rental.return_date}
//                 start_date={rental.start_date}
//             />
//         )
//     })

//     return (
//         <>
//         <Box sx={{marginTop: '100px'}}>
//             <Typography>Dashboard</Typography>
//         </Box>
//         <Box>
//             <UserProfileCard 
//                 key={user.id}
//                 first_name={user.first_name}
//                 last_name={user.last_name}
//                 email={user.email}
//                 location={user.location}
//             />
//         </Box>
//         <Box>
//             <Typography>Rentals go here</Typography>
//         </Box>
//         <Stack>
//             {userRentalsMap}
//         </Stack>
//         <Box>
//             <ShoppingCart />
//         </Box>
//         <Box>
//         {user.admin == '1' && <Admin />}
//         </Box>
//         </>
//     );
// }

// export default Dashboard;