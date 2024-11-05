import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Modal, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Avatar, Stack, FormControl, FormHelperText, TextField } from '@mui/material';
import { CustumButton } from '../../components';
import { useDelete, useGetIdentity, useShow } from '@refinedev/core';
import { green, red, grey, blue, pink, orange, yellow, lime } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import List from '@mui/material/List';
import { Delete, Edit } from '@mui/icons-material';
// import AddClientevent from '../../components/event/AddClient';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddCardIcon from '@mui/icons-material/AddCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AssignedAgents from '../../components/agent/AssignedAgents';


type IIdentity = {
  id: number;
  email: string
};


const DetailEvent = () => {
  // Hooks appelés au début du composant
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IIdentity>();
  // const { id } = useParams();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow({
    resource: 'events',
    id: id
  });


  // Gestion des données de la requête
  const { data, isLoading, isError } = queryResult;
  const eventDetail = data?.data ?? {};

  let avatarNameTab;
  let avatarName;
  let avatarColor;
  const client = eventDetail?.client;
  const assignedEmployees = eventDetail?.assignedEmployees;

  const AssignedTask = !eventDetail?.tasks && [
    {
      _id: 'task1',
      title: 'Développer la fonctionnalité X',
      description: 'Développer la nouvelle fonctionnalité X pour le event.',
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

  // if (client) {
  //   avatarNameTab = client?.name.split(' ');
  //   avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
  //   avatarColor = client?.gender === 'M' ? blue[500] : pink[500];
  // }


  //fontion pour afficher les diffrents details du event selon le min menu
  const renderAgents = () => (
    <AssignedAgents agents={assignedEmployees} type={'events'} handleDelete={handleRemoveAgent} />
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
  const deadline = new Date(eventDetail.estimatedEndDate);
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

  //fonction to delete client from event
  const handleRemoveClient = () => {
    const response = window.confirm("Are you sure you want to Remove Client From the event?");
    if (response) {
      mutate({
        resource: "events",
        id: id as string,
        values: {
          email: user?.email

        }
      }, {
        onSuccess: () => {
          navigate('/events');
        }
      });
    }
  }

  //fonction to see client details
  const handleClickClientDetail = () => {
    navigate(`/clients/show/${client._id}`);
  }

  // Fonction to delete event
  const handleDeleteevent = () => {
    const response = window.confirm("Are you sure you want to delete this event?");
    if (response) {
      mutate({
        resource: "events",
        id: id as string,
        values: {
          email: user?.email

        }
      }, {
        onSuccess: () => {
          navigate('/events');
        }
      });
    }
  };

  const handleRemoveAgent = (id: string) => {
    const response = window.confirm("Are you sure you want to Remove Agent From the event?");
    if (response) {
      mutate({
        resource: `events/${id}/removeemploye`,
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

  const verifyDate = (dateString: string): string => {
    // Vérifier si la chaîne de date est valide
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';

    // Options pour le format de la date et de l'heure
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",    // Affiche l'année
      month: "short",     // Affiche le mois en lettres courtes ("Jan", "Feb", etc.)
      day: "2-digit",     // Affiche le jour avec deux chiffres
      hour: "2-digit",    // Affiche l'heure avec deux chiffres
      minute: "2-digit",  // Affiche les minutes avec deux chiffres
      hour12: true,       // Utilise le format 12 heures avec AM/PM
    };

    // Conversion et formatage de la date en utilisant toLocaleString
    return date.toLocaleString("en-US", options);
  }

  const importanceColors: Record<string, string> = {
    Critical: red[500],
    High: orange[500],
    Medium: lime[500],
    Low: green[500],
    Very: green[300],
  };

  const importanceColor = importanceColors[eventDetail?.importance];

  // Gestion des erreurs et du chargement
  if (isLoading) return <Typography>Loading ...</Typography>;
  if (isError) return <Typography>Error ...</Typography>;

  console.log(eventDetail)
  return (
    <Box borderRadius={1} bgcolor="#fff" width='fit-content' padding={1}>
      <Stack sx={{ gap: 0.5 }}>
        <Typography fontWeight={600} fontSize={22}>event : {eventDetail.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {verifyDate(eventDetail.startDate)} - {verifyDate(eventDetail.endDate)}
        </Typography>
        <Typography sx={{ border: 1, px: 0.4, color: importanceColor, width: 'fit-content' }}>
          {eventDetail.importance}
        </Typography>
      </Stack>

      <Box mt={2} width={'100%'} display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
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
            {eventDetail?.description ? eventDetail?.description : 'no description'}
          </Box>

          {eventDetail?.description && (
            <CustumButton
              title='See More'
              handleClick={handleOpenDesc}
              icon={<VisibilityIcon />}
              backgroundColor='#ebdec2'
              color='#000'
            />)}
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
                  <Typography fontWeight={600} fontSize={22}>{eventDetail.title} Details</Typography>
                  <Button onClick={handleCloseDesc}><CloseIcon /></Button>
                </Box>
                {eventDetail?.description}
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
              Initial Budget : {eventDetail.initialBudget}
            </Typography>
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
          <ListItemButton onClick={() => setView('agents')}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Clients" />
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
          {view == 'agents' && renderAgents()}
        </Box>
      </Stack>
    </Box>
  );
}

export default DetailEvent;
