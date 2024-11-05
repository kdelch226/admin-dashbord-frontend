import React from 'react';
import { KanbanBoard, KanbanBoardContainer } from '../kanban/board';
import KanbanColumn from '../kanban/column';
import KanbanItem from '../kanban/item';
import { TaskGroup, TasksProp } from '../../interfaces/task';
import TaskCard from './TaskCard';
import KanBanAddNewCard from '../kanban/AddNewCard';
import { DragEndEvent } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useList, useUpdate } from '@refinedev/core';

interface TaskListProps {
    tasks: any[]
    handleOnDragEnd:(event: DragEndEvent) => void
}

const TaskList = ({tasks,handleOnDragEnd}: TaskListProps) => {


    const Stages = ['unassigned', 'todo', 'pending', 'in-progress', 'completed', 'cancelled'] as const;
    // Fonction pour grouper les tâches par statut
    const groupTasksByStage = (tasks: any[] = []): TaskGroup => {
        // Initialisation de l'objet TaskGroup avec des tableaux vides pour chaque étape
        const taskGroup: TaskGroup = {};
        Stages.forEach((stage) => {
            taskGroup[stage] = [];
        });

        // Grouper les tâches en fonction de leur statut
        tasks.forEach((task: any) => {
            if (taskGroup[task.status]) {
                taskGroup[task.status].push(task);
            }
        });

        return taskGroup;
    };

    // Assurez-vous que les tâches existent avant de les grouper
    const taskGroups = tasks ? groupTasksByStage(tasks) : {};


    const navigate = useNavigate()
    const handleAddTask = () => {
        navigate(
            `/tasks/create`,
        );
    }

    return (
        <Box>
            <Box ml={5}>
                <KanBanAddNewCard onClick={() => { handleAddTask() }} />
            </Box>
            <KanbanBoardContainer>
                <KanbanBoard handleOnDragEnd={handleOnDragEnd}>
                    {Object.keys(taskGroups).map((stage) => (
                        <KanbanColumn
                            id={stage}
                            key={stage}
                            title={stage}
                            data={taskGroups[stage]}
                            count={taskGroups[stage].length}
                            description=''

                        >
                            {
                                ((taskGroups[stage].length === 0)) && ('no task')
                            }
                            {taskGroups[stage].map((task: TasksProp) => (
                                <KanbanItem key={task._id} id={task._id} data={task}>
                                    <TaskCard
                                        id={task._id}
                                        dueDate={task?.dueDate ? (new Date(task?.dueDate)).toLocaleDateString() : undefined}
                                        {...task}
                                    />
                                </KanbanItem>
                            ))}
                        </KanbanColumn>
                    ))}
                </KanbanBoard>
            </KanbanBoardContainer>
        </Box>
    );
}

export default TaskList;
