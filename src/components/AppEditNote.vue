<template lang="pug">
    div
        router-link.link(to="/") Home
        button.btn.btn--text(@click="undo") Undo
        button.btn.btn--text(@click="redo") Redo
        div.title-input-container
            label.label(for="editedNoteTitle") Note Title
            input(v-model.lazy="note.title" id="editedNoteTitle")
        AppNoteTodos(
            :note="note"
            :inputID="'editedTodoDesc'"
            :onDelete="openDeleteModal"
        )
        button.btn.btn--confirm(@click="save") Save

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
            prevNoteTitle: '',
            redoNoteTitle: null,
            showDeleteModal: false,
            selectedTodo: null,
        }
    },

    computed: {
        watchedTitle() {
            return this.note.title
        },
    },

    watch: {
        watchedTitle(after, before) {
            this.prevNoteTitle = before
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
        },
        undo() {
            this.redoNoteTitle = this.note.title
            this.note.title = this.prevNoteTitle
        },
        redo() {
            if (this.redoNoteTitle)
                this.note.title = this.redoNoteTitle
        }
    }
}
</script>

<style scoped>
    .title-input-container {
        margin: 5px 0;
    }
</style>