<template>
    <div>
        <h1>{{data.label}}</h1>
        <table class="table fiche">
            <tr v-for="field in fields" :key="field.name">
                <th>{{field.label}}</th>
                <td v-if="field.type=='text'||field.type=='line'">{{data[field.name]}}</td>
                <td v-if="field.type=='mul'">
                    <ul class="list-unstyled">
                        <li v-for="line in field.refs" :key="line">{{data[line]}}</li>
                    </ul>
                </td>
                <td v-if="field.type=='mail'">
                    <a :href="'mailto:'+data[field.name]">{{data[field.name]}}</a>
                </td>
                <td v-if="field.type=='mul-mail'">
                    <ul class="list-unstyled">
                        <li v-for="line in field.refs" :key="line">
                            <a :href="'mailto:'+data[line]">{{data[line]}}</a>
                        </li>
                    </ul>
                </td>
                <td v-if="field.type=='www'">
                    <a :href="data[field.name]">{{data[field.name]}}</a>
                </td>
                <td v-if="field.type=='telephone'">{{data[field.name]|formatTelephone}}</td>
                <td v-if="field.type=='mul-tel'">
                    <ul class="list-unstyled">
                        <li v-for="line in field.refs" :key="line">{{data[line]|formatTelephone}}</li>
                    </ul>
                </td>
                <td v-if="field.type=='list'">
                    <ul class="list-unstyled">
                        <li v-for="item in data[field.name]" :key="item.id">
                            <router-link :to="{name: 'annuaire', query: {s: item.id, e: item.id}}">{{item.label}}</router-link>
                        </li>
                    </ul>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import {formatTelephone} from '@/commons'

export default {
    name: 'fiche',
    props: ['fields', 'data'],
    filters: {
        formatTelephone
    }
}
</script>
