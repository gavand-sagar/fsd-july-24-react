import { Avatar, Box, Paper, Skeleton, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../common/utils/axiosService';

const UserSkeleton = () => <Box margin={1} width={'300px'}>
    <Paper elevation={5}>
        <Box padding={2} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
            <Skeleton variant='circular' height={40} width={40} />
            <Box>
                <Skeleton variant='rectangular' height={20} width={200} />
                <br />
                <Skeleton variant='rectangular' height={10} width={200} />
            </Box>
        </Box>
    </Paper>
</Box>


export default function Users() {
    const [usersList, setUsersList] = useState([])
    const [apiLoading, setApiLoading] = useState(false);

    useEffect(() => {
        setApiLoading(true);
        axiosInstance.get("/get-users-list")
            .then(resposne => {
                //
                setUsersList(resposne.data)
            })
            .catch(error => {

            })
            .finally(() => {
                setApiLoading(false);
            })
    }, [])

    return (
        <div>
            <Typography variant='h4'>Users</Typography>
            {
                apiLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => <UserSkeleton />)
                    : usersList.map(x =>
                        <Box margin={1} width={'300px'}>
                            <Paper elevation={5}>
                                <Box padding={2} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                        {x.username.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant='h5'>{x.username}</Typography>
                                        <Typography variant='caption'>{x.email}</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    )
            }
        </div>
    )
}
