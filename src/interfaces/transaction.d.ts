import { BaseKey } from "@refinedev/core"

export interface TransactionCardProps {
    id: string;
    category: string,
    title: string,
    method: string,
    type: string,
    amount: number,
    date: Date;
    status: string;
}

export interface TransactionProfilProps {
    id: string;
    category: string,
    title: string,
    type: string,
    amount: number,
}

export interface TransactionDetailProps {
    type: string,
    title: string,
    amount: number,
    date: Date,
    description: string,
    transactionMethod: string,
    category: string,

    project?: {
        id: string;
        title: string,
    },
    event?: {
        id: string;
        title: string,
    },
    client?: {
        id: string;
        name: string,
    },
    employe?: {
        id: string;
        name: string,
    },
    recurrence?: {
        frequency: string,
        endDate: Date,
        occurrences: number
    },
}

export interface TransactionViewProps {
    type: string;
}

export interface AssignedTransactionViewProps {
    type: string;
    allTransactions: any[];
    entityName:string,
    entityID:string,
}

export interface TransactionFormProps {
    type?: string,
    entity?: string,
    entityName?: string,
    entityID?: string,
    action: string
}