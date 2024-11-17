import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react'
import { clearTokens, getToken } from '../utils/utils'
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Paper, Popover, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function PrivateRoute({ component }) {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedTokenObj = jwtDecode(token);
            setUsername(decodedTokenObj.username)
            setEmail(decodedTokenObj.email)
            setIsVisible(true);
        } else {
            navigate('/login')
        }
    }, [])

    function logout() {
        clearTokens();
        navigate('/login')
    }



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    return (
        isVisible ? <>
            <Box display={'flex'} justifyContent={'end'} alignItems={'center'} gap={'10px'}>
                <Link to={"/notes"}>Notes</Link>
                <div>
                    <Avatar aria-describedby={id} variant="contained" onClick={handleClick}>
                        {
                            username?.charAt(0)
                        }
                    </Avatar>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Paper elevation={2} sx={{ width: '150px', padding: 2 }}>
                            <Typography variant="h6">{username}</Typography>
                            <Typography variant="body1" marginTop={1}>{email}</Typography>
                            <Typography onClick={logout} marginTop={1}>
                                <LogoutIcon titleAccess="Logout" />
                            </Typography>
                        </Paper>
                    </Popover>
                </div>

            </Box>
            <hr />
            {
                component
            }
        </> : <></>
    )
}
