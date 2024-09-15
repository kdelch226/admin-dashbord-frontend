import { Box, FormHelperText, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { CustumButton } from '..';
import CloseIcon from '@mui/icons-material/Close';
import { useTable, useUpdate } from '@refinedev/core';
import { Stack } from '@mui/material';
import MiniAgentCard from '../agent/MiniAgentCard';

interface closeModal {
    handleCloseAddagent: () => void,
    projetId: string,
}

const AddAgentProjet = ({ handleCloseAddagent, projetId }: closeModal) => {
    console.log(projetId)
    const {
        tableQueryResult: { data, isLoading, isError },
        filters,
        setFilters,
    } = useTable({
        resource: 'agents',
        filters: {
            permanent: [
              {
                field: "projet",
                operator: "ne",
                value: projetId,
              },
            ],
          },
    });

    const { mutate } = useUpdate()

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) => (
            'field' in item ? item : []
        ));

        return {
            name: logicalFilters.find((item) => item.field === "name")?.value || "",
            post: logicalFilters.find((item) => item.field === "post")?.value || "",
        }
    }, [filters]);

    const searchedagents = data?.data ?? [];

    const handleAddagent = ({ agent }: any) => {
        const text = `do you want to add ${agent?.name}`;
        const response = confirm(text);
        if (response) {
            mutate({
                resource: 'projets',
                id: projetId,
                values: {
                    employeId: agent._id,
                }
            })
        }
    }

    if (isLoading) return <Typography>Loading ...</Typography>;
    if (isError) return <Typography>Error ...</Typography>;


    return (
        <Box >
            <Box
                sx={{
                    p: 5,
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    width: { sm: '99vw', md: '75vw' },
                    maxHeight: '91vh',
                    bgcolor: 'white',
                    borderRadius: '10px',
                    mb: 1
                }}
            >
                <Stack gap={2} direction={{ xs: 'column', sm: 'row' }}>
                    <Box>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>agent Name</FormHelperText>
                        <TextField
                            placeholder='agent *'
                            fullWidth
                            required
                            id='name'
                            color='info'
                            variant='outlined'
                            value={currentFilterValues.name}
                            onChange={(e) => setFilters([
                                {
                                    field: 'name',
                                    operator: 'contains',
                                    value: e.currentTarget.value ? e.currentTarget.value : undefined
                                }
                            ])}
                        />
                    </Box>
                    <Box>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>post</FormHelperText>
                        <TextField
                            fullWidth
                            variant='outlined'
                            color='info'
                            placeholder='post'
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
                    </Box>
                </Stack>

                {searchedagents?.map((agent) => (
                    <MiniAgentCard
                        id={agent._id}
                        name={agent.name}
                        post={agent.post}
                        task={agent.task}
                        gender={agent.gender}
                        handleClick={() => handleAddagent({ agent })}
                    />
                ))}

            </Box>
            <CustumButton
                title='Cancel'
                handleClick={handleCloseAddagent}
                icon={<CloseIcon />}
                backgroundColor='#ebdec2'
                color='#000'
            />
        </Box>
    )
}

export default AddAgentProjet