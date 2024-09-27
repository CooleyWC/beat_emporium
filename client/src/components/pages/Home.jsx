import React from 'react';
import {Box, Typography, Card, CardMedia} from '@mui/material'

function Home() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
        >
        <Box
            component='img'
            alt='beat emporium logo'
            src='/public/images/beat_emporium_logo_9-27.png'
            sx={{
                paddingTop: {xs: 5},
                maxWidth: {xs: 400}
            }}
        >
        </Box>
        </Box>
    );
}

export default Home;