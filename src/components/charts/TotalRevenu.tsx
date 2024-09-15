import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config';

interface TotalRevenuProps {
  bgcolor: string;
}

const TotalRevenu :React.FC<TotalRevenuProps> = ({ bgcolor })=> {


  return (
    <Box
      p={4}
      id='chart'
      bgcolor={bgcolor}
      display='flex'
      flexDirection='column'
      borderRadius={3}
      maxWidth={{lg:'80vw'}}
      flex={1}
    >

      <Typography fontWeight={550} fontSize={20} >
        Cumulative Revenue
      </Typography>

      <Stack
        my={2}
        direction='row'
        gap={4}
        flexWrap='wrap'
        
      >
        <Typography fontWeight={500} fontSize={29} >
          $1200
        </Typography>

        <Stack flexDirection='row' gap={1}>
          <ArrowCircleUpIcon sx={{ color: '#38b000', fontSize: 28 }} />
          <Stack>
          <Typography fontWeight={350} sx={{ color: '#38b000', fontSize: 15,fontWeight:400 }}  >
            1.2%
          </Typography>
          <Typography fontWeight={350} sx={{ color: '#38b000', fontSize: 15,fontWeight:400 }} >
            than last month
          </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        series={TotalRevenueSeries}
        type='bar'
        options={TotalRevenueOptions}
        height={320}
      />
    </Box>
  )
}

export default TotalRevenu