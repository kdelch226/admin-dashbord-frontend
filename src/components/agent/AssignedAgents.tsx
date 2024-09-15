import React, { useEffect, useState } from 'react'
import { MiniAgentCardProp } from '../../interfaces/agent'
import { Box, Stack, FormControl, InputLabel, Select, Typography, TextField, Modal } from '@mui/material';
import CustumButton from '../common/CustumButton';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useParams } from 'react-router-dom';
import MiniAgentCard from './MiniAgentCard';
import AddAgentProjet from '../projet/AddAgentProjet';


interface AssignedAgentsProps {
    agents: any[]; // clients est un tableau de MiniAgentCard
}


const AssignedAgents = ({ agents }: any) => {

    const [filteredAgents, setFilteredAgents] = useState(agents);
    const { id } = useParams();
    console.log(id)

    useEffect(() => { }, [])

    console.log('chat', filteredAgents);

    const handleFilterAgentsName = (name: string) => {
        const normalizedSearchName = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtered = agents.filter((agent: any) =>
            agent.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchName)
        );
        setFilteredAgents(filtered);
    };


    const handleFilterAgentsPost = (post: string) => {
        const normalizedSearchPost = post.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtered = agents.filter((agent: any) =>
            agent.post.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchPost)
        );
        setFilteredAgents(filtered);
    }

    const handleOrder = (order: 'asc' | 'desc') => {
        const sortedAgents = [...filteredAgents].sort((a: any, b: any) => {
            if (order === 'asc') {
                return a.name > b.name ? 1 : -1;
            } else {
                return a.name < b.name ? 1 : -1;
            }
        });

        setFilteredAgents(sortedAgents);
    };

    const [openAddCAgent, setOpenAddCAgent] = useState(false);
    const handlOpenAddAgent = () => setOpenAddCAgent(true);
    const handlCloseAddAgent = () => setOpenAddCAgent(false);

    return (
        <Box>
            <Typography mb={2} fontWeight={600} fontSize={22}>{!agents.length ? 'No Assigned Agents' : 'Assigned Agents'}</Typography>
            <Box my={2} gap={2} display='flex' flexWrap='wrap'>
                <Stack direction='row' gap={3}>
                    <Box>
                        <CustumButton
                            title='name'
                            variant='contained'
                            icon={<ArrowCircleUpIcon />}
                            handleClick={() => handleOrder('asc')}
                            backgroundColor='#ebdec2'
                            color='#000'
                        />
                    </Box>
                    <Box>
                        <CustumButton
                            title='name'
                            icon={<ArrowCircleDownIcon />}
                            variant='contained'
                            handleClick={() => handleOrder('asc')}
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
                        onChange={(e) => handleFilterAgentsName(e.currentTarget.value)}
                    />
                    <TextField
                        size='small'
                        variant='outlined'
                        color='info'
                        placeholder='post'
                        required
                        onChange={(e) => handleFilterAgentsPost(e.target.value)}
                    />
                </Stack>

            </Box>
            <Box>
                <CustumButton
                    title='Add Agent '
                    variant='contained'
                    icon={<AddCircleOutlineOutlinedIcon />}
                    handleClick={handlOpenAddAgent}
                    backgroundColor='#ebdec2'
                    color='#000'
                />
                <Modal
                    open={openAddCAgent}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AddAgentProjet
                        handleCloseAddagent={handlCloseAddAgent}
                        projetId={id as string}
                    />
                </Modal>
            </Box>
            <Box mt={4}>
                {filteredAgents.map((agent: any) => (
                    <MiniAgentCard
                        id={agent._id}
                        name={agent.name}
                        post={agent.post}
                        task={agent.task}
                        gender={agent.gender}
                        handleClick={() => console.log('ha')}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default AssignedAgents