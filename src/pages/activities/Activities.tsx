import { Box, MenuItem, Stack, FormControl, Typography, Select, InputLabel, TextField, List, ListItem } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { CustumButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTable } from '@refinedev/core';
import ActivitiesCard from '../../components/activities/ActivitiesCard';
import VisibilityIcon from '@mui/icons-material/Visibility';


interface ActivitiesProps {
  bgcolor?: string; // Type de la prop
  restricted?: boolean
}

const Activities: React.FC<ActivitiesProps> = ({ bgcolor, restricted }) => {
  useEffect(() => {
    if (restricted) setPageSize(5);
  });

  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable({
    resource: 'activities',
  });

  const allActivities = data?.data ?? [];
  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => (
      'field' in item ? item : []
    ));

    return {
      userEmail: logicalFilters.find((item) => item.field === "userEmail")?.value || "",
      userName: logicalFilters.find((item) => item.field === "userName")?.value || "",
      action: logicalFilters.find((item) => item.field === "action")?.value || "",
    }
  }, [filters]);

  const currentTitle = sorters.find((item) => item.field === 'username')?.order;

  const ascTime = (field: string) => {
    setSorters([{ field, order: 'asc' }])
  }
  const descTime = (field: string) => {
    setSorters([{ field, order: 'desc' }])
  }

  const handleSeeMore = () => {
    navigate(`/activities`)
  }


  if (isLoading) return <Typography>Loading ...</Typography>;
  if (isError) return <Typography>Error ...</Typography>;

  const pages: number[] = [];
  const pageLimit = pageCount > 60 ? pageCount : 60
  for (let i = 10; i <= pageLimit; i += 10) {
    pages.push(i)
  }


  return (
    <Box
      sx={{
        px: 1,
        ...(restricted && { width: '50%' })
      }}
      bgcolor={bgcolor}>
      <Stack flexDirection={'row'} p={1} alignItems={'center'}>

        <Typography p={1} fontWeight={550} fontSize={restricted ? 18:20}>{!allActivities.length ? 'No Latest Activities' : `Latest Activities (${allActivities.length})`}</Typography>
        {restricted && <CustumButton
          title='More'
          handleClick={handleSeeMore}
          icon={<VisibilityIcon />}
          backgroundColor='#ebdec2'
          color='#000'
        />}
      </Stack>
      {!restricted && (
        <Box gap={3}  sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box mb={3} display='flex' flexWrap='wrap' width='85%' justifyContent='space-between'>
            <Box mb={{ xs: 1, sm: 0 }} gap={2} display='flex' flexWrap='wrap'>

              <Stack direction='row' gap={3}>
                <Box>
                  <CustumButton
                    title='time'
                    variant={currentTitle === 'asc' ? 'contained' : 'outlined'}
                    icon={<ArrowCircleUpIcon />}
                    handleClick={() => ascTime('createdAt')}
                    backgroundColor='#ebdec2'
                    color='#000'
                  />
                </Box>
                <Box>
                  <CustumButton
                    title='time'
                    icon={<ArrowCircleDownIcon />}
                    variant={currentTitle === 'desc' ? 'contained' : 'outlined'}
                    handleClick={() => descTime('createdAt')}
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
                  placeholder='userEmail'
                  required
                  value={currentFilterValues.userEmail}
                  onChange={(e) => setFilters([
                    {
                      field: 'userEmail',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])}
                />

                <TextField
                  size='small'
                  variant='outlined'
                  color='info'
                  placeholder='userName'
                  required
                  value={currentFilterValues.userName}
                  onChange={(e) => setFilters([
                    {
                      field: 'userName',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])}
                />

                <TextField
                  size='small'
                  variant='outlined'
                  color='info'
                  placeholder='action'
                  required
                  value={currentFilterValues.action}
                  onChange={(e) => setFilters([
                    {
                      field: 'action',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])}
                />

              </Stack>

            </Box>
          </Box>
        </Box>
      )}
      <Box >
        <List sx={{ width: '100%' }}>
          {allActivities.map(activity => (
            <ListItem
              key={activity._id}
              sx={{ p: 0 }}
            >
              <ActivitiesCard
                id={activity._id}
                userAvatar={activity.userAvatar}
                user={activity.user}
                restricted
                changeby={activity.changedBy}
                action={activity.action}
                documentType={activity.documentType}
                createdAt={activity.createdAt}
              />
            </ListItem>
          ))}
        </List>

        {allActivities.length > 0 && !restricted && (
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
              disabled={!(current <= pageCount)}
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

export default Activities