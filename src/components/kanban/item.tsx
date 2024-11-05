import { DragOverlay, useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { Box } from '@mui/material';
import React, { Children } from 'react'

interface Props {
    id: string,
    data?: UseDraggableArguments['data']
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
    const { attributes, listeners, setNodeRef, active } = useDraggable({
        id,
        data
    });
    return (
        <Box sx={{ position: 'relative',my:1 }}>
            <Box
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                sx={{
                    opacity: active ? (active.id === id ? 1 : 0.5) : 1,
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'grab'
                }}
            >
                {active?.id === id && (
                    <DragOverlay zIndex={1000}>
                        <Box sx={{
                            borderRadius: '8px',
                            boxShadow: ' 0px 0px 15px 4px rgba(0,0,0,0.1)',
                            cursor:'grabbing'
                        }}>
                            {children}
                        </Box>
                    </DragOverlay>
                )}
                {children}
            </Box>
        </Box >
    )
}

export default KanbanItem