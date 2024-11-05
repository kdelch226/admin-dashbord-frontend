import { Avatar, Button, Stack, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentSimpleCardProp } from '../../interfaces/agent';
import { blue, pink, green, orange, grey, red } from '@mui/material/colors';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useDelete } from '@refinedev/core';
import { Delete, Edit } from '@mui/icons-material';

const AgentCard = ({ id, name, gender, post, status, dateEmbauche, phoneNumber, email }: AgentSimpleCardProp) => {
  const { mutate } = useDelete();
  const navigate = useNavigate();

  const avatarNameTab = name.split(' ');
  const avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
  const smallName = avatarNameTab[avatarNameTab.length - 2] + ' ' + avatarNameTab[avatarNameTab.length - 1];
  const avatarColor = gender === 'M' ? blue[500] : pink[500];

  let colorStatus;
  let colorStatusBg;

  switch (status) {
    case 'Active':
      colorStatus = green[900];
      colorStatusBg = green[200];
      break;
    case 'Inactive':
      colorStatus = grey[900];
      colorStatusBg = grey[200];
      break;
    case 'Suspended':
      colorStatus = orange[900];
      colorStatusBg = orange[200];
      break;
    case 'Completed':
      colorStatus = red[900];
      colorStatusBg = red[200];
      break;
  }

  const handleDetail = () => {
    navigate(`/agents/show/${id}`);
  };

  const handleEdit = () => {
    navigate(`/agents/edit/${id}`);
  }

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    const response = window.confirm("Are you sure you want to delete Agent?");
    if (response) {
      mutate({
        resource: `agents`,
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

  return (
    <TableRow
    key={id}
      onClick={handleDetail}
      sx={{
        width: '100%',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: grey[300],
          cursor: 'pointer',
        },
      }}
    >
      <TableCell >
        <Avatar sx={{ bgcolor: avatarColor, width: 32, height: 32 }}>
          {avatarName}
        </Avatar>
      </TableCell>
      <TableCell>
        <Typography variant='body2'>{smallName}</Typography>
        <Typography variant='body2'>{email}</Typography>
      </TableCell>
      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
        {gender === 'M' ? <MaleIcon fontSize="small" /> : <FemaleIcon fontSize="small" />}
      </TableCell>
      <TableCell>
        <Typography variant='body2'>{post}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body2' sx={{ color: colorStatus, bgcolor: colorStatusBg, p: 0.2, px: 1 }}> {status}</Typography>
      </TableCell>
      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
        <Typography variant='body2'>{new Date(dateEmbauche).toLocaleDateString()}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body2'>{phoneNumber}</Typography>
      </TableCell>
      <TableCell onClick={(event) => {
        event.stopPropagation();
      }}
        sx={{ display: { xs: 'none', sm: 'table-cell' } }}
        align="right">
        <Stack direction='row'>
          <Button  onClick={handleDelete}>
            <Delete sx={{width:20}} />
          </Button>
          <Button  onClick={handleEdit}>
            <Edit sx={{width:20}} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default AgentCard;
