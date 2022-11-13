import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const todoStore = defineStore({
    id: 'todo',
    state: () => {
        return {
            todos: [
                {
                    id: nanoid(),
                    date: "Thu Nov 17 2022",
                    state: false,
                    text: "快来添加一个todo吧！"
                }
            ],
            selectedTime: String
        }
    },
    getters: {

    },
    actions: {

    },
    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'todos',
                storage: localStorage,
            }
        ]
    }
})
