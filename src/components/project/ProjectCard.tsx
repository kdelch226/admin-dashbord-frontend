import React from 'react'
import { Card, CardContent, Typography, Box, TableRow, TableCell } from '@mui/material';
import { projectSimpleCardProp } from '../../interfaces/project';
import { Link } from 'react-router-dom';
import { blue, green, grey, orange, red } from '@mui/material/colors';

const projectCard = ({ id, title, startDate, initialBudget, ajustedBudget, estimatedEndDate, endDate, status }: projectSimpleCardProp) => {

    const verifyExisting = (objet: any) => {
        if (!objet && objet !== 0) return 'undifined'
        return objet
    }

    const verifyExistingDate = (objet: any): string => {
        if (!objet) return 'undefined';

        const date = new Date(objet);
        return isNaN(date.getTime()) ? 'undefined' : date.toLocaleDateString();
    }

    let colorStatus;
    let colorStatusBg;

    switch (status) {
        case 'In Progress':
            colorStatus = blue[900];
            colorStatusBg = blue[200];
            break;
        case 'Completed':
            colorStatus = green[900];
            colorStatusBg = green[200];
            break;
        case 'Waiting':
            colorStatus = orange[900];
            colorStatusBg = orange[200];
            break;
        case 'Cancelled':
            colorStatus = red[900];
            colorStatusBg = red[200];
            break;
    }

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
            component={Link}
            to={`/projects/show/${id}`}>
            <TableCell>{title}</TableCell>
            <TableCell>{verifyExisting(new Date(startDate).toLocaleDateString())}</TableCell>
            <TableCell>{verifyExisting(initialBudget)}</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{verifyExisting(ajustedBudget)}</TableCell>
            <TableCell>{verifyExistingDate(estimatedEndDate)}</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{verifyExistingDate(endDate)}</TableCell>
            <TableCell>
                <Typography variant='body2' sx={{ color: colorStatus, bgcolor: colorStatusBg, p: 0.2, px: 1 }}>{verifyExisting(status)}</Typography>
            </TableCell>
        </TableRow>

    )
}

export default projectCard