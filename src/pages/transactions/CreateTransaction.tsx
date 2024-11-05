import React from 'react'
import TransactionForm from '../../components/transactions/TransactionForm';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTransaction = () => {
    const navigate = useNavigate();
    const { type, entity, entityName, entityID } = useParams(); // Get the route parameters

    // Navigate back to the previous path if 'type' is not defined
    React.useEffect(() => {
        if (!type) {
            const actualpath = location?.pathname.split('/');
            const previouspath = actualpath.slice(0, 2).join('/');
            navigate(previouspath);
        }
    }, [type, navigate]); // Dependencies include 'type' and 'navigate'

    return (
        <TransactionForm
            action="Create"
            type={type}
            entity={entity}
            entityName={entityName}
            entityID={entityID}
        />
    )
}

export default CreateTransaction