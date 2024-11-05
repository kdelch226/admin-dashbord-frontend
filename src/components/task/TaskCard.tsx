import React, { MouseEvent, useState } from 'react';
import { TaskSimpleCardProp } from '../../interfaces/task';
import { Avatar, Box, IconButton, Card, CardHeader, MenuItem, Popper, ClickAwayListener, Paper, Menu, Typography, CardContent, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, Edit } from '@mui/icons-material';
import CustumButton from '../common/CustumButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import NotesIcon from '@mui/icons-material/Notes';
import { green, red } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDelete } from '@refinedev/core';

const TaskCard = ({ id, title, dueDate, assignedEmployees, importance, status }: TaskSimpleCardProp) => {
    const edit = () => {
        // Logic for editing
    };
    const navigate = useNavigate();
    const { mutate } = useDelete();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Ouvrir le menu
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    // Fermer le menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Gérer les options sélectionnées
    const handleMenuItemClick = (option: string) => {
        handleClose();
    };

    const handleDelete = () => {
        const text = `do you want to delete task '${title}' ??`;
        const response = confirm(text);
        if (text) {
            mutate({
                id: id,
                resource: 'tasks'
            })
        }
        else return;
    }

    let deadlineColor;
    const deadline = dueDate ? new Date(dueDate).toDateString() : "Pas de date limite"
    if (dueDate) {
        const todayDate = new Date();
        const deadline = new Date(dueDate);
        const diffDay = (deadline.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24);
        deadlineColor = diffDay >= 5 ? green[500] : red[500];
    }

    return (
        <Card sx={{ width: '300px' }} onClick={() => edit()}>
            <CardHeader
                title={<Box
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '80%',
                        padding: 0
                    }}
                >
                    <Typography fontSize={17} fontWeight={600}>{title}</Typography>
                </Box>}
                action={
                    <Box>
                        <IconButton
                            onClick={handleClick}
                            aria-label="settings"
                            onPointerDown={(e) => e.stopPropagation()}

                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="dropdown-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose} // Fermer le menu si vous cliquez en dehors
                            MenuListProps={{
                                'aria-labelledby': 'dropdown-button',
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <MenuItem>
                                <CustumButton
                                    title={"Edit"}
                                    backgroundColor="#475BE8"
                                    color="#FCFCFC"
                                    fullWidth
                                    icon={<Edit />}
                                    handleClick={() => {
                                        navigate(
                                            `/tasks/edit/${id}`,
                                        );
                                    }}
                                />
                            </MenuItem>
                            <MenuItem>
                                <CustumButton
                                    variant='outlined'
                                    title="Task Details"
                                    backgroundColor="#475BE8"
                                    color="#FCFCFC"
                                    fullWidth
                                    icon={<VisibilityIcon />}
                                    handleClick={() => {
                                        navigate(
                                            `show/${id}`,
                                        );
                                    }}
                                />
                            </MenuItem>
                            <MenuItem>
                                <CustumButton
                                    title="Delete"
                                    backgroundColor="#d42e2e"
                                    color="#FCFCFC"
                                    fullWidth
                                    icon={<Delete />}
                                    handleClick={handleDelete}
                                />
                            </MenuItem>
                        </Menu>
                    </Box>
                }
            />
            <CardContent sx={{
                py: 0
            }}>
                <Stack gap={1} direction='row' justifyContent='space-between'>
                    <NotesIcon />

                    <Stack sx={{
                        color: deadlineColor,
                        border: 1,
                        borderColor: { deadlineColor },
                        p: 0.4,
                    }} direction='row'>
                        <AccessTimeIcon />
                        <Typography>{deadline}</Typography>
                    </Stack>
                    <Typography sx={{ border: 1, px: 0.4, color: 'black' }}>
                        {importance}
                    </Typography>
                </Stack>

            </CardContent>
        </Card>
    );
};

export default TaskCard;
