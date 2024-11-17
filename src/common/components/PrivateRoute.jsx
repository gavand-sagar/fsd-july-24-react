import React, { useEffect, useState } from 'react'
import { clearTokens, getToken } from '../utils/utils'
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Popover, Typography } from '@mui/material';
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
                        U
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
                        <Typography onClick={logout} sx={{ p: 2 }}> Logout</Typography>
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
