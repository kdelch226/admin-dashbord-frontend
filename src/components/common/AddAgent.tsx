import { Box, Checkbox, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CustumButton } from '..';
import CloseIcon from '@mui/icons-material/Close';
import { useTable, useUpdate } from '@refinedev/core';
import { Stack } from '@mui/material';
import MiniAgentCard from '../agent/MiniAgentCard';
import { Delete,SaveAlt } from '@mui/icons-material';


// Define the interface for the component props, which includes a function to handle modal closure and the project ID.
interface AddAgentProps {
    handleCloseAddagent: () => void,
    typeId: string,
    type: string,
}

// Component to add an agent to a project.
const AddAgent = ({ handleCloseAddagent, type, typeId }: AddAgentProps) => {
    // Destructure the table query result to get the data, loading, and error state from the 'agents' resource.
    const {
        tableQueryResult: { data, isLoading, isError },
        filters,
        setFilters,
    } = useTable({
        resource: 'agents',
        filters: {
            permanent: [
                // Set a filter to exclude agents already associated with the given project.
                {
                    field: type,
                    operator: "ne",
                    value: typeId,
                },
            ],
        },
    });


    const [selectedAgents, setSelectedAgents] = useState([]); // Reactive state
    
    // Hook to handle updates for the 'projects' resource.
    const { mutate } = useUpdate();

    // Memoized value to keep track of current filter values for 'name' and 'post'.
    const currentFilterValues = useMemo(() => {
        // Extract logical filters applied to the agents table.
        const logicalFilters = filters.flatMap((item) => (
            'field' in item ? item : []
        ));

        return {
            name: logicalFilters.find((item) => item.field === "name")?.value || "",
            post: logicalFilters.find((item) => item.field === "post")?.value || "",
        }
    }, [filters]);

    // If data is available, store the agents data, otherwise default to an empty array.
    const searchedagents = data?.data ?? [];

    // Function to handle adding an agent to the project.
    const handleAddagents = () => {
        const text = `Do you want to add these agents ?`; // Confirmation message.
        const response = confirm(text); // Show a confirmation dialog to the user.
        const selectedAgentIds = selectedAgents.map((agent:any) => agent._id);

        if (response) {
            // If confirmed, mutate the project resource to add the selected agent.
            mutate({
                resource: type,
                id: typeId,
                values: {
                    employesIds: selectedAgentIds, // Pass the agent's ID to the project.
                }
            }, {
                onSuccess: () => {
                }
            })
        }
    }


    // Gérer la sélection d'un agent
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, agent: any) => {
        const isChecked = event.target.checked;

        setSelectedAgents((prevSelectedAgents: any) => {
            if (isChecked) {
                // Add agent if checked
                return [...prevSelectedAgents, agent];
            } else {
                // Remove agent if unchecked
                return prevSelectedAgents.filter((selected: any) => selected._id !== agent._id);
            }
        });
    };

    // If data is loading, display a loading message.
    if (isLoading) return <Typography>Loading ...</Typography>;
    // If there is an error in fetching data, display an error message.
    if (isError) return <Typography>Error ...</Typography>;

    // Render the component UI.
    return (
        <Box>
            <Stack direction='row'
                sx={{
                    p: 5,
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    width: { sm: '99vw', md: '75vw' },
                    maxHeight: '91vh',
                    bgcolor: 'white',
                    borderRadius: '10px',
                    mb: 1,
                    gap: 4
                }}
            >
                <Box>
                    {/* Stack layout for the input fields */}
                    <Stack gap={2} direction={{ xs: 'column', sm: 'row' }}>
                        <Box>
                            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Agent Name</FormHelperText>
                            {/* TextField for filtering agents by name */}
                            <TextField
                                placeholder='Agent *'
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
                            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Post</FormHelperText>
                            {/* TextField for filtering agents by post */}
                            <TextField
                                fullWidth
                                variant='outlined'
                                color='info'
                                placeholder='Post'
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

                    {/* Render a list of agents matching the filter criteria */}
                    {searchedagents?.map((agent) => {
                        const isSelected = selectedAgents.some((selected: any) => selected._id === agent._id);

                        return (
                            <Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(e) => handleChange(e, agent)}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <MiniAgentCard
                                            key={agent._id} // Use a unique key for each card.
                                            id={agent._id}
                                            name={agent.name}
                                            post={agent.post}
                                            gender={agent.gender}
                                        />
                                    }
                                />
                            </Box>
                        )
                    })}
                </Box>
                <Box sx={{ borderColor: 'black', borderLeft: 1, pl: 1 }}>
                    <Typography sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Agents choosed</Typography>
                    {selectedAgents.map((agent: any) => (
                        <Stack direction='row' border={1} borderColor='black' p={0.5} m={1} >
                            <Typography>{agent.name}</Typography>
                        </Stack>
                    ))}
                </Box>
            </Stack>
            {/* Button to close the modal */}
            <Stack direction='row' gap={2}>
                <CustumButton
                    title='Cancel'
                    handleClick={handleCloseAddagent}
                    icon={<CloseIcon />}
                    backgroundColor='#ebdec2'
                    color='#000'
                />
                <CustumButton
                    title='Save'
                    handleClick={handleAddagents}
                    icon={<SaveAlt />}
                    backgroundColor='#ebdec2'
                    color='#000'
                />
            </Stack>
        </Box>
    )
}

export default AddAgent;
