import { BaseKey } from '@refinedev/core'
import React, { useMemo } from 'react'
import { TransactionViewProps } from '../../interfaces/transaction'
import { Box, MenuItem, Stack, FormControl, Typography, Select,  TextField } from '@mui/material';
import { CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTable } from '@refinedev/core';
import TransactionCard from './TransactionCard';

const TransactionView: React.FC<TransactionViewProps> = ({ type }) => {
    const navigate = useNavigate();
    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorters,
        setSorters,
        filters,
        setFilters,
    } = useTable({
        resource: type.toLocaleLowerCase()
    });

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) => (
            'field' in item ? item : []
        ));

        return {
            title: logicalFilters.find((item) => item.field === "title")?.value || "",
        }
    }, [filters]);

    const allTransactions = data?.data ?? [];

    const currentTitle = sorters.find((item) => item.field === 'title')?.order;

    const ascTitle = (field: string) => {
        setSorters([{ field, order: 'asc' }])
    }
    const descTitle = (field: string) => {
        setSorters([{ field, order: 'desc' }])
    }

    if (isLoading) return <Typography>{type} Loading ...</Typography>;
    if (isError) return <Typography>{type} Error ...</Typography>;

    const pages: number[] = [];
    const pageLimit = pageCount > 60 ? pageCount : 60
    for (let i = 10; i <= pageLimit; i += 10) {
        pages.push(i)
    }

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
                                        variant={currentTitle === 'asc' ? 'contained' : 'outlined'}
                                        icon={<ArrowCircleUpIcon />}
                                        handleClick={() => ascTitle('title')}
                                        backgroundColor='#ebdec2'
                                        color='#000'
                                    />
                                </Box>
                                <Box>
                                    <CustumButton
                                        title='title'
                                        icon={<ArrowCircleDownIcon />}
                                        variant={currentTitle === 'desc' ? 'contained' : 'outlined'}
                                        handleClick={() => descTitle('title')}
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
                                    value={currentFilterValues.title}
                                    onChange={(e) => setFilters([
                                        {
                                            field: 'title',
                                            operator: 'contains',
                                            value: e.currentTarget.value ? e.currentTarget.value : undefined
                                        }
                                    ])}
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
                    handleClick={() => navigate(`/transactions/create/${type.toLocaleLowerCase()}/''/''/''`)}
                    backgroundColor='#ebdec2'
                    color='#000'
                    icon={<AddCircleOutlineOutlinedIcon />} />
            </Stack>

            {allTransactions.length > 0 && (
                allTransactions.map(transaction => (
                    <TransactionCard
                        date={transaction.date}
                        status={transaction.status}
                        id={transaction._id}
                        title={transaction.title}
                        type={type}
                        method={transaction.transactionMethod}
                        category={transaction.category}
                        amount={transaction.amount}
                    />
                ))
            )}

            {allTransactions.length > 0 && (
                <Stack
                    flexDirection='row'
                    alignItems='center'
                    mt={3}
                    gap={2}
                    flexWrap='wrap'
                >
                    <CustumButton
                        title=''
                        icon={<SkipPreviousIcon />}
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor='#ebdec2'
                        color='#000'
                        disabled={!(current > 1)}
                    />

                    <Box
                        display={{ xs: 'hidden', sm: 'flex' }}
                        alignItems='center' gap={1}>
                        Page{' '}<strong>{current}</strong> of <strong>{pageCount}</strong>
                    </Box>

                    <CustumButton
                        title=''
                        icon={<SkipNextIcon />}
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor='#ebdec2'
                        color='#000'
                        disabled={(current <= pageCount)}
                    />

                    <Select
                        sx={{ height: 30 }}
                        variant='outlined'
                        required
                        color='info'
                        disabled={allTransactions.length < 10}
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={10}
                        onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
                    >
                        {pages.map((pagenumber) => (
                            <MenuItem
                                key={pagenumber}
                                value={pagenumber}>
                                show {pagenumber}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            )}
        </Box>
    )
}

export default TransactionView