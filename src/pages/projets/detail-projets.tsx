import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Modal, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Avatar, Stack, FormControl, FormHelperText, TextField } from '@mui/material';
import { CustumButton } from '../../components';
import { useDelete, useGetIdentity, useShow } from '@refinedev/core';
import { green, red, grey, blue, pink } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import List from '@mui/material/List';
import { Delete, Edit } from '@mui/icons-material';
import AddClientProjet from '../../components/projet/AddClientProjet';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddCardIcon from '@mui/icons-material/AddCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AssignedAgents from '../../components/agent/AssignedAgents';


type IIdentity = {
  id: number;
  email: string
};


const DetailProject = () => {
  // Hooks appelés au début du composant
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IIdentity>();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  // Gestion des données de la requête
  const { data, isLoading, isError } = queryResult;
  const projetDetail = data?.data ?? {};

  let avatarNameTab;
  let avatarName;
  let avatarColor;
  const client = projetDetail?.client;
  const assignedEmployees = projetDetail?.assignedEmployees;

  const AssignedTask = projetDetail?.tasks?.length < 1 && [
    {
      _id: 'task1',
      title: 'Développer la fonctionnalité X',
      description: 'Développer la nouvelle fonctionnalité X pour le projet.',
      status: 'En cours',
      assignedTo: ['employee1'],
      dueDate: new Date('2024-09-30'),
    },
    {
      _id: 'task2',
      title: 'Concevoir l’interface utilisateur Y',
      description: 'Créer l’interface utilisateur pour la fonctionnalité Y.',
      status: 'À faire',
      assignedTo: ['employee2'],
      dueDate: new Date('2024-10-15'),
    },
  ]

  if (client) {
    avatarNameTab = client?.name.split(' ');
    avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
    avatarColor = client?.gender === 'M' ? blue[500] : pink[500];
  }


  //fontion pour afficher les diffrents details du projet selon le min menu
  const renderAgents = () => (
    <AssignedAgents agents={assignedEmployees} />
  );

  const renderTasks = () => (
    ''
  );

  const renderExpenses = () => (
    ''
  );

  const renderPayments = () => (
    ''
  );

  // Calcul de la date limite
  const todayDate = new Date();
  const deadline = new Date(projetDetail.estimatedEndDate);
  const diffDay = (deadline.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24);
  const deadlineColor = diffDay >= 5 ? green[500] : red[500];

  // Gestion des états
  const [openDesc, setOpenDesc] = useState(false);
  const handleOpenDesc = () => setOpenDesc(true);
  const handleCloseDesc = () => setOpenDesc(false);

  const [openAddClient, setOpenAddClient] = useState(false);
  const handleOpenAddClient = () => setOpenAddClient(true);
  const handleCloseAddClient = () => setOpenAddClient(false);

  

  const [view, setView] = useState<'expenses' | 'payments' | 'agents' | 'tasks'>('agents'); // État pour suivre la vue actuelle

  //fonction to delete client from project
  const handleRemoveClient = () => {
    const response = window.confirm("Are you sure you want to Remove Client From the project?");
    if (response) {
      mutate({
        resource: "projets",
        id: id as string,
        values: {
          email: user?.email

        }
      }, {
        onSuccess: () => {
          navigate('/projets');
        }
      });
    }
  }

  //fonction to see client details
  const handleClickClientDetail = () => {
    navigate(`/clients/show/${client._id}`);
  }

  // Fonction to delete project
  const handleDeleteProjet = () => {
    const response = window.confirm("Are you sure you want to delete this project?");
    if (response) {
      mutate({
        resource: "projets",
        id: id as string,
        values: {
          email: user?.email

        }
      }, {
        onSuccess: () => {
          navigate('/projets');
        }
      });
    }
  };

  // Gestion des erreurs et du chargement
  if (isLoading) return <Typography>Loading ...</Typography>;
  if (isError) return <Typography>Error ...</Typography>;

  console.log(projetDetail)
  return (
    <Box borderRadius={1} bgcolor="#fff" width='fit-content' padding={1}>
      <Box>
        <Typography fontWeight={600} fontSize={22}>Projet : {projetDetail.title}</Typography>
        <Typography m={2} p={0.5} maxWidth={200} bgcolor={deadlineColor} variant='body2' fontWeight={400} fontSize={18}>
          Deadline : {new Date(projetDetail.estimatedEndDate).toLocaleDateString()}
        </Typography>
      </Box>

      <Box mt={2} display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
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
            {projetDetail?.description}
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
                  <Typography fontWeight={600} fontSize={22}>{projetDetail.title} Details</Typography>
                  <Button onClick={handleCloseDesc}><CloseIcon /></Button>
                </Box>
                {projetDetail?.description}
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
              Initial Budget : {projetDetail.initialBudget}
            </Typography>
          </Box>

        </Box>
        <Box>
          <Box
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
                    <Button onClick={handleOpenAddClient}>
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
                      <AddClientProjet
                        handleCloseAddClient={handleCloseAddClient}
                        projetId={id as string}
                        userEmail={user?.email as string} />
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
                    {client.projet.length}{" "}
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
                      `/projets/edit/${projetDetail._id}`,
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
                    handleDeleteProjet();
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
          <ListItemButton onClick={() => setView('expenses')}>
            <ListItemIcon>
              <ShoppingCartCheckoutIcon />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItemButton>
          <ListItemButton onClick={() => setView('payments')}>
            <ListItemIcon>
              <AddCardIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItemButton>

        </List>

        <Box>
          {view=='agents' && renderAgents()}
        </Box>
      </Stack>
    </Box>
  );
}

export default DetailProject;
