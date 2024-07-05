import React from 'react';
import {NavLink} from 'react-router-dom';
import {Box, Typography, Link} from '@mui/material'
import {useNavigate} from 'react-router-dom';

function Admin() {

    let navigate = useNavigate()

    return (
        <Box style={{marginTop: '100px'}}>
            <Typography>Admin Section</Typography>
            <Link
                component={NavLink}
                to='/instruments_panel'
            >
                <Typography>Instruments Panel</Typography>
            </Link>
        </Box>
    );
}

export default Admin;