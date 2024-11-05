import React, { MouseEvent, useState } from 'react';
import { TransactionCardProps } from '../../interfaces/transaction';
import { Avatar, Box, TableRow, Stack, Typography, TableCell, IconButton, Menu, MenuItem } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import EventIcon from '@mui/icons-material/Event';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { green, red, grey, purple, orange } from '@mui/material/colors';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, Edit } from '@mui/icons-material';
import CustumButton from '../common/CustumButton';
import { useDelete } from '@refinedev/core';

const getCategoryIcon = (category: string) => {
    category = category.toLocaleLowerCase();
    switch (category) {
        case 'wallet':
            return <WalletIcon sx={{ color: purple[500] }} />;
        case 'project':
            return <FolderCopyIcon />;
        case 'event':
            return <EventIcon />;
        default:
            return <ApartmentIcon />;
    }
};

const getAmountColor = (type: string) => {
    type = type.toLocaleLowerCase();
    return type === 'expenses' ? red[500] : type === 'payments' ? green[500] : grey[500];
};

const getStatusIcon = (status: string) => {
    status = status.toLocaleLowerCase();
    switch (status) {
        case 'pending':
            return <QueryBuilderIcon sx={{ color: orange[500] }} />;
        case 'rejected':
            return <HighlightOffIcon sx={{ color: red[500] }} />;
        case 'completed':
            return <CheckCircleOutlineIcon sx={{ color: green[500] }} />;
        default:
            return null;
    }
};

const TransactionCard = ({ id, title, type, method, category, amount, date, status }: TransactionCardProps) => {
    const navigate = useNavigate();
    const { mutate } = useDelete();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleDetail = () => {
        navigate(`/transactions/show/${id}`);
    };

    const verifyDate = (dateString: Date): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    };

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: MouseEvent) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleDelete = () => {
        const text = `Do you want to delete Transaction '${title}'?`;
        if (confirm(text)) {
            mutate({
                id: id,
                resource: type
            }, {
                onSuccess: () => {
                    window.location.reload();
                }
            });
        }
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
                    backgroundColor: grey[300],
                },
            }}
        >
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: purple[50], color: purple[500], p: 1, mr: 2 }}>
                    {getCategoryIcon(category)}
                </Avatar>
                <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                        {title}
                    </Typography>
                    <Typography fontSize={12} variant="body2" sx={{ color: 'text.secondary' }}>
                        {verifyDate(date)}
                    </Typography>
                </Stack>
            </TableCell>

            <TableCell>
                <Stack direction="column">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {category}
                    </Typography>
                </Stack>
            </TableCell>

            <TableCell>
                <Stack direction="column">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {method}
                    </Typography>
                </Stack>
            </TableCell>

            <TableCell>{getStatusIcon(status)}</TableCell>

            <TableCell>
                <Typography
                    variant="body1"
                    sx={{
                        color: getAmountColor(type),
                        fontWeight: 'bold',
                    }}
                >
                    {type === 'expenses' ? `- $${amount}` : `+$${amount}`}
                </Typography>
            </TableCell>

            <TableCell>
                <Box>
                    <IconButton
                        onClick={handleClick}
                        aria-label="settings"
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}  // Stop propagation on mouse down
>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="dropdown-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'dropdown-button',
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <MenuItem>
                            <CustumButton
                                title="Edit"
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={<Edit />}
                                handleClick={() => navigate(`/transaction/edit/${id}`)}
                            />
                        </MenuItem>
                        <MenuItem>
                            <CustumButton
                                title="Delete"
                                backgroundColor="#d42e2e"
                                color="#FCFCFC"
                                fullWidth
                                icon={<Delete />}
                                handleClick={handleDelete}
                            />
                        </MenuItem>
                    </Menu>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default TransactionCard;
