import { Avatar, Box, Button, Stack, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blue, pink, grey } from '@mui/material/colors';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { ClientSimpleCardProp } from '../../interfaces/client';
import { useDelete } from '@refinedev/core';
import { Delete, Edit } from '@mui/icons-material';

const ClientCard = ({ id, name, company, gender, industry, phoneNumber, email, noOfProject, noOfEvent }: ClientSimpleCardProp) => {
    const { mutate } = useDelete();
    const navigate = useNavigate()

    const avatarNameTab = name.split(' ');
    const avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
    const avatarColor = gender === 'M' ? blue[500] : pink[500];

    const handleDetail = () => {
        navigate(`/clients/show/${id}`);
    };

    const handleEdit = () => {
        navigate(`/clients/edit/${id}`);
    }

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent row click event
        const response = window.confirm("Are you sure you want to delete client?");
        if (response) {
            mutate({
                resource: `clients`,
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
            <TableCell>
                <Avatar sx={{ bgcolor: avatarColor }}>
                    {avatarName}
                </Avatar>
            </TableCell>
            <TableCell>
                <Typography variant='body1'>{name}</Typography>
                <Typography variant='body2'>
                    {email}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body2'>{company}</Typography>
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                <Typography variant='body2' sx={{ bgcolor: grey[300], color: grey[900], p: 0.2, px: 1 }}>
                    {industry}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography variant='body2'>
                    {phoneNumber}
                </Typography>
            </TableCell>
            <TableCell onClick={(event) => {
                event.stopPropagation();
            }}
                sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                align="right">
                <Stack direction='row'>
                    <Button onClick={handleDelete}>
                        <Delete sx={{ width: 20 }} />
                    </Button>
                    <Button onClick={handleEdit}>
                        <Edit sx={{ width: 20 }} />
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default ClientCard;
