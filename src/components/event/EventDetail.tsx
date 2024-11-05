import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, IconButton, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const EventDetail: React.FC<{ open: boolean; onClose: () => void; onSubmit: (data: any) => void; eventData: any }> = ({ open, onClose, onSubmit, eventData }) => {
    const [formData, setFormData] = useState(eventData);
    useEffect(() => {
        setFormData(eventData);
    }, [eventData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name: string, value: Date) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <EventIcon /> Modifier l'Événement
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Titre"
                            name="title"
                            fullWidth
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            fullWidth
                            multiline
                            rows={2}
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Date de Début"
                            type="datetime-local"
                            name="startDate"
                            fullWidth
                            value={formData.startDate.toISOString().slice(0, 16)}
                            onChange={(e) => handleDateChange('startDate', new Date(e.target.value))}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Date de Fin"
                            type="datetime-local"
                            name="endDate"
                            fullWidth
                            value={formData.endDate.toISOString().slice(0, 16)}
                            onChange={(e) => handleDateChange('endDate', new Date(e.target.value))}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Lieu"
                            name="location"
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
                            label="Budget Initial"
                            type="number"
                            name="initialBudget"
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
                            name="importance"
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Annuler</Button>
                <Button onClick={handleSubmit} color="primary">Modifier</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventDetail;
