import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from '@refinedev/react-hook-form';
import TaskFormDialog from '../../components/task/TaskForm';
import { FieldValues } from 'react-hook-form';


const EditTask = () => {
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
        });
    };

    const [open, setOpen] = useState(true)
    const onclose = () => {
        setOpen(false)
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

export default EditTask