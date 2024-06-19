import React, {useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Button, FormControl} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import {useCart} from '../context/CartProvider'
import { useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


function InstrumentCard({brand, color, name, description, for_rent, image, model, 
    rent_price, reviews, sale_price, size, instrumentObj, currentRentals, in_stock}) {

    const today = dayjs()
    const tomorrow = dayjs().add(1, 'day')

    const [open, setOpen] = useState(false);
    const [startInput, setStartInput] = useState(today)
    const [endInput, setEndInput] = useState(tomorrow)
    const [selection, setSelection] = useState([])


    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    const {user} = useAuth()
    const {cartItems, handleCartItems, handleRemoveCartItems} = useCart()

    const checkIfItemInCart = cartItems.find((item)=>{
        return item.id === instrumentObj.id
    })

    const handleAdd = ()=>{
        if(!user){
            alert('You must be logged in to add this to your cart')
            return
        }

        handleClickOpen()
    }

    const handleRemove = ()=>{
        handleRemoveCartItems(instrumentObj)
        setSelection('')
        setStartInput(today)
        setEndInput(tomorrow)
    }

    // this is for blocking out datepicker dates
    const rentalDates = currentRentals.map((rental)=>{
        const dateArr = []
        const dateObj = {}

        const rentalStartArr = rental.start_date.split(' ')
        const startStr = rentalStartArr[0]

        const rentalEndArr = rental.return_date.split(' ')
        const endStr = rentalEndArr[0]

        const start = new Date(startStr)
        const end = new Date(endStr)

        let loop = new Date(start)

        while (loop<=end){
            dateArr.push(loop)
            let newDate = loop.setDate(loop.getDate()+1)
            loop = new Date(newDate)
        }
        
        return ({dateArr})
        
    })

    // console.log(rentalDates)

    const disableDateFunc = (date)=>{
        // console.log(rentalDates)
  
        const muiDate = date.toISOString().split('T')
        const muiDateStr = muiDate[0]
        // console.log('muiDate', muiDateStr)

        for(let dateObj of rentalDates){
            const arrayOfDates = dateObj.dateArr
            for(let dateToCheck of arrayOfDates){
                const dateCheck = dateToCheck.toISOString().split('T')
                // console.log('predatecheck', dateCheck)
                const dateCheckStr = dateCheck[0]
                // console.log('dateCheck', dateCheckStr)
                if(muiDateStr === dateCheckStr){
                    return true
                } else {
                    return false
                }
            }
        }
    }

    // const disableDateFunc = (date)=>{
        // console.log(date)

        // for loop 
        // const day = date.day()

        // return day !== date

        // const dateOfMonth = date.date()
        // const month = date.month()
        // console.log(`day: ${day}, dateofmonth: ${dateOfMonth}, month: ${month}`)

        // for(date of rentalDates){
        //     // console.log(`disabledate for loop: ${date.start}`)
        //     if(date.start_date === typeof(Date)){
        //         // console.log('start type of date is true')
        //         return true
        //     }

        //     if(date.return_date === typeof(Date)){
        //         // console.log('end date type of is true')
        //         return true
        //     }
        // }
    // }   

    return (
        <>
        <Card sx={{maxWidth: '400px', minHeight: '600px', maxHeight: '600px'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{height: '200px'}}
            />
            <CardContent>
                <Typography>
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
                    {rent_price}
                </Typography>
            </CardContent>
            {checkIfItemInCart ? <Button onClick={handleRemove}>Remove From Cart</Button>: <Button onClick={handleAdd}>Add To Cart</Button>}
        </Card>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (e)=>{
                    e.preventDefault()
                    // build out object with the start and end dates
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
                        "start_date": startInput,
                        "end_date": endInput
                    }
                    // console.log(`newObj: ${instrumentWithDates}, ${instrumentWithDates.start_date}`)
                    setSelection([startInput, endInput])
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
                />
            </FormControl>
            <FormControl>
                <DatePicker 
                    shouldDisableDate={disableDateFunc}
                    disablePast
                    label='Rental Return Date'
                    value={endInput}
                    onChange={(newDate)=>setEndInput(newDate)}
                />
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{
                    handleClose()
                    setStartInput(today)
                    setEndInput(tomorrow)
                    // setSelection([startInput, endInput])
                    }}>Cancel</Button>
                <Button type='submit'>Complete Add To Cart</Button>
            </DialogActions>

        </Dialog>
        </LocalizationProvider>
        </>
    );
}

export default InstrumentCard;

