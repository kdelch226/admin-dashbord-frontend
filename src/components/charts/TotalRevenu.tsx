import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@mui/material';
import { TotalRevenueOptions } from './chart.config';
import { green, red } from '@mui/material/colors';

interface TotalRevenuProps {
  bgcolor: string;
  payment: any,
  expense: any
}

const TotalRevenu: React.FC<TotalRevenuProps> = ({ bgcolor, payment, expense }) => {

  const series = [
    {
      name: 'earning',
      data: payment ?? []
    },
    {
      name: 'expense',
      data: expense ?? []
    }
  ]

  const difference = payment?.reduce((a: number, b: number) => a + b) - expense?.reduce((a: number, b: number) => a + b)
  const differenceColor = difference > 0 ? green[500] : red[500]

  return (
    <Box
      py={2}
      id='chart'
      bgcolor={bgcolor}
      display='flex'
      flexDirection='column'
      borderRadius={3}
      width={'100%'}
      minWidth={{sm:450,xl:700}}

    >

      <Typography
        px={4}
        fontWeight={550}
        fontSize={20} >
        Revenue Report
      </Typography>

      <Stack
        my={2}
        px={4}
        direction='row'
        gap={4}
        flexWrap='wrap'
        flex={1}
      >
        <Typography color={differenceColor} fontWeight={500} fontSize={29} >
          ${difference}
        </Typography>

        
      </Stack>

      <ReactApexChart
        series={series}
        type='bar'
        options={TotalRevenueOptions}
        height={320}
        width='100%'
      />
    </Box>
  )
}

export default TotalRevenu