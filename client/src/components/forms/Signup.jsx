import { Container, Box, FormControl, Typography, Grid, TextField, getFormLabelUtilityClasses } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthProvider';



function Signup() {

    const {login} = useAuth()

    const submitUser = ()=>{
        console.log('submit')
    }

    const signupSchema = yup.object({
        email: yup
            .string('Enter Your Email')

    })

    const formik = useFormik({
        initialValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            location: '',
        },
        validationSchema: signupSchema,
        onSubmit: submitUser
    })

    return (
        <Box sx={{marginTop: '100px'}}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item>
                        <FormControl>
                            <TextField
                               id='email'
                               name='email'
                               label='Enter Your Email'
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               error={formik.touched.email && Boolean(formik.errors.email)}
                               helperText={formik.touched.email && formik.errors.email}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                               id='first_name'
                               name='first_name'
                               label='Enter Your First Name'
                               value={formik.values.first_name}
                               onChange={formik.handleChange}
                               error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                               helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default Signup;