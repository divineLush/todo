<template lang="pug">
    button.btn.btn--text.btn--link(@click="handleClick") {{ name }}
</template>

<script>
export default {
    name: 'AppLink',

    props: {
        name: {
            type: String,
            required: true
        },
        to: {
            type: String,
            default: '/'
        },
        onClick: {
            type: Function,
            default: null
        }
    },

    methods: {
        handleClick() {
            if (this.onClick !== null)
                this.onClick()
            else
                this.$router.push(this.to).catch(err => {})
        }
    }
}
</script>
