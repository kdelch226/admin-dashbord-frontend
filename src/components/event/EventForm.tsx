import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    IconButton,
    Grid,
    Stack,
    Box,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';

interface EventEditorTemplateProps {
    eventData?: any; // Optionnel pour les événements existant
    onCancel?: () => void;
    type?:string
}

const EventForm: React.FC<EventEditorTemplateProps> = ({ eventData , onCancel,type }) => {

    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const [formData, setFormData] = useState({
        title: eventData?.title || '',
        description: eventData?.description || '',
        startDate: eventData?.startDate || new Date(),
        endDate: eventData?.endDate || new Date(),
        location: eventData?.location || '',
        initialBudget: eventData?.initialBudget || 0,
        importance: eventData?.importance || 'Medium',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name: string, value: Date) => {
        setFormData({ ...formData, [name]: value });
    };

    const onFinishHandler = async (data: FieldValues) => {

        await onFinish({
            ...data,
        });
    };

    return (
        <form onSubmit={handleSubmit(onFinishHandler)}>
            <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 3, width: '100%', maxWidth: 600, mx: 'auto' }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <EventIcon />
                <h3>Event Detail</h3>
            </Stack>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        {...register("title")}
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        {...register("description")}
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Start Date"
                        type="datetime-local"
                        {...register("startDate")}
                        fullWidth
                        value={formData.startDate.toISOString().slice(0, 16)}
                        onChange={(e) => handleDateChange('startDate', new Date(e.target.value))}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="End Date"
                        type="datetime-local"
                        {...register("endDate")}
                        fullWidth
                        value={formData.endDate.toISOString().slice(0, 16)}
                        onChange={(e) => handleDateChange('endDate', new Date(e.target.value))}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Location"
                        {...register("location")}
                        fullWidth
                        value={formData.location}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <IconButton>
                                    <LocationOnIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Initial Budget"
                        type="number"
                        {...register("initialBudget")}
                        fullWidth
                        value={formData.initialBudget}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <IconButton>
                                    <AttachMoneyIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        label="Importance"
                        {...register("importance")}
                        fullWidth
                        value={formData.importance}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <IconButton>
                                    <PriorityHighIcon />
                                </IconButton>
                            ),
                        }}
                    >
                        {['Critical', 'High', 'Medium', 'Low'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button onClick={onCancel} color="primary">Cancel</Button>
                <Button type='submit' color="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
            </Stack>
        </Box>
        </form>
    );
};

export default EventForm;
