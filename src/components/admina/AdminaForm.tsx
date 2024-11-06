import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AgentFormProps } from '../../interfaces/agent';
import { Box, Typography, TextField, Stack, FormControl, FormHelperText } from '@mui/material';
import { CustumButton } from '../../components';


const AdminaForm = ({ type, register, handleSubmit, formLoading, onFinishHandler, errors }: AgentFormProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClickCancel = () => {
        const actualpath = location?.pathname.split('/');
        const previouspath = actualpath.slice(0, 2).join('/');
        navigate(previouspath);
    };
    return (
        <Box        >
            <Typography fontWeight={600} fontSize={22} mb={2}>
                Create Admin
            </Typography>
            <Box borderRadius={1} p={2} bgcolor='#f5f3f4' >
                <form onSubmit={handleSubmit(onFinishHandler)} style={{ marginTop: '20px', width: '100%', gap: '15px', display: 'flex', flexDirection: 'column' }}>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Administrator Email</FormHelperText>
                        <TextField
                            id='email'
                            type='email'
                            fullWidth
                            variant="outlined"
                            placeholder="@email.com"
                            {...register('newEmail', { required: 'Email is required' })}
                            error={!!errors.newEmail}
                            helperText={errors.newEmail ? (errors.newEmail.message as string) : ''}
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

export default AdminaForm