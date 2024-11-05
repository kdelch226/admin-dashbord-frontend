import React from 'react';
import { Avatar, ListItemButton, ListItemText, Typography, Stack, TableCell, TableRow } from '@mui/material';
import { green, grey, orange, red, yellow } from '@mui/material/colors';
import { EventSimpleCardProp } from '../../interfaces/event';
import { useNavigate } from 'react-router-dom';

const importanceColors: Record<string, string> = {
    Critical: red[500],
    High: orange[500],
    Medium: yellow[500],
    Low: green[500],
    Very: green[300],
};

const EventCard = ({ id, title, startDate, endDate, importance }: EventSimpleCardProp) => {
    const navigate = useNavigate();
    const avatarColor = importanceColors[importance] || green[300]; // Couleur par défaut si non trouvé
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

    const handleDetail = () => {
        navigate(`/events/show/${id}`);
    };


    return (
        <TableRow
            key={id}
            onClick={handleDetail}
            sx={{
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                width: '100%',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: grey[300], // Couleur de fond au survol
                },
            }}
        >
            <TableCell>
                <Avatar sx={{ bgcolor: avatarColor, width: 8, height: 8, mr: 1 }} />
            </TableCell>
            <TableCell>
                <Stack direction="column" sx={{ ml: 1 }}>
                    <ListItemText primary={title} sx={{ fontSize: '0.8rem', lineHeight: 1.2 }} />
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.7rem', lineHeight: 1 }}>
                        {verifyDate(startDate)} - {verifyDate(endDate)}
                    </Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default EventCard;
