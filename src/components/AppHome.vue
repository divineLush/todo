<template lang="pug">
    div
        button(@click="addNote") Add note
        button(@click="showModal = true") Add note modal
        AppModal(v-if="showModal" @close="showModal = false")
            h3(slot="header") Add Note
            div(slot="body")
                input(v-model="newNote.title")
        div(v-for="note in notes")
            p {{ note.title }}
            div(v-for="todo in note.todos")
                p {{ todo.name }}
                p {{ todo.isCompleted }}
</template>

<script>
import AppModal from './AppModal.vue'

export default {
    name: 'AppHome',

    components: { AppModal },

    data() {
        return {
            notes: [],
            showModal: false,
            newNote: {}
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
            const note = {
                title: 'title',
                todos: [
                    {
                        name: '1',
                        isCompleted: false
                    },
                    {
                        name: '2',
                        isCompleted: true
                    }
                ]
            }
            this.notes.push(note)
            this.saveNotes()
        },
        saveNotes() {
            const notes = JSON.stringify(this.notes)
            this.$localStorage.set('notes', notes)
        }
    }
}
</script>
