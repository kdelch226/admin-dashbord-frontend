import React from 'react';
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';
import ClientForm from '../../components/client/ClientForm';

const CreateClient = () => {
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
    <ClientForm
    type="Create"
    register={register}
    onFinish={onFinish}
    formLoading={isSubmitting}
    handleSubmit={handleSubmit}
    onFinishHandler={onFinishHandler}
    />
  )
}

export default CreateClient