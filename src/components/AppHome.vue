<template lang="pug">
    div
        button(@click="showAddNoteModal = true") Add note modal
        div(v-for="(note, i) in notes" :key="i")
            p {{ note.title }}
            button(@click="openDeleteModal(note)") Delete Note
            div(v-for="(todo, i) in note.todos" :key="i")
                p {{ todo.name }}
                p {{ todo.isCompleted }}

        AppModal(v-if="showDeleteModal" @close="closeDeleteModal" @enter="deleteNote")
            h3(slot="header") Delete Note
            p(slot="body") Are you sure?
            div(slot="footer")
                button(@click="closeDeleteModal") Cancel
                button(@click="deleteNote") Delete

        AppModal(v-if="showAddNoteModal" @close="closeModal" @enter="closeModalAndSave")
            h3(slot="header") Add Note
            div(slot="body")
                label(for="newNoteTitle") Note Title
                input(v-model="newNote.title" id="newNoteTitle")
                button(@click="addTodo") Add Todo
                div(v-for="(todo, i) in newNote.todos" :key="i")
                    label(:for="`newTodoDesc${i}`") Todo Name
                    input(v-model="todo.name" :id="`newTodoDesc${i}`")
            div(slot="footer")
                button(@click="closeModal") Cancel
                button(@click="closeModalAndSave") Save
</template>

<script>
import AppModal from './AppModal.vue'
import { EmptyNote, EmptyTodo } from '../assets/utils'

export default {
    name: 'AppHome',

    components: { AppModal },

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
        this.$localStorage.remove('notes')
        const notes = JSON.parse(this.$localStorage.get('notes'))
        if (notes)
            this.notes = notes
    },

    methods: {
        addNote() {
            const filteredTodos = this.newNote.todos
                .filter(todo => /\S/.test(todo.name))
            this.newNote.todos = filteredTodos
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
        addTodo() {
            this.newNote.todos.push(new EmptyTodo())
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
            this.notes = this.notes.filter(note => note.id !== this.selectedNoteID)
            this.saveNotes()
            this.closeDeleteModal()
        }
    }
}
</script>
