<template lang="pug">
  div#app
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
  @import './assets/scss/colors';
  @import './assets/scss/mixins';

  body {
    margin: 0;
    padding: 0;
    background-color: $main-background-color;
    color: $main-text-color;

    #app {
      @include centeredContent;
      font-family: monospace;

      .link {
        color: $link-primary-color;

        &:hover {
          color: $header-title-color;
        }
      }

      .btn {
        cursor: pointer;
        border: 1px solid $btn-border-color;
        padding: 7px;
        text-align: center;
        color: $main-text-color;
        background-color: $main-background-color;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &:hover {
          border-color: $btn-border-color;
          background-color: $btn-border-color;
          color: $main-background-color;
        }
      }
    }
  }
</style>
