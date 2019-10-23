<template>
    <div>
        <button type="button" class="btn btn-primary" @click="opened=!opened">Types <span class="glyphicon" :class="{'glyphicon-triangle-right': !opened, 'glyphicon-triangle-bottom': opened}"></span></button>
        <div class="clickout" v-if="opened" @click="opened=false"></div>
        <div class="TSmenu" :class="{'sopened': opened, 'sclosed': !opened}">
        <ul>
            <li v-for="item in types" :key="item.id">
                <label>
                    <input class="cb" type="checkbox" v-model="checked[item.id]" @change="check(item.id)"/> <span class="cbl">{{item.label}}</span>
                </label>
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'typeSelect',
    data () {
        return {
            opened: false,
            checked: {}
        }
    },
    computed: {
        types () {
            return this.$store.getters['typeMateriel/getList']
        }
    },
    methods: {
        check (evt) {
            this.$emit('checked', Object.keys(this.checked).filter(x => this.checked[x]))
        }
    }
}
</script>
<style scoped>
.TSmenu {
    position: absolute;
    display: block;
    padding: 2px;
    background-color: white;
    z-index: 100;
    box-shadow: 1px 1px 5px #888;
}
.sclosed {
    opacity: 0;
    height: 0;
    width: 0;
    z-index: -10;
}
.sopened {
    height: auto;
    width: auto;
    opacity: 1;
    transition: opacity 0.2s linear;
}
.TSmenu ul {
    list-style-type: none;
    padding: 0;
}
.TSmenu li {
    padding: 3px;
}
.TSmenu li:hover {
    background-color: #EFEFEF;
}
.clickout {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 80;
}
.cb {
    display: none;
}
.cbl {
    display: block;
}
.TSmenu .cb:checked ~ .cbl {
    color: green;
}
</style>
