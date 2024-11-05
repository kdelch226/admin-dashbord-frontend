import React from 'react';
import AgentForm from '../../components/agent/agentForm';
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';

const CreateAgent = () => {
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
    <AgentForm
    type="Create"
    register={register}
    onFinish={onFinish}
    formLoading={isSubmitting}
    handleSubmit={handleSubmit}
    onFinishHandler={onFinishHandler}
    />
  )
}

export default CreateAgent