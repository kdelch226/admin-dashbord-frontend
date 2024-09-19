import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from '@refinedev/react-hook-form';
import TaskForm from '../../components/task/TaskForm';
import { FieldValues } from 'react-hook-form';


const CreateTask = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        control
    } = useForm();
    

    const [projetId, setProjetId] = useState<string>('')

    const onFinishHandler = async (data: FieldValues) => {

        if (!projetId || projetId==='') {
            await onFinish({
                ...data,
            });
        }
        else {
            await onFinish({
                ...data,
                projetId: projetId,

            });
        };
    }

    return (
        <TaskForm
            type='Create'
            register={register}
            onFinish={onFinish}
            formLoading={isSubmitting}
            handleSubmit={handleSubmit}
            errors={errors}
            onFinishHandler={onFinishHandler}
            setProjetId={setProjetId}
        />
    )
}

export default CreateTask