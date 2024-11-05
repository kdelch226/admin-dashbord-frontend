import { Avatar, Button, TableCell, TableRow, Typography } from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { MiniAgentCardProp } from '../../interfaces/agent';
import { Delete } from '@mui/icons-material';

const MiniAgentCard = ({ id, name, post, gender, handleDelete, handleClick }: MiniAgentCardProp) => {
    const avatarNameTab = name.split(' ');
    const avatarName = avatarNameTab[0].slice(0, 1) + avatarNameTab[1]?.slice(0, 1) || '';
    const avatarColor = gender === 'M' ? blue[500] : pink[500];

    return (
        <TableRow
            key={id}
            onClick={handleClick}
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
                <Avatar sx={{ bgcolor: avatarColor }}>
                    {avatarName}
                </Avatar>
            </TableCell>
            <TableCell>
                <Typography variant='subtitle2' sx={{ fontSize: 18 }}>{name}</Typography>
                {post && (
                    <Typography variant='body2' sx={{ textDecoration: 'underline', fontSize: 15 }}>{post}</Typography>
                )}
            </TableCell>

            {handleDelete && (
                <TableCell align="right">
                    <Button onClick={(event) => {
                        event.stopPropagation(); // Empêche le clic de se propager
                        handleDelete(id);
                    }}>
                        <Delete />
                    </Button>
                </TableCell>
            )}

        </TableRow>
    );
}

export default MiniAgentCard;
