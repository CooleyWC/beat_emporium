import React, {useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Button} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import { useOutletContext } from 'react-router-dom';
// new below
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function InstrumentCard({name, description, for_rent, image, model, 
    rent_price, reviews, sale_price, size, instrumentObj, currentRentals}) {

    const [open, setOpen] = useState(false);
    const [dateInput, setDateInput] = useState('')
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
        
        handleCartItems(instrumentObj)
    }

    const handleRemove = ()=>{
        handleRemoveCartItems(instrumentObj)
    }

    const rentalDates = currentRentals.map((rental)=>{
        return (
            {"start": rental.start_date, "end": rental.return_date}
        )
    })

    console.log(selection)

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
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (e)=>{
                    e.preventDefault()
                    setSelection(dateInput)
                    handleClose()
                }
            }}
        >
            <DialogTitle>Select Dates</DialogTitle>
            <DialogContent>
            <DialogContentText>Select your rental duration for: {name}</DialogContentText>
            <TextField
                id='date-select'
                label='Select Date'
                fullWidth
                variant='standard'
                value={dateInput}
                onChange={(e)=>setDateInput(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Complete Add To Cart</Button>
            </DialogActions>

        </Dialog>
        </>
    );
}

export default InstrumentCard;

