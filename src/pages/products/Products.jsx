import { Box, Chip, Skeleton, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken } from '../../common/utils/utils';

export default function Products() {
    const [categories, setCategories] = useState([]);
    const [apiLoading, setApiLoading] = useState(false);

    useEffect(() => {
        //api call on page load
        setApiLoading(true)
        axios.get("https://fsd-july-2024-backend.onrender.com/get-all-categories",
            {
                headers: {
                    token: getToken()
                }
            })
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                if (error?.response?.data?.message) {
                    alert(error?.response?.data?.message)
                }
                else {
                    alert("Error in application")
                }
            })
            .finally(() => {
                setApiLoading(false)
            })

    }, [])

    return (
        <Box padding={2}>
            <Typography variant='h3'>All Categories</Typography>
            <Box padding={1}>
                {
                    apiLoading ?
                        <>
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                            <Skeleton sx={{ display: 'inline-block', margin: '5px' }} variant="rectangular" width={100} height={30} />
                        </>
                        :
                        categories.map(x =>
                            <Chip sx={{ margin: '5px' }} label={x.categoryName} variant="outlined" />
                        )
                }
            </Box>
        </Box>
    )
}
