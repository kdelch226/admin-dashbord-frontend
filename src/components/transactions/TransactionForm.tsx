import React, { useMemo, useState } from "react";
import { Box, Typography, TextField, FormHelperText, FormControl, TextareaAutosize, Stack, Select, MenuItem, Button, FormControlLabel, Checkbox, Modal } from '@mui/material';
import CustumButton from "../common/CustumButton";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TransactionFormProps } from "../../interfaces/transaction";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useTable, useUpdate } from "@refinedev/core";
import MiniAgentCard from "../agent/MiniAgentCard";
import { SaveAlt } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



interface AddPersonProps {
    selectedPersonTarget:any,
    handleCloseAddPerson: () => void,
    personType: string,
    setselectedPersonTarget: (value: React.SetStateAction<personListentity | null | undefined>) => void
}

interface personListentity {
    name: string,
    id: string
}

const AddPerson = ({ personType, handleCloseAddPerson, selectedPersonTarget,setselectedPersonTarget }: AddPersonProps) => {
    const {
        tableQueryResult: { data, isLoading, isError },
        filters,
        setFilters,
    } = useTable({
        resource: personType,
    });


    // Hook to handle updates for the 'projects' resource.
    const { mutate } = useUpdate();
    const [selectedPerson, setSelectedPerson] = useState<personListentity | null>(selectedPersonTarget); // Reactive state


    // Memoized value to keep track of current filter values for 'name' and 'post'.
    const currentFilterValues = useMemo(() => {
        // Extract logical filters applied to the agents table.
        const logicalFilters = filters.flatMap((item) => (
            'field' in item ? item : []
        ));

        return {
            name: logicalFilters.find((item) => item.field === "name")?.value || "",
        }
    }, [filters]);

    // If data is available, store the agents data, otherwise default to an empty array.
    const searchedPersons = data?.data ?? [];

    // Function to handle adding an agent to the project.
    const handleAddPerson = () => {
        // If confirmed, passe the result
        setselectedPersonTarget(selectedPerson);
        handleCloseAddPerson();
    }


    // Gérer la sélection d'une
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, person: any) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedPerson({ name: person.name, id: person._id }); // Set the selected agent
        } else {
            setSelectedPerson(null); // Deselect if unchecked
        }
    };

    // If data is loading, display a loading message.
    if (isLoading) return <Typography>Loading ...</Typography>;
    // If there is an error in fetching data, display an error message.
    if (isError) return <Typography>Error ...</Typography>;

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
                    </Stack>

                    {/* Render a list of person matching the filter criteria */}
                    {searchedPersons?.map((person) => {
                        const isSelected = selectedPerson?.id == person._id ? true : false

                        return (
                            <Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(e) => handleChange(e, person)}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <MiniAgentCard
                                            key={person._id} // Use a unique key for each card.
                                            id={person._id}
                                            name={person.name}
                                            gender={person.gender}
                                        />
                                    }
                                />
                            </Box>
                        )
                    })}
                </Box>
                <Box sx={{ borderColor: 'black', borderLeft: 1, pl: 1 }}>
                    <Typography sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>{personType} choosed</Typography>
                    <Stack direction='row' border={1} borderColor='black' p={0.5} m={1} >
                        <Typography>{selectedPerson?.name}</Typography>
                    </Stack>
                </Box>
            </Stack>
            {/* Button to close the modal */}
            <Stack direction='row' gap={2}>
                <CustumButton
                    title='Cancel'
                    handleClick={handleCloseAddPerson}
                    icon={<CloseIcon />}
                    backgroundColor='#ebdec2'
                    color='#000'
                />
                <CustumButton
                    title='Save'
                    handleClick={() => handleAddPerson()}
                    icon={<SaveAlt />}
                    backgroundColor='#ebdec2'
                    color='#000'
                />
            </Stack>
        </Box>
    )
}

