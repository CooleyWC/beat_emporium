import React, {useState, useEffect} from 'react';
import {Card, CardContent, Typography, CardMedia, Button, FormControl, Alert, Box} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import {useCart} from '../context/CartProvider'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// new
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);


function InstrumentCard({brand, color, name, description, for_rent, image, model, 
    rent_price, reviews, sale_price, size, instrumentObj, currentRentals, in_stock, allInstrumentReviews, onAddBeforeUser}) {
   
    const today = dayjs().utc()
    const tomorrow = dayjs().utc().add(1, 'day')

    const [open, setOpen] = useState(false);
    const [revOpen, setRevOpen] = useState(false);

    const [startInput, setStartInput] = useState(today)
    const [endInput, setEndInput] = useState(tomorrow)
    const [dateError, setDateError] = useState(null)
    const [hasReviews, setHasReviews] = useState(false)

    useEffect(()=>{
        if(reviews.length>0){
            setHasReviews(true)
        }
    }, [])
    
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
        return item.id === instrumentObj.id
    })

    const handleAdd = ()=>{
        if(!user){
            onAddBeforeUser()
            return
        }
        handleClickOpen()
    }

    const handleRemove = ()=>{
        handleRemoveCartItems(instrumentObj)
        setStartInput(today)
        setEndInput(tomorrow)
    }

    // this is for blocking out datepicker dates
    const rentalDates = currentRentals.map((rental)=>{
        const dateArr = []

        const rentalStartArr = rental.start_date.split(' ')
        const startStr = rentalStartArr[0]

        const rentalEndArr = rental.return_date.split(' ')
        const endStr = rentalEndArr[0]

        const start = dayjs(startStr)
        const end = dayjs(endStr)

        let loop = dayjs(start)

        while (loop<=end){
            dateArr.push(loop.utc())
            let newDate = loop.add(1, 'day')
            loop = dayjs(newDate)
        }
        return ({dateArr})
        
    })

    const disableDateFunc = (date)=>{
     
        const testDate = dayjs(date)
        const muiDate = testDate.utc().format('MM/DD/YYYY')

        for(let dateObj of rentalDates){
            const arrayOfDates = dateObj.dateArr

            for(let dateToCheck of arrayOfDates){
                const dateCheck = dateToCheck.utc().format('MM/DD/YYYY')
                if(muiDate === dateCheck){
                    return true
                }
            }
        }
    }

    const handleReviewClick = ()=>{
        handleRevOpen()
    }

    return (
        <>
        <Card sx={{maxWidth: '400px', minHeight: '600px', maxHeight: '600px'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{height: '200px'}}
            />
            <CardContent>
                <Typography sx={{fontSize: '25px'}}>
                    {name}
                </Typography>
                <Typography>
                    {model}
                </Typography>
                <Typography>
                    {size}
                </Typography>
                <Typography>
                    {description}
                </Typography>
                <Typography>
                    Rent Price: {rent_price}
                </Typography>
                <Typography sx={{marginBottom: '10px'}}>
                    {hasReviews &&<Button variant='contained' onClick={handleReviewClick}>See Reviews</Button>}
                </Typography>
                {checkIfItemInCart ? <Button variant='contained' color='error' onClick={handleRemove}>Remove From Cart</Button>: <Button variant='contained' onClick={handleAdd}>Add To Cart</Button>}
            </CardContent>
        </Card>
        {/* DatePicker Dialog */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (e)=>{
                    e.preventDefault()
                    if(!startInput || !endInput){
                        alert('Whoa! - you have to select both a start date and end date')
                        return
                    }
                    const instrumentWithDates = {
                        "id": instrumentObj.id,
                        "brand": brand,
                        "color": color,
                        "description": description,
                        "for_rent": for_rent,
                        "image": image,
                        "in_stock": in_stock,
                        "model": model,
                        "name": name,
                        "rent_price": rent_price,
                        "reviews": reviews,
                        "rentals": currentRentals,
                        "sale_price": sale_price,
                        "size": size,
                        "start_date": startInput.utc().format(),
                        "end_date": endInput.utc().format()
                    }
                    handleCartItems(instrumentWithDates)
                    handleClose()
                }
            }}
        >
            <DialogTitle>Select Your Rental Time Frame</DialogTitle>
            <DialogContent>
            <DialogContentText sx={{marginBottom: '20px'}}>* default is one day</DialogContentText>
            <DialogContentText sx={{marginBottom: '20px'}}>{`${name}, ${model}`}</DialogContentText>

            <FormControl>
                <DatePicker
                    shouldDisableDate={disableDateFunc}
                    disablePast
                    label='Rental Start Date'
                    value={startInput}
                    onChange={(newDate)=>setStartInput(newDate)}
                    onError={(newError)=>setDateError(newError)}
                />
            </FormControl>
            <FormControl>
                <DatePicker 
                    shouldDisableDate={disableDateFunc}
                    disablePast
                    label='Rental Return Date'
                    value={endInput}
                    onChange={(newDate)=>setEndInput(newDate)}
                    onError={(newError)=>setDateError(newError)}
                />
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{
                    handleClose()
                    setStartInput(today)
                    setEndInput(tomorrow)
                    }}>Cancel</Button>
                {dateError === null ? 
                (<Button type='submit'>Complete Add To Cart</Button>)
                :
                (<Typography sx={{color: 'red'}}>Sorry, looks like this instrument is already booked for that day, please make another selection.</Typography>)
                }
            </DialogActions>
        </Dialog>
        </LocalizationProvider>
        {/* Review Dialog*/}
        <Dialog 
            fullWidth
            open={revOpen}
            onClose={handleRevClose}
        >
        <DialogTitle>Reviews</DialogTitle>
        <DialogContent>
            <DialogContentText>{`${name}, ${model}`}</DialogContentText>
            
            {hasReviews && (
                allInstrumentReviews.map((review)=>{
                    if(review.instrument_id ===instrumentObj.id){
                  
                    return(
                        <Card key={review.id} sx={{marginBottom: '10px', paddingBottom: '10px'}}>
                            <Typography sx={{padding: '10px'}}>Renter: {review.user.first_name} {review.user.last_name}</Typography>
                            <Typography sx={{marginLeft: '20px'}}>{review.content}</Typography>
                        </Card>
                    )
                    }
                })
            )}
          
        </DialogContent>

        </Dialog>
        </>
    );
}

export default InstrumentCard;

