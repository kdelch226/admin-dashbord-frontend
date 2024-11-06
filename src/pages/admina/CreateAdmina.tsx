import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';
import AdminaForm from '../../components/admina/AdminaForm';
import { useNavigate } from 'react-router-dom';

const CreateAdmina = () => {
    const navigate = useNavigate();
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm({
        refineCoreProps: {
            resource: "users/create",
        },
    });


    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
        });
        navigate('/users')
    };

    return (
        <AdminaForm
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={isSubmitting}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            errors={errors}
        />
    )


};

export default CreateAdmina;
