<template lang="pug">
    div
        button(@click="addNote") Add note
        div(v-for="note in notes")
            p {{ note.title }}
            div(v-for="todo in note.todos")
                p {{ todo.name }}
                p {{ todo.isCompleted }}
</template>

<script>
export default {
    name: 'AppHome',

    data() {
        return {
            notes: []
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
