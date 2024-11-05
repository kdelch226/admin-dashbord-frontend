import { Box, MenuItem, Stack, FormControl, Typography, Select, InputLabel, TextField, List, ListItem, Table } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
// import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTable } from '@refinedev/core';
import EventCard from '../../components/event/EventCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Upcoming } from '@mui/icons-material';


interface RecentEventsProps {
  bgcolor: string; // Type de la prop
}

const RecentEvents: React.FC<RecentEventsProps> = ({ bgcolor }) => {
  useEffect(() => {
    setPageSize(6)
  }, [])
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    setPageSize,
    pageCount,
    filters,
    setFilters,
  } = useTable({
    resource: 'events',
    filters: {
      permanent: [
        {
          field: 'upcoming',
          operator: 'eq',
          value: true,
        },
      ],
    }
  });

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => (
      'field' in item ? item : []
    ));

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
    }
  }, [filters]);
  const allEvents = data?.data ?? [];


  if (isLoading) return <Typography>Loading ...</Typography>;
  if (isError) return <Typography>Error ...</Typography>;

  const handleSeeMore = () => {
    navigate(`/events`)
  }

  const pages: number[] = [];
  const pageLimit = pageCount > 60 ? pageCount : 60
  for (let i = 10; i <= pageLimit; i += 10) {
    pages.push(i)
  }



  return (
    <Box
      sx={{
        px: 1,
        width: '50%'
      }}
      bgcolor={bgcolor}>
      <Stack py={1} flexDirection={'row'} alignItems={'center'}>
        <Typography p={1} fontWeight={550} fontSize={18}>{!allEvents.length ? 'No Upcoming Events' : `Upcoming Events (${allEvents.length})`}</Typography>
        <CustumButton
          title='More'
          handleClick={handleSeeMore}
          icon={<VisibilityIcon />}
          backgroundColor='#ebdec2'
          color='#000'
        />
      </Stack>

      <Stack
        flexDirection={'column'}
        justifyContent={'space-between'}>
        <Table sx={{ width: '100%' }}>
          {allEvents.map(event => (
            <EventCard
              id={event._id}
              title={event.title}
              startDate={event.startDate}
              endDate={event.endDate}
              importance={event.importance}
            />
          ))}
        </Table>

        {/* {allEvents.length > 0 && (
          <Stack
            flexDirection='row'
            alignItems='center'
            mt={3}
            gap={2}
            pb={1}
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
        )} */}

      </Stack>
    </Box>
  )
}

export default RecentEvents