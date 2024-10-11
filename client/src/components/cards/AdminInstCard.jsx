import React, {useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Button, Grid} from '@mui/material'
import UpdateInstForm from '../forms/UpdateInstForm';

function AdminInstCard({color, name, description, brand, image, model, rent_price, 
    sale_price, size, instrumentObj, in_stock, onDeleteInstr, onUpdateInstr, reviews, for_rent, currentRentals}) {

    const [updateOpen, setUpdateOpen] = useState(false)

    const handleUpdateClick = () =>{
        setUpdateOpen(true)
    }

    const handleUpdateClose = () =>{
        setUpdateOpen(false)
    }

    const typeStyle = {
        // paddingLeft: '50px'
    }
    
    return (
        <Card sx={{ width:'100%', backgroundColor: '#dee2e6'}}>
            <Grid container>
                <Grid item xs={12} md={4}>
            <CardMedia 
                component='img'
                image={image}
                sx={{padding: '2rem', 
                    height: 'auto', 
                    maxWidth: '300px', 
                    objectFit: 'contain'
                }}
            />
            </Grid>
            <Grid item xs={12} md={8}>
            <CardContent>
                <Grid container spacing={2} sx={{padding: '1rem'}}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Name: {name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Brand: {brand}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Model: {model}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Size: {size}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Color: {color}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Rent Price: {rent_price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Sale Price: {sale_price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>In Stock: {in_stock ? 'Yes': 'No'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography sx={typeStyle}>Description: {description}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            </Grid>
            </Grid>
            <CardContent sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant='contained' sx={{alignSelf: 'flex-end'}} onClick={()=>{onDeleteInstr(instrumentObj.id)}} color='error'>Delete</Button>
                    {updateOpen ? (<Button color='error' sx={{maxHeight: '50px'}} onClick={handleUpdateClose}>Close Update</Button>) : (<Button variant='contained' onClick={handleUpdateClick} sx={{marginRight: '10px', marginLeft: '10px'}}>Update</Button>)}
                    {updateOpen && (
                    <UpdateInstForm instrumentObj={instrumentObj} onUpdateInstr={onUpdateInstr}/>
                )}
            </CardContent>
        </Card>
    );
}

export default AdminInstCard;
