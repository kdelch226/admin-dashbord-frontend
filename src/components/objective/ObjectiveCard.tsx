import React from 'react';
import { Avatar, ListItemButton, ListItemText, Typography, Stack, TableCell, TableRow, Box, LinearProgress, Button } from '@mui/material';
import { green, grey, orange, red, yellow } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { ObjectiveCardProps } from '../../interfaces/objective';
import { useDelete } from '@refinedev/core';
import { Delete, Edit } from '@mui/icons-material';

const importanceColors: Record<string, string> = {
    Critical: red[500],
    High: orange[500],
    Medium: yellow[500],
    Low: green[500],
    Very: green[300],
};

const OjectiveCard = ({ id, title, type, targetValue, currentValue, endDate, startDate }: ObjectiveCardProps) => {
    const navigate = useNavigate();
    const { mutate } = useDelete();

    const handleEdit = () => {
        navigate(`/objectives/edit/${id}`);
    }

    const verifyDate = (dateString: Date): string => {
        // Vérifier si la chaîne de date est valide
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        // Options pour le format de la date et de l'heure
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",    // Affiche l'année
            month: "short",     // Affiche le mois en lettres courtes ("Jan", "Feb", etc.)
            day: "2-digit",     // Affiche le jour avec deux chiffres
        };

        // Conversion et formatage de la date en utilisant toLocaleString
        return date.toLocaleString("en-US", options);
    }

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent row click event
        const response = window.confirm("Are you sure you want to delete objective \"" + title + "\"?");
        if (response) {
            mutate({
                resource: `objectives`,
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

    const progress = (currentValue / targetValue) * 100;

    return (
        <TableRow
            key={id}
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
                <Typography variant='body1'>{title}</Typography>
                <Typography variant='body2'>{type}</Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{display:{xs:'table-cell',sm:'none'}}} variant='body2'>
                    {currentValue.toLocaleString()}/{targetValue.toLocaleString()}
                </Typography>
                <Typography sx={{display:{xs:'none',sm:'table-cell'}}} variant='body2'>
                    Target: {targetValue.toLocaleString()} - Current: {currentValue.toLocaleString()}
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ width: '100%', mt: 1 }}
                />
                <Typography variant='caption'>{progress.toFixed(2)}% reach</Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body2'>{verifyDate(startDate)}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body2'>{verifyDate(endDate)}</Typography>
            </TableCell>
            <TableCell align="right">
                <Stack direction='row' >
                    <Button sx={{width:20}} onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
                        <Edit sx={{ width: 20 }} />
                    </Button>
                    <Button sx={{width:20}} onClick={(e) => { e.stopPropagation(); handleDelete(e); }}>
                        <Delete sx={{ width: 20 }} />
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
};


export default OjectiveCard;
