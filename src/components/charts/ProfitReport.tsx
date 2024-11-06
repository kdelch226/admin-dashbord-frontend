import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ReactApexChart from 'react-apexcharts';
import { ProfifByMonthOptions } from './chart.config';
import { green, red } from '@mui/material/colors';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';



interface ProfitReport {
    bgcolor: string,
    profitTable: number[]
}

const ProfitReport: React.FC<ProfitReport> = ({ bgcolor, profitTable }) => {

    const simplifyNumber = (number: number) => (
        number === undefined || number === null ? 0 :
            Math.abs(number) >= 1_000_000 ? `${(number / 1_000_000).toFixed(1)}M` :
                Math.abs(number) >= 1_000 ? `${(number / 1_000).toFixed(1)}K` :
                    Math.abs(number).toString()
    );

    const series = [{
        name: "Profit",
        data: profitTable ?? [0]
    }];

    const profitTotal = profitTable.reduce((a, b) => a + b, 0);
    const differenceColor = profitTotal > 0 ? green[500] : red[500]


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
            <Box width={'100%'}>
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography fontSize={22} fontWeight={700} color={differenceColor}>{simplifyNumber(profitTotal)}</Typography>
                        <Typography fontSize={20} color={'gray'}>Profit</Typography>
                    </Box>
                    <Stack flexDirection='row' gap={1}>
                        <ArrowCircleUpIcon sx={{ color: '#38b000', fontSize: 28 }} />
                        <Stack>
                            <Typography fontWeight={350} sx={{ color: '#38b000', fontSize: 15, fontWeight: 400 }}  >
                                1.2%
                            </Typography>
                            <Typography fontWeight={350} sx={{ color: '#38b000', fontSize: 15, fontWeight: 400 }} >
                                than last month
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack alignItems={'center'}>
                    <ReactApexChart
                        series={series}
                        type='line'
                        options={ProfifByMonthOptions}
                        height={180}
                        width='100%'
                    />
                    {/* <Typography color={'gray'}>{simplifyNumber(difference)} Expense more than las month</Typography> */}
                </Stack>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}

export default ProfitReport