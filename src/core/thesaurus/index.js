import store from '@/store/store'
import thesaurusStore from './store'

store.registerModule('thesaurus', thesaurusStore)

export {default as Thesaurus} from './Thesaurus'
