<template lang="pug">
  section#app
    AppHeader
    main
      router-view
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'app',
  components: { AppHeader }
}
</script>

<style lang="scss">
  @import './assets/scss/main';
</style>
