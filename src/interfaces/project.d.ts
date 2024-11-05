import { BaseKey } from '@pankod/refine-core';


export interface projectSimpleCardProp {
    id?: BaseKey | undefined,
    title:string,
    startDate:string,
    initialBudget:string,
    ajustedBudget:string,
    estimatedEndDate:string,
    endDate:string,
    status:string,
    client:string,
}

export interface projectDetailProp {
    id?: BaseKey | undefined,
    title:string,
    description:string,
    startDate:string,
    initialBudget:string,
    ajustedBudget:string,
    actualExpenses:string,
    estimatedEndDate:string,
    endDate:string,
    status:string,
    tasks:string,
    assignedEmployees:string,
    client:string,
    payment:string,
    expense:string,
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}

export interface projectFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}