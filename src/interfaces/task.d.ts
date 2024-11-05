import { UseDroppableArguments } from "@dnd-kit/core";

export interface TaskDetailProps {
    id?: BaseKey | undefined,
    title: string; // Titre de la tâche
    description?: string; // Description de la tâche (optionnel)
    status: 'unassigned' | 'todo' | 'pending' | 'in-progress' | 'completed' | 'cancelled'; // Statut de la tâche
    dueDate?: Date; // Date limite (optionnel)
    assignedEmployees?: Array | undefined;
    relatedProject?: Array | undefined;
    importance: 'Critical', 'High', 'Medium', 'Low', 'Very'
}

export interface KabanColumnProps {
    id: string;
    title: string; // Titre de la tâche
    onAddClick?: (args: { id: string }) => void;
    data?: UseDroppableArguments['data'];
    count: number;
    description: string
}

export interface TaskSimpleCardProp {
    id: string;
    title: string; // Titre de la tâche
    dueDate?: string; // Date limite (optionnel)
    assignedEmployees?: {
        id?: BaseKey | undefined,
        name: string,
        gender: string,
    }[];
    importance: 'Critical' | 'High' | 'Medium' | 'Low' | 'Very';
    status: 'unassigned' | 'todo' | 'pending' | 'in-progress' | 'completed' | 'cancelled'; // Statut de la tâche
}

export interface TasksProp {
    _id: BaseKey | undefined,
    title: string; // Titre de la tâche
    dueDate?: string; // Date limite (optionnel)
    assignedEmployees?: {
        id?: BaseKey | undefined,
        name: string,
        gender: string,
    }[];
    importance: 'Critical' | 'High' | 'Medium' | 'Low' | 'Very';
    status: 'unassigned' | 'todo' | 'pending' | 'in-progress' | 'completed' | 'cancelled'; // Statut de la tâche
}


export interface TaskGroup {
    [key: string]: TasksProp[];
}

export interface TaskFormProps {
    errors:FieldErrors<FieldValues>;
    isSubmitting: boolean;
    open: boolean;
    onClose: () => void;
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}