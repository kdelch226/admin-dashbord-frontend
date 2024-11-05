import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Modal, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Avatar, Stack, FormControl, FormHelperText, TextField, Icon, IconButton } from '@mui/material';
import { CustumButton } from '../../components';
import { useDelete, useGetIdentity, useShow } from '@refinedev/core';
import { green, red, grey, blue, pink } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import List from '@mui/material/List';
import { Delete, Edit } from '@mui/icons-material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddCardIcon from '@mui/icons-material/AddCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AssignedAgents from '../../components/agent/AssignedAgents';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddProjectTask from '../../components/task/AddProjetTask';



type IIdentity = {
    id: number;
    email: string
};


const DetailTask = () => {
    // Hooks appelés au début du composant
    const navigate = useNavigate();
    const { data: user } = useGetIdentity<IIdentity>();
    const { id } = useParams();
    const { mutate } = useDelete();
    const { queryResult } = useShow({
        resource: 'tasks',
        id: id
    });

    // Gestion des données de la requête
    const { data, isLoading, isError } = queryResult;
    const taskDetail = data?.data ?? {};
    const assignedEmployees = taskDetail?.assignedEmployees;

    const [view, setView] = useState<string>('agents')
    const [openAddProjet, setOpenAddProjet] = useState<boolean>(false)


    const renderExpense = () => {
        setView('expense')
    }

    const relatedprojectcs = taskDetail?.relatedProject

    // Calcul de la date limite
    const todayDate = new Date();
    const deadline = new Date(taskDetail.estimatedEndDate);
    const diffDay = (deadline.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24);
    const deadlineColor = diffDay >= 5 ? green[500] : red[500];

    // Gestion des états
    const [openDesc, setOpenDesc] = useState(false);
    const handleOpenDesc = () => setOpenDesc(true);
    const handleCloseDesc = () => setOpenDesc(false);

    // Fonction to delete task
    const handleDeleteTask = () => {
        const response = window.confirm("Are you sure you want to delete this task?");
        if (response) {
            mutate({
                resource: "tasks",
                id: id as string,
                values: {
                    email: user?.email

                }
            }, {
                onSuccess: () => {
                    navigate('/tasks');
                }
            });
        }
    };

    const handleRemoveAgent = (agentId: string) => {
        const response = window.confirm("Are you sure you want to remove agent from this task?");
        if (response) {
            mutate({
                resource: `tasks/${id as string}/removeemploye`,
                id: agentId,
                values: {
                    email: user?.email

                }
            }, {
                onSuccess: () => {
                    window.location.reload();
                }
            });
        }
    };

    const handleOpenAddProject = () => {
        setOpenAddProjet(true)
    };

    const handleCloseAddProject = () => {
        setOpenAddProjet(false)
    };

    const renderAgents = () => (
        <AssignedAgents agents={assignedEmployees} type={'tasks'} handleDelete={handleRemoveAgent} />
    )

    // Gestion des erreurs et du chargement
    if (isLoading) return <Typography>Loading ...</Typography>;
    if (isError) return <Typography>Error ...</Typography>;

    return (
        <Box borderRadius={1} bgcolor="#fff" width='100%' padding={1}>
            <Typography fontWeight={600} fontSize={22}>Task : {taskDetail.title}</Typography>
            <Stack direction='row' alignItems='center'>
                <Typography m={2} p={0.5} maxWidth={200} border={1} color={deadlineColor} borderColor={deadlineColor} variant='body2' fontWeight={400} fontSize={18}>
                    Deadline : {new Date(taskDetail.dueDate).toLocaleDateString()}
                </Typography>
                <Typography sx={{ border: 1, px: 0.4, color: 'black', width: 'fit-content' }}>
                    {taskDetail.status}
                </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' flexWrap='wrap'>
                <Box>
                    <Typography fontWeight={500} fontSize={18}>Description</Typography>
                    <Box
                        sx={{
                            border: '1px solid black',
                            maxHeight: 250,
                            overflowY: 'hidden',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            mb: 2,
                            p: 1
                        }}
                    >
                        {taskDetail?.description}
                    </Box>

                    <CustumButton
                        title='More'
                        handleClick={handleOpenDesc}
                        icon={<VisibilityIcon />}
                        backgroundColor='#ebdec2'
                        color='#000'
                    />
                    <Modal
                        open={openDesc}
                        onClose={handleCloseDesc}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Box >
                            <Box
                                sx={{
                                    p: 5,
                                    overflow: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    maxWidth: { sm: '99vw', md: '75vw' },
                                    maxHeight: '91vh',
                                    bgcolor: 'white',
                                    borderRadius: '10px',
                                    mb: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        mb: 4,
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Typography fontWeight={600} fontSize={22}>{taskDetail.title} Details</Typography>
                                    <Button onClick={handleCloseDesc}><CloseIcon /></Button>
                                </Box>
                                {taskDetail?.description}
                            </Box>
                            <CustumButton
                                title='Close'
                                handleClick={handleCloseDesc}
                                icon={<VisibilityOffIcon />}
                                backgroundColor='#ebdec2'
                                color='#000'
                            />
                        </Box>
                    </Modal>

                    <Box>
                        <Typography my={2} p={0.5} maxWidth={200} bgcolor={grey[300]} variant='body2' fontWeight={400} fontSize={18}>
                            Initial Budget : {taskDetail.initialBudget}
                        </Typography>
                    </Box>

                </Box>
                <Box
                    flexWrap="wrap"
                    gap={2}
                    mt={4}
                >
                    <List
                        sx={{ maxidth: 200, bgcolor: 'background.paper', border: '1px solid black', mb: 2 }}
                        component="nav"

                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                {relatedprojectcs.length > 0 ? 'Related Projects' : 'no related Project'}
                            </ListSubheader>
                        }
                    >
                        {relatedprojectcs.map((project: any) => (
                            <ListItemButton>
                                <ListItemText sx={{ borderBottom: 1 }} primary={project.title} />
                            </ListItemButton>
                        ))}

                        <ListItemButton onClick={handleOpenAddProject}>
                            <ListItemIcon>
                                <IconButton>
                                    <AddCircleOutlineOutlinedIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary={'Add project'} />
                        </ListItemButton>

                        <Modal
                            open={openAddProjet}
                            onClose={handleCloseAddProject}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <AddProjectTask
                                handleCloseAddProject={handleCloseAddProject}
                                taskId={id as string}
                            />
                        </Modal>

                    </List>
                    <Stack
                        width="326px"
                        direction="row"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <CustumButton
                            title={"Edit"}
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            icon={<Edit />}
                            handleClick={() => {
                                navigate(
                                    `/tasks/edit/${taskDetail._id}`,
                                );
                            }}
                        />
                        <CustumButton
                            title={"Delete"}
                            backgroundColor="#d42e2e"
                            color="#FCFCFC"
                            icon={<Delete />}
                            handleClick={() => {
                                handleDeleteTask();
                            }}
                        />
                    </Stack>

                </Box>
            </Stack>

            <Stack my={4} flexDirection={{ xs: 'column', sm: 'row' }} gap={2} >
                <List
                    sx={{ maxidth: 360, bgcolor: 'background.paper', border: '1px solid black' }}
                    component="nav"

                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Details
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={() => setView('agents')}>
                        <ListItemIcon>
                            <HeadsetMicIcon />
                        </ListItemIcon>
                        <ListItemText primary="Agents" />
                    </ListItemButton>
                    <ListItemButton onClick={() => setView('expenses')}>
                        <ListItemIcon>
                            <ShoppingCartCheckoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Expenses" />
                    </ListItemButton>
                </List>

                <Box>
                    {view === 'agents' && renderAgents()}
                </Box>
            </Stack>
        </Box >
    );
}

export default DetailTask;
