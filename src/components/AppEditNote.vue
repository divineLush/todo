<template lang="pug">
    div
        router-link(to="/") Home
        div
            label(for="editedNoteTitle") Note Title
            input(v-model="note.title" id="editedNoteTitle")
            div
                button(@click="addTodo") Add Todo
                div(v-for="(todo, i) in note.todos" :key="i")
                    label(:for="`editedTodoDesc${i}`") Todo Name
                    input(v-model="todo.name" :id="`editedTodoDesc${i}`")
                    button(@click="openDeleteModal(todo)") Delete
                button(@click="save") Save

        AppModal(v-if="showDeleteModal" @close="closeDeleteModal" @enter="deleteTodo")
            h3(slot="header") Delete Todo
            p(slot="body") Are you sure?
            div(slot="footer")
                button(@click="closeDeleteModal") Cancel
                button(@click="deleteTodo") Delete
</template>

<script>
import AppModal from './AppModal.vue'
import { EmptyNote, EmptyTodo, filteredNoteTodos } from '../assets/utils'
import { bus } from '../main'

export default {
    name: 'AppEditNote',

    components: { AppModal },

    data() {
        return {
            note: bus.selectedNote,
            showDeleteModal: false,
            selectedTodo: null
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
        },
        toggleDeleteModal() {
            this.showDeleteModal = !this.showDeleteModal
        },
        openDeleteModal(todo) {
            this.showDeleteModal = true
            this.selectedTodo = todo
        },
        closeDeleteModal() {
            this.showDeleteModal = false
        },
        deleteTodo() {
            this.closeDeleteModal()
            this.navigateToHome()
            bus.$emit('deleteTodo', { todo: this.selectedTodo, note: this.note })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>