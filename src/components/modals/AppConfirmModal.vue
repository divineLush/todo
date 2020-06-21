<template lang="pug">
     AppModal(:isVisible="isVisible" @close="onClose")
        h3.header-text(slot="header") {{ headerText }}
        p.body-text(slot="body") {{ bodyText }}
        div(slot="footer")
            div
                button.btn.btn--cancel(@click="onCancel") Cancel
                button.btn.btn--confirm(@click="onConfirm" style="margin-left: 3vh") {{ confirmBtnName }}
</template>

<script>
import AppModal from './AppModal.vue'

export default {
    name: 'AppConfirmModal',

    components: { AppModal },

    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        headerText: {
            type: String,
            default: ''
        },
        bodyText: {
            type: String,
            default: ''
        },
        confirmBtnName: {
            type: String,
            default: 'Confirm'
        },
        onCancel: {
            type: Function,
            required: true
        },
        onConfirm: {
            type: Function,
            required: true
        },
        onClose: {
            type: Function,
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins';

    .header-text {
        @include text-wrap;
    }

    .body-text {
        @include text-wrap;
    }
</style>
