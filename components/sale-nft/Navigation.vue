<template>
  <div class="nft__navigation">
    <div class="nft__navigation-step">
      <div
        class="nft__navigation-step-num"
        :class="step === 1 ? 'nft__navigation-step-num-active' : step > 1 ? 'nft__navigation-step-num-done' : ''">
        <img src="/done.svg" alt="done" v-if="step > 1">
        <h3 v-else>1</h3>
      </div>
      <h3
        class="nft__navigation-step-text"
        :class="step >= 1 ? 'nft__navigation-step-text-active' : ''">
        Sell price
      </h3>
    </div>
    <div class="nft__navigation-step" v-if="!changeInfo">
      <div
        class="nft__navigation-step-num"
        :class="step === 2 ? 'nft__navigation-step-num-active' : step > 2 ? 'nft__navigation-step-num-done' : ''">
        <img src="/done.svg" alt="done" v-if="step > 2">
        <h3 v-else>2</h3>
      </div>
      <h3
        class="nft__navigation-step-text"
        :class="step >= 2 ? 'nft__navigation-step-text-active' : ''">
        Approve
      </h3>
    </div>
    <div class="nft__navigation-step">
      <div
        class="nft__navigation-step-num"
        :class="step === 3 ? 'nft__navigation-step-num-active' : step > 3 ? 'nft__navigation-step-num-done' : ''">
        <img src="/done.svg" alt="done" v-if="step > 3">
        <h3 v-else>{{ changeInfo ? '2' : '3' }}</h3>
      </div>
      <h3
        class="nft__navigation-step-text"
        :class="step >= 3 ? 'nft__navigation-step-text-active' : ''">
        Sign
      </h3>
    </div>
    <div class="nft__navigation-line">
      <div class="nft__navigation-line-active" :style="'width:' + activeLine + '%'"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['step', 'changeInfo'],
  computed: {
    activeLine() {
      switch (this.step) {
        case 1: return 0;
        case 2: return 50;
        case 3: return 100;
      }
    }
  }
}
</script>
<style lang="scss">
.nft {
  &__navigation {
    width: 52rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 3.8rem;
    position: relative;
    &-step {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &-num {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        border: .1rem solid $border2;
        background: $white;
        display: flex;
        align-items: center;
        justify-content: center;
        h3 {
          color: $border2;
        }
        &-active {
          background: $white;
          border: .1rem solid $pink;
          h3 {
            color: $pink;
          }
        }
        &-done {
          background: $pink;
          border: none;
        }
        img {
          width: 1.8rem;
        }
      }
      &-text {
        color: $border2;
        letter-spacing: 0.03em;
        padding-top: 2rem;
        &-active {
          color: $pink;
        }
      }
    }
    &-line {
      position: absolute;
      top: 5.7rem;
      width: 95%;
      height: .2rem;
      background: $border2;
      z-index: 1;
      &-active {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: .2rem;
        background: $pink;
      }
    }
  }
}
</style>
