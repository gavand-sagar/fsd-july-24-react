import React, { useEffect, useState } from 'react'
import { clearTokens, getToken } from '../utils/utils'
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';

export default function PrivateRoute({ component }) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsVisible(true);
        } else {
            navigate('/login')
        }
    }, [])

    function logout(){
        clearTokens();
        navigate('/login')
    }

    return (
        isVisible ? <>
            <Box display={'flex'} justifyContent={'end'}>
                <Button onClick={logout}>Logout</Button>
            </Box>
            <hr />
            {
                component
            }
        </> : <></>
    )
}
