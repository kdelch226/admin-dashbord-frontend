import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { AgentSimpleCardProp } from '../../interfaces/agent';
import { blue, pink, green, teal } from '@mui/material/colors';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const AgentCard = ({ id, name, gender, post, etat, dateEmbauche, phoneNumber, address, email, noOfProject, noOfEvent }: AgentSimpleCardProp) => {
  const avatarNameTab = name.split(' ');
  const avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
  const avatarColor = gender === 'M' ? blue[500] : pink[500];
  const StatuBgColor = etat === 'Actif' ? teal[100] : '';

  return (
    <Card
      component={Link}
      to={`/agents/show/${id}`}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        width: {xs:"100%",md:'80%'},
        my: 1,
        p: 1,
        '&:hover': {
          boxShadow: 10,
        },
        cursor: 'pointer',
        gap: 2,
        textDecoration: 'none',
      }}
    >
      <Avatar sx={{ bgcolor: avatarColor, width: 64, height: 64 }}>
        {avatarName}
      </Avatar>

      <Stack direction='row'   gap={2}>
        <Stack gap={0.6}>
          <Typography variant='subtitle2' sx={{ fontSize: 18 }}>{name}</Typography>
          <Stack direction='row' alignItems='center' gap={0.5}>
            {gender === 'M' ? <MaleIcon fontSize="small" /> : <FemaleIcon fontSize="small" />}
            <Typography variant='body2'>{gender}</Typography>
          </Stack>
          <Typography variant='body1' sx={{ textDecoration: 'underline', fontWeight: 500 }}>{post}</Typography>
          <Typography variant='body2' bgcolor={StatuBgColor} color="textSecondary" sx={{ fontStyle: 'italic' }}>Statut : {etat}</Typography>
          <Typography variant='body2' sx={{ color: blue[500], fontWeight: 'bold' }}>Embauché le : {new Date(dateEmbauche).toLocaleDateString()}</Typography>
        </Stack>

        <Stack gap={0.6}>
          <Stack direction='row' alignItems='center' gap={0.9}>
            <EmailIcon fontSize="small" />
            <Typography variant='body1'>{email}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' gap={0.9}>
            <LocalPhoneIcon fontSize="small" />
            <Typography variant='body1'>{phoneNumber}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' gap={0.9}>
            <PinDropIcon fontSize="small" />
            <Typography variant='body1'>{address}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack justifyContent='start' direction='row' ml={2} gap={2}>
        <Typography paragraph variant='body1'>projects: {noOfProject}</Typography>
        <Typography paragraph variant='body1'>events: {noOfEvent}</Typography>
      </Stack>
    </Card>
  )
}

export default AgentCard;
