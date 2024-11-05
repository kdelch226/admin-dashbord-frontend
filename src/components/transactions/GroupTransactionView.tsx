import { BaseKey } from '@refinedev/core'
import React from 'react'
import { Box, Stack, Table, TableBody, Typography } from '@mui/material';
import { CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useTable } from '@refinedev/core';
import TransactionCard from './TransactionCard';
import VisibilityIcon from '@mui/icons-material/Visibility';


interface transactionView {
    bgcolor?: string; // Type de la prop
}
const GrouptTransactionView: React.FC<transactionView> = ({ bgcolor }) => {
    const navigate = useNavigate();
    const {
        tableQueryResult: { data: expensedata, isLoading: expenseisLoading, isError: expenseisError },
    } = useTable({
        resource: 'expenses'
    });

    const {
        tableQueryResult: { data: paymentdata, isLoading: paymentisLoading, isError: paymentisError },
    } = useTable({
        resource: 'payments'
    });

    const expenses = expensedata?.data?.map((expense) => ({
        id: expense._id,
        title: expense.title,
        transactionMethod: expense.transactionMethod,
        category: expense.category,
        amount: expense.amount,
        date: expense.date,
        status: expense.status,
        type: 'expenses'
    }));

    const payments = paymentdata?.data?.map((payment) => ({
        id: payment._id,
        title: payment.title,
        transactionMethod: payment.transactionMethod,
        category: payment.category,
        amount: payment.amount,
        date: payment.date,
        status: payment.status,
        type: 'payments'
    }
    ))

    const handleSeeMore = () => {
        navigate('/transactions')
    }

    const allTransactions = [...(payments || []), ...(expenses || [])];
    if (expenseisLoading || paymentisLoading) return <Typography>Transactions Loading ...</Typography>;
    if (expenseisError || paymentisError) return <Typography>Transactions Error ...</Typography>;



    return (
        <Box bgcolor={bgcolor} sx={{
            p: 1, py: 1, mx: { lg: 1 }, width: '50%'
        }}
        >
            <Stack flexDirection={'row'} p={1} alignItems={'center'} gap={1}>
                <Typography fontWeight={600} fontSize={18}>{allTransactions.length <= 0 ? `No Recent Transactions` : `Recent Transactions (${allTransactions.length})`}</Typography>
                <CustumButton
                    title='More'
                    handleClick={handleSeeMore}
                    icon={<VisibilityIcon />}
                    backgroundColor='#ebdec2'
                    color='#000'
                />
            </Stack>
            <Table>
                {allTransactions.length > 0 && (
                    allTransactions.map(transaction => (
                        <TransactionCard
                            id={transaction.id}
                            title={transaction.title}
                            type={transaction.type}
                            method={transaction.transactionMethod}
                            category={transaction.category}
                            amount={transaction.amount}
                            date={transaction.date}
                            status={transaction.status}
                        />
                    ))
                )}
            </Table>
        </Box>
    )
}

export default GrouptTransactionView