const TransactionForm = ({ action, type, entity, entityName, entityID }: TransactionFormProps) => {
    const navigate = useNavigate();
    const [selectedAgent, setSelectedAgent] = useState<personListentity | null>();
    const [selectedClient, setSelectedClient] = useState<personListentity | null>(); // Reactive state
    const [addClient, setaddClient] = useState<boolean>(false);
    const [addAgent, setaddAgent] = useState<boolean>(false);
    const [addRecurrence, setaddRecurrence] = useState<boolean>(false);
    const closeAddClient = () => {
        setaddClient(false)
    }
    const openAddClient = () => {
        setaddClient(true)
    }
    const closeAddAgent = () => {
        setaddAgent(false)
    }
    const openAddAgent = () => {
        setaddAgent(true)
    }
    const location = useLocation();
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { isSubmitting },
        control
    } = useForm({
        refineCoreProps: {
            resource: type,
        },
    });

    const onFinishHandler = async (data: FieldValues) => {
        const requestData = { ...data };
        if (!addAgent){
            setSelectedAgent(null)
        } 
        if (!addClient){
            setSelectedClient(null)
        }
            if (selectedAgent) {
                await onFinish({
                    ...data,
                    employeId: selectedAgent.id
                });
            } else if (selectedClient) {
                await onFinish({
                    ...data,
                    clientId: selectedClient.id
                });
            } else {
                await onFinish({
                    ...data,
                })
            }
    };

    const handleClickCancel = () => {
        const actualpath = location?.pathname.split('/');
        const previouspath = actualpath.slice(0, 2).join('/');
        navigate(previouspath);
    };



    return (
        <Box>
            <Typography fontWeight={600} fontSize={22} mb={2}>
                {action} an {type?.slice(0, type.length - 1)}
            </Typography>

            <Box borderRadius={1} p={2} bgcolor='#f5f3f4'>
                <form onSubmit={handleSubmit(onFinishHandler)} style={{ marginTop: '20px', width: '100%', gap: '15px', display: 'flex', flexDirection: 'column' }}>
                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Title</FormHelperText>
                        <TextField
                            placeholder='Title *'
                            fullWidth
                            required
                            id='title'
                            color='info'
                            variant='outlined'
                            {...register('title', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Amount</FormHelperText>
                        <TextField
                            placeholder='Amount *'
                            type="number"
                            fullWidth
                            required
                            id='amount'
                            color='info'
                            variant='outlined'
                            {...register('amount', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Description</FormHelperText>
                        <TextareaAutosize
                            placeholder={`Description of the ${type}`}
                            style={{
                                background: 'transparent',
                                width: '100%',
                                padding: 10,
                                borderColor: 'rgba(0,0,0,0.23)',
                                borderRadius: 5
                            }}
                            minRows={3}
                            id='description'
                            {...register('description')}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Transaction Method</FormHelperText>
                        <Select
                            fullWidth
                            required
                            id='transactionMethod'
                            color='info'
                            defaultValue={'Credit card'}
                            {...register('transactionMethod', { required: true })}
                        >
                            <MenuItem value='Credit card'>Credit card</MenuItem>
                            <MenuItem value='Debit card'>Debit card</MenuItem>
                            <MenuItem value='Bank transfer'>Bank transfer</MenuItem>
                            <MenuItem value='PayPal'>PayPal</MenuItem>
                            <MenuItem value='Orange'>Orange</MenuItem>
                            <MenuItem value='Check'>Check</MenuItem>
                            <MenuItem value='Cryptocurrency'>Cryptocurrency</MenuItem>
                            <MenuItem value='Cash'>Cash</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Category</FormHelperText>
                        <TextField
                            placeholder='Category *'
                            fullWidth
                            required
                            id='category'
                            color='info'
                            variant='outlined'
                            {...register('category', { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Date</FormHelperText>
                        <TextField
                            placeholder='Category *'
                            fullWidth
                            type="date"
                            id='category'
                            color='info'
                            variant='outlined'
                            {...register('date')}
                        />
                    </FormControl>

                    {/* Champs pour les associations optionnelles */}
                    {/* Affiche le champ approprié selon le type de transaction */}
                    {entity?.toLocaleLowerCase() === 'event' && (
                        <FormControl>
                            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Event</FormHelperText>
                            <TextField
                                placeholder='Event'
                                fullWidth
                                id='event'
                                color='info'
                                variant='outlined'
                            />
                        </FormControl>
                    )}

                    {entity?.toLocaleLowerCase() === 'project' && (
                        <FormControl>
                            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Project</FormHelperText>
                            <TextField
                                placeholder='Project'
                                fullWidth
                                id='project'
                                color='info'
                                variant='outlined'
                            />
                        </FormControl>
                    )}

                    {entity?.toLocaleLowerCase() === 'task' && (
                        <FormControl>
                            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Task</FormHelperText>
                            <TextField
                                placeholder='Task '
                                fullWidth
                                id='task'
                                color='info'
                                variant='outlined'
                            />
                        </FormControl>
                    )}

                    {type?.toLocaleLowerCase() == 'expenses' && (
                        <Box>
                            <Stack direction="row" alignItems="center">
                                <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>
                                    Agent
                                    <Button onClick={openAddAgent} sx={{ ml: 1 }}>
                                        <AddCircleOutlineOutlinedIcon />
                                    </Button>
                                </FormHelperText>
                                {/* Display the selected agent name here */}
                                <Box sx={{ ml: 2, border: 1, borderRadius: 1, p: 1.5, borderColor: 'gray' }}>
                                    {selectedAgent ? selectedAgent.name : 'No agent selected'}
                                </Box>
                            </Stack>

                            <Modal
                                open={addAgent}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <AddPerson
                                    handleCloseAddPerson={closeAddAgent}
                                    personType='agents'
                                    setselectedPersonTarget={setSelectedAgent}
                                    selectedPersonTarget={selectedAgent}
                                />
                            </Modal>
                        </Box>
                    )}

                    {type?.toLocaleLowerCase() == 'payments' && (
                        <Box>
                            <Stack direction="row" alignItems="center">
                                <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>
                                    Client
                                    <Button onClick={openAddClient} sx={{ ml: 1 }}>
                                        <AddCircleOutlineOutlinedIcon />
                                    </Button>
                                </FormHelperText>
                                {/* Display the selected Client name here */}
                                <Box sx={{ ml: 2, border: 1, borderRadius: 1, p: 1.5, borderColor: 'gray' }}>
                                    {selectedClient ? selectedClient.name : 'No Client selected'}
                                </Box>
                            </Stack>

                            <Modal
                                open={addClient}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <AddPerson
                                    handleCloseAddPerson={closeAddClient}
                                    personType='clients'
                                    setselectedPersonTarget={setSelectedClient}
                                    selectedPersonTarget={selectedClient}
                                />
                            </Modal>
                        </Box>
                    )}



                    <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}> recurrence {!addRecurrence ? <Button onClick={() => setaddRecurrence(true)}>{<AddCircleOutlineOutlinedIcon />}</Button> : <Button onClick={() => setaddRecurrence(false)}>{<RemoveCircleOutlineIcon />}</Button>}</FormHelperText>
                    {
                        addRecurrence && (
                            <>
                                {/* Section pour la récurrence */}
                                <FormControl>
                                    <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Recurrence Frequency</FormHelperText>
                                    <Select
                                        fullWidth
                                        id='recurrenceFrequency'
                                        color='info'
                                        defaultValue={'monthly'}
                                        {...register('recurrence.frequency')}
                                    >
                                        <MenuItem value='daily'>Daily</MenuItem>
                                        <MenuItem value='weekly'>Weekly</MenuItem>
                                        <MenuItem value='monthly'>Monthly</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>End Date for Recurrence</FormHelperText>
                                    <TextField
                                        type='date'
                                        fullWidth
                                        id='recurrenceEndDate'
                                        color='info'
                                        variant='outlined'
                                        {...register('recurrence.endDate')}
                                    />
                                </FormControl>
                            </>
                        )
                    }

                    <FormControl>
                        <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Status</FormHelperText>
                        <Select
                            fullWidth
                            id='status'
                            color='info'
                            {...register('status')}
                            defaultValue='pending'
                        >
                            <MenuItem value='pending'>Pending</MenuItem>
                            <MenuItem value='rejected'>Rejected</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction='row' gap={2}>
                        <CustumButton
                            type='submit'
                            title={isSubmitting ? 'Submitting...' : 'Submit'}
                            backgroundColor='#ebdec2'
                            color='#000'
                        />
                        <CustumButton
                            type='button'
                            title='Cancel'
                            backgroundColor='#d00000'
                            color='#000'
                            handleClick={handleClickCancel}
                        />
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

export default TransactionForm;
