import React from 'react';
import TaskList from '../../components/task/Taks';
import { useList, useUpdate } from '@refinedev/core';
import { TaskSimpleCardProp, TaskGroup, TasksProp } from '../../interfaces/task';
import { Box } from '@mui/material';
import { DragEndEvent } from '@dnd-kit/core';
import { Outlet } from 'react-router-dom';

const AllTasks = ({children}:React.PropsWithChildren) => {
  const { data, isLoading: isLoadingTasks, isError } = useList<TasksProp>({
    resource: "tasks",
  });

  const { mutate: updateTask } = useUpdate();

  const Stages = ['unassigned', 'todo', 'pending', 'in-progress', 'completed', 'cancelled'] as const;
  type Stage = typeof Stages[number];
  const tasks = data?.data;

  // Fonction pour grouper les tâches par statut
  const groupTasksByStage = (tasks: TasksProp[] = []): TaskGroup => {
    // Initialisation de l'objet TaskGroup avec des tableaux vides pour chaque étape
    const taskGroup: TaskGroup = {};
    Stages.forEach((stage) => {
      taskGroup[stage] = [];
    });

    // Grouper les tâches en fonction de leur statut
    tasks.forEach((task: TasksProp) => {
      if (taskGroup[task.status]) {
        taskGroup[task.status].push(task);
      }
    });

    return taskGroup;
  };

  // Assurez-vous que les tâches existent avant de les grouper
  const taskGroups = tasks ? groupTasksByStage(tasks) : {};

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stage = event.over?.id as undefined | string;
    const taskId = event.active.id as string
    const taskStage = event.active.data.current?.status;

    if (taskStage === stage) return;
    console.log('taskStage ', taskStage, 'stage ')

    updateTask({
      resource: 'tasks',
      id: taskId,
      values: {
        status: stage
      },
      mutationMode: 'optimistic'
    })

  }

  return (
    <div>
      {isLoadingTasks ? (
        <p>Loading tasks...</p>
      ) : isError ? (
        <p>Failed to load tasks.</p>
      ) : (
        <Box mx={2}>
          <TaskList taskGroups={taskGroups} handleOnDragEnd={handleOnDragEnd} />
          <Outlet/>
        </Box>
      )}
    </div>
  );
};

export default AllTasks;
