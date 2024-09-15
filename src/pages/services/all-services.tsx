import React, { useMemo } from 'react';
import { useTable } from '@refinedev/core';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CustumButton, ServiceCard } from '../../components';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const AllServices = () => {

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
      expertise: logicalFilters.find((item) => item.field === "expertise")?.value || "",
    }
  }, [filters])

  const allServices = data?.data ?? [];

  const currentTitle = sorters.find((item) => item.field === 'title')?.order;

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
          <Typography fontWeight={600} fontSize={22}>{!allServices.length ? 'No Service' : 'Our Services'}</Typography>
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
                    value={currentFilterValues.expertise}
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
          title='Create Service'
          handleClick={() => navigate('/services/create')}
          backgroundColor='#ebdec2'
          color='#000'
          icon={<AddCircleOutlineOutlinedIcon />} />
      </Stack>

      <Box mt={3} sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allServices.map((service) => (
          <ServiceCard
            key={service._id}
            id={service._id}
            expertise={service.expertise}
            title={service.title}
            photo={service.photo} />
        ))}
      </Box>

      {allServices.length > 0 && (
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

export default AllServices