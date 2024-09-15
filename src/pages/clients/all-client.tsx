import { Box, MenuItem, Stack, FormControl, Typography, Select, InputLabel, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTable } from '@refinedev/core';
import ClientCard from '../../components/client/ClientCard';

const AllClient = () => {
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
      company: logicalFilters.find((item) => item.field === "company")?.value || "",
    }
  }, [filters]);

  const allClients = data?.data ?? [];

  const currentTitle = sorters.find((item) => item.field === 'name')?.order;

  const ascTitle = (field: string) => {
    setSorters([{ field, order: 'asc' }])
  }
  const descTitle = (field: string) => {
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
          <Typography fontWeight={600} fontSize={22}>{!allClients.length ? 'No client' : 'Our clients'}</Typography>
          <Box my={3} display='flex' flexWrap='wrap' width='85%' justifyContent='space-between'>
            <Box mb={{ xs: 1, sm: 0 }} gap={2} display='flex' flexWrap='wrap'>

              <Stack direction='row' gap={3}>
                <Box>
                  <CustumButton
                    title='name'
                    variant={currentTitle === 'asc' ? 'contained' : 'outlined'}
                    icon={<ArrowCircleUpIcon />}
                    handleClick={() => ascTitle('name')}
                    backgroundColor='#ebdec2'
                    color='#000'
                  />
                </Box>
                <Box>
                  <CustumButton
                    title='name'
                    icon={<ArrowCircleDownIcon />}
                    variant={currentTitle === 'desc' ? 'contained' : 'outlined'}
                    handleClick={() => descTitle('name')}
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
                  placeholder='name'
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
                  placeholder='company'
                  required
                  value={currentFilterValues.company}
                  onChange={(e) => setFilters([
                    {
                      field: 'company',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])}
                />
                {/* 
                <FormControl fullWidth>
                  <InputLabel id="expertiseLabel">Expertise</InputLabel>
                  <Select
                    sx={{
                      height: { xs: 35, md: 45 },
                    }}
                    labelId="expertiseLabel"
                    id="expertiseLabel"
                    label="Expertise"
                    variant='outlined'
                    displayEmpty
                    required
                    color='info'
                    inputProps={{ "aria-label": "Without label" }}
                    value={currentFilterValues.post}
                    onChange={(e) => setFilters([
                      {
                        field: 'expertise',
                        operator: 'eq',
                        value: e.target.value
                      }
                    ], 'replace')}
                  >
                    <MenuItem>All</MenuItem>
                    <MenuItem value='Web Development'>Web Development</MenuItem>
                    <MenuItem value='Design and UX/UI'>Design and UX/UI</MenuItem>
                    <MenuItem value='Digital Marketing'>Digital Marketing</MenuItem>
                    <MenuItem value='Analytics and Data'>Analytics and Data</MenuItem>
                  </Select>
                </FormControl> */}
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
          title='Create Client'
          handleClick={() => navigate('/clients/create')}
          backgroundColor='#ebdec2'
          color='#000'
          icon={<AddCircleOutlineOutlinedIcon />} />
      </Stack>

      {allClients.map(client => (
        <ClientCard
          id={client._id}
          name={client.name}
          gender={client.gender}
          company={client.company}
          industry={client.industry}
          dateCreation={client.dateCreation}
          phoneNumber={client.phoneNumber}
          address={client.address}
          email={client.email}
          noOfProject={4}
          noOfEvent={2}
        />
      ))}

      {allClients.length > 0 && (
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

export default AllClient