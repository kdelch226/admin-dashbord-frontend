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
import { MiniAgentCardProp } from '../../interfaces/agent';
import { useNavigate } from 'react-router-dom';

const MiniAgentCard = ({ id, name, post, task, gender, handleClick }: MiniAgentCardProp) => {
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
                border: '1px solid black'
            }}
            onClick={handleClick}
        >
            <Avatar sx={{ bgcolor: avatarColor }}>
                {avatarName}
            </Avatar>

            <Stack>
                <Typography paragraph variant='subtitle2' sx={{ fontSize: 18 }}>{name} </Typography>
                <Typography paragraph variant='body2' sx={{ textDecoration: 'underline', fontSize: 15, mb: 1 }}>{post}</Typography>
            </Stack>

            <Box>
                <Typography paragraph variant='body1' sx={{ fontSize: 17 }}>Task : {task.length} </Typography>
            </Box>

        </Card>
    )
}

export default MiniAgentCard;
