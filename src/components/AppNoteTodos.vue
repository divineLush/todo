<template lang="pug">
    div
        button.btn.btn--add(@click="addTodo") Add Todo
        div.todo(v-for="(todo, i) in note.todos" :key="i")
            label.label(:for="`${inputID}${i}`") Todo Name
            input(v-model="todo.name" :id="`${inputID}${i}`")
            template(v-if="hasDeleteProp")
                input.todo__checkbox(type="checkbox" v-model="todo.isCompleted")
                button.btn(@click="onDelete(todo)") Delete
</template>

<script>
import { EmptyTodo } from '../assets/utils'

export default {
    name: 'AppNoteTodos',

    props: {
        note: {
            type: Object,
            required: true
        }, 
        inputID: {
            type: String,
            default: ''
        }, 
        onDelete: {
            type: Function,
            default: null
        }
    },

    computed: {
        hasDeleteProp() {
            return this.onDelete !== null
        }
    },

    methods: {
        addTodo() {
            this.note.todos.push(new EmptyTodo())
        }
    }
}
</script>

<style lang="scss" scoped>
    .todo {
        margin-bottom: 20px;

        &__checkbox {
            margin: 0 7px;
        }
    }
</style>