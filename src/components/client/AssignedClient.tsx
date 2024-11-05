import React, { useEffect, useState } from 'react'
import { MiniClientSimpleCardProp } from '../../interfaces/client'
import { Box, Stack, FormControl, InputLabel, Select, Typography, TextField, Modal } from '@mui/material';
import CustumButton from '../common/CustumButton';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import AddClient from '../common/AddClient';
import MiniClientCard from './miniClientCard';


interface AssignedClientsProps {
    clients: any[]; // clients est un tableau de MiniClientCard
    type:string;
    handleDelete: () => void
}


const AssignedClients = ({ clients,type,handleDelete }: any) => {

    const [filteredClients, setFilteredClients] = useState(clients);
    const { id } = useParams();
    useEffect(() => { }, [])
    const navigate=useNavigate()

    const handleFilterClientsName = (name: string) => {
        const normalizedSearchName = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtered = clients.filter((client: any) =>
            client.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchName)
        );
        setFilteredClients(filtered);
    };


    const handleFilterClientsPost = (post: string) => {
        const normalizedSearchPost = post.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtered = clients.filter((client: any) =>
            client.post.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchPost)
        );
        setFilteredClients(filtered);
    }

    const handleOrder = (order: 'asc' | 'desc') => {
        const sortedClients = [...filteredClients].sort((a: any, b: any) => {
            if (order === 'asc') {
                return a.name > b.name ? 1 : -1;
            } else {
                return a.name < b.name ? 1 : -1;
            }
        });

        setFilteredClients(sortedClients);
    };

    const [openAddCClient, setOpenAddCClient] = useState(false);
    const handlOpenAddClient = () => setOpenAddCClient(true);
    const handlCloseAddClient = () => setOpenAddCClient(false);

    return (
        <Box>
            <Typography mb={2} fontWeight={600} fontSize={22}>{!clients.length ? 'No Assigned Clients' : 'Assigned Clients'}</Typography>
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
                        onChange={(e) => handleFilterClientsName(e.currentTarget.value)}
                    />
                    <TextField
                        size='small'
                        variant='outlined'
                        color='info'
                        placeholder='post'
                        required
                        onChange={(e) => handleFilterClientsPost(e.target.value)}
                    />
                </Stack>

            </Box>
            <Box>
                <CustumButton
                    title='Add Client '
                    variant='contained'
                    icon={<AddCircleOutlineOutlinedIcon />}
                    handleClick={handlOpenAddClient}
                    backgroundColor='#ebdec2'
                    color='#000'
                />
                <Modal
                    open={openAddCClient}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AddClient
                        handleCloseAddClient={handlCloseAddClient}
                        typeId={id as string}
                        type={type}
                    />
                </Modal>
            </Box>
            <Box mt={4}>
                {filteredClients.map((client: any) => (
                    <MiniClientCard
                        id={client._id}
                        name={client.name}
                        gender={client.gender}
                        company={client.company}
                        handleClick={() => navigate(`/clients/show/${client._id}`)}
                        handleDelete={()=>{handleDelete(client._id)}}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default AssignedClients