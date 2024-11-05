import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CustumButton } from '../../components';


const CreateAdmina = () => {

    const { projectId, eventId } = useParams(); // Récupérer projectId et eventId
    const navigate = useNavigate();
    const location = useLocation();

    const handleClickCancel = () => {
        const actualpath = location?.pathname.split('/');
        const previouspath = actualpath.slice(0, 2).join('/');
        navigate(previouspath);
    };

    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        control
    } = useForm({
        refineCoreProps: {
          resource: "users",
        },
      });;

    const onFinishHandler = async (data: FieldValues) => {

        await onFinish({
            ...data,
            projectId: projectId || null, // Associer l'ID de projet si présent
            eventId: eventId || null, // Associer l'ID d'événement si présent
        });
    };

    const [open, setOpen] = useState(true)
    
    const onclose = () => {
        setOpen(false);
        handleClickCancel();
    }
    return (
        <Dialog open={open} onClose={onclose} fullWidth maxWidth="sm">
            <DialogTitle>Create Task</DialogTitle>
            <DialogContent>
                <Box>
                    <form onSubmit={handleSubmit(onFinishHandler)} style={{ width: '100%' }}>
                        <Box marginBottom={2}>
                            <Typography variant="body1" gutterBottom>Administrator Email</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="@email.com"
                                {...register('title', { required: 'Title is required' })}
                                error={!!errors.title}
                                helperText={errors.title ? (errors.title.message as string) : ''}
                            />
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
                                handleClick={onclose}
                            />
                        </DialogActions>
                    </form>
                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default CreateAdmina