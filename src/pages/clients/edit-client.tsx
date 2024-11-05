import React from 'react'
import { FieldValues } from 'react-hook-form';
import ClientForm from '../../components/client/ClientForm';
import { useForm } from '@refinedev/react-hook-form';

const EditClient = () => {
 
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
    type="Edit"
    register={register}
    onFinish={onFinish}
    formLoading={isSubmitting}
    handleSubmit={handleSubmit}
    onFinishHandler={onFinishHandler}
    />
  )

}

export default EditClient
