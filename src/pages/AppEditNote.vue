<template lang="pug">
    div.edit-note-wrapper
        AppLink(
            :name="'Home'"
            :to="'/'"
            :onClick="handleHomeBtn"
        )
        div
            button.btn.btn--text(
                :class="undoBtnClass"
                @click="handleUndo"
            ) Undo
            button.btn.btn--text(
                :class="undoBtnClass"
                @click="handleDiscardModal"
            ) Discard
            button.btn.btn--text(
                :class="redoBtnClass"
                @click="handleRedo"
            ) Redo

        AppNoteTodos(
            :note="note"
            :inputID="'editedTodoDesc'"
            :onDelete="openDeleteModal"
        )
        button.btn.btn--confirm.btn--save(@click="save") Save

        AppConfirmModal(
            :isVisible="showHomeModal"
            :onClose="toggleHomeModal"
            :headerText="'You are about to leave the page'"
            :bodyText="'All your changes will be lost'"
            :confirmBtnName="'Go home'"
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
            :onConfirm="handleDiscardConfirm"
        )

        AppDeleteModal(
            :isVisible="showDeleteModal"
            :onClose="closeDeleteModal"
            :onDelete="handleDeleteTodo"
            :header="'todo'"
        )
</template>

<script>
import AppModal from '../components/modals/AppModal.vue'
import AppDeleteModal from '../components/modals/AppDeleteModal.vue'
import AppConfirmModal from '../components/modals/AppConfirmModal.vue'
import AppNoteTodos from '../components/AppNoteTodos.vue'
import AppLink from '../components/AppLink.vue'
import {
    EmptyNote,
    filteredNoteTodos,
    deepClone,
    disabledBtnClass,
    filterByID
} from '../assets/utils'

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
            redoStates: []
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
            return this.redoStates.length !== 0
                && this.note !== this.redoStates[this.redoStates.length - 1]
        },
        undoBtnClass() {
            return disabledBtnClass(!this.isUndoBtnEnabled)
        },
        redoBtnClass() {
            return disabledBtnClass(!this.isRedoBtnEnabled)
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
        handleDeleteTodo() {
            this.deleteTodo()
            this.closeDeleteModal()
        },
        deleteTodo() {
            this.note.todos = filterByID(this.note.todos, this.selectedTodoID)
        },
        updateRedoStates() {
            const lastState = this.noteStates.pop()
            this.redoStates.push(lastState)
        },
        handleUndo() {
            if (this.isUndoBtnEnabled)
                this.undo()
        },
        undo() {
            this.updateRedoStates()
            this.note = this.noteStates[this.noteStates.length - 1]
            this.noteStates.pop()
        },
        handleRedo() {
            if (this.isRedoBtnEnabled)
                this.redo()
        },
        redo() {
            this.note = this.redoStates.pop()
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
        handleDiscardConfirm() {
            this.discard()
            this.toggleDiscardModal()
        },
        discard() {
            this.updateRedoStates()
            const firstNote = this.noteStates[0]
            this.noteStates = []
            this.note = firstNote
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/mixins';

    .edit-note-wrapper {
        @include centeredContent;

        .btn--save {
            margin: 2vh 0 4vh;
        }
    }
</style>
