import React from 'react'
import ActivityProfil from '../../components/activities/ActivityProfil';
import { useParams } from 'react-router-dom';
import { useOne } from '@refinedev/core';

const ActivitiesDetails = () => {


    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: 'activities',
        id: id,
    });

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    const activitieData = data?.data ?? []
    return (
        <ActivityProfil
            id={activitieData._id}
            userAvatar={activitieData.userAvatar}
            changedBy={activitieData.changedBy}
            user={activitieData.user}
            action={activitieData.action}
            documentType={activitieData.documentType}
            documentTitle={activitieData.documentTitle}
            changes={activitieData.changes}
            createdAt={activitieData.createdAt}
        />
    )
}

export default ActivitiesDetails