<template lang="pug">
    div
        button(@click="addTodo") Add Todo
        div(v-for="(todo, i) in note.todos" :key="i")
            label(:for="`${inputID}${i}`") Todo Name
            input(v-model="todo.name" :id="`${inputID}${i}`")
            button(v-if="inputID === 'editedTodoDesc'" @click="onDelete(todo)") Delete
</template>

<script>
import { EmptyTodo } from '../assets/utils'

export default {
    name: 'AppNoteTodos',

    props: ['note', 'inputID', 'onDelete'],

    methods: {
        addTodo() {
            this.note.todos.push(new EmptyTodo())
        }
    }
}
</script>