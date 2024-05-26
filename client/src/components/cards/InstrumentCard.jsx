import React, {useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Button, FormControl} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
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


function InstrumentCard({name, description, for_rent, image, model, 
    rent_price, reviews, sale_price, size, instrumentObj, currentRentals}) {

    const today = dayjs()
    const tomorrow = dayjs().add(1, 'day')

    const [open, setOpen] = useState(false);
    const [startInput, setStartInput] = useState(today)
    const [endInput, setEndInput] = useState(tomorrow)
    const [selection, setSelection] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    const {user} = useAuth()
    const{handleCartItems, cartItems, handleRemoveCartItems} = useOutletContext();

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

    const rentalDates = currentRentals.map((rental)=>{
        return (
            {"start": rental.start_date, "end": rental.return_date}
        )
    })

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
                    setSelection(dateInput)
                    handleCartItems(instrumentObj)
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
                    disablePast
                    label='Rental Start Date'
                    value={startInput}
                    onChange={(newDate)=>setStartInput(newDate)}
                />
            </FormControl>
            <FormControl>
                <DatePicker 
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
                    }}>Cancel</Button>
                <Button type='submit'>Complete Add To Cart</Button>
            </DialogActions>

        </Dialog>
        </LocalizationProvider>
        </>
    );
}

export default InstrumentCard;

