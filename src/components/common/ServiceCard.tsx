import React, { useState } from 'react';
import { ServiceCardProps } from '../../interfaces/service'
import { Box, Card, CardMedia, Collapse, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const serviceCard = ({ id, title, expertise, photo }: ServiceCardProps) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            component={Link}
            to={`/services/show/${id}`}
            sx={{
                maxWidth: { md: '330px', xs: '93vw' },
                p: 2,
                '&:hover': {
                    boxShadow: 10,
                },
                cursor: 'pointer'
            }}
        >
            <CardMedia
                component='img'
                image={photo}
                sx={{ width: { md: '100%', xs: '93vw' }, height: 210, borderRadius: 2 }}
                className='md:rounded-xl'
            />
            <Typography variant='subtitle2' my={1} sx={{ fontSize: 18 }}>{title}</Typography>
            <Box
                px={1.5}
                py={0.5}
                borderRadius={1}
                bgcolor="rgba(229, 229, 229, 0.7)"
                height="fit-content"
            >
                <Typography>{expertise}</Typography>
            </Box>
        </Card>
    )
}

export default serviceCard