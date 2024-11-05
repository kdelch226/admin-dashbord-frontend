import { useOne } from '@refinedev/core';
import React from 'react'
import { useParams } from 'react-router-dom';
import AgentProfil from '../../components/agent/AgentProfil';

const DetailAgent = () => {
  const {id} = useParams();
  const { data, isLoading, isError } = useOne({
      resource: 'agents',
      id: id,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  const agentdata = data?.data ?? []
  return (
      <AgentProfil
          id={agentdata._id}
          name={agentdata.name}
          email={agentdata.email}
          post={agentdata.post}
          project={[]}
          task={[]}
          event={[]}
          gender={agentdata.gender}
          adress={agentdata.address}
          number={agentdata.phoneNumber}
      />
  )
}

export default DetailAgent