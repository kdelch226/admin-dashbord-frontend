import { Card, Stack, Typography } from '@mui/material'
import React from 'react'

interface miniCardTask {
    id: string,
    title: string,
    handleClick: any,
}

const MiniProjectCard = ({ id, title, handleClick }: miniCardTask) => {
    return(
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
        <Stack>
            <Typography paragraph variant='subtitle2' sx={{ fontSize: 18 }}>{title} </Typography>
        </Stack>

    </Card>
    )
}

export default MiniProjectCard