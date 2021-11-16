<template>
  <div class="history container-xl">
    <div class="history__header">
      <h3 class="history__header-text">Event</h3>
      <h3 class="history__header-text">Date</h3>
      <h3 class="history__header-text">From</h3>
      <h3 class="history__header-text">To</h3>
      <h3 class="history__header-text">Price</h3>
    </div>
    <div class="history__content">
      <div class="history__content-item">
        <h3 class="history__content-item-text">Listed</h3>
        <h3 class="history__content-item-text">2 month ago</h3>
        <h3 class="history__content-item-text"><img src="/default-avatar.png" alt="avatar">0xfh...09ad</h3>
        <h3 class="history__content-item-text"><img src="/default-avatar.png" alt="avatar">0xfh...09ad</h3>
        <h3 class="history__content-item-text">0,0024M SAVENFT</h3>
      </div>
      <div class="history__content-item">
        <h3 class="history__content-item-text">Listed</h3>
        <h3 class="history__content-item-text">2 month ago</h3>
        <h3 class="history__content-item-text"><img src="/default-avatar.png" alt="avatar">0xfh...09ad</h3>
        <h3 class="history__content-item-text"><img src="/default-avatar.png" alt="avatar">0xfh...09ad</h3>
        <h3 class="history__content-item-text">0,0024M SAVENFT</h3>
      </div>
      <div class="history__content-item">
        <h3 class="history__content-item-text">Listed</h3>
        <h3 class="history__content-item-text">2 month ago</h3>
        <h3 class="history__content-item-text"><img src="/default-avatar.png" alt="avatar">0xfh...09ad</h3>
        <h3 class="history__content-item-text"><img src="/default-avatar.png" alt="avatar">0xfh...09ad</h3>
        <h3 class="history__content-item-text">0,0024M SAVENFT</h3>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.history {
  box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
  &__header {
    width: 99.4%;
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 19rem 24rem 24.5rem 54.2rem 1fr;
    background: $modalColor;
    height: 6rem;
    align-items: center;
    padding-left: .8rem;
    &-text {
      font-family: OpenSans-SemiBold;
    }
  }
  &__content {
    &-item {
      width: 99.4%;
      display: grid;
      grid-template-columns: 19rem 24rem 24.5rem 43.6rem 1fr;
      align-items: center;
      padding-left: .8rem;
      height: 5.2rem;
      border-bottom: .1rem solid $modalColor;
      &-text {
        display: flex;
        align-items: center;
        img {
          padding-right: 1.5rem;
        }
        &:last-child {
          letter-spacing: 0.04em;
          font-family: OpenSans-SemiBold;
        }
      }
    }
  }
}
</style>
