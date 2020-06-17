<template lang="pug">
    transition(name="modal")
        div.modal
            div.modal__wrapper
                div.modal__wrapper__content
                    div.modal__wrapper__content__header
                        slot(name="header")
                    div.modal__wrapper__content__body
                        slot(name="body")
                    div.modal__wrapper__content__footer
                        slot(name="footer")
</template>

<script>
export default {
    name: 'AppModal',

    mounted() {
        document.addEventListener('keydown', e => {
            if (e.keyCode == 27)
                this.$emit('close')
        })
    }
}
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;

        &__wrapper {
            display: table-cell;
            vertical-align: middle;

            &__content {
                width: 300px;
                margin: 0px auto;
                padding: 20px 30px;
                background-color: #fff;
                border-radius: 2px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
                transition: all 0.3s ease;
                font-family: Helvetica, Arial, sans-serif;

                &__header {
                    margin-top: 0;
                }

                &__body {
                    margin-top: 20px;
                }

                &__footer {
                    margin-bottom: 20px;
                }
            }
        }
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }
</style>