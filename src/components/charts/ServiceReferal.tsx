import React, { useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ServiceReferalInfo } from '../../constants/index';
import ReactApexChart from 'react-apexcharts';
import { Info } from '@mui/icons-material';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { ColorModeContext } from '../../contexts/color-mode';


interface BoxBarProperties {
  title: string,
  percentage: number,
  color: string,
}

interface ServiceReferalProps {
  bgcolor: string;
}

const BoxBar = ({ title, percentage, color }: BoxBarProperties) => (
  <Box>
    <Stack direction='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
      <Typography fontSize={15} >
        {title}
      </Typography >
      <Typography fontSize={15} >
        {percentage} %
      </Typography>
    </Stack>

    <Box
      my={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="#e4e8ef"
    >
      
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box >
)

const ServiceReferal:React.FC<ServiceReferalProps> = ({ bgcolor })=> {


  return (
    <Box
      p={3}
      id='chart'
      bgcolor={bgcolor}
      display='flex'
      flexDirection='column'
      borderRadius={3}
      width={{lg:'350px'}}
    >

      <Typography fontWeight={600} fontSize={22} mb={2} >
        Referral Network
      </Typography>

      <Stack>
        {ServiceReferalInfo.map((info) => (
          <BoxBar key={info.title} {...info} />
        ))}
      </Stack>

    </Box>
  )
}

export default ServiceReferal