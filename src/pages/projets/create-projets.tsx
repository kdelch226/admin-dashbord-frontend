import React from 'react';
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';
import ProjetForm from '../../components/projet/ProjetForm';
import { useGetIdentity } from '@refinedev/core';
type IIdentity = {
  id: number;
  name: string;
  email:string
};


const CreateClient = () => {
  const { data: user } = useGetIdentity<IIdentity>();

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { isSubmitting },
    control
  } = useForm();

  const onFinishHandler = async (data: FieldValues) => {

    await onFinish({
      ...data,
      email: user?.email,
    });
  };
  return (
    <ProjetForm
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={isSubmitting}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
      control={control}
    />
  )
}

export default CreateClient