<script setup lang='ts'>
import { nanoid } from 'nanoid'
import { ref } from "vue";
import { todoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";

let { selectedTime } = storeToRefs(todoStore()) as any;

const emit = defineEmits(['addTodo'])


let text = ref("")  // 存储输入框的输入值的字段
// 点击添加待办事项的函数
const addTodo = ()=>{
    // 收集todo信息
    let newTodoItem = {
        id:nanoid(),
        state:false,
        date:selectedTime.value,
        text:text.value
    }
    emit('addTodo', newTodoItem)
    text.value = ''
}
</script>

<template>
    <div class="input-add">
        <input type="text" v-model.value="text">
        <button  @click="addTodo">
            +
        </button>
    </div>
</template>

<style scoped>
/* 添加待办事项区域 */
.input-add {
    position: relative;
    display: flex;
    align-items: center;
}

.input-add input {
    padding: 16px 53px 16px 18px;
    width: 100%;
    height: 50px;
    color: 16px;
    font-size: 16px;
    /* 这是用来设置获取焦点时候的外边线*/
    outline: none;
    border: none;
    border-radius: 50px;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, .08);
}

.input-add button {
    position: absolute;
    right: 0;
    top: 0;

    height: 50px;
    width: 50px;

    line-height: 50px;
    font-size: 40px;
    text-align: center;
    color: aliceblue;

    outline: none;
    border-radius: 50px;
    border: none;
    background: linear-gradient(#c9a5f3, #7f95f7)
}


</style>