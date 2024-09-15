import React, { useState } from "react";
import { Box, Typography, TextField, FormHelperText, FormControl, TextareaAutosize, Stack, Select, MenuItem, Button, InputLabel } from '@mui/material';
import CustumButton from "../common/CustumButton";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AgentFormProps } from "../../interfaces/agent";

const ProjetForm = ({ type, register, handleSubmit, formLoading, onFinishHandler }: AgentFormProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClickCancel = () => {
        const actualpath = location?.pathname.split('/');
        const previouspath = actualpath.slice(0, 2).join('/');
        navigate(previouspath);
    };


    return (
        <Box>
            <Typography fontWeight={600} fontSize={22} mb={2}>
                {type} an Project
            </Typography>

            <Box borderRadius={1} p={2} bgcolor='#f5f3f4'>
                <form onSubmit={handleSubmit(onFinishHandler)} style={{ marginTop: '20px', width: '100%', gap: '15px', display: 'flex', flexDirection: 'column' }}>
                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Title</FormHelperText>
                        <TextField
                            placeholder='Title *'
                            fullWidth
                            required
                            id='title'
                            color='info'
                            variant='outlined'
                            {...register('title', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Description</FormHelperText>
                        <TextareaAutosize
                            placeholder='write a entire description of the Project, it will you to recognize projects
              *'
                            style={{
                                background: 'transparent',
                                width: '100%',
                                padding: 10,
                                borderColor: 'rgba(0,0,0,0.23)',
                                borderRadius: 5
                            }}
                            minRows={5}
                            id='name'
                            {...register('description', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>
                            Start Date
                        </FormHelperText>
                        <input
                            type="date"
                            {...register('startDate', { required: true })}
                            style={{
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(0,0,0,0.23)',
                                borderRadius: 5,
                                padding: '10px',
                                fontSize: '16px',
                                width: '100%',
                                boxSizing: 'border-box',
                                margin: '8px 0'
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>
                        Estimated End Date
                        </FormHelperText>
                        <input
                            type="date"
                            {...register('estimatedEndDate', { required: true })}
                            style={{
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(0,0,0,0.23)',
                                borderRadius: 5,
                                padding: '10px',
                                fontSize: '16px',
                                width: '100%',
                                boxSizing: 'border-box',
                                margin: '8px 0'
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Initial Budget</FormHelperText>
                        <TextField
                            placeholder='initialBudget entry number only  *'
                            fullWidth
                            required
                            id='phone'
                            color='info'
                            variant='outlined'
                            {...register('initialBudget', { required: true })}
                        />
                    </FormControl>

                   


                    <Stack direction='row' gap={2}>
                        <CustumButton
                            type='submit'
                            title={formLoading ? 'Submitting...' : 'Submit'}
                            backgroundColor='#ebdec2'
                            color='#000'
                        />
                        <CustumButton
                            type='button'
                            title='Cancel'
                            backgroundColor='#d00000'
                            color='#000'
                            handleClick={handleClickCancel}
                        />
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

export default ProjetForm;
