<script setup lang="ts">
import TodoAdd from "@/components/TodoAdd.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import TodoList from "@/components/TodoList.vue";
import { todoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";
import { ref,getCurrentInstance,computed,onMounted,toRaw,onUpdated,onBeforeMount} from "vue";

// // 定义一个数组来保存todo列表数据,数据来自本地存储
let { todos,selectedTime } = storeToRefs(todoStore()) as any;

// 点击添加待办事项的方法
const addTodo = (todo:{ id: string; state: boolean; date:String;text: string; }) => {todos.value.unshift(todo);console.log(todo);
}

onMounted(()=>{
    // 点击设置todo项的状态
    const { proxy } =getCurrentInstance() as any
    proxy.mittBus.on('changeTodoItemState', (todo:{ id: string; state: boolean; text: string; })=>{
        let id = todo.id
        todos.value.forEach((item: { id: string; state: boolean; }) => {
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
            return todos.value.filter((todo: { state: any; date:string})=>todo.state&&todo.date==selectedTime.value)
        case "todo":
            return todos.value.filter((todo: { state: any; date:string})=>!todo.state&&todo.date==selectedTime.value)
        default:
            return todos.value.filter((todo: { state: any; date:string})=> todo.date==selectedTime.value)
    }
})

// 点击删除键删除对应的 otdo
onMounted(()=>{
    const { proxy } =getCurrentInstance() as any
    proxy.mittBus.on('deleteTodo', (todo:{ id: string; state: boolean; text: string; })=> {
    todos.value.forEach((item: { id: string; },index: any)=>{
        if(item.id == todo.id){
            todos.value.splice(index,1)
        }
    })
})
})

// 日历组件相关的字段
const deteValue = ref(new Date())
selectedTime.value = computed(()=>{
    // 保存选中的时间的字段
    console.log(deteValue.value.toString().slice(0,15));
    return deteValue.value.toString().slice(0,15)
})
</script>

<template>
  <main>
        <div class="container">
            <!-- 头部区域 -->
            <h1>欢迎使用待办事项!</h1>
            <!-- 日历区域后续添加 -->
            <el-calendar v-model="deteValue" class="calendar" />
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

/* 日历区域 */
.calendar {
    height: 350px;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow-y: scroll;
}
.calendar /deep/  .el-calendar-table .el-calendar-day{
    width: 60px;
    height: 40px;
  }
</style>
