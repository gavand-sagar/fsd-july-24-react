import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [apiLoading, setApiLoading] = useState(false);

    function mySubmit(formData) {
        //to call generate-token api
        setApiLoading(true)
        axios.get("https://fsd-july-2024-backend.onrender.com/generate-token", {
            headers: {
                myusername: formData.username,
                mypassword: formData.password
            }
        }).then(response => {
            // when we receive response
            if (response.data && response.data.token) {
                if(formData.rememberMe){
                    localStorage.setItem("token",response.data.token) // persisted even after we close browser
                }else{
                    sessionStorage.setItem("token",response.data.token) // will be deleted automatically from broswer after you close the tab
                }
                navigate("/products")
            } else {
                alert("Not a valid User")
            }
        }).catch(error => {
            alert("Not a valid User")
        }).finally(() => {
            setApiLoading(false)
        })
    }

    return (
        <div className='login-page'>
            <Box padding={2} className='login-form'>
                <Typography variant='h4'>Welcome to My App</Typography>
                <Box padding={2}>
                    <TextField disabled={apiLoading} label={"Username"} type='text'
                        error={errors?.username}
                        helperText={errors?.username?.message}
                        {...register("username", { required: { value: true, message: "Username is Required" } })} />
                </Box>
                <Box padding={2}>
                    <TextField disabled={apiLoading} label={"Password"} type='password'
                        error={errors?.password}
                        helperText={errors?.password?.message}
                        {...register("password", { required: { value: true, message: "Password is Required" } })} />
                </Box>
                <Box padding={2}>
                    <FormGroup >
                        <FormControlLabel {...register("rememberMe")} disabled={apiLoading} control={<Checkbox />} label="Remember Me" />
                    </FormGroup>
                </Box>
                <Box padding={2}>
                    {
                        apiLoading ? <CircularProgress /> : <Button disabled={apiLoading} variant='contained' onClick={handleSubmit(mySubmit)} >LOGIN</Button>
                    }
                </Box>
                <Box padding={2}>
                    <Typography variant='caption'>Dont have an accout?</Typography>
                    <Link to={'/sign-up'}>
                        <Button variant='text' disabled={apiLoading}>SIGN UP</Button>
                    </Link>
                </Box>
            </Box>
        </div>
    )
}
