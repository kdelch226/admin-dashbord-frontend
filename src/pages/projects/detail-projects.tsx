import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Modal, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Avatar, Stack, FormControl, FormHelperText, TextField } from '@mui/material';
import { CustumButton } from '../../components';
import { useDelete, useGetIdentity, useShow, useUpdate } from '@refinedev/core';
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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AssignedAgents from '../../components/agent/AssignedAgents';
import AddClient from '../../components/common/AddClient';
import TaskList from '../../components/task/Taks';
import { DragEndEvent } from '@dnd-kit/core';
import AssignedTransactionView from '../../components/transactions/AssignedTransactionView';

type IIdentity = {
  id: string;
  email: string
};

const DetailProject = () => {
  // Hooks appelés au début du composant
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IIdentity>();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();
  const { mutate: updateTask } = useUpdate();

  // Gestion des données de la requête
  const { data, isLoading, isError, refetch } = queryResult;
  const projectDetail = data?.data ?? {};
  console.log(projectDetail)

  let avatarNameTab;
  let avatarName;
  let avatarColor;
  const client = projectDetail?.client;
  const assignedEmployees = projectDetail?.assignedEmployees;
  const AssignedTask = projectDetail?.tasks;
  const AssignedPayment = projectDetail?.payment;
  const AssignedExpenses = projectDetail?.expense;


  console.log(assignedEmployees)
  if (client) {
    avatarNameTab = client?.name.split(' ');
    avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
    avatarColor = client?.gender === 'M' ? blue[500] : pink[500];
  }


  //fontion pour afficher les diffrents details du project selon le min menu

  // Calcul de la date limite
  const todayDate = new Date();
  const deadline = new Date(projectDetail.estimatedEndDate);
  const diffDay = (deadline.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24);
  const deadlineColor = diffDay >= 5 ? green[500] : red[500];

  // Gestion des états
  const [openDesc, setOpenDesc] = useState(false);
  const handleOpenDesc = () => setOpenDesc(true);
  const handleCloseDesc = () => setOpenDesc(false);

  const [openAddClient, setOpenAddClient] = useState(false);
  const handleOpenAddClient = () => setOpenAddClient(true);
  const handleCloseAddClient = () => setOpenAddClient(false);



  const [view, setView] = useState<'transactions' | 'agents' | 'tasks'>('agents'); // État pour suivre la vue actuelle

  //fonction to delete client from project
  const handleRemoveClient = () => {
    const response = window.confirm("Are you sure you want to Remove Client From the project?");
    if (response) {
      mutate({
        resource: `projects/${projectDetail._id}/removeclient`,
        id: client._id,
        meta: {
          headers: { "x-meta-data": "true" },
        },
      }, {
        onSuccess: () => {
          window.location.reload();
        }
      });

    }
  };

  //fonction to delete Agent from project
  const handleRemoveAgent = (id: string) => {
    const response = window.confirm("Are you sure you want to Remove Agent From the project?");
    if (response) {
      mutate({
        resource: `projects/${projectDetail._id}/removeemploye`,
        id: id,
        meta: {
          headers: { "x-meta-data": "true" },
        },
      }, {
        onSuccess: () => {
          window.location.reload();
        }
      });

    }
  };

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
    }, {
      onSuccess: () => {
        refetch()
      }
    })

  }

  //fonction to see client details
  const handleClickClientDetail = () => {
    navigate(`/clients/show/${client._id}`);
  }

  // Fonction to delete project
  const handleDeleteProject = () => {
    const response = window.confirm("Are you sure you want to delete this project?");
    if (response) {
      mutate({
        resource: "projects",
        id: id as string,
        values: {
          email: user?.email

        }
      }, {
        onSuccess: () => {
          navigate('/projects');
        }
      });
    }
  };

  const renderAgents = () => (
    <AssignedAgents agents={assignedEmployees} handleDelete={handleRemoveAgent} type='projects' />
  );

  const renderTasks = () => (
    <TaskList handleOnDragEnd={handleOnDragEnd} tasks={AssignedTask} />
  );

  const renderTransactions = () => (
    <Stack sx={{ flexDirection: { lg: 'row', xs: 'column' } }}>
      <AssignedTransactionView entityName={'projet'} entityID={id as string} allTransactions={AssignedPayment} type='Expenses' />
      <AssignedTransactionView entityName={'projet'} entityID={id as string} allTransactions={AssignedExpenses} type='payments' />
    </Stack>
  );


  // Gestion des erreurs et du chargement
  if (isLoading) return <Typography>Loading ...</Typography>;
  if (isError) return <Typography>Error ...</Typography>;

  return (
    <Box borderRadius={1} width='fit-content' padding={1}>
      <Box>
        <Typography fontWeight={600} fontSize={22}>Project : {projectDetail.title}</Typography>
        <Typography m={2} p={0.5} maxWidth={200} bgcolor={deadlineColor} variant='body2' fontWeight={400} fontSize={18}>
          Deadline : {new Date(projectDetail.estimatedEndDate).toLocaleDateString()}
        </Typography>
      </Box>

      <Box mt={2} display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <Box>
          <Typography fontWeight={500} fontSize={18}>Description</Typography>
          <Box
            bgcolor="#fff"
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
            {projectDetail?.description}
          </Box>

          <CustumButton
            title='See More'
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
                  <Typography fontWeight={600} fontSize={22}>{projectDetail.title} Details</Typography>
                  <Button onClick={handleCloseDesc}><CloseIcon /></Button>
                </Box>
                {projectDetail?.description}
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
            <Typography my={2} p={0.5} maxWidth={200} bgcolor="#fff" variant='body2' fontWeight={400} fontSize={18}>
              Initial Budget : {projectDetail.initialBudget}
            </Typography>
          </Box>

        </Box>
        <Box>
          <Box
            bgcolor="#fff"
            mt={3}
            flex={1}
            width={326}
            display="flex"
            flexDirection="column"
            gap="20px"
            sx={{ position: 'sticky', top: 4 }}
          >
            <Stack
              width="100%"
              p={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #E4E4E4"
              borderRadius={2}
            >
              <Stack
                mt={2}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                {client ?
                  <Stack flexDirection='row'>
                    <Avatar onClick={handleClickClientDetail} sx={{ width: 64, height: 64, bgcolor: avatarColor, cursor: 'pointer' }}>
                      {avatarName}
                    </Avatar>
                    <Button onClick={handleRemoveClient}>
                      <Delete sx={{ width: 30, height: 30 }} />
                    </Button>
                  </Stack> :
                  <div>
                    <Button onClick={handleOpenAddClient}>
                      <AddCircleOutlineIcon sx={{ width: 30, height: 30 }} />
                    </Button>

                    <Modal
                      open={openAddClient}
                      onClose={handleCloseAddClient}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AddClient
                        handleCloseAddClient={handleCloseAddClient}
                        type='projects'
                        typeId={id as string}
                      />
                    </Modal>
                  </div>
                }

                <Box>
                  {client ? (
                    <Box>
                      <Typography
                        fontSize={18}
                        fontWeight={600}
                        color="#11142D"
                        mt={client ? 2 : 0}
                        onClick={handleClickClientDetail}
                        sx={{ cursor: 'pointer' }}
                      >
                        {client.name}
                      </Typography>
                      <Typography
                        mt="5px"
                        fontSize={14}
                        fontWeight={400}
                        color="#808191"
                      >
                        {client.company}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      fontSize={18}
                      fontWeight={600}
                      color="#11142D"
                      mt={client ? 2 : 0}
                    >
                      Add Client
                    </Typography>
                  )}
                </Box>



                {client ? (
                  <Typography
                    mt={1}
                    fontSize={16}
                    fontWeight={600}
                    color="#11142D"
                  >
                    {client.project.length}{" "}
                    projects
                  </Typography>
                ) : ''}
              </Stack>

              <Stack
                width="100%"
                mt="25px"
                direction="row"
                flexWrap="wrap"
                gap={2}
              >
                <CustumButton
                  title={"Edit"}
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth
                  icon={<Edit />}
                  handleClick={() => {
                    navigate(
                      `/projects/edit/${projectDetail._id}`,
                    );
                  }}
                />
                <CustumButton
                  title={"Delete"}
                  backgroundColor="#d42e2e"
                  color="#FCFCFC"
                  fullWidth
                  icon={<Delete />}
                  handleClick={() => {
                    handleDeleteProject();
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>

      </Box>

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
          <ListItemButton onClick={() => setView('tasks')}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
          <ListItemButton onClick={() => setView('transactions')}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItemButton>


        </List>

        <Box>
          {view == 'agents' && renderAgents()}
          {view == 'tasks' && renderTasks()}
          {view == 'transactions' && renderTransactions()}
        </Box>
      </Stack>
    </Box>
  );
}

export default DetailProject;
