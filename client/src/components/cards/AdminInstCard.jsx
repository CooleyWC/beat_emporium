import React, {useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Button, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material'
import UpdateInstForm from '../forms/UpdateInstForm';

function AdminInstCard({color, name, description, for_rent, image, model, rent_price, 
    reviews, sale_price, size, currentRentals, instrumentObj, in_stock, onDeleteInstr, onUpdateInstr}) {

    const [updateOpen, setUpdateOpen] = useState(false)

    const handleUpdateClick = () =>{
        setUpdateOpen(true)
    }

    const handleUpdateClose = () =>{
        setUpdateOpen(false)
    }
    
    return (
        <Card sx={{display: 'flex', justifyContent: 'flex-start', width:'100%'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{maxHeight: '80px', maxWidth: '80px', alignSelf: 'flex-start'}}
            
            />
            <CardContent>
                <Typography>{name}</Typography>
                <Typography>{description}</Typography>
                <Typography>{size}</Typography>
                <Typography>{color}</Typography>
                <Button variant='contained' onClick={()=>{onDeleteInstr(instrumentObj.id)}} color='error'>Delete</Button>
                {updateOpen ? (<Button onClick={handleUpdateClose}>Close Update</Button>) : (<Button onClick={handleUpdateClick}>Update</Button>)}
                {updateOpen && (
                <UpdateInstForm instrumentObj={instrumentObj} onUpdateInstr={onUpdateInstr}/>
            )}
            </CardContent>
        </Card>
    );
}

export default AdminInstCard;
