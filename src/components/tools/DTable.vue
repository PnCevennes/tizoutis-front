<template>
    <div>
        <div class="table-toolbox" v-if="config.limit">
            <button class="btn btn-xs btn-default" type="button" :disabled="currentPage==0" @click="currentPage--">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </button>
            <div class="aff">page {{currentPage+1}} sur {{nbPages+1}}</div>
            <button class="btn btn-xs btn-default" type="button" :disabled="currentPage==nbPages" @click="currentPage++">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </button>
        </div>
        <table class="dyntable">
            <tr class="header">
                <th v-for="col in config.fields" :key="col.name" @click="setSortKey(col.name)">
                    <div>
                        {{col.label}}
                        <span class="glyphicon glyphicon-triangle-bottom pull-right" v-if="sortKey==col.name && sortOrder==1"></span>
                        <span class="glyphicon glyphicon-triangle-top pull-right" v-else-if="sortKey==col.name && sortOrder==2"></span>
                        <span class="glyphicon glyphicon-minus pull-right" v-else></span>
                    </div>
                </th>
            </tr>
            <tr class="filters">
                <td v-for="col in config.fields" :key="col.name">
                    <div v-if="!col.noFilter">
                        <input type="text" v-model="filters[col.name]" />
                    </div>
                </td>
            </tr>
            <tr v-for="(item, $index) in filteredData"
                :key="$index"
                :class="config.lineStyle(item)"
                @click="select(item)"
                >
                <td v-for="col in config.fields" :key="col.name">{{col.transform ? col.transform(item[col.name]) : item[col.name]}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
const filterFuncs = {
    strStart: (filters, key) => (line) => line[key] && line[key].toLowerCase().startsWith(filters[key].toLowerCase()),
    strContains: (filters, key) => (line) => line[key] && line[key].toLowerCase().indexOf(filters[key].toLowerCase()) > -1
}
export {filterFuncs}

const DynTable = {
    name: 'DTable',
    props: ['config', 'value'],
    data () {
        return {
            filters: {},
            sortKey: '',
            sortOrder: 0,
            currentPage: 0
        }
    },
    computed: {
        nbPages () {
            var nbPages = Math.floor(this.rawFilteredData.length / this.config.limit)
            return nbPages
        },
        rawFilteredData () {
            var data = [...this.value]
            var ffunc
            // Filter
            this.config.fields.map(cfg => {
                if (this.filters[cfg.name]) {
                    if (cfg.filterFunc) {
                        ffunc = filterFuncs[cfg.filterFunc](this.filters, cfg.name)
                    } else {
                        ffunc = filterFuncs.strStart(this.filters, cfg.name)
                    }
                    data = data.filter(ln => ffunc(ln))
                }
            })
            // Sort
            if (this.sortOrder) {
                data = data.sort((x, y) => {
                    if (!x[this.sortKey]) {
                        return 1
                    }
                    if (!y[this.sortKey]) {
                        return -1
                    }
                    return x[this.sortKey] > y[this.sortKey]
                })
                if (this.sortOrder === 2) {
                    data = data.reverse()
                }
            }
            return data
        },
        filteredData () {
            if (this.config.limit) {
                return this.rawFilteredData.slice(
                    this.currentPage * this.config.limit,
                    (this.currentPage + 1) * this.config.limit
                )
            } else {
                return this.rawFilteredData
            }
        }
    },
    methods: {
        setSortKey (colname) {
            if (this.sortKey !== colname) {
                this.sortKey = colname
                this.sortOrder = 1
            } else {
                this.sortOrder = (this.sortOrder + 1) % 3
            }
        },
        select (item) {
            this.$emit('select', item)
        }
    }
}
export {DynTable, DynTable as default}
</script>
<style>
.table-toolbox {
    display: flex;
    padding-bottom: 3px;
    border-bottom: 1px solid #CCC;
    margin-bottom: 3px;
}
.table-toolbox .aff {
    text-align: center;
    flex: 5;
}
.header th {
    min-width: 15em;
}

</style>
