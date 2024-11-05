import { BaseKey } from '@pankod/refine-core';

export interface EventCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    number: string,
    adress: string,
    avatar: string,
    noOfServices: number
}

export interface EventSimpleCardProp {
    id?: BaseKey | undefined,
    title: string,
    startDate: string,
    endDate: string,
    importance:string,
    }

export interface MiniEventSimpleCardProp {
    id?: BaseKey | undefined,
    name: string,
    company: string,
    gender: string,
    handleClick: (event: any) => void
}


export interface EventProfileProps {
    id: string,
    title: string,
    description: string,
    startDate: string,
    EndDate: string,
    location: string,
    client: string,
    relatedProject: string,
    participants: string,
    externalParticipants: string,
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}

export interface EventFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}
