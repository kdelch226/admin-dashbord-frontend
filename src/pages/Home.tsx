import React, { useContext } from 'react'
import { useApiUrl, useCustom, useList, useShow } from '@refinedev/core'
import {
  PieChrt,
  TotalRevenu,
  ServiceReferal,
  ServiceCard,
  TopAgent,
} from '../components'
import { Box, Typography, Stack, Grid } from '@mui/material'
import { ColorModeContext } from '../contexts/color-mode'
import RecentEvents from './event/RecentEvents'
import Activities from './activities/Activities'
import JournalLog from './journalLog/JournalLog'
import ExpenseReport from '../components/charts/ExpenseReport'
import ProfitReport from '../components/charts/ProfitReport'
import GrouptTransactionView from '../components/transactions/GroupTransactionView'
import ObjectiveChart from '../components/charts/ObjectiveChart'


const Home = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  const apiUrl = useApiUrl();

  const { data: projectstatistics } = useCustom({
    url: `${apiUrl}/projects/statistics`,
    method: 'get'
  });


  const { data: taskstatistics } = useCustom({
    url: `${apiUrl}/tasks/statistics`,
    method: 'get'
  });

  const { data: clientstatistics } = useCustom({
    url: `${apiUrl}/clients/statistics`,
    method: 'get'
  });

  const { data: employestatistics } = useCustom({
    url: `${apiUrl}/agents/statistics`,
    method: 'get'
  })

  const { data: expensecurrentmonth } = useCustom({
    url: `${apiUrl}/expenses/currentmonth`,
    method: 'get'
  });

  const { data: expenseyear } = useCustom({
    url: `${apiUrl}/expenses/year`,
    method: 'get'
  });

  const { data: paymentcurrentmonth } = useCustom({
    url: `${apiUrl}/payments/currentmonth`,
    method: 'get'
  });

  const { data: paymentyear } = useCustom({
    url: `${apiUrl}/payments/year`,
    method: 'get'
  });

  const { data: profitcurrentmonth } = useCustom({
    url: `${apiUrl}/expenses/profitcurrentmonth`,
    method: 'get'
  });

  const { data: currentobjective } = useCustom({
    url: `${apiUrl}/objectives/current`,
    method: 'get'
  });

  const projectstatisticsData = projectstatistics?.data;
  const taskstatisticsData = taskstatistics?.data;
  const clientstatisticsData = clientstatistics?.data;
  const employestatisticsData = employestatistics?.data;
  const expensecurrentmonthData = expensecurrentmonth?.data;
  const profitcurrentmonthData = profitcurrentmonth?.data
  const currentobjectivemonthData = currentobjective?.data

  // const bgcolor = mode === "dark" ? '#343a40' : '#f5f3f4';
  // const textcolor = mode === "dark" ? '#ffffff' : '#000000';
  const bgcolor = '#f5f3f4';
  const textcolor = '#000000';
  const colorsTab = ['#072ac8', '#a3bac3', '#35323C'];
  const clientColors = ['#FF5733', '#8B0000']; // Rouge vif et rouge sombre
  const taskColors = ['#FFC107', '#D69A00', '#BF8B00']; // Jaune clair, jaune doré, jaune foncé
  const projectColors = ['#28A745', '#2F6D2D']; // Vert vif et vert sombre
  const employeeColors = ['#007BFF', '#003366']; // Bleu vif et bleu sombre

  // fec5bb
  return (
    <Box >
      <Typography fontWeight={600} fontSize={25} >
        Welcome to Your Dashboard
      </Typography>

      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        flexWrap={'wrap'}
        gap={2}
      >

        <Stack
          flexDirection={'row'}
          flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
          gap={2} width={'100%'}>

          <Stack width={'100%'} gap={2}>
            <Grid container spacing={2}>
              {/* Première ligne de deux graphiques */}
              <Grid item xs={6} sm={3}>
                <PieChrt
                  textcolor={textcolor}
                  bgcolor={bgcolor}
                  title='Customers'
                  value={clientstatisticsData?.totalClients}
                  series={[Number(clientstatisticsData?.clientsProjectPercentage), Number(clientstatisticsData?.noClientsProjectPercentage)]}
                  labels={['With Project', 'Without Project']}
                  colors={clientColors} // Utilisation des nouvelles couleurs
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <PieChrt
                  textcolor={textcolor}
                  bgcolor={bgcolor}
                  title='Tasks'
                  value={taskstatisticsData?.totalTasks}
                  series={[Number(taskstatisticsData?.completedPercentage), Number(taskstatisticsData?.cancelledPercentage), Number(taskstatisticsData?.nonCompletedPercentage)]}
                  labels={['completed', 'cancelled', 'nonCompleted']}
                  colors={taskColors} // Utilisation des nouvelles couleurs
                />
              </Grid>

              {/* Deuxième ligne de deux graphiques */}
              <Grid item xs={6} sm={3}>
                <PieChrt
                  textcolor={textcolor}
                  bgcolor={bgcolor}
                  title='Projects'
                  value={projectstatisticsData?.totalProjects}
                  series={[Number(projectstatisticsData?.completedPercentage), Number(projectstatisticsData?.nonCompletedPercentage)]}
                  labels={['completed', 'non Completed']}
                  colors={projectColors} // Utilisation des nouvelles couleurs
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <PieChrt
                  textcolor={textcolor}
                  bgcolor={bgcolor}
                  title='Agents'
                  value={employestatisticsData?.total}
                  series={[Number(employestatisticsData?.employeWithProject), Number(employestatisticsData?.employeNoProject)]}
                  labels={['With Project', 'Without Project']}
                  colors={employeeColors} // Utilisation des nouvelles couleurs
                />
              </Grid>
            </Grid>

            <TotalRevenu
              bgcolor={bgcolor}
              payment={paymentyear?.data}
              expense={expenseyear?.data}
            />
          </Stack>
          {/* <ServiceReferal bgcolor={bgcolor} /> */}

          <Stack width={{ xs: '100%', lg: '60%' }} flexDirection={'row'} gap={2} flexWrap={'wrap'} >
            <Stack width={'100%'} direction={'row'} gap={2}>
              <ExpenseReport
                bgcolor={bgcolor}
                currentMonth={expensecurrentmonthData?.currentMonth ?? 0}
                lastMonth={expensecurrentmonthData?.lastMonth ?? 0}
                difference={expensecurrentmonthData?.difference ?? 0}
                differencePercentage={expensecurrentmonthData?.differencePercentage ?? 0}
              />

              <ProfitReport
                bgcolor={bgcolor}
                profitTable={profitcurrentmonthData?.profitsByWeek ?? []}
              />
            </Stack>
            <ObjectiveChart
              bgcolor={bgcolor}
              title={currentobjectivemonthData?.title}
              type={currentobjectivemonthData?.type}
              targetValue={currentobjectivemonthData?.targetValue || 0}
              currentValue={currentobjectivemonthData?.currentValue || 0}
              endDate={currentobjectivemonthData?.endDate}
              startDate={currentobjectivemonthData?.startDate}
            />
          </Stack>
        </Stack>

        <Stack
          gap={2}
          flexDirection={'row'}
          flexWrap={'wrap'}
          width='100%'

        >
          <Stack gap={2} flexDirection={'row'} width={'100%'}>
            <Activities restricted={true} bgcolor={bgcolor} />
            <JournalLog restricted={true} bgcolor={bgcolor} />
          </Stack>
          <Stack gap={2} flexDirection={'row'} width={'100%'}>
            <RecentEvents bgcolor={bgcolor} />
            <GrouptTransactionView bgcolor={bgcolor} />
          </Stack>
        </Stack>


      </Stack>
    </Box>
  )
}

export default Home