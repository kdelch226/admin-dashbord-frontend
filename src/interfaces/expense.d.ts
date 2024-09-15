export interface IExpense {
    amount: number; // Montant de la dépense
    date: Date; // Date de la dépense
    description: string; // Description de la dépense
    category: 'Salaires' | 'Frais généraux' | 'Matériel' | 'Autre'; // Catégorie de la dépense
    project?: string;
    event?: string; 
}
