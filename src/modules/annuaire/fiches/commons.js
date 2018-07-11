const SCHEMAS = {
    commune: [
        {name: 'adresse', label: 'Adresse', type: 'mul', refs: ['adresse', 'adresse2']},
        {name: 'code_postal', label: 'Code postal', type: 'line'},
        {name: 'telephone', label: 'Téléphone', type: 'telephone'},
        {name: 'email', label: 'Adresse e-mail', type: 'mail'},
        {name: 'site_internet', label: 'Site internet', type: 'www'},
        {name: 'observations', label: 'Observations', type: 'text'},
        {name: 'parents', label: 'Groupes', type: 'list'},
        {name: 'relations', label: 'Éléments rattachés', type: 'list'}
    ],
    correspondant: [
        {name: 'civilite', label: 'Civilité', type: 'line'},
        {name: 'fonction', label: 'Fonction', type: 'line'},
        {name: 'adresse', label: 'Adresse', type: 'mul', refs: ['adresse', 'adresse2']},
        {name: 'code_postal', label: 'Code postal', type: 'line'},
        {name: 'telephone', label: 'Téléphone', type: 'telephone'},
        {name: 'mobile', label: 'Mobile', type: 'telephone'},
        {name: 'email', label: 'Adresse e-mail', type: 'mail'},
        {name: 'observations', label: 'Observations', type: 'text'},
        {name: 'parents', label: 'Groupes', type: 'list'},
        {name: 'relations', label: 'Éléments rattachés', type: 'list'}
    ],
    entreprise: [
        {name: 'adresse', label: 'Adresse', type: 'mul', refs: ['adresse', 'adresse2']},
        {name: 'code_postal', label: 'Code postal', type: 'line'},
        {name: 'telephone', label: 'Téléphone', type: 'mul-tel', refs: ['telephone', 'telephone2']},
        {name: 'mobile', label: 'Mobile', type: 'telephone'},
        {name: 'nom_gerant', label: 'Nom du gérant', type: 'line'},
        {name: 'prenom_gerant', label: 'Prénom du gérant', type: 'line'},
        {name: 'fonction_gerant', label: 'Fonction du gérant', type: 'line'},
        {name: 'email', label: 'Adresse e-mail', type: 'mul-mail', refs: ['email', 'alt_email']},
        {name: 'site_internet', label: 'Site internet', type: 'www'},
        {name: 'observations', label: 'Observations', type: 'text'},
        {name: 'parents', label: 'Groupes', type: 'list'},
        {name: 'relations', label: 'Éléments rattachés', type: 'list'}
    ],
    entite: [
        {name: 'observations', label: 'Observations', type: 'text'},
        {name: 'parents', label: 'Groupes', type: 'list'},
        {name: 'relations', label: 'Éléments rattachés', type: 'list'}
    ]
}

export {SCHEMAS}
