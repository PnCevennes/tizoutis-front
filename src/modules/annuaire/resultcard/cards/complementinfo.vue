<template>
    <div>
        <h5 class="showbtn" @click="visible=!visible">
            <span class="glyphicon" :class="{'glyphicon-menu-down': !visible, 'glyphicon-menu-up': visible}"></span>
        </h5>
        <div class="compVisible" v-show="visible">
            <slot></slot>
            <div class="compInfo" v-if="value.observations">
                <h5>Observations</h5>
                <div>{{value.observations}}</div>
            </div>
            <div class="compInfo" v-if="value.parents && value.parents.length">
                <h5>Groupes</h5>
                <div class="inline" :key="item.id" v-for="item in value.parents">
                    <router-link :to="{name: 'annuaire', query: {s: item.id}}">{{item.label}}</router-link>
                </div>
            </div>
            <div class="compInfo" v-if="value.relations && value.relations.length">
                <h5>Relations</h5>
                <div class="inline" :key="item.id" v-for="item in value.relations">
                    <router-link :to="{name: 'annuaire', query: {s: item.id}}">{{item.label}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'complementinfo',
    props: ['value'],
    data () {
        return {
            visible: false
        }
    }
}
</script>
<style scoped>
.showbtn {
    border-radius: 0 0 3px 3px;
    margin: 3px -5px -5px -5px;
    background-color: #EEE;
    color: #AAA;
    text-align: center;
}

.compVisible {
    margin-top: 10px;
}

.compInfo {
    margin-top: 10px;
}

</style>
