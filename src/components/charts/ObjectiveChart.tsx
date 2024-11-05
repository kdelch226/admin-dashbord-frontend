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
import { ObjectiveChartOptions } from './chart.config';
import { ObjectiveChartProps } from '../../interfaces/objective';


const ObjectiveChart: React.FC<ObjectiveChartProps> = ({ bgcolor, title, type, targetValue, currentValue, endDate, startDate, }) => {

  const simplifyNumber = (number: number) => (
    number === undefined || number === null ? 0 :
      number >= 1_000_000 ? `${(number / 1_000_000).toFixed(1)}M` :
        number >= 1_000 ? `${(number / 1_000).toFixed(1)}K` :
          number.toString()
  );

  const verifyDate = (dateString: Date): string => {
    // Vérifier si la chaîne de date est valide
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'no Date';

    // Options pour le format de la date et de l'heure
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",    // Affiche l'année
      month: "short",     // Affiche le mois en lettres courtes ("Jan", "Feb", etc.)
      day: "2-digit",     // Affiche le jour avec deux chiffres
    };

    // Conversion et formatage de la date en utilisant toLocaleString
    return date.toLocaleString("en-US", options);
  }


  const value = targetValue != 0 ? currentValue / targetValue * 100 :0;
  return (
    <Box
      p={2}
      gap={2}
      id='chart'
      bgcolor={bgcolor}
      display='flex'
      flexDirection='row'
      justifyContent={'space-between'}
      borderRadius={3}
      width={'100%'}
      minWidth={{ sm: 450, md: 200 }}
      height={280}
    >
      <Stack flexDirection={'column'} justifyContent={'space-between'} alignItems={'start'}>
        <Box>
          <Typography fontSize={20} fontWeight={700}>{title}</Typography>
          <Typography color={'gray'}>{type}</Typography>
        </Box>
        <Box>
          <Typography color={'gray'}>{verifyDate(startDate)}</Typography>
          <Typography color={'gray'}>{verifyDate(endDate)}</Typography>
        </Box>
      </Stack>
      <Stack alignItems={'center'} justifyContent={'center'}>
        <ReactApexChart
          series={[value]}
          type='radialBar'
          options={ObjectiveChartOptions}
          height={250}
          width='100%'
        />
      </Stack>
    </Box>
  )
}

export default ObjectiveChart