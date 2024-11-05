import { BaseKey } from "@refinedev/core";

export interface ObjectiveCardProps {
    id:BaseKey,
    title?: string,
    type: string,
    targetValue: number,
    currentValue: number,
    endDate: Date,
    startDate: Date,
}

export interface ObjectiveChartProps  {
    bgcolor:string,
    title?: string,
    type: string,
    targetValue: number,
    currentValue: number,
    endDate: Date,
    startDate: Date,
}

export interface ObjectiveFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}