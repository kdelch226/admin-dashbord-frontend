import { useDroppable } from "@dnd-kit/core"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Badge from '@mui/material/Badge';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { Children } from "react";
import { KabanColumnProps } from "../../interfaces/task";


const KanbanColumn = ({
    children,
    title,
    id,
    onAddClick,
    data,
    count,
    description
}: React.PropsWithChildren<KabanColumnProps>) => {

    const { isOver, setNodeRef, active } = useDroppable({
        id,
        data,
    });

    const onAddClickHandler = () => {
        onAddClick?.({ id });
    };

    return (
        <Box
            ref={setNodeRef}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                px:2,
                borderRight:1,
                height:'90VH',
                minWidth:200
            }}
        >

            <Box>
                {/**le header (titre nombre bouton ajout) */}
                <Stack flexDirection='row' sx={{ padding: 1 }} gap={1} width='100%'>
                    <Stack >
                        <Typography sx={{ mr: 1.5 }} fontWeight={500} noWrap={true}>
                            {title}
                        </Typography>
                        {count > 0 ? <Badge badgeContent={count} color="primary" /> : <Badge badgeContent={'O'} color="primary" />}
                    </Stack>
                </Stack>
                {/**la description */}
                <Typography mt={2} >
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} >{description}</pre>
                </Typography>
            </Box>

            <Box
                sx={{
                    px: 1,
                    flex: 1,
                    overflowY: active ? 'unset' : 'auto',
                    border: '5px dashed transparent',
                    borderColor: isOver ? '#000040' : 'transparent',
                    borderRadius: '4px'
                }}>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    {description}
                    {children}
                </Box>
            </Box>

        </Box>
    )
}

export default KanbanColumn