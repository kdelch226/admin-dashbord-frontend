import React, { useContext } from 'react'
import { useList } from '@refinedev/core'
import {
  PieChrt,
  TotalRevenu,
  ServiceReferal,
  ServiceCard,
  TopAgent,
} from '../components'
import { Box, Typography, Stack } from '@mui/material'
import { ColorModeContext } from '../contexts/color-mode'


const Home = () => {
  const { mode, setMode } = useContext(ColorModeContext);

  const bgcolor = mode === "dark" ? '#343a40' : '#f5f3f4';
  const textcolor = mode === "dark" ? '#ffffff' : '#000000';


  const colorsTab = ['#072ac8', '#a3bac3'];
  // fec5bb
  return (
    <Box >
      <Typography fontWeight={600} fontSize={25} >
        DashBoard
      </Typography>

      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChrt
          textcolor={textcolor}
          bgcolor={bgcolor}
          title='services offered'
          value={3}
          series={[3]}
          colors={colorsTab}
        />
        <PieChrt
          textcolor={textcolor}
          bgcolor={bgcolor}
          title='total projects'
          value={3}
          series={[75, 25]}
          colors={colorsTab}
        />
        <PieChrt
          textcolor={textcolor}
          bgcolor={bgcolor}
          title='total employers'
          value={4}
          series={[60, 40]}
          colors={colorsTab}
        />
        <PieChrt
          textcolor={textcolor}
          bgcolor={bgcolor}
          title='total custumer'
          value={8}
          series={[122, 55]}
          colors={colorsTab}
        />
      </Box>

      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={2}>

        <TotalRevenu bgcolor={bgcolor} />
        <ServiceReferal bgcolor={bgcolor} />
      </Stack>
    </Box>
  )
}

export default Home