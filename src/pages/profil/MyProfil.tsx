import { useGetIdentity, useOne, useShow } from '@refinedev/core';
import React from 'react'
import { CustumButton, Profile } from '../../components';
import { Box } from '@mui/material';
type IIdentity = {
    id: number;
    email: string;
    userid: string
};


const MyProfil = () => {
    const { data: user } = useGetIdentity<IIdentity>();
    const { data, isLoading, isError } = useOne({
        resource: 'users',
        id: user?.userid,
    });

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    const mydata = data?.data ?? []
    return (
        <Profile
            type='My'
            name={mydata.name}
            avatar={mydata.avatar}
            email={mydata.email}
            services={mydata.allService}
            adress={mydata.adress}
            number={mydata.number}
        />
    )
}

export default MyProfil