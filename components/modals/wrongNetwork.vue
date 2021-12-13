<template>
  <div class="modal">
    <div class="modal__wrong">
      <img src="/loading-button.svg" alt="load" class="modal__wrong-load">
      <h2 class="modal__wrong-title">Wrong network</h2>
      <h3 class="modal__wrong-subtitle">Change network to Celo</h3>
      <button class="modal__wrong-button" @click="logout">Sign out</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
  &__wrong {
    position: relative;
    padding: 3.2rem 1.6rem 2.4rem;
    background: $white;
    border-radius: .8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-load {
      width: 6.4rem;
      height: 6.4rem;
      animation: loading 1s infinite;
    }
    &-title {
      padding-top: 4.8rem;
    }
    &-subtitle {
      padding-top: 1.2rem;
    }
    &-button {
      width: 45rem;
      height: 4.8rem;
      margin-top: 3.2rem;
      background: $white;
      border: .1rem solid $border;
    }
  }
}
</style>
