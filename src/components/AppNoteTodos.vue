<template lang="pug">
    div
        button.btn.btn--add(@click="addTodo") Add Todo
        div.todo(v-for="(todo, i) in note.todos" :key="i")
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
        }
    },

    methods: {
        addTodo() {
            this.note.todos.push(new EmptyTodo())
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/colors';

    .todo {
        margin-bottom: 20px;

        &__control {
            margin-top: 5px;
        }

        &__checkbox-container {
            display: block;
            position: relative;
            padding-left: 35px;
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
                height: 31px;
                width: 31px;
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
                left: 12px;
                top: 7px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }
    }
</style>