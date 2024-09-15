import React, { useState } from "react";
import { Box, Typography, TextField, FormHelperText, FormControl, TextareaAutosize, Stack, Select, MenuItem, Button, InputLabel } from '@mui/material';
import CustumButton from "../common/CustumButton";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AgentFormProps } from "../../interfaces/agent";

const EmployeeForm = ({ type, register, handleSubmit, formLoading, onFinishHandler }: AgentFormProps) => {
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
                {type} an Employee
            </Typography>

            <Box borderRadius={1} p={2} bgcolor='#f5f3f4'>
                <form onSubmit={handleSubmit(onFinishHandler)} style={{ marginTop: '20px', width: '100%', gap: '15px', display: 'flex', flexDirection: 'column' }}>
                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Name</FormHelperText>
                        <TextField
                            placeholder='Full Name *'
                            fullWidth
                            required
                            id='name'
                            color='info'
                            variant='outlined'
                            {...register('name', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Genre</FormHelperText>
                        <Select
                            defaultValue=''
                            id="position"
                            {...register('gender', { required: true })}
                        >
                            <MenuItem value='M'>M</MenuItem>
                            <MenuItem value='F'>F</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Email</FormHelperText>
                        <TextField
                            placeholder='Email *'
                            fullWidth
                            required
                            id='email'
                            type='email'
                            color='info'
                            variant='outlined'
                            {...register('email', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Phone Number</FormHelperText>
                        <TextField
                            placeholder='Phone Number *'
                            fullWidth
                            required
                            id='phone'
                            color='info'
                            variant='outlined'
                            {...register('phoneNumber', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Position</FormHelperText>
                        <Select
                            defaultValue='Software Engineer'
                            id="position"
                            {...register('post', { required: true })}
                        >
                            <MenuItem value='Software Engineer'>Software Engineer</MenuItem>
                            <MenuItem value='Product Manager'>Product Manager</MenuItem>
                            <MenuItem value='Designer'>Designer</MenuItem>
                            <MenuItem value='Data Analyst'>Data Analyst</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Address</FormHelperText>
                        <TextField
                            placeholder='Address *'
                            fullWidth
                            required
                            id='address'
                            color='info'
                            variant='outlined'
                            {...register('address', { required: true })}
                        />
                    </FormControl>

                    {type === 'Edit' && (
                        <FormControl>
                            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Status</FormHelperText>
                            <Select
                                defaultValue='Actif'
                                id="etat"
                                {...register('etat', { required: true })}
                            >
                                <MenuItem value='Actif'>Actif</MenuItem>
                                <MenuItem value='En congé'>En congé</MenuItem>
                                <MenuItem value='Suspendu'>Suspendu</MenuItem>
                                <MenuItem value='En probation'>En probation</MenuItem>
                                <MenuItem value='Terminé'>Terminé</MenuItem>
                                <MenuItem value='En formation'>En formation</MenuItem>
                                <MenuItem value='Retraité'>Retraité</MenuItem>
                            </Select>
                        </FormControl>
                    )}

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

export default EmployeeForm;
