export interface IPayment {
    amount: number; // Montant payé
    date: Date; // Date du paiement
    type: 'Initial' | 'Milestone' | 'Final'; // Type de paiement
    client: string; 
    project: string; 
}