<template lang="pug">
    div
        div.text-input-container(style="margin: 0 0 6vh")
            label.label(for="editedNoteTitle") Note Title
            input.text-input(v-model.lazy="note.title" id="editedNoteTitle")
        div.todo(v-for="(todo, i) in note.todos" :key="i")
            div.text-input-container
                label.label(:for="`${inputID}${i}`") Todo Name
                input.text-input(v-model.lazy="todo.name" :id="`${inputID}${i}`")
            div.todo__control(v-if="hasDeleteProp" style="display: flex")
                label.todo__checkbox-container
                    input.todo__checkbox-container__checkbox(
                        type="checkbox"
                        v-model.lazy="todo.isCompleted"
                    )
                    span.todo__checkbox-container__checkmark
                button.btn.btn--text(@click="onDelete(todo)") Delete
        button.btn.btn--add(v-if="canAddTodo" @click="addTodo") Add Todo
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

    .text-input-container {
        margin: 3vh 0;
    }

    .todo {
        margin-bottom: 20px;

        &__control {
            margin-top: 5px;
        }

        &__checkbox-container {
            display: block;
            position: relative;
            padding-left: 6vh;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            &__checkbox {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }

            &__checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 6.5vh;
                width: 6.5vh;
                background-color: #eee;

                &:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
            }

            &:hover &__checkbox ~ &__checkmark {
                background-color: $link-primary-color;
            }

            & &__checkbox ~ &__checkmark {
                background-color: $header-title-color;
            }

            & &__checkbox:checked ~ &__checkmark:after {
                display: block;
            }

            & &__checkmark:after {
                left: 2.4vh;
                top: 1.5vh;
                width: 1vh;
                height: 2vh;
                border: solid white;
                border-width: 0 0.5vh 0.5vh 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }
    }
</style>