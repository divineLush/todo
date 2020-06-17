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
        margin: 0;
        padding: 3vh 0;
        color: $header-title-color;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }
</style>