import React, {useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Button, Grid} from '@mui/material'
import UpdateInstForm from '../forms/UpdateInstForm';

function AdminInstCard({color, name, description, brand, for_rent, image, model, rent_price, 
    reviews, sale_price, size, currentRentals, instrumentObj, in_stock, onDeleteInstr, onUpdateInstr}) {

    const [updateOpen, setUpdateOpen] = useState(false)

    const handleUpdateClick = () =>{
        setUpdateOpen(true)
    }

    const handleUpdateClose = () =>{
        setUpdateOpen(false)
    }

    const typeStyle = {
        paddingLeft: '50px',
        fontSize: '18px'
    }
    
    return (
        <Card sx={{ width:'100%', backgroundColor: '#e0e1dd'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{paddingTop: '20px', paddingLeft: '20px', maxHeight: '100px', maxWidth: '200px', alignSelf: 'flex-start'}}
            />
            <CardContent sx={{display: 'flex', justifyContent: 'flex-start'}}>
                <Typography sx={typeStyle}>Name: {name}</Typography>
                <Typography sx={typeStyle}>Brand: {brand}</Typography>
                <Typography sx={typeStyle}>Model: {model} </Typography>
                <Typography sx={typeStyle}>Size: {size}</Typography>
                <Typography sx={typeStyle}>Color: {color}</Typography>
                <Typography sx={typeStyle}>Rent Price: {rent_price}</Typography>
                <Typography sx={typeStyle}>In Stock: {in_stock ? 'Yes': 'No'}</Typography>
            </CardContent>
            <CardContent sx={{display: 'flex', justifyContent: 'flex-start'}}>
                <Typography sx={typeStyle}>Description: {description}</Typography>
            </CardContent>
            <CardContent sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant='contained' sx={{alignSelf: 'flex-end'}} onClick={()=>{onDeleteInstr(instrumentObj.id)}} color='error'>Delete</Button>
                    {updateOpen ? (<Button onClick={handleUpdateClose}>Close Update</Button>) : (<Button variant='contained' onClick={handleUpdateClick} sx={{marginRight: '10px', marginLeft: '10px'}}>Update</Button>)}
                    {updateOpen && (
                    <UpdateInstForm instrumentObj={instrumentObj} onUpdateInstr={onUpdateInstr}/>
                )}
            </CardContent>
        </Card>
    );
}

export default AdminInstCard;
