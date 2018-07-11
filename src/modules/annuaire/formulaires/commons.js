import recherche from '@/components/tools/recherche'

const DEFAULTS = {
    correspondant: {
        label: 'Nouveau correspondant',
        type_entite: 'correspondant',
        civilite: '',
        nom: '',
        prenom: '',
        fonction: '',
        adresse: '',
        adresse2: '',
        code_postal: '',
        telephone: '',
        mobile: '',
        email: '',
        observations: '',
        parents: [''],
        relations: ['']
    },
    commune: {
        label: 'Nouvelle commune',
        type_entite: 'commune',
        nom: '',
        adresse: '',
        adresse2: '',
        telephone: '',
        email: '',
        site_internet: '',
        observations: '',
        parents: [''],
        relations: ['']
    },
    entreprise: {
        label: 'Nouvelle entreprise',
        type_entite: 'entreprise',
        nom: '',
        adresse: '',
        adresse2: '',
        telephone: '',
        telephone2: '',
        mobile: '',
        nom_gerant: '',
        prenom_gerant: '',
        fonction_gerant: '',
        email: '',
        site_internet: '',
        observations: '',
        parents: [''],
        relations: ['']
    },
    entite: {
        label: 'Nouveau groupe',
        type_entite: 'entite',
        nom: '',
        observations: '',
        parents: [''],
        relations: ['']
    }
}

var FormMixin = {
    props: ['data'],
    components: {
        recherche
    },
    data () {
        return {
            recherche_url: 'http://devel.pnc.int:8000/annuaire/entites/',
            copy: ''
        }
    },
    methods: {
        save () {
            this.$emit('save', this.copy)
        },
        cancel () {
            this.$emit('cancel')
        },
        remove () {
            this.$emit('remove', this.copy)
        }
    },
    mounted () {
        this.copy = JSON.parse(JSON.stringify(this.data))
        if (!this.copy.parents.length) {
            this.copy.parents = ['']
        }
        if (!this.copy.relations.length) {
            this.copy.relations = ['']
        }
    },
    watch: {
        data () {
            this.copy = JSON.parse(JSON.stringify(this.data))
            if (!this.copy.parents.length) {
                this.copy.parents = ['']
            }
            if (!this.copy.relations.length) {
                this.copy.relations = ['']
            }
        }
    }
}

export {FormMixin, DEFAULTS}
