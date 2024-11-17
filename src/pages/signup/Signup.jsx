import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [apiLoading, setApiLoading] = useState(false);

    function mySubmit(formData) {
        //api call
        setApiLoading(true)
        axios.post("https://fsd-july-24-react.onrender.com/signup-user", formData)
            .then(response => {
                if (response) {
                    alert("User Created Successfuly.")
                    navigate("/login")
                }
            })
            .catch((error) => {
                if(error?.response?.data?.message){
                    alert(error?.response?.data?.message)
                }
                else{
                    alert("Error in application")
                }
            })
            .finally(() => {
                setApiLoading(false)
            })
    }

    return (
        <div className='login-page'>
            <Box padding={2} className='login-form'>
                <Typography variant='h4'>Sign up - My App</Typography>
                <Box padding={2}>
                    <TextField disabled={apiLoading} label={"Username"} type='text'
                        error={errors?.username}
                        helperText={errors?.username?.message}
                        {...register("username", {
                            required: { value: true, message: "Username is Required" },
                            minLength: { value: 5, message: "Username must be 5 letter long" },
                            maxLength: { value: 50, message: "Username can be maximum 50 letter long" },
                        })} />
                </Box>
                <Box padding={2}>
                    <TextField disabled={apiLoading} label={"Email"} type='email'
                        error={errors?.email}
                        helperText={errors?.email?.message}
                        {...register("email", {
                            required: { value: true, message: "Email is Required" },
                            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Email should be in proper format" }
                        })} />
                </Box>
                <Box padding={2}>
                    <TextField disabled={apiLoading} label={"Password"} type='password'
                        error={errors?.password}
                        helperText={errors?.password?.message}
                        {...register("password", {
                            required: { value: true, message: "Password is Required" },
                            minLength: { value: 8, message: "Password must be 8 letter long" },
                            maxLength: { value: 100, message: "Password can be maximum 100 letter long" },
                        })} />
                </Box>
                <Box padding={2}>
                    {
                        apiLoading ? <CircularProgress />
                            : <Button disabled={apiLoading} variant='contained' onClick={handleSubmit(mySubmit)} >SIGN UP</Button>
                    }
                </Box>
                <Box padding={2}>
                    <Typography variant='caption'>Already a user?</Typography>
                    <Link to={'/login'}>
                        <Button variant='text' disabled={apiLoading}>LOGIN</Button>
                    </Link>
                </Box>
            </Box>
        </div>
    )
}
