import { useForm } from '@refinedev/react-hook-form';
import React from 'react'
import { FieldValues } from 'react-hook-form';
import AgentForm from '../../components/agent/agentForm';


const EditAgent = () => {
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
    });
  };
  return (
    <AgentForm
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={isSubmitting}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
    />
  )
}

export default EditAgent
