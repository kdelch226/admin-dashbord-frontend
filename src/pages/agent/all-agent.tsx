import { Box, MenuItem, Stack, FormControl, Typography, Select, InputLabel, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { AgentCard, CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTable } from '@refinedev/core';


const AllAgent = () => {

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
      name: logicalFilters.find((item) => item.field === "name")?.value || "",
      post: logicalFilters.find((item) => item.field === "post")?.value || "",
      etat: logicalFilters.find((item) => item.field === "etat")?.value || "",

    }
  }, [filters]);
  const allEmployes = data?.data ?? [];

  const currentname = sorters.find((item) => item.field === 'name')?.order;

  const ascname = (field: string) => {
    setSorters([{ field, order: 'asc' }])
  }
  const descname = (field: string) => {
    setSorters([{ field, order: 'desc' }])
  }

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
          <Typography fontWeight={600} fontSize={22}>{!allEmployes.length ? 'No agents' : 'Our agentss'}</Typography>
          <Box my={3} display='flex' flexWrap='wrap' width='85%' justifyContent='space-between'>
            <Box mb={{ xs: 1, sm: 0 }} gap={2} display='flex' flexWrap='wrap'>

              <Stack direction='row' gap={3}>
                <Box>
                  <CustumButton
                    title='name'
                    variant={currentname === 'asc' ? 'contained' : 'outlined'}
                    icon={<ArrowCircleUpIcon />}
                    handleClick={() => ascname('name')}
                    backgroundColor='#ebdec2'
                    color='#000'
                  />
                </Box>
                <Box>
                  <CustumButton
                    title='name'
                    icon={<ArrowCircleDownIcon />}
                    variant={currentname === 'desc' ? 'contained' : 'outlined'}
                    handleClick={() => descname('name')}
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
                  placeholder='Search by name'
                  required
                  value={currentFilterValues.name}
                  onChange={(e) => setFilters([
                    {
                      field: 'name',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])}
                />

                <TextField
                  size='small'
                  variant='outlined'
                  color='info'
                  placeholder='Search by post'
                  required
                  value={currentFilterValues.post}
                  onChange={(e) => setFilters([
                    {
                      field: 'post',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])}
                />


                <FormControl fullWidth>
                  <InputLabel id="etatLabel">statu</InputLabel>
                  <Select
                    sx={{
                      height: { xs: 35, md: 45 },
                    }}
                    labelId="etatLabel"
                    id="etatLabel"
                    label="etat"
                    variant='outlined'
                    displayEmpty
                    required
                    color='info'
                    inputProps={{ "aria-label": "Without label" }}
                    value={currentFilterValues.etat}
                    onChange={(e) => setFilters([
                      {
                        field: 'etat',
                        operator: 'eq',
                        value: e.target.value
                      }
                    ], 'replace')}
                  >
                    <MenuItem>All</MenuItem>
                    <MenuItem value='Actif'>Actif</MenuItem>
                    <MenuItem value='En congé'>En congé</MenuItem>
                    <MenuItem value='Suspendu'>Suspendu</MenuItem>
                    <MenuItem value='En probation'>En probation</MenuItem>
                    <MenuItem value='Terminé'>Terminé</MenuItem>
                    <MenuItem value='En formation'>En formation</MenuItem>
                    <MenuItem value='Retraité'>Retraité</MenuItem>
                  </Select>
                </FormControl>
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
          title='Create agents'
          handleClick={() => navigate('/agents/create')}
          backgroundColor='#ebdec2'
          color='#000'
          icon={<AddCircleOutlineOutlinedIcon />} />
      </Stack>


      {allEmployes.map(employe => (
        <AgentCard
          id={employe._id}
          name={employe.name}
          gender={employe.gender}
          post={employe.post}
          etat={employe.etat}
          dateEmbauche={employe.dateEmbauche}
          phoneNumber={employe.phoneNumber}
          address={employe.address}
          email={employe.email}
          noOfProject={4}
          noOfEvent={2}
        />
      ))}

      {allEmployes.length > 0 && (
        <Box
          display='flex'
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

          <Select variant='outlined'
            required
            color='info'
            disabled={pageCount < 10}
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
        </Box>
      )}

    </Box>
  )
}

export default AllAgent