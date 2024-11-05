import React, { useMemo } from 'react';
import { useTable } from '@refinedev/core';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import SkipNextIcon from '@mui/icons-material/SkipNext';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { AdminaCard, CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';

const Admina = () => {
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

  const alladmins = data?.data ?? [];

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => (
      'field' in item ? item : []
    ));

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      expertise: logicalFilters.find((item) => item.field === "expertise")?.value || "",
    }
  }, [filters])
  const currentTitle = sorters.find((item) => item.field === 'title')?.order;

  const ascTitle = (field: string) => {
    setSorters([{ field, order: 'asc' }])
  }
  const descTitle = (field: string) => {
    setSorters([{ field, order: 'desc' }])
  }
  const pages: number[] = [];
  const pageLimit = pageCount > 60 ? pageCount : 60
  for (let i = 10; i <= pageLimit; i += 10) {
    pages.push(i)
  }

  if (isError) return <Typography>error...</Typography>;
  if (isLoading) return <Typography>loading...</Typography>

  return (
    <Box mt={2}>
      <Typography fontSize={22} fontWeight={600} color="#11142d">
        Administrators List
      </Typography>

      <Box mt={2} mb={2} gap={2} display='flex' flexWrap='wrap'>

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

      <CustumButton
        title='Create Admin'
        handleClick={() => navigate('/users/create')}
        backgroundColor='#ebdec2'
        color='#000'
        icon={<AddCircleOutlineOutlinedIcon />} />

      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          backgroundColor: "#fcfcfc",
        }}
      >


        {alladmins.map((admin) => (
          <AdminaCard
            key={admin._id}
            id={admin._id}
            name={admin.name}
            email={admin.email}
            number={admin.number}
            adress={admin.adress}
            avatar={admin.avatar}
          />
        ))}

        {alladmins.length > 0 && (
          <Stack
            flexDirection='row'
            alignItems='center'
            mt={3}
            gap={2}
            flexWrap='wrap'
            p={2}
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
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default Admina