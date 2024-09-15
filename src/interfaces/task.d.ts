export interface TaskDetailProps {
    title: string; // Titre de la tâche
    description?: string; // Description de la tâche (optionnel)
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled'; // Statut de la tâche
    dueDate?: Date; // Date limite (optionnel)
    assignedEmployee: string[];
    relatedProject?: string;
    importance:'Critical', 'High', 'Medium', 'Low', 'Very'
}

export interface TaskSimpleCardProp {
    title: string; // Titre de la tâche
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled'; // Statut de la tâche
    dueDate?: Date; // Date limite (optionnel)
    assignedEmployee?: string[];
    importance:'Critical', 'High', 'Medium', 'Low', 'Very'
}