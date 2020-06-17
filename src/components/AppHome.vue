<template lang="pug">
    div
        button.btn(@click="showAddNoteModal = true") Add note modal
        div(v-for="(note, i) in notes" :key="i")
            p {{ note.title }}
            button.btn(@click="openDeleteModal(note)") Delete Note
            router-link.link(:to="`/edit/${note.id}`")
                span(@click="handleEditNote(note)") Edit Note
            div(v-for="(todo, i) in note.todos" :key="i")
                p {{ todo.name }}

        AppModal(
            v-if="showAddNoteModal"
            @close="closeModal"
            @enter="closeModalAndSave"
        )
            h3(slot="header") Add Note
            div(slot="body")
                label(for="newNoteTitle") Note Title
                input(v-model="newNote.title" id="newNoteTitle")
                AppNoteTodos(:note="newNote" :inputID="'newTodoDesc'")
            div(slot="footer")
                button.btn(@click="closeModal") Cancel
                button.btn(@click="closeModalAndSave") Save

        AppDeleteModal(
            :isVisible="showDeleteModal"
            :onClose="closeDeleteModal"
            :onDelete="deleteNote"
            :header="'Note'"
        )
</template>

<script>
import AppModal from './modals/AppModal.vue'
import AppDeleteModal from './modals/AppDeleteModal.vue'
import AppNoteTodos from './AppNoteTodos.vue'
import { EmptyNote, filteredNoteTodos } from '../assets/utils'
import { bus } from '../main'

export default {
    name: 'AppHome',

    components: { AppModal, AppDeleteModal, AppNoteTodos },

    data() {
        return {
            notes: [],
            showAddNoteModal: false,
            showDeleteModal: false,
            newNote: new EmptyNote(),
            selectedNoteID: null
        }
    },

    mounted() {
        // this.$localStorage.remove('notes')
        const notes = JSON.parse(this.$localStorage.get('notes'))
        if (notes)
            this.notes = notes

        bus.$on('editedNote', editedNote => {
            let note = this.notes
                .find(note => note.id === editedNote.id)
            if (typeof note !== 'undefined') {
                note = editedNote
                this.saveNotes()
            }
        })

        bus.$on('deleteTodo', data => this.deleteTodo(data))
    },

    methods: {
        addNote() {
            this.newNote.todos = filteredNoteTodos(this.newNote)
            this.notes.push(this.newNote)
            this.newNote = new EmptyNote()
            this.saveNotes()
        },
        saveNotes() {
            const notes = JSON.stringify(this.notes)
            this.$localStorage.set('notes', notes)
        },
        closeModal() {
            this.showAddNoteModal = false
            this.newNote = new EmptyNote()
        },
        closeModalAndSave() {
            this.addNote()
            this.closeModal()
        },
        openDeleteModal(note) {
            this.showDeleteModal = true
            this.selectedNoteID = note.id
        },
        closeDeleteModal() {
            this.showDeleteModal = false
            this.selectedNoteID = null
        },
        deleteNote() {
            this.notes = this.notes
                .filter(note => note.id !== this.selectedNoteID)
            this.saveNotes()
            this.closeDeleteModal()
        },
        handleEditNote(note) {
            bus.setSelectedNote(note)
        },
        deleteTodo(data) {
            const filteredTodos = data.note.todos
                .filter(todo => todo.id !== data.todo.id)
            const editedNote = this.notes
                .find(note => note.id === data.note.id)
            if (typeof editedNote !== 'undefined') {
                editedNote.todos = filteredTodos
                this.saveNotes()
            }
        }
    }
}
</script>
