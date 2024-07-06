import React, {useState} from 'react';
import {Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Switch} from '@mui/material'

function UpdateInstForm({instrumentObj, onUpdateInstr}) {

    const [attrSelect, setAttrSelect] = useState('--Select an Attribute--')
    const [textInput, setTextInput] = useState('')

    const VALID_SELECT_OPTIONS = [
        '--Select an Attribute--',
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

        if(attrSelect === 'for_rent' && textInput !== 'false' && textInput !== 'true'){
            alert('for_rent must be a boolean')
            return
        }

        if(attrSelect === 'in_stock' && textInput !== 'false' && textInput !== 'true'){
            alert('for_rent must be a boolean')
            return
        }
        

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
            {attrSelect !== '--Select an Attribute--' && (
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