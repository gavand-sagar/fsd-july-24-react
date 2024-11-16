import { Box, Button, Paper, Skeleton, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken } from '../../common/utils/utils';
import { useForm } from 'react-hook-form';


const NoteSkeleton = () => <Box margin={1} width={'300px'}>
    <Paper elevation={5}>
        <Box padding={2} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
            <Box>
                <Skeleton variant='rectangular' height={20} width={200} />
            </Box>
        </Box>
    </Paper>
</Box>


export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [getApiLoading, setGetApiLoading] = useState(false);
    const [createApiLoading, setCreateApiLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm()

    useEffect(() => {
        setGetApiLoading(true);
        axios.get("http://localhost:3001/get-notes-list", {
            headers: {
                token: getToken()
            }
        })
            .then(resposne => {
                setNotes(resposne.data);
            })
            .catch(error => {
                alert(error.message)
            })
            .finally(() => {
                setGetApiLoading(false);
            })
    }, []);


    function mySubmit(formdata) {
        setCreateApiLoading(true)
        axios.post("http://localhost:3001/create-note",
            formdata
            , {
                headers: {
                    token: getToken()
                }
            })
            .then(resposne => {
                setNotes([...notes,formdata]);
            })
            .catch(error => {
                alert(error.message)
            })
            .finally(() => {
                setCreateApiLoading(false)
            })
    }

    return (
        <Box padding={2}>
            <Typography variant='h3'>My Notes</Typography>
            <TextField
                error={errors?.noteText}
                helperText={errors?.noteText?.message}
                {...register('noteText', {
                    required: {
                        value: true,
                        message: "Required"
                    },
                    minLength: {
                        value: 5,
                        message: 'Minimum 5 letters'
                    },
                    maxLength: {
                        value: 500,
                        message: 'Maximum 500 letters'
                    }
                })} />
            <Button onClick={handleSubmit(mySubmit)} variant='contained'>Add Note</Button>
            {
                getApiLoading ? <>
                    <NoteSkeleton />
                    <NoteSkeleton />
                    <NoteSkeleton />
                    <NoteSkeleton />
                </>
                    :
                    notes.map(x =>
                        <Box margin={1}>
                            <Paper elevation={5}>
                                <Box padding={2} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
                                    <Typography variant='caption'>{x.noteText}</Typography>
                                </Box>
                            </Paper>
                        </Box>
                    )
            }
        </Box>
    )
}
