import React from 'react';
import TaskList from '../../components/task/Taks';
import { useList, useUpdate } from '@refinedev/core';
import { TaskSimpleCardProp, TaskGroup, TasksProp } from '../../interfaces/task';
import { Box } from '@mui/material';
import { DragEndEvent } from '@dnd-kit/core';
import { Outlet } from 'react-router-dom';

const AllTasks = ({ children }: React.PropsWithChildren) => {
  const { data, isLoading: isLoadingTasks, isError } = useList<TasksProp>({
    resource: "tasks",
  });
  const { mutate: updateTask } = useUpdate();

  const tasks = data?.data ||[];

  console.log(tasks)

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
          <TaskList handleOnDragEnd={handleOnDragEnd} tasks={tasks} />
          <Outlet />
        </Box>
      )}
    </div>
  );
};

export default AllTasks;
