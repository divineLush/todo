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
        id() {
            return this.$route.params.id
        }
    },

    watch: {
        watchedTitle(after, before) {
            this.prevNoteTitle = before
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
            this.selectedTodo = todo
        },
        closeDeleteModal() {
            this.showDeleteModal = false
        },
        deleteTodo() {
            const notes = JSON.parse(this.$localStorage.get('notes'))
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].id === this.note.id) {
                    const filteredTodos = notes[i].todos
                        .filter(todo => todo.id !== this.selectedTodo.id)
                    notes[i].todos = filteredTodos
                    this.note.todos = filteredTodos
                    break
                }
            }
            this.$localStorage.set('notes', JSON.stringify(notes))
            this.closeDeleteModal()
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