import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { blue, pink, green, teal } from '@mui/material/colors';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

import ApartmentIcon from '@mui/icons-material/Apartment';
import { ClientSimpleCardProp } from '../../interfaces/client';

const ClientCard = ({ id, name, dateCreation, company, gender, industry, phoneNumber, address, email, noOfProject, noOfEvent }: ClientSimpleCardProp) => {
    const avatarNameTab = name.split(' ');
    const avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
    const avatarColor = gender === 'M' ? blue[500] : pink[500];

    return (
        <Card
            component={Link}
            to={`/clients/show/${id}`}
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
            <Avatar sx={{ width: 64, height: 64, bgcolor: avatarColor }}>
                {avatarName}
            </Avatar>

            <Stack direction='row'  gap={3}>
                <Stack>
                    <Typography paragraph variant='subtitle2' sx={{ fontSize: 18, p: 0, m: 0 }}>{name} / {gender}</Typography>
                    <Typography paragraph variant='body2' sx={{ textDecoration: 'underline', fontSize: 15, mb: 1 }}>{company}</Typography>
                    <Stack direction='row' alignItems='start' gap={0.5}>
                        <ApartmentIcon fontSize='small' />
                        <Typography paragraph variant='body1' sx={{ fontWeight: 500 }}>sector : {industry}</Typography>
                    </Stack>
                    <Typography paragraph variant='body2' sx={{ color: blue[500], fontWeight: 'bold', p: 0, m: 0 }}>date de creation  : {new Date(dateCreation).toLocaleDateString()}</Typography>
                </Stack>

                <Stack gap={0.6}>
                    <Stack direction='row' alignItems='start' gap={0.9}>
                        <EmailIcon fontSize="small" />
                        <Typography paragraph variant='body1'>{email}</Typography>
                    </Stack>
                    <Stack direction='row' alignItems='start' gap={0.9}>
                        <LocalPhoneIcon fontSize="small" />
                        <Typography paragraph variant='body1'>{phoneNumber}</Typography>
                    </Stack>
                    <Stack direction='row' alignItems='start' gap={0.9}>
                        <PinDropIcon fontSize="small" />
                        <Typography paragraph variant='body1'>{address}</Typography>
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

export default ClientCard;
