<script setup lang='ts'>
import TodoListItem from './TodoListItem.vue';

let props = defineProps(['todos'])
</script>

<template>
    <div class="todoList">
        <TodoListItem v-for="todoItem in props.todos" :key="todoItem.id" :todoItem=todoItem></TodoListItem>
    </div>
</template>

<style  scoped>
.todoList {
    display: grid;
    row-gap: 14px;
}

</style>