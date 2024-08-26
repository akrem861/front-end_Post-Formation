export interface Formateur {
    id: number;
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    telephone: string;
    specialites_name: string[];
    isValid: string;
    role: string[];
    permissions: string[];
  }