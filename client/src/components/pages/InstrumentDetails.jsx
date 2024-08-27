import React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import ReviewCard from '../cards/ReviewCard';
import DatePickerDialog from '../forms/DatePickerDialog';
import {Card, CardContent, Typography, CardMedia, Button, FormControl, Box, Grid} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import {useCart} from '../context/CartProvider'
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function InstrumentDetails() {

    const params = useParams();
    const instId = params.id
    const [instrumentData, setInstrumentData] = useState({})
    // check if currentRentals is necesary
    const [currentRentals, setCurrentRentals] = useState([])
    // const today = dayjs().utc()
    // const tomorrow = dayjs().utc().add(1, 'day')

    const [open, setOpen] = useState(false);
    const [revOpen, setRevOpen] = useState(false);

    // const [startInput, setStartInput] = useState(today)
    // const [endInput, setEndInput] = useState(tomorrow)
    // const [dateError, setDateError] = useState(null)
    const [hasReviews, setHasReviews] = useState(0)


    useEffect(()=>{
        fetch(`/api/instrument_by_id/${instId}`)
        .then(res=>res.json())
        .then(data=>{
            setInstrumentData(data)
            setCurrentRentals(data.rentals)
        })
        .catch(error=>console.error(error))
    }, [instId])

    if(!instrumentData){
        return <p>loading...</p>
    }

    useEffect(()=>{
        if(instrumentData && instrumentData.reviews){
            const numOfReviews = instrumentData.reviews.length
            setHasReviews(numOfReviews)
        }
        
    }, [instrumentData])

    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    const handleRevOpen = () => {
        setRevOpen(true);
    };
      
    const handleRevClose = () => {
        setRevOpen(false);
    };

    const {user} = useAuth()
    const {cartItems, handleCartItems, handleRemoveCartItems} = useCart()

    const checkIfItemInCart = cartItems.find((item)=>{
        return item.id === instrumentData.id
    })

    const handleAdd = ()=>{
        if(!user){
            onAddBeforeUser()
            return
        }
        handleClickOpen()
    }

    const handleRemove = ()=>{
        handleRemoveCartItems(instrumentData)
        // setStartInput(today)
        // setEndInput(tomorrow)
    }

    // const rentalDates = currentRentals.map((rental)=>{
    //     const dateArr = []

    //     const rentalStartArr = rental.start_date.split(' ')
    //     const startStr = rentalStartArr[0]

    //     const rentalEndArr = rental.return_date.split(' ')
    //     const endStr = rentalEndArr[0]

    //     const start = dayjs(startStr)
    //     const end = dayjs(endStr)

    //     let loop = dayjs(start)

    //     while (loop<=end){
    //         dateArr.push(loop.utc())
    //         let newDate = loop.add(1, 'day')
    //         loop = dayjs(newDate)
    //     }
    //     return ({dateArr})
    // })

    //check selected dates
    // const dateRangeCheck = () =>{

    //     let selectedArr = []
    //     const end = dayjs(endInput)
    //     let loop = dayjs(startInput)

    //     while(loop<=end){
    //         selectedArr.push(loop.utc())
    //         let newDate = loop.add(1, 'day')
    //         loop = dayjs(newDate)
    //     }

    //     let checkResult = null
    //     const copyOfRentalDates = rentalDates
    //     for(let date of selectedArr){
    //         let dateStr=date.utc().format('MM/DD/YYYY')

    //         for(let dateObj of copyOfRentalDates){
    //             const dateObjArr = dateObj.dateArr
    //             for(let rentalDateCheck of dateObjArr){
    //                 const rentalDateStr = rentalDateCheck.utc().format('MM/DD/YYYY')
    //                 if(dateStr===rentalDateStr){
    //                     checkResult = 'whoa!'
    //                 }
    //             }
    //         }
    //     }
    //     return checkResult
    // }

    // const disableDateFunc = (date)=>{
    //     const testDate = dayjs(date)
    //     const muiDate = testDate.utc().format('MM/DD/YYYY')

    //     for(let dateObj of rentalDates){
    //         const arrayOfDates = dateObj.dateArr

    //         for(let dateToCheck of arrayOfDates){
    //             const dateCheck = dateToCheck.utc().format('MM/DD/YYYY')
    //             if(muiDate === dateCheck){
    //                 return true
    //             }
    //         }
    //     }
    // }

    // const handleReviewClick = ()=>{
    //     handleRevOpen()
    // }

    const handleReviewClick = () =>{
        setRevOpen(true)
    }

    // const handleParam = () =>{
    //     const instId = instrumentObj.id
    //     navigate(`/instrument/${instId}`)
    // }

    return (
        <Box sx={{paddingTop: '100px'}}>
            <Card sx={{minHeight: '300px'}}>
                <Grid container spacing={2} sx={{paddingLeft: '10px'}}>
                    <Grid item xs={12} sm={4} sx={{marginTop: '50px'}}>
                        <CardMedia 
                            component='img'
                            image={instrumentData.image}
                            sx={{height: '200px'}}
                            />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{marginTop: '20px'}}>
                        <CardContent>
                            <Typography sx={{fontSize: '40px'}}>{instrumentData.name}</Typography>
                                {hasReviews>0 ? (<Button variant='text' onClick={handleReviewClick}> {hasReviews} Reviews</Button>) : (<Button disabled>0 Reviews</Button>)}
                            <Typography>{instrumentData.brand}</Typography>
                            <Typography>{instrumentData.model}</Typography>
                            <Typography>{instrumentData.size}</Typography>
                            <Typography>{instrumentData.color}</Typography>
                            <Typography>{instrumentData.description}</Typography>
                            <Typography>Rent Price: ${instrumentData.rent_price}</Typography>
                            {checkIfItemInCart ? <Button variant='contained' color='error' onClick={handleRemove}>Remove From Cart</Button>: <Button sx={{backgroundColor: 'green'}} variant='contained' onClick={handleAdd}>Add To Cart</Button>}
                        </CardContent>
                    </Grid>
                </Grid>
                <Box sx={{marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                </Box>
            </Card>
            {/* for reviews */}
            <Box>
                {revOpen && <Button type='text' onClick={handleRevClose}>Close Reviews</Button>}
                {revOpen &&(
                    instrumentData.reviews.map((review)=>{
                        return(
                            <ReviewCard 
                                key={review.id}
                                author={review.user.first_name}
                                reviewDate={review.created_at}
                                reviewContent={review.content}
                            />)
                    })
                )}
            </Box>
            {/* send open, currentRentals, instrumentDataObj, instrumentName, instrumentModel */}
            {open && instrumentData && (<DatePickerDialog 
                open={open} 
                handleClose={handleClose}
                currentRentals={instrumentData.rentals}
                instrumentObj={instrumentData}
                name={instrumentData.name}
                model={instrumentData.model}
                />
                )}
        </Box>
    );
}

export default InstrumentDetails;