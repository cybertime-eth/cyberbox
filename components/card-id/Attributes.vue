<template>
  <div class="attributes container-xl">
    <div class="attributes__block">
      <div class="attributes__block-header">
        <h3 class="attributes__block-header-title">Attributes <span>6</span></h3>
        <img
          class="attributes__block-header-image"
          src="/attr-array.svg" alt="array"
          :class="showLeftAttributes ? 'array-down' : 'array-up'"
          @click="showLeftAttributes ? showLeftAttributes = false : showLeftAttributes = true"
        >
      </div>
      <div class="attributes__block-content" v-if="showLeftAttributes">
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Smelliness</h3>
          <h3 class="attributes__block-content-item-subtitle">Juicy</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Sounddrop</h3>
          <h3 class="attributes__block-content-item-subtitle">Drop</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Flush Feel</h3>
          <h3 class="attributes__block-content-item-subtitle">Turtle</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Body</h3>
          <h3 class="attributes__block-content-item-subtitle">Smelly Valentine</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Face</h3>
          <h3 class="attributes__block-content-item-subtitle">Casual</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Prop</h3>
          <h3 class="attributes__block-content-item-subtitle">Horns</h3>
        </div>
      </div>
    </div>
    <div class="attributes__block">
      <div class="attributes__block-header">
        <h3 class="attributes__block-header-title">Attributes <span>3</span></h3>
        <img
          class="attributes__block-header-image"
          src="/attr-array.svg" alt="array"
          :class="showRightAttributes ? 'array-down' : 'array-up'"
          @click="showRightAttributes ? showRightAttributes = false : showRightAttributes = true"
        >
      </div>
      <div class="attributes__block-content" v-if="showRightAttributes">
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Owned by</h3>
          <h3 class="attributes__block-content-item-subtitle">0x21ef...26c7</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Token ID</h3>
          <h3 class="attributes__block-content-item-subtitle"># 9197342973o48 <img src="/copy.svg" alt="copy"></h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Contract Address</h3>
          <h3 class="attributes__block-content-item-subtitle">0xda6d...0ca6 <img src="/send.svg" alt="send"></h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showLeftAttributes: true,
      showRightAttributes: true,
    }
  }
}
</script>
<style lang="scss">
.attributes {
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
  &__block {
    padding: 1.7rem 1.6rem .5rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    border-radius: .4rem;
    height: 100%;
    width: 61.7rem;
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1rem;
      &-title {
        font-family: OpenSans-SemiBold;
        span {
          margin-left: 1rem;
          background: $border;
          color: $white;
          border-radius: 50%;
          padding: .2rem .7rem;
          font-size: 1.4rem;
        }
      }
      &-image {
        width: 2.1rem;
        cursor: pointer;
      }
    }
    &-content {
      transition: 1s;
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 2.6rem;
        &-title {
          font-family: OpenSans-Bold;
        }
        &-subtitle {
          font-family: OpenSans-Regular;
          display: flex;
          align-items: center;
          img {
            padding-left: 1rem;
            width: 2rem;
          }
        }

        &:nth-child(1) {
          padding-top: 2.5rem;
        }
      }
    }
  }
}
.array-up {
  transform: rotate(180deg);
  transition: .3s;
}
.array-down {
  transform: rotate(0deg);
  transition: .3s;
}
</style>
