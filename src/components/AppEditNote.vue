<template lang="pug">
    div
        router-link(to="/") Home
        div
            label(for="editedNoteTitle") Note Title
            input(v-model="note.title" id="editedNoteTitle")
            button(@click="addTodo") Add Todo
            div(v-for="(todo, i) in note.todos" :key="i")
                label(:for="`editedTodoDesc${i}`") Todo Name
                input(v-model="todo.name" :id="`editedTodoDesc${i}`")
            button(@click="save") Save
</template>

<script>
import { EmptyNote, EmptyTodo, filteredNoteTodos } from '../assets/utils'
import { bus } from '../main'

export default {
    name: 'AppEditNote',

    data() {
        return {
            note: bus.selectedNote
        }
    },

    mounted() {
        if (bus.selectedNote)
            this.note = bus.selectedNote
        else
            this.navigateToHome()
    },

    methods: {
        navigateToHome() {
            this.$router.push('/').catch(err => {})
        },
        save() {
            this.note.todos = filteredNoteTodos(this.note)
            bus.$emit('editedNote', this.note)
            this.navigateToHome()
        },
        addTodo() {
            this.note.todos.push(new EmptyTodo())
        }
    }
}
</script>

<style lang="scss" scoped>

</style>