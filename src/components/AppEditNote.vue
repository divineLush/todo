<template lang="pug">
    div
        router-link.link(to="/") Home
        button.btn.btn--text(:class="{ 'btn--disabled': !isUndoBtnEnabled }" @click="undo") Undo
        button.btn.btn--text(:class="{ 'btn--disabled': !isRedoBtnEnabled }" @click="redo") Redo
        div.title-input-container
            label.label(for="editedNoteTitle") Note Title
            input.text-input(v-model.lazy="note.title" id="editedNoteTitle")
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
import { EmptyNote, filteredNoteTodos, deepClone } from '../assets/utils'

export default {
    name: 'AppEditNote',

    components: { AppDeleteModal, AppNoteTodos },

    data() {
        return {
            note: new EmptyNote(),
            showDeleteModal: false,
            selectedTodoID: null,
            noteStates: [],
            lastUndoState: null
        }
    },

    computed: {
        id() {
            return this.$route.params.id
        },
        isUndoBtnEnabled() {
            return this.noteStates.length > 1
        },
        isRedoBtnEnabled() {
            return this.lastUndoState !== null
        }
    },

    watch: {
        note: {
            handler(after, before) {
                const clone = deepClone(after)
                this.noteStates.push(clone)
            },
            deep: true
        }
    },

    mounted() {
        const note = JSON
            .parse(this.$localStorage.get('notes'))
            .find(note => note.id === this.id)

        if (note)
            this.note = note
        else
            this.navigateToHome()
    },

    methods: {
        navigateToHome() {
            this.$router.push('/').catch(err => {})
        },
        save() {
            this.note.todos = filteredNoteTodos(this.note)
            const notes = JSON.parse(this.$localStorage.get('notes'))
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].id === this.note.id) {
                    notes[i] = this.note
                    break
                }
            }
            this.$localStorage.set('notes', JSON.stringify(notes))
            this.navigateToHome()
        },
        openDeleteModal(todo) {
            this.showDeleteModal = true
            this.selectedTodoID = todo.id
        },
        closeDeleteModal() {
            this.showDeleteModal = false
        },
        deleteTodo() {
            this.note.todos = this.note.todos
                .filter(todo => todo.id !== this.selectedTodoID)
            this.closeDeleteModal()
        },
        undo() {
            if (this.isUndoBtnEnabled) {
                this.lastUndoState = this.noteStates.pop()
                this.note = this.noteStates[this.noteStates.length - 1]
            }
        },
        redo() {
            if (this.isRedoBtnEnabled)
                this.note = this.lastUndoState
        }
    }
}
</script>

<style scoped>
    .title-input-container {
        margin: 5px 0;
    }
</style>