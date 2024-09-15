import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { blue, pink, green, teal } from '@mui/material/colors';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

import ApartmentIcon from '@mui/icons-material/Apartment';
import { MiniClientSimpleCardProp } from '../../interfaces/client';

const MiniClientCard = ({ id, name, company, gender,handleClick }: MiniClientSimpleCardProp) => {
    const avatarNameTab = name.split(' ');
    const avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
    const avatarColor = gender === 'M' ? blue[500] : pink[500];

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'start',
                my: 1,
                p: 1,
                '&:hover': {
                    boxShadow: 10,
                },
                cursor: 'pointer',
                gap: 2,
                textDecoration: 'none',
            }}
            onClick={handleClick}
        >
            <Avatar sx={{ bgcolor: avatarColor }}>
                {avatarName}
            </Avatar>

                <Stack>
                    <Typography paragraph variant='subtitle2' sx={{ fontSize: 18 }}>{name} </Typography>
                    <Typography paragraph variant='body2' sx={{ textDecoration: 'underline', fontSize: 15, mb: 1 }}>{company}</Typography>
                </Stack>

        </Card>
    )
}

export default MiniClientCard;
