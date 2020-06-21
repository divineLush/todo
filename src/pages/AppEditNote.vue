<template lang="pug">
    div
        button.btn.btn--text.btn--link(@click="handleHomeBtn") Home
        button.btn.btn--text(
            :class="{ 'btn--disabled': !isUndoBtnEnabled }"
            @click="undo"
        ) Undo
        button.btn.btn--text(
            :class="{ 'btn--disabled': !isRedoBtnEnabled }"
            @click="redo"
        ) Redo
        AppNoteTodos(
            :note="note"
            :inputID="'editedTodoDesc'"
            :onDelete="openDeleteModal"
        )
        button.btn.btn--confirm(@click="save") Save

        AppModal(
            :isVisible="showDiscardModal"
            @close="toggleDiscardModal"
        )
            h3(slot="header") Discard changes
            p(slot="body") All your changes will be lost
            div(slot="footer")
                div
                    button.btn.btn--cancel(@click="toggleDiscardModal") Cancel
                    button.btn.btn--confirm(@click="discard" style="margin-left: 3vh") Discard

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
import AppNoteTodos from '../components/AppNoteTodos.vue'
import { EmptyNote, filteredNoteTodos, deepClone } from '../assets/utils'

export default {
    name: 'AppEditNote',

    components: {
        AppDeleteModal,
        AppModal,
        AppNoteTodos
    },

    data() {
        return {
            note: new EmptyNote(),
            showDeleteModal: false,
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
                this.toggleDiscardModal()
        },
        toggleDiscardModal() {
            this.showDiscardModal = !this.showDiscardModal
        },
        discard() {
            this.toggleDiscardModal()
            this.navigateToHome()
        }
    }
}
</script>
