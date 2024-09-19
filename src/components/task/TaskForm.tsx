import React from 'react';
import { Box, Typography, TextField, Button, InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import { TaskFormProps } from '../../interfaces/task';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CustumButton from '../common/CustumButton';

const TaskForm: React.FC<TaskFormProps> = ({ setProjetId, projet, type, errors, formLoading, register, handleSubmit, onFinishHandler }) => {


    const navigate = useNavigate();
    const location = useLocation();

    const handleClickCancel = () => {
        const actualpath = location?.pathname.split('/');
        const previouspath = actualpath.slice(0, 2).join('/');
        navigate(previouspath);
    };

    const importanceOptions = ['Critical', 'High', 'Medium', 'Low', 'Very'];
    const STATUS_OPTIONS = ['unassigned', 'todo', 'in-progress', 'pending', 'completed', 'cancelled'];

    if (projet?.projetId) {
        setProjetId(projet.projetId)
    }

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {type} Task
            </Typography>

            {projet && (
                <Typography variant="h6" gutterBottom>
                    Poject :{projet.projetName}
                </Typography>
            )}

            <form onSubmit={handleSubmit(onFinishHandler)} style={{ width: '100%' }}>
                <Box marginBottom={2}>
                    <Typography variant="body1" gutterBottom>Title</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Title"
                        {...register('title', { required: 'Title is required' })}
                        error={!!errors.title}
                        helperText={errors.title ? (errors.title.message as string) : ''}
                    />
                </Box>

                <Box marginBottom={2}>
                    <Typography variant="body1" gutterBottom>Description</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Description"
                        multiline
                        minRows={4}
                        {...register('description', { required: 'Description is required' })}
                        error={!!errors.description}
                        helperText={errors.description ? (errors.description.message as string) : ''}
                    />
                </Box>

                <Box marginBottom={2}>
                    <Typography variant="body1" gutterBottom>Due Date</Typography>
                    <TextField
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register('dueDate', { required: 'dueDate is required' })}
                        error={!!errors.estimatedEndDate}
                        helperText={errors.estimatedEndDate ? (errors.estimatedEndDate.message as string) : ''}
                    />
                </Box>

                <Box marginBottom={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="importance-label">Importance</InputLabel>
                        <Select
                            labelId="importance-label"
                            id="importance"
                            {...register('importance', { required: 'Importance is required' })}
                            error={!!errors.importance}
                            label="Importance"
                        >
                            {importanceOptions.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.importance && (
                            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                                {errors.importance.message}
                            </Typography>
                        )}
                    </FormControl>
                </Box>

                <Box mb={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="status"
                            defaultValue="unassigned"
                            {...register('status')}
                        >
                            {STATUS_OPTIONS.map(status => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                

                <Box mt={2} sx={{ display: 'flex', gap: 2 }}>
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
                </Box>
            </form>
        </Box>
    );
};

export default TaskForm;
