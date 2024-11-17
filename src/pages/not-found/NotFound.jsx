import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <>
            <Typography variant='h1'>Page Not Found</Typography>

            Go to Login <Link to={'/login'}>Click Here...</Link>

        </>
    )
}
