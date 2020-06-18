<template lang="pug">
    AppModal(
        v-if="isVisible"
        @close="onClose"
        @enter="onDelete"
    )
        h3(slot="header") Delete {{ header }}
        p(slot="body") Are you sure?
        div(slot="footer")
            button.btn.btn--cancel(@click="onClose") Cancel
            button.btn.btn--confirm(@click="onDelete") Delete
</template>

<script>
import AppModal from './AppModal'

export default {
    name: 'AppDeleteModal',

    components: { AppModal },

    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        onClose: {
            type: Function,
            required: true
        },
        onDelete: {
            type: Function,
            required: true
        },
        header: {
            type: String,
            required: true
        }
    }
}
</script>