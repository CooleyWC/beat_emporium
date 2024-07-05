import React, {useState} from 'react';
import {Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button} from '@mui/material'

function UpdateInstForm({instrumentObj, onUpdateInstr}) {

    const [attrSelect, setAttrSelect] = useState('all')
    const [textInput, setTextInput] = useState('')

    const VALID_SELECT_OPTIONS = [
        'all',
        'name',
        'brand',
        'model',
        'size',
        'color',
        'description',
        'image',
        'for_rent',
        'rent_price',
        'sale_price',
        'in_stock'
    ]

    const handleSelectChange = (e) =>{
        setAttrSelect(e.target.value)
    }
    
    const handleUpdate = (e) =>{
        e.preventDefault()
        const updatedInstr = {...instrumentObj, [attrSelect]: textInput}
        onUpdateInstr(instrumentObj.id, updatedInstr)

    }

    return (
        <>
        <form onSubmit={handleUpdate}>
        <Box>
            <Typography>Update Select</Typography>
        </Box>
        <Box sx={{marginTop: '10px'}}>
            <FormControl fullWidth>
                <InputLabel label='update-detail-select-label'>Update</InputLabel>
                <Select
                    labelId='update-detail-select-label'
                    id='detail-select'
                    value={attrSelect}
                    label='Attribute'
                    onChange={handleSelectChange}
                >
                {VALID_SELECT_OPTIONS.map((option)=>{
                    return(
                        <MenuItem
                            key={option}
                            value={option}
                        >
                            {option}
                        </MenuItem>
                    )
                })}
                </Select>
            </FormControl>
        </Box>
        <Box sx={{marginTop: '10px'}}>
            {attrSelect !== 'all' && attrSelect !== 'in_stock' && attrSelect !== 'for_rent' && (
                <>
                <FormControl>
                    <TextField
                        id='textInput'
                        name='textInput'
                        label='Enter update'
                        value={textInput}
                        onChange={(e)=>setTextInput(e.target.value)}
                    >

                    </TextField>
                </FormControl>
                <Button type='submit'>Submit</Button>
                </>
            )}
        </Box>
        </form>
        </>
    );
}

export default UpdateInstForm;