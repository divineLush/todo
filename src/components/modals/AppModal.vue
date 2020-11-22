<template lang="pug">
    transition(v-if="isVisible" name="modal")
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

    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },

    mounted() {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 27 && this.isVisible)
                this.$emit('close')
        })
    }
}
</script>
