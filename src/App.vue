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
          color: $btn-confirm-color;
        }
      }

      .btn {
        cursor: pointer;
        border: 1px solid $btn-border-color;
        font-size: 3vh;
        font-family: Arial, Helvetica, sans-serif;
        padding: 1.5vh 3vh;
        text-align: center;
        color: $main-text-color;
        background-color: $main-background-color;
        user-select: none;
        outline:none;

        &:hover {
          border-color: $btn-border-color;
          background-color: $btn-border-color;
          color: $main-background-color;
        }
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

      .btn--disabled {
        color: $btn-disabled-color;

        &:hover {
          color: $btn-disabled-color;
        }
      }

      .label {
        margin-bottom: 2px;
        display: block;
      }

      .text-input {
        width: 30vh;
        height: 3vh;
        font-size: 3vh;
        padding: 0.5vh;
        background-color: $main-background-color;
        border: 1px solid $main-text-color;
        outline: none;

        &:focus {
          background-color: $main-text-color;
          color: $main-background-color
        }
      }
    }
  }
</style>
