import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    number: string,
    adress: string,
    avatar: string,
}

export interface AgentSimpleCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    phoneNumber: string,
    gender:string,
    dateEmbauche:string,
    post:string,
    status:string,

}


export interface AgentProfileProps {
    id:string,
    name: string,
    number: string,
    gender:string,
    post:string,
    project:Array | undefined,
    task:Array | undefined,
    event:Array | undefined,
    adress: string,
    email: string,
    number:string,
}

export interface agentNameId{
    _id:string,
    name: string,
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}

export interface MiniAgentCardProp{
    id?: BaseKey | undefined,
    name: string,
    post?: string,
    gender: string,
    handleDelete?:(id:string)=>void,
    handleClick?: (agent:any) => void
}

export interface AgentFormProps {
    type: string,
    errors?: FieldErrors<FieldValues>,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}
