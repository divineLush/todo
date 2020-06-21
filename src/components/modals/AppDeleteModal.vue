<template lang="pug">
    AppModal(
        :isVisible="isVisible"
        @close="onClose"
    )
        h3(slot="header") Delete {{ header }}
        p(slot="body") Are you sure?
        div(slot="footer")
            button.btn.btn--cancel(@click="onClose") Cancel
            button.btn.btn--confirm(@click="onDelete" style="margin-left: 3vh") Delete
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
