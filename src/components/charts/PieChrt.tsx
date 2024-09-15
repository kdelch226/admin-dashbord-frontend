import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@mui/material';
import { PieChartProps } from '../../interfaces/home';

const PieChrt: React.FC<PieChartProps> = ({ title, value, series, colors,bgcolor,textcolor }) => {
  return (
    <Box
      id='chart'
      flex={1}
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      gap={2}
      borderRadius={3}
      p={2}
      bgcolor={bgcolor}
      width='fit-content'
      sx={{minHeight:{md:'105px'},maxHeight:{xs:'65px'}}}
    >
      <Stack direction='column'>
        <Typography >{title}</Typography>
        <Typography  fontSize={20} fontWeight={600}>{value}</Typography>
      </Stack>

      <ReactApexChart
        options={{
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type='pie'
        width='120px'
      />
    </Box>
  );
};

export default PieChrt;
