<template lang="pug">
    div.edit-note-wrapper
        AppLink(:name="'Home'" :to="'/'" :onClick="handleHomeBtn")
        div
            button.btn.btn--text(
                :class="{ 'btn--disabled': !isUndoBtnEnabled }"
                @click="undo"
            ) Undo
            button.btn.btn--text(
                :class="{ 'btn--disabled': !isRedoBtnEnabled }"
                @click="redo"
            ) Redo
            button.btn.btn--text(
                :class="{ 'btn--disabled': !isUndoBtnEnabled }"
                @click="handleDiscardModal"
            ) Discard
        AppNoteTodos(
            :note="note"
            :inputID="'editedTodoDesc'"
            :onDelete="openDeleteModal"
        )
        button.btn.btn--confirm(@click="save") Save

        AppConfirmModal(
            :isVisible="showHomeModal"
            :onClose="toggleHomeModal"
            :headerText="'You are about to leave the page'"
            :bodyText="'All your changes will be lost'"
            :confirmBtnName="'Go Home'"
            :onCancel="toggleHomeModal"
            :onConfirm="discardAndGoHome"
        )

        AppConfirmModal(
            :isVisible="showDiscardModal"
            :onClose="toggleDiscardModal"
            :headerText="'Discard changes'"
            :bodyText="'All your changes will be lost'"
            :confirmBtnName="'Discard'"
            :onCancel="toggleDiscardModal"
            :onConfirm="discard"
        )

        AppDeleteModal(
            :isVisible="showDeleteModal"
            :onClose="closeDeleteModal"
            :onDelete="deleteTodo"
            :header="'Todo'"
        )
</template>

<script>
import AppModal from '../components/modals/AppModal.vue'
import AppDeleteModal from '../components/modals/AppDeleteModal.vue'
import AppConfirmModal from '../components/modals/AppConfirmModal.vue'
import AppNoteTodos from '../components/AppNoteTodos.vue'
import AppLink from '../components/AppLink.vue'
import { EmptyNote, filteredNoteTodos, deepClone } from '../assets/utils'

export default {
    name: 'AppEditNote',

    components: {
        AppDeleteModal,
        AppModal,
        AppNoteTodos,
        AppLink,
        AppConfirmModal
    },

    data() {
        return {
            note: new EmptyNote(),
            showDeleteModal: false,
            showHomeModal: false,
            showDiscardModal: false,
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
                && this.note !== this.lastUndoState
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
                this.noteStates.pop()
            }
        },
        redo() {
            if (this.isRedoBtnEnabled)
                this.note = this.lastUndoState
        },
        handleHomeBtn() {
            if (!this.isUndoBtnEnabled)
                this.navigateToHome()
            else
                this.toggleHomeModal()
        },
        toggleHomeModal() {
            this.showHomeModal = !this.showHomeModal
        },
        discardAndGoHome() {
            this.toggleHomeModal()
            this.navigateToHome()
        },
        toggleDiscardModal() {
            this.showDiscardModal = !this.showDiscardModal
        },
        handleDiscardModal() {
            if (this.isUndoBtnEnabled)
                this.toggleDiscardModal()
        },
        discard() {
            this.lastUndoState = this.noteStates.pop()
            const firstNote = this.noteStates[0]
            this.noteStates = []
            this.note = firstNote
            this.toggleDiscardModal()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/mixins';

    .edit-note-wrapper {
        @include centeredContent;
    }
</style>
