<template>
    <div class="modal">
        <div class="modal__confirm">
            <h3 class="modal__confirm-title" v-html="title"></h3>
            <div class="modal__confirm-buttons">
                <button class="modal__confirm-buttons-button" @click="$emit('close')">Back</button>
                <button class="modal__confirm-buttons-button confirm" @click="$emit('confirm')">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="scss" scoped>
  .modal {
    &__confirm {
      width: 39rem;
      background: $white;
      padding: 5.2rem 1.6rem 2.4rem;
      border-radius: 9px;
      box-shadow: 0px 5px 20px rgb(0 0 0 / 25%);
      &-title {
        text-align: center;
        font-size: 1.6rem;
      }
      &-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 3.2rem;
        &-button {
          width: 18.8rem;
          height: 4.8rem;
          background: $white;
          margin-right: 1.6rem;
          border: 1px solid $border;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1.6rem;
          &.confirm {
            margin: 0;
            border-color: $pink;
            color: $pink;
          }
        }
      }
      @media(max-width: 460px) {
        width: 27.2rem;
        &-buttons {
          &-button {
            width: 12.8rem;
          }
        }
      }
    }
  }
</style>

