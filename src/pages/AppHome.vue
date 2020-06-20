<template lang="pug">
    div.home
        button.btn.btn--add(@click="showAddNoteModal = true") Add note
        div.home__note(v-for="(note, i) in filteredNotes" :key="i")
            div.home__note__header
                p.home__note__header__title {{ note.title }}
            div.home__note__todo-wrapper
                p.home__note__todo-wrapper__todo(
                    v-for="(todo, i) in note.todos" :key="i"
                ) {{ todo.name }}
            div.home__note__control
                button.btn.btn--text(@click="openDeleteModal(note)") Delete Note
                router-link.link(:to="`/edit/${note.id}`")
                    span Edit Note

        AppModal(
            v-if="showAddNoteModal"
            @close="closeAddModal"
        )
            h3(slot="header") Add Note
            div(slot="body")
                AppNoteTodos(:note="newNote" :inputID="'newTodoDesc'")
            div(slot="footer")
                div
                    button.btn.btn--cancel(@click="closeAddModal") Cancel
                    button.btn.btn--confirm(@click="closeAddModalAndSave" style="float: right") Save

        AppDeleteModal(
            :isVisible="showDeleteModal"
            :onClose="closeDeleteModal"
            :onDelete="deleteNote"
            :header="'Note'"
        )
</template>

<script>
import AppModal from '../components/modals/AppModal.vue'
import AppDeleteModal from '../components/modals/AppDeleteModal.vue'
import AppNoteTodos from '../components/AppNoteTodos.vue'
import { EmptyNote, filteredNoteTodos, deepClone } from '../assets/utils'

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

    computed: {
        filteredNotes() {
            const filteredNotes = deepClone(this.notes)
            for (let i = 0; i < filteredNotes.length; i++) {
                filteredNotes[i].todos = filteredNotes[i].todos
                    .filter(todo => !todo.isCompleted)
            }
            return filteredNotes
        }
    },

    watch: {
        notes() {
            this.saveNotes()
        }
    },

    mounted() {
        const notes = JSON.parse(this.$localStorage.get('notes'))
        if (notes)
            this.notes = notes
    },

    methods: {
        addNote() {
            this.newNote.todos = filteredNoteTodos(this.newNote)
            this.notes.push(this.newNote)
            this.newNote = new EmptyNote()
        },
        saveNotes() {
            const notes = JSON.stringify(this.notes)
            this.$localStorage.set('notes', notes)
        },
        closeAddModal() {
            this.showAddNoteModal = false
            this.newNote = new EmptyNote()
        },
        closeAddModalAndSave() {
            this.addNote()
            this.closeAddModal()
        },
        
        // I know duplicating code is a bad idea,
        // but manipulating the state of the parent component 
        // by mutating props is considered an anti-pattern in Vue,
        // so I would rather leave it as it is
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
            this.closeDeleteModal()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/mixins';
    @import '../assets/scss/colors';

    .home {
        @include centeredContent;

        &__note {
            margin: 2vh 0;
            border: 0.6vh dotted $btn-add-color;
            padding: 2vh;

            &__header {
                @include centeredContent;

                &__title {
                    @include text-wrap;
                    font-weight: bold;
                    margin: 0;
                }
            }

            &__todo-wrapper {
                margin: 2.5vh 0;

                &__todo {
                    @include centeredContent;
                    @include text-wrap;
                    margin: 1vh 0;
                }
            }

            &__control {
                @include centeredContent;

                .btn {
                    padding-top: 0 !important;
                }
            }
        }
    }
</style>
