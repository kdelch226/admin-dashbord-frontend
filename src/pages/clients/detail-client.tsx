import { useOne } from '@refinedev/core';
import React from 'react'
import { useParams } from 'react-router-dom';
import ClientProfil from '../../components/client/ClientProfil';

const DetailClient = () => {
  const {id} = useParams();
  const { data, isLoading, isError } = useOne({
      resource: 'clients',
      id: id,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  const clientData = data?.data ?? []
  return (
      <ClientProfil
          id={clientData._id}
          name={clientData.name}
          email={clientData.email}
          company={clientData.company}
          industry={clientData.industry}
          project={[]}
          event={[]}
          gender={clientData.gender}
          adress={clientData.address}
          number={clientData.phoneNumber}
      />
  )
}

export default DetailClient