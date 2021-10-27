<template>
  <div class="create-box__navigation">
    <div class="create-box__navigation-step">
      <h3
        class="create-box__navigation-step-num"
        :class="step >= 1 ? 'create-box__navigation-step-num-active' : ''">
        1
      </h3>
      <h3
        class="create-box__navigation-step-text"
        :class="step >= 1 ? 'create-box__navigation-step-text-active' : ''">
        Create box
      </h3>
    </div>
    <div class="create-box__navigation-step">
      <h3
        class="create-box__navigation-step-num"
        :class="step >= 2 ? 'create-box__navigation-step-num-active' : ''">
        2
      </h3>
      <h3
        class="create-box__navigation-step-text"
        :class="step >= 2 ? 'create-box__navigation-step-text-active' : ''">
        Add logic
      </h3>
    </div>
    <div class="create-box__navigation-step">
      <h3
        class="create-box__navigation-step-num"
        :class="step === 3 ? 'create-box__navigation-step-num-active' : ''">
        3
      </h3>
      <h3
        class="create-box__navigation-step-text"
        :class="step === 3 ? 'create-box__navigation-step-text-active' : ''">
        Launch
      </h3>
    </div>
    <div class="create-box__navigation-line">
      <div class="create-box__navigation-line-active" :style="'width:' + activeLine + '%'"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: ['step'],
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
.create-box {
  &__navigation {
    width: 64.4rem;
    margin: 0 auto;
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
        padding: .8rem 1.4rem;
        border-radius: 50%;
        border: .1rem solid $border2;
        color: $border2;
        background: $white;
        &-active {
          border: .1rem solid $pink;
          color: $pink;
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
