<template lang="pug">
    div
        button(@click="showAddNoteModal = true") Add note modal

        AppModal(v-if="showAddNoteModal" @close="closeModal")
            h3(slot="header") Add Note
            div(slot="body")
                label(for="newNoteTitle") Note Title
                input(v-model="newNote.title" id="newNoteTitle")
                button(@click="addTodo") Add Todo
                div(v-for="todo in newNote.todos")
                    label(:for="`newTodoDesc`") Todo Name
                    input(v-model="todo.name" :id="`newTodoDesc`")
            div(slot="footer")
                button(@click="closeModal") Cancel
                button(@click="closeModalAndSave") Save

        div(v-for="(note, i) in notes" :key="i")
            p {{ note.title }}
            div(v-for="(todo, i) in note.todos" :key="i")
                p {{ todo.name }}
                p {{ todo.isCompleted }}
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
            newNote: new EmptyNote()
        }
    },

    mounted() {
        // this.$localStorage.remove('notes')
        const notes = JSON.parse(this.$localStorage.get('notes'))
        if (notes)
            this.notes = notes
    },

    methods: {
        addNote() {
            this.notes.push(this.newNote)
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
        }
    }
}
</script>
