<template>
    <div>
        <h1 class="titlebar">Matériel</h1>
        <div class="general-content">
            <tabs class="main">
                <tab title="Matériel">
                    <div class="types-main">
                        <materiel-list ref="matlst" class="lst" @selected="matSelect($event)" />
                        <materiel-form ref="matfrm" class="frm" @canceled="matCanceled" />
                    </div>
                </tab>
                <tab title="Types">
                    <div class="types-main">
                        <type-materiel-list ref="typelst" class="lst" @selected="typeSelect($event)" />
                        <type-materiel-form ref="typefrm" class="frm" @saved="typeSaved" @canceled="typeCanceled" />
                    </div>
                </tab>
            </tabs>
        </div>
    </div>
</template>
<script>
import {Tabs, Tab} from 'uiv'
import {AuthMixin} from '@/core/mixins'
import {typeMaterielForm, typeMaterielList} from './typeMateriel/'
import {materielForm, materielList} from './materiel/'

export default {
    name: 'materiel',
    props: {
        query: {default: null}
    },
    components: {
        Tabs,
        Tab,
        typeMaterielForm,
        typeMaterielList,
        materielForm,
        materielList
    },
    mixins: {AuthMixin},
    data () {
        return {
            groupAdmin: 'tizoutis-informatique'
        }
    },
    methods: {
        typeSelect (data) {
            this.$refs.typefrm.value = data
        },
        typeSaved (data) {
            this.$refs.typelst.update()
        },
        typeCanceled () {
            this.$refs.typelst.deselect()
        },
        matSelect (data) {
            this.$refs.matfrm.value = data
        },
        matCanceled () {
            this.$refs.matlst.deselect()
        }
    },
    mounted () {},
    beforeRouteUpdate (to, from, next) {
        next()
    }
}
</script>
<style scoped>
.main {
    width: 100%;
}
.types-main {
    width: 100%;
    display: flex;
}
.types-main .lst {
    padding: 5px;
    flex: 1;
}
.types-main .frm {
    padding: 5px;
    flex: 1;
}
</style>
