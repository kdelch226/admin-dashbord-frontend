type ButtonVariant = 'text' | 'outlined' | 'contained';

export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    variant?: ButtonVariant,
    handleClick?: () => void
}


export interface ProfileProps {
    type: string,
    name: string,
    number: string,
    adress: string,
    avatar: string,
    email: string,
    services: Array | undefined
}


export interface serviceProps {
    _id: string,
    title: string,
    expertise: string,
    photo: string,
    creator: string
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    serviceImage: { name: string, url: string },
}
