import { Box, FormHelperText, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { CustumButton } from '..';
import CloseIcon from '@mui/icons-material/Close';
import { useTable, useUpdate } from '@refinedev/core';
import { Stack } from '@mui/material';
import MiniClientCard from '../client/miniClientCard';

interface closeModal {
    handleCloseAddClient: () => void,
    type:string,
    typeId: string,
}

const AddClient = ({ handleCloseAddClient, typeId,type}: closeModal) => {
    const {
        tableQueryResult: { data, isLoading, isError },
        filters,
        setFilters,
    } = useTable({
        resource: 'clients'
    });

    const { mutate } = useUpdate()

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) => (
            'field' in item ? item : []
        ));

        return {
            name: logicalFilters.find((item) => item.field === "name")?.value || "",
            company: logicalFilters.find((item) => item.field === "company")?.value || "",
        }
    }, [filters]);

    const searchedClients = data?.data ?? [];

    const handleAddClient = ({ client }: any) => {
        const text = `do you want to add ${client?.name}`;
        const response = confirm(text);
        if (response) {
            mutate({
                resource:type,
                id: typeId,
                values: {
                    clientId: client._id,
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
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Client Name</FormHelperText>
                        <TextField
                            placeholder='Client *'
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
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Company Name</FormHelperText>
                        <TextField
                            fullWidth
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
                    </Box>
                </Stack>

                {searchedClients?.map((client) => (
                    <MiniClientCard
                        id={client._id}
                        name={client.name}
                        company={client.company}
                        gender={client.gender}
                        handleClick={()=>handleAddClient({client})}
                    />
                ))}

            </Box>
            <CustumButton
                title='Cancel'
                handleClick={handleCloseAddClient}
                icon={<CloseIcon />}
                backgroundColor='#ebdec2'
                color='#000'
            />
        </Box>
    )
}

export default AddClient