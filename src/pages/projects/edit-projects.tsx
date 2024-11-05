import React from 'react';
import { FieldValues } from 'react-hook-form';
import { useForm } from '@refinedev/react-hook-form';
import ProjectForm from '../../components/project/ProjectForm';
import { useShow } from '@refinedev/core';

const EditProject = () => {
  const { queryResult } = useShow(); // Assurez-vous de passer le paramètre resource si nécessaire

  // Gestion des données de la requête
  const { data, isLoading, isError } = queryResult;

  // Récupération des informations du project
  const projectInfo = data?.data;

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  // Remplissage du formulaire avec les données du project
  if (projectInfo) {
    setValue('title', projectInfo.title);
    setValue('description', projectInfo.description);
    setValue('startDate', projectInfo.startDate);
    setValue('estimatedEndDate', projectInfo.estimatedEndDate);
    setValue('initialBudget', projectInfo.initialBudget);
  }

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
    });
  };

  // Gestion des états de chargement et d'erreur
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading project data.</p>;

  return (
    <ProjectForm
      type="Edit" // Changez à "Edit" pour refléter l'action
      register={register}
      onFinish={onFinish}
      formLoading={isSubmitting}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
    />
  );
}

export default EditProject;
