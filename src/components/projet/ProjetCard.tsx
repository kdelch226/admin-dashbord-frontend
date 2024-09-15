import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ProjetSimpleCardProp } from '../../interfaces/projet';
import { Link } from 'react-router-dom';

const ProjetCard = ({ id, title, startDate, initialBudget, ajustedBudget, estimatedEndDate, endDate, etat, client }: ProjetSimpleCardProp) => {

    const verifyExisting=(objet:any)=>{
        if(!objet && objet!==0) return 'undifined'
        return objet
    }
    return (
        <Card
            component={Link}
            to={`/projets/show/${id}`}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                maxWidth: { md: '800px', xs: '93vw' },
                my: 1,
                p: 1,
                '&:hover': {
                  boxShadow: 10,
                },
                cursor: 'pointer',
                gap: 2,
                textDecoration: 'none',
              }}>
            <CardContent sx={{ width: '100%', height: '100%' }}>
                <Typography variant="h5" component="div" fontWeight={600}>
                    {title}
                </Typography>

                <Box mt={2} width='100%'>
                    <Typography variant="body2" color="textSecondary">
                        <strong>Client:</strong> {verifyExisting(client)}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        <strong>Start Date:</strong> {verifyExisting(new Date(startDate).toLocaleDateString())}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        <strong>Initial Budget:</strong> {verifyExisting(initialBudget)}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        <strong>Ajusted Budget:</strong> {verifyExisting(ajustedBudget)}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        <strong>Estimated End Date:</strong> {verifyExisting(new Date(estimatedEndDate).toLocaleDateString())}
                    </Typography>

                    {endDate && (
                        <Typography variant="body2" color="textSecondary">
                            <strong>End Date:</strong> {verifyExisting(new Date(endDate).toLocaleDateString())}
                        </Typography>
                    )}

                    <Typography variant="body2" color="textSecondary">
                        <strong>Status:</strong> {verifyExisting(etat)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProjetCard