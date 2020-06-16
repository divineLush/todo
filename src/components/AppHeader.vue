<template lang="pug">
    header
        h1.header-title Todo List
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/colors';

    .header-title {
        text-align: center;
        padding: 3vh 0;
        background-color: $header-background;
        color: $header-title-color;
    }
</style>