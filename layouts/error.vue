<template>
  <section id="error">
    <div class="error">
      <img src="/animation/404.gif" alt="404">
      <h1 class="error__title">This page is lost.</h1>
      <h2 class="error__subtitle">This is probably a very interesting page, but unfortunately we did not find it.</h2>
      <nuxt-link to="/">
        <button class="gradient-button error__button">Navigate back home</button>
      </nuxt-link>
    </div>
  </section>
</template>
<style lang="scss">
#error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}
.error {
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 38.2rem;
  }
  &__title {
    position: relative;
    top: -7rem;
  }
  &__subtitle {
    position: relative;
    top: -5.5rem;
    text-align: center;
    width: 50rem;
    letter-spacing: 0.03em;
  }
  &__button {
    width: 21.8rem;
    height: 5.4rem;
    top: -2rem;
    cursor: pointer;
  }
}
</style>
