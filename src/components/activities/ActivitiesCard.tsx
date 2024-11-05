import React from 'react';
import { Avatar, ListItemButton, ListItemText, Typography, Stack } from '@mui/material';
import { green, orange, red, yellow } from '@mui/material/colors';
import { ActivitesCardProp } from '../../interfaces/activities';

const importanceColors: Record<string, string> = {
    Critical: red[500],
    High: orange[500],
    Medium: yellow[500],
    Low: green[500],
    Very: green[300],
};

const ActivitiesCard = ({ id, userAvatar, user, action, documentType, createdAt, changeby }: ActivitesCardProp) => {

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


    return (
<ListItemButton 
    component="a" 
    href={`/activities/show/${id}`} 
    sx={{ display: 'flex', alignItems: 'center', borderTop: 1, borderColor: 'gray', p: 0.5 }}
>
    <Avatar src={userAvatar} variant="square" sx={{ width: 24, height: 24, mr: 1 }} />
    <Stack direction="column" sx={{ ml: 1 }}>
        <ListItemText
            sx={{ m: 0, fontSize: '0.7rem', lineHeight: 1 }}
            secondary={verifyDate(createdAt)}
        />
        <ListItemText
            sx={{ m: 0, fontSize: '0.7rem', lineHeight: 1 }}
            secondary={`${user} / ${changeby}`}
        />
        <ListItemText
            sx={{ m: 0, fontSize: '0.8rem', lineHeight: 1.2 }}
            primary={` ${action} à ${documentType}`}
        />
    </Stack>
</ListItemButton>

    );
};

export default ActivitiesCard;
