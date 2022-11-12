<script setup lang="ts">
import TodoAdd from "@/components/TodoAdd.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import TodoList from "@/components/TodoList.vue";
import { nanoid } from 'nanoid'
import { ref,getCurrentInstance,computed,onMounted } from "vue";

// 定义一个数组来保存todo列表数据
let todos = ref([
    {
        id:nanoid(),
        state:false, 
        text:"todoItem1"
    },
    {
        id:nanoid(),
        state:true, 
        text:"todoItem2"
    },
    {
        id:nanoid(),
        state:true, 
        text:"todoItem3"
    },

])

// 点击添加待办事项的方法
const addTodo = (todo:{ id: string; state: boolean; text: string; }) => todos.value.unshift(todo);
onMounted(()=>{
    // 点击设置todo项的状态
    const { proxy } =getCurrentInstance() as any
    proxy.mittBus.on('changeTodoItemState', (todo:{ id: string; state: boolean; text: string; })=>{
        let id = todo.id
        todos.value.forEach(item => {
            if (item.id == id) {
                item.state = !item.state
            }
        });
    })
})

// 保存过滤选项的字段
let filter = ref('all')
let filteredTodos = computed(()=>{
    switch (filter.value) {
        case "done":
            return todos.value.filter((todo)=>todo.state)
        case "todo":
            return todos.value.filter((todo)=>!todo.state)
        default:
            return todos.value
    }
})



</script>

<template>
  <main>
        <div class="container">
            <!-- 头部区域 -->
            <h1>欢迎使用 Ling 待办事项!</h1>
            <!-- 日历区域后续添加 -->

            <!-- 添加待办事项区域 -->
            <TodoAdd @addTodo="addTodo"></TodoAdd>

            <!-- 筛选待办事项区域 -->
            <TodoFilter :selected = "filter" @changeFilter ="(newFilterValue)=>{filter = newFilterValue}"></TodoFilter>

            <!-- todolist 区域 -->
            <TodoList :todos = "filteredTodos"></TodoList>

        </div>
    </main>
</template>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Helvetica, "Ping Fang SC", "Microsoft Yahei", sans-serif;
}

main {
    width: 100vw;
    min-height: 100vh;
    display: grid;
    align-items: center;
    justify-items: center;
    background: rgb(203, 210, 240);
}

.container {
    width: 60%;
    max-width: 400px;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, .15);
    border-radius: 24px;
    padding: 48px 24px;
    background-color: rgb(245, 246, 252);
}

/* 标题区域 */
h1 {
    margin: 24px 0;
    font-size: 28px;
    color: #414873;
}

</style>
