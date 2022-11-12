<script setup lang='ts'>
import { ref } from 'vue';

let props = defineProps(['selected'])


const filters = [
    {label:"全部",value:"all"},
    {label:"已完成",value:"done"},
    {label:"未完成",value:"todo"}
]


</script>

<template>
    <div class="filters">
        <div class="filter" :class="{active:props.selected == filter.value}" v-for="filter in filters" :key="filter.value" @click="$emit('changeFilter',filter.value)"
        >{{filter.label}}
        </div>
    </div>
</template>

<style  scoped>
/* 筛选待办事项区域 */
.filters {
    display: flex;
    margin: 24px 2px;
    color: #c0c2ce;
}

.filters .filter {
    margin-right: 14px;
    transition: 0.8s;
    cursor: pointer;
}

.active {
    color: #6b729c;
    transition: scale(1.2);
}

</style>