import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, FieldValues } from 'react-hook-form';
import { TaskFormProps } from '../../interfaces/task';
import { useNavigate, } from 'react-router-dom';

import CustumButton from '../common/CustumButton';

const TaskFormDialog = ({ errors, isSubmitting, open, onClose, register, handleSubmit, onFinishHandler }: TaskFormProps) => {

    const handleClose = () => {
        onClose();
    };

    const importanceOptions = ['Critical', 'High', 'Medium', 'Low', 'Very'];
    const STATUS_OPTIONS = ['unassigned', 'todo', 'in-progress', 'pending', 'completed', 'cancelled'];

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Create Task</DialogTitle>
            <DialogContent>
                <Box>
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


                        <DialogActions>
                            <CustumButton
                                type='submit'
                                title={isSubmitting ? 'is submiting' : 'submit'}
                                backgroundColor='#ebdec2'
                                color='#000'

                            />
                            <CustumButton
                                type='Cancel'
                                title='Cancel'
                                backgroundColor='#d00000'
                                color='#000'
                                handleClick={handleClose}
                            />
                        </DialogActions>
                    </form>
                </Box>
            </DialogContent>

        </Dialog>
    );
};

export default TaskFormDialog;
