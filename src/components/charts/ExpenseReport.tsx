import { Box, Stack, Typography } from '@mui/material'
import React from 'react';
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,
    Gauge,
} from '@mui/x-charts/Gauge';
import ReactApexChart from 'react-apexcharts';
import { ExpenseOptions } from './chart.config';


interface ExpenseProps {
    bgcolor: string;
    currentMonth: number,
    lastMonth: number,
    difference: number,
    differencePercentage: number,
}

const ExpenseReport: React.FC<ExpenseProps> = ({ bgcolor, currentMonth, lastMonth, difference, differencePercentage }) => {

    const simplifyNumber = (number: number) => (
        number === undefined || number === null ? 0 :
            Math.abs(number) >= 1_000_000 ? `${(number / 1_000_000).toFixed(1)}M` :
                Math.abs(number) >= 1_000 ? `${(number / 1_000).toFixed(1)}K` :
                    Math.abs(number).toString()
    );

    const expenseOption = ExpenseOptions(differencePercentage)
    const value=Math.abs(differencePercentage)
    console.log('differencePercentage ',differencePercentage)
    return (
        <Box
            p={2}
            gap={2}
            id='chart'
            bgcolor={bgcolor}
            display='flex'
            flexDirection='column'
            borderRadius={3}
            width={'100%'}
            height={280}            
        >
            <Box>
                <Typography fontWeight={700}>{simplifyNumber(currentMonth)}</Typography>
                <Typography color={'gray'}>Expenses</Typography>
            </Box>
            <Stack alignItems={'center'}>
                <ReactApexChart
                    series={[value]}
                    type='radialBar'
                    options={expenseOption}
                    height={180}
                    width='100%'
                />
                <Typography color={'gray'}>{simplifyNumber(difference)} Expense more than las month</Typography>
            </Stack>
        </Box>
    )
}

export default ExpenseReport