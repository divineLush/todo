<template lang="pug">
    div
        router-link.link(to="/") Home
        div
            label(for="editedNoteTitle") Note Title
            input(v-model="note.title" id="editedNoteTitle")
            AppNoteTodos(
                :note="note"
                :inputID="'editedTodoDesc'"
                :onDelete="openDeleteModal"
            )
            button.btn(@click="save") Save

        AppDeleteModal(
            :isVisible="showDeleteModal"
            :onClose="closeDeleteModal"
            :onDelete="deleteTodo"
            :header="'Todo'"
        )
</template>

<script>
import AppDeleteModal from './modals/AppDeleteModal.vue'
import AppNoteTodos from './AppNoteTodos.vue'
import { EmptyNote, filteredNoteTodos } from '../assets/utils'
import { bus } from '../main'

export default {
    name: 'AppEditNote',

    components: { AppDeleteModal, AppNoteTodos },

    data() {
        return {
            note: new EmptyNote(),
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
            bus.$emit('deleteTodo', { todo: this.selectedTodo, note: this.note })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>