import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Box } from '@mui/material'
import React from 'react'
import { DragEndEvent } from '@dnd-kit/core';


export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
    return (
        <Box
            sx={{
                width:'100%',
                display: 'flex',
                flexDirection: 'column',
                margin: 2,
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 2
                }}>
                {children}
            </Box>

        </Box>
    )
}

type KanbanBoardProps={
    handleOnDragEnd: (event: DragEndEvent) => void
}

export const KanbanBoard = ({ children,handleOnDragEnd }: React.PropsWithChildren<KanbanBoardProps>) => {
    const mouseSensor=useSensor(
        MouseSensor,{
            activationConstraint:{
                distance:5
            }
        }
    )

    const touchSensor=useSensor(
        TouchSensor,{
            activationConstraint:{
                distance:5
            }
        }
    )

    const sensors=useSensors(mouseSensor,touchSensor)
    return (
        <DndContext onDragEnd={handleOnDragEnd} sensors={sensors}>
            {children}
        </DndContext>
    )
}

