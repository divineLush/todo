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

<style lang="scss" scoped>
    @import '../assets/scss/colors';

    .btn--link {
        color: $link-primary-color !important;
        text-decoration: underline;

        &:hover {
          color: $btn-confirm-color !important;
        }
    }
</style>