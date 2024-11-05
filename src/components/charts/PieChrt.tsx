import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@mui/material';
import { PieChartProps } from '../../interfaces/home';

const PieChrt: React.FC<PieChartProps> = ({ title, value, series, colors,bgcolor,textcolor,labels }) => {
  return (
    <Box
      id='chart'
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      gap={2}
      borderRadius={3}
      p={2}
      bgcolor={bgcolor}
      width={'100%'}
      minWidth={'190px'}
      sx={{minHeight:{md:'90px'},maxHeight:{xs:'75px'}}}
    >
      <Stack direction='column' justifyContent={'center'} alignItems={'center'}>
        <Typography >{title}</Typography>
        <Typography  fontSize={20} fontWeight={600}>{value}</Typography>
      </Stack>

      <ReactApexChart
        options={{
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
          labels:labels,
          grid: {
            padding: {
             left: 0,
             right: 0
            }
          }
        }}
        series={series}
        type='donut'
        width='90px'
      />

    </Box>
  );
};

export default PieChrt;