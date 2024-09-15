import { useOne, useShow } from '@refinedev/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CustumButton, Profile } from '../../components';
import { Box } from '@mui/material';



const AdminaDetail = () => {
    const {id} = useParams();
    const { data, isLoading, isError } = useOne({
        resource: 'users',
        id: id,
    });

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    const mydata = data?.data ?? []
    return (
        <Profile
            type='Admin'
            name={mydata.name}
            avatar={mydata.avatar}
            email={mydata.email}
            adress={mydata.adress}
            services={mydata.allService}
            number={mydata.number}
        />
    )
}

export default AdminaDetail