import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from '@refinedev/react-hook-form';
import TaskFormDialog from '../../components/task/TaskForm';
import { FieldValues } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const CreateTask = () => {

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
    } = useForm();

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
        handleClickCancel()
    }
    return (
        <TaskFormDialog
            open={open}
            onClose={onclose}
            register={register}
            onFinish={onFinish}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            errors={errors}
            onFinishHandler={onFinishHandler}
        />
    )
}

export default CreateTask