import { BaseKey } from '@pankod/refine-core';

export interface ClientCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    number: string,
    adress: string,
    avatar: string,
    noOfServices: number
}

export interface ClientSimpleCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    gender: string,
    noOfProject: number,
    noOfEvent: number,
    dateCreation: string,
    industry: string,
    company: string,

}

export interface MiniClientSimpleCardProp {
    id?: BaseKey | undefined,
    name: string,
    company: string,
    gender: string,
    handleClick: (client:any) => void
}


export interface ClientProfileProps {
    id: string,
    name: string,
    number: string,
    gender: string,
    company: string,
    projet: Array | undefined,
    event: Array | undefined,
    adress: string,
    email: string,
    number: string,
    industry: string,
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}

export interface ClientFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}
