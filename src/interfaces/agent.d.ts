import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    number: string,
    adress: string,
    avatar: string,
    noOfServices: number
}

export interface AgentSimpleCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    gender:string,
    noOfProject: number,
    noOfEvent:number,
    dateEmbauche:string,
    post:string,
    etat:string,

}


export interface AgentProfileProps {
    id:string,
    name: string,
    number: string,
    gender:string,
    post:string,
    projet:Array | undefined,
    task:Array | undefined,
    event:Array | undefined,
    adress: string,
    email: string,
    number:string,
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}

export interface MiniAgentCardProp{
    id?: BaseKey | undefined,
    name: string,
    post: string,
    task:Array | undefined,
    gender: string,
    handleClick: (agent:any) => void
}

export interface AgentFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    control:any
}
