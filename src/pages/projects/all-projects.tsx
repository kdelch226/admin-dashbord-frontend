import { Box, MenuItem, Stack, FormControl, Typography, Select, InputLabel, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { useMemo } from 'react';
import { CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTable } from '@refinedev/core';
import ProjectCard from '../../components/project/ProjectCard';
function AllProject() {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable();

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => (
      'field' in item ? item : []
    ));

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
    }
  }, [filters]);
  const allProjects = data?.data ?? [];

  const currentTitle = sorters.find((item) => item.field === 'title')?.order;

  const ascTitle = (field: string) => {
    setSorters([{ field, order: 'asc' }])
  }
  const descTitle = (field: string) => {
    setSorters([{ field, order: 'desc' }])
  }

  console.log('pageCount ', pageCount)

  if (isLoading) return <Typography>Loading ...</Typography>;
  if (isError) return <Typography>Error ...</Typography>;

  const pages: number[] = [];
  const pageLimit = pageCount > 60 ? pageCount : 60
  for (let i = 10; i <= pageLimit; i += 10) {
    pages.push(i)
  }



  return (

    <Box >

      <Box gap={3} mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Stack direction='column' width='100%'>
          <Typography fontWeight={600} fontSize={22}>{!allProjects.length ? 'No Projects' : 'Our Projects'}</Typography>
          <Box my={3} display='flex' flexWrap='wrap' width='85%' justifyContent='space-between'>
            <Box mb={{ xs: 1, sm: 0 }} gap={2} display='flex' flexWrap='wrap'>

              <Stack direction='row' gap={3}>
                <Box>
                  <CustumButton
                    title='title'
                    variant={currentTitle === 'asc' ? 'contained' : 'outlined'}
                    icon={<ArrowCircleUpIcon />}
                    handleClick={() => ascTitle('title')}
                    backgroundColor='#ebdec2'
                    color='#000'
                  />
                </Box>
                <Box>
                  <CustumButton
                    title='title'
                    icon={<ArrowCircleDownIcon />}
                    variant={currentTitle === 'desc' ? 'contained' : 'outlined'}
                    handleClick={() => descTitle('title')}
                    backgroundColor='#ebdec2'
                    color='#000'
                  />
                </Box>
              </Stack>

              <Stack direction='row' gap={3}>
                <TextField
                  size='small'
                  variant='outlined'
                  color='info'
                  placeholder='Search by title'
                  required
                  value={currentFilterValues.title}
                  onChange={(e) => setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])}
                />
              </Stack>

            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack
        mb={2}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <CustumButton
          title='Create project'
          handleClick={() => navigate('/projects/create')}
          backgroundColor='#ebdec2'
          color='#000'
          icon={<AddCircleOutlineOutlinedIcon />} />
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Date de début</TableCell>
              <TableCell>Budget initial</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Budget ajusté</TableCell>
              <TableCell>Date de fin estimée</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Date de fin</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProjects.map(project => (
              <ProjectCard
                id={project._id}
                title={project.title}
                startDate={project.startDate}
                initialBudget={project.initialBudget}
                ajustedBudget={project.ajustedBudget}
                estimatedEndDate={project.estimatedEndDate}
                endDate={project.endDate}
                status={project.status}
                client={project.client}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {allProjects.length > 0 && (
        <Stack
          flexDirection='row'
          alignItems='center'
          mt={3}
          gap={2}
          flexWrap='wrap'
        >
          <CustumButton
            title=''
            icon={<SkipPreviousIcon />}
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor='#ebdec2'
            color='#000'
            disabled={!(current > 1)}
          />

          <Box
            display={{ xs: 'hidden', sm: 'flex' }}
            alignItems='center' gap={1}>
            Page{' '}<strong>{current}</strong> of <strong>{pageCount}</strong>
          </Box>

          <CustumButton
            title=''
            icon={<SkipNextIcon />}
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor='#ebdec2'
            color='#000'
            disabled={(current <= pageCount)}
          />

          <Select
            sx={{ height: 30 }}
            variant='outlined'
            required
            color='info'
            disabled={allProjects.length < 10}
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
          >
            {pages.map((pagenumber) => (
              <MenuItem
                key={pagenumber}
                value={pagenumber}>
                show {pagenumber}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}
    </Box>
  )
}

export default AllProject