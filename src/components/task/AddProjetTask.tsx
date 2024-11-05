import { Box, FormHelperText, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { CustumButton } from '..';
import CloseIcon from '@mui/icons-material/Close';
import { useTable, useUpdate } from '@refinedev/core';
import { Stack } from '@mui/material';
import MiniProjectCard from '../project/MiniProjectCard';

interface closeModal {
    handleCloseAddProject: () => void,
    taskId: string,
}

const AddProjectTask = ({ handleCloseAddProject, taskId }: closeModal) => {
    const {
        tableQueryResult: { data, isLoading, isError },
        filters,
        setFilters,
    } = useTable({
        resource: 'projects'
    });

    const { mutate } = useUpdate()

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) => (
            'field' in item ? item : []
        ));

        return {
            name: logicalFilters.find((item) => item.field === "name")?.value,
            post: logicalFilters.find((item) => item.field === "post")?.value,

        }
    }, [filters]);

    const serchedProject = data?.data ?? [];

    const handleAddProject = ({ project }: any) => {
        const text = `do you want to add ${project?.title}`;
        const response = confirm(text);
        if (response) {
            mutate({
                resource: 'tasks',
                id: taskId,
                values: {
                    projectId: project._id,
                }
            }, {
                onSuccess: () => {
                    window.location.reload();
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
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Name</FormHelperText>
                        <TextField
                            placeholder='Task *'
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

                {serchedProject?.map((project) => (
                    <MiniProjectCard
                        id={project._id}
                        title={project.title}
                        handleClick={() => handleAddProject({ project })}
                    />
                ))}

            </Box>
            <CustumButton
                title='Cancel'
                handleClick={handleCloseAddProject}
                icon={<CloseIcon />}
                backgroundColor='#ebdec2'
                color='#000'
            />
        </Box>
    )
}

export default AddProjectTask