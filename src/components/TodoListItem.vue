<script setup lang='ts'>
import { ref } from 'vue';
import {getCurrentInstance} from "vue";

const props = defineProps(['todoItem'])

// 全局事件总线，更改todoItem的状态
const { proxy } = getCurrentInstance() as any
const changeState =(todoItem:{ id: string; state: boolean; text: string; })=>{
    proxy.mittBus.emit('changeTodoItemState',todoItem)
}

const clickDeleteTodoBtn = (todoItem:{ id: string; state: boolean; text: string; })=>{
    proxy.mittBus.emit('deleteTodo',todoItem)
}
</script>

<template>
   <div class="todoItem" >
        <label for="" :class="{state: props.todoItem.state}">
            <input type="checkbox" :checked="props.todoItem.state"> {{props.todoItem.text}}
            <span class="check-button" @click="changeState(props.todoItem)"></span>
            <button @click="clickDeleteTodoBtn(props.todoItem)">删除</button>
        </label>
    </div>
</template>

<style scoped>
.todoItem {
    padding: 16px;
    color: #626262;
    border-radius: 8px;
    background-color: #fff;
}

.todoItem label {
    position: relative;
    display: flex;
}

.state{
    text-decoration: line-through;
    font-style: italic;
}

.todoItem label span.check-button {
    position: absolute;
    top: 2px;
}

.todoItem label span.check-button::before,
.todoItem label span.check-button::after {
    content: "";
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
}

.todoItem label span.check-button::before {
    border: 1px solid #b382f9;
}

.todoItem label span.check-button::after {
    transition: 0.4s;
    background: #b383f9;
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0;
}

.todoItem label input {
    margin-right: 16px;
    opacity: 0;
}

/* input为:checked状态的兄弟元素透明度为1 */
.todoItem input:checked+span.check-button::after {
    opacity: 1;
}

button {
    position: absolute;
    right: 0;
    width: 3rem;
    height: 2rem;
    line-height: 2rem;
    color: #939393;
    border: 0;
    border-radius: 10px;
}
</style>