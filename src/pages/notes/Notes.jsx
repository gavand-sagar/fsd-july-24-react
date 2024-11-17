import { Box, Button, Paper, Skeleton, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken } from '../../common/utils/utils';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../common/utils/axiosService';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const [deleteApiLoading, setDeleteApiLoading] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm()

    useEffect(() => {
        setGetApiLoading(true);
        axiosInstance.get("/get-notes-list")
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
        axiosInstance.post("/create-note",
            formdata)
            .then(resposne => {
                setNotes([...notes, formdata]);
            })
            .catch(error => {
                alert(error.message)
            })
            .finally(() => {
                setCreateApiLoading(false)
            })
    }

    function handleDelete(id) {
        setDeleteApiLoading(id)
        axiosInstance.delete("/delete-note/" + id)
            .then(resposne => {
                setNotes(notes.filter(x => x._id != id));
            })
            .catch(error => {
                alert(error.message)
            })
            .finally(() => {
                setDeleteApiLoading('')
            })
    }

    return (
        <Box padding={2}>
            <Typography variant='h3'>My Notes</Typography>
            <TextField
                disabled={createApiLoading}
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
            <Button disabled={createApiLoading} onClick={handleSubmit(mySubmit)} variant='contained'>Add Note</Button>
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
                                <Box padding={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                                    <Typography variant='caption'>{x.noteText}</Typography>
                                    {
                                        deleteApiLoading == x._id ? <></> : <DeleteIcon onClick={() => handleDelete(x._id)} />
                                    }
                                </Box>
                            </Paper>
                        </Box>
                    )
            }
        </Box>
    )
}
