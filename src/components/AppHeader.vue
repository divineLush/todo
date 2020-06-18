<template lang="pug">
    header.header
        h1.header__title Todo List
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/colors';

    .header {
        margin: 25px 0;

        &__title {
            text-align: center;
            margin: 0;
            font-size: 7vh;
            color: $header-title-color;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
        }
    }
</style>