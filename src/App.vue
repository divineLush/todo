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
    font-size: 3vh;

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
        font-size: 3vh;
        padding: 1.5vh 3vh;
        text-align: center;
        color: $main-text-color;
        background-color: $main-background-color;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline:none;

        &:hover {
          border-color: $btn-border-color;
          background-color: $btn-border-color;
          color: $main-background-color;
        }
      }

      .btn--footer {
        margin: 0 5px;
      }

      .btn--cancel {
        @include customBtn($btn-cancel-color, $main-background-color);
      }

      .btn--confirm {
        @include customBtn($btn-confirm-color, $main-background-color);
      }

      .btn--add {
        @include customBtn($btn-add-color, $main-background-color);
        margin: 10px 0;
      }

      .btn--text {
        border: none;
        font-weight: bold;
        color: $btn-cancel-color;

        &:hover {
          background-color: $main-background-color;
          color: $btn-confirm-color;
        }
      }

      .label {
        margin-bottom: 2px;
        display: block;
      }
    }
  }
</style>
