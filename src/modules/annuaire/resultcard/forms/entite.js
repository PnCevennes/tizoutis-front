import baseForm from './baseForm'
import baseCfg from './baseCfg'

const config = [{
    label: 'informations',
    fields: [
        {
            name: 'id',
            type: 'hidden'
        },
        {
            name: 'nom',
            label: 'Nom',
            type: 'line'
        },
        ...baseCfg
    ]
}]

export default {
    name: 'entiteForm',
    extends: baseForm,
    data () {
        return {config}
    }
}
