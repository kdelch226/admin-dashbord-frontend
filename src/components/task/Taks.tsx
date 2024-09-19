import React from 'react';
import { KanbanBoard, KanbanBoardContainer } from '../kanban/board';
import KanbanColumn from '../kanban/column';
import KanbanItem from '../kanban/item';
import { TaskGroup, TasksProp } from '../../interfaces/task';
import TaskCard from './TaskCard';
import KanBanAddNewCard from '../kanban/AddNewCard';
import { DragEndEvent } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';

interface TaskListProps {
    taskGroups: TaskGroup;
    handleOnDragEnd: (event: DragEndEvent) => void
}

const TaskList = ({ taskGroups, handleOnDragEnd }: TaskListProps) => {

    const navigate = useNavigate()
    const handleAddTask = (status:string) => {
        navigate(
            `create`,
        );
    }

    return (
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
                            ((taskGroups[stage].length === 0)) && (<KanBanAddNewCard onClick={()=>{handleAddTask(stage)}} />)
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
    );
}

export default TaskList;
