<template lang="pug">
    div.note-todos-wrapper
        div.text-input-container(style="margin: 0 0 6vh")
            label.label(for="editedNoteTitle") Note title
            input.text-input(v-model.lazy="note.title" id="editedNoteTitle")
        div.todo(v-for="(todo, i) in note.todos" :key="i")
            div.text-input-container
                label.label(:for="`${inputID}${i}`") Todo name
                input.text-input(v-model.lazy="todo.name" :id="`${inputID}${i}`")
            div.todo__control(v-if="hasDeleteProp" style="display: flex")
                label.todo__checkbox-container
                    input.todo__checkbox-container__checkbox(
                        type="checkbox"
                        v-model.lazy="todo.isCompleted"
                    )
                    span.todo__checkbox-container__checkmark
                button.btn.btn--text(@click="onDelete(todo)") Delete
        button.btn.btn--add(v-if="canAddTodo" @click="addTodo") Add todo
</template>

<script>
import { EmptyTodo } from '../assets/utils'

export default {
    name: 'AppNoteTodos',

    props: {
        note: {
            type: Object,
            required: true
        },
        inputID: {
            type: String,
            default: ''
        },
        onDelete: {
            type: Function,
            default: null
        }
    },

    computed: {
        hasDeleteProp() {
            return this.onDelete !== null
        },
        canAddTodo() {
            return (!this.hasDeleteProp && this.note.todos.length < 3) || this.hasDeleteProp
        }
    },

    methods: {
        addTodo() {
            if (this.canAddTodo)
                this.note.todos.push(new EmptyTodo())
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/colors';
    @import '../assets/scss/mixins';

    .text-input-container {
        margin: 3vh 0;
    }

    .note-todos-wrapper {
        @include centeredContent;
    }
</style>
