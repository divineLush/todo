<template lang="pug">
    div
        button.btn(@click="addTodo") Add Todo
        div(v-for="(todo, i) in note.todos" :key="i")
            label(:for="`${inputID}${i}`") Todo Name
            input(v-model="todo.name" :id="`${inputID}${i}`")
            template(v-if="hasDeleteProp")
                input(type="checkbox" v-model="todo.isCompleted")
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