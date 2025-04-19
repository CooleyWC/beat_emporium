import React, {useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Button, Grid} from '@mui/material'
import UpdateInstForm from '../forms/UpdateInstForm';

function AdminInstCard({color, name, description, brand, image, model, rent_price, 
    sale_price, size, instrumentObj, in_stock, onDeleteInstr, onUpdateInstr}) {

    const [updateOpen, setUpdateOpen] = useState(false)

    const handleUpdateClick = () =>{
        setUpdateOpen(true)
    }

    const handleUpdateClose = () =>{
        setUpdateOpen(false)
    }

    const typeStyle = {
        fontSize: {sm: '1.1rem', md: '1.2rem', lg: '1.3rem'}
    }
    
    return (
        <Card sx={{ width:'100%', backgroundColor: '#f8f9fa'}}>
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
                <Grid container spacing={2} sx={{padding: '1rem', paddingRight: {lg: '5rem'}}}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>Name: {name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>Brand: {brand}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>Model: {model}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>Size: {size}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>Color: {color}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>Rent Price: {rent_price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>Sale Price: {sale_price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={typeStyle}>In Stock: {in_stock ? 'Yes': 'No'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Typography sx={{fontSize: {sm: '1.1rem', md: '1.2rem', lg: '1.3rem'}, paddingTop: '3rem'}}>Description: {description}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            </Grid>
            </Grid>
            <CardContent sx={{display: 'flex', justifyContent: 'flex-end', paddingRight: {lg: '5rem'}}}>
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
