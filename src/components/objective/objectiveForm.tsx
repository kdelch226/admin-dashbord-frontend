import React from 'react'
import { Box, Typography, TextField, FormHelperText, FormControl, TextareaAutosize, Stack, Select, MenuItem, Button, InputLabel } from '@mui/material';
import CustumButton from "../common/CustumButton";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ObjectiveFormProps } from '../../interfaces/objective';

const ObjectiveForm = ({ type, register, handleSubmit, formLoading, onFinishHandler }: ObjectiveFormProps) => {
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
                {type} an Objective
            </Typography>

            <Box borderRadius={1} p={2} bgcolor='#f5f3f4'>
                <form onSubmit={handleSubmit(onFinishHandler)} style={{ marginTop: '20px', width: '100%', gap: '15px', display: 'flex', flexDirection: 'column' }}>
                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Title</FormHelperText>
                        <TextField
                            placeholder='Full Title *'
                            fullWidth
                            required
                            id='title'
                            color='info'
                            variant='outlined'
                            {...register('title', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Type</FormHelperText>
                        <Select
                            defaultValue=''
                            id="type"
                            {...register('type', { required: true })}
                        >
                            <MenuItem value='expense'>expense</MenuItem>
                            <MenuItem value='payment'>payment</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Target Value</FormHelperText>
                        <TextField
                            type='number'
                            placeholder='Target Value *'
                            fullWidth
                            required
                            id='targetValue'
                            color='info'
                            variant='outlined'
                            {...register('targetValue', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Start Date</FormHelperText>
                        <TextField
                            type='date'
                            placeholder='Start Date *'
                            fullWidth
                            required
                            id='startDate'
                            color='info'
                            variant='outlined'
                            {...register('startDate', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>End Date</FormHelperText>
                        <TextField
                            type='date'
                            placeholder='End Date *'
                            fullWidth
                            required
                            id='endDate'
                            color='info'
                            variant='outlined'
                            {...register('endDate', { required: true })}
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

export default ObjectiveForm