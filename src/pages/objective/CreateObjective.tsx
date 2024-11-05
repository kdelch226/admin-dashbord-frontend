import { useForm } from '@refinedev/react-hook-form';
import React from 'react'
import { FieldValues } from 'react-hook-form';
import ObjectiveForm from '../../components/objective/objectiveForm';

const CreateObjective = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onFinishHandler = async (data: FieldValues) => {

        await onFinish({
            ...data,
        });
    };

    return (
        <ObjectiveForm
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={isSubmitting}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler} />
    )
}

export default CreateObjective