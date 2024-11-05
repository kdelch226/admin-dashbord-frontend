import { BaseKey } from '@refinedev/core'
import React, { useMemo, useState } from 'react'
import { AssignedTransactionViewProps } from '../../interfaces/transaction'
import { Box, MenuItem, Stack, FormControl, Typography, Select,  TextField } from '@mui/material';
import { CustumButton } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTable } from '@refinedev/core';
import TransactionCard from './TransactionCard';

const AssignedTransactionView: React.FC<AssignedTransactionViewProps> = ({ type,allTransactions }) => {
    const [filteredallTransactions, setFilteredallTransactions] = useState(allTransactions);
    const { id } = useParams();
    const navigate=useNavigate()

    const handleFilterallTransactionsTitle = (title: string) => {
        const normalizedSearchName = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtered = allTransactions.filter((transaction: any) =>
            transaction.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchName)
        );
        setFilteredallTransactions(filtered);
    };


    const handleFilterallTransactionsCategory = (category: string) => {
        const normalizedSearchPost = category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtered = allTransactions.filter((transaction: any) =>
            transaction.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchPost)
        );
        setFilteredallTransactions(filtered);
    }

    const handleOrder = (order: 'asc' | 'desc') => {
        const sortedallTransactions = [...allTransactions].sort((a: any, b: any) => {
            if (order === 'asc') {
                return a.title > b.title ? 1 : -1;
            } else {
                return a.title < b.title ? 1 : -1;
            }
        });

        setFilteredallTransactions(sortedallTransactions);
    };


    return (
        <Box bgcolor={'white'} sx={{ p: 1, my: 1, mx: { lg: 1 } }}>
            <Box gap={3} mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Stack direction='column' width='100%'>
                    <Typography fontWeight={600} fontSize={22}>{!allTransactions.length ? `No ${type.slice(0, type.length - 1)}` : `Our ${type}`}</Typography>
                    <Box my={3} display='flex' flexWrap='wrap' width='85%' justifyContent='space-between'>
                        <Box mb={{ xs: 1, sm: 0 }} gap={2} display='flex' flexWrap='wrap'>

                            <Stack direction='row' gap={3}>
                                <Box>
                                    <CustumButton
                                        title='title'
                                        variant={'contained'}
                                        icon={<ArrowCircleUpIcon />}
                                        handleClick={() => handleOrder('asc')}
                                        backgroundColor='#ebdec2'
                                        color='#000'
                                    />
                                </Box>
                                <Box>
                                    <CustumButton
                                        title='title'
                                        icon={<ArrowCircleDownIcon />}
                                        variant={'contained'}
                                        handleClick={() => handleOrder('desc')}
                                        backgroundColor='#ebdec2'
                                        color='#000'
                                    />
                                </Box>
                            </Stack>

                            <Stack direction='row' gap={3}>
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    color='info'
                                    placeholder='Search by title'
                                    required
                                    onChange={(e) => handleFilterallTransactionsTitle(e.currentTarget.value)}
                                />
                                    <TextField
                                    size='small'
                                    variant='outlined'
                                    color='info'
                                    placeholder='Search by category'
                                    required
                                    onChange={(e) => handleFilterallTransactionsCategory(e.currentTarget.value)}
                                />
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Stack
                mb={2}
                direction='row'
                alignItems='center'
                justifyContent='space-between'
            >
                <CustumButton
                    title={`create ${type.slice(0, type.length - 1)}`}
                    handleClick={() => navigate(`/transactions/create/${type.toLocaleLowerCase()}/'project'/''/''`)}
                    backgroundColor='#ebdec2'
                    color='#000'
                    icon={<AddCircleOutlineOutlinedIcon />} />
            </Stack>

            {allTransactions.length > 0 && (
                allTransactions.map(transaction => (
                    <TransactionCard
                        date={transaction.date}
                        status={transaction.status}
                        id={transaction.id}
                        title={transaction.title}
                        type={type}
                        method={transaction.transactionMethod}
                        category={transaction.category}
                        amount={transaction.amount}
                    />
                ))
            )}
        </Box>
    )

}

export default AssignedTransactionView