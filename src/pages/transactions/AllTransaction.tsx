import { Box, Stack } from '@mui/material'
import React from 'react'
import TransactionView from '../../components/transactions/TransactionView'

const AllTransaction = () => {
  return (
    <Stack sx={{flexDirection:{lg:'row',xs:'column'}}}>
        <TransactionView type='Expenses'/>
        <TransactionView type='payments'/>
    </Stack>
)
}

export default AllTransaction