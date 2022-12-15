<template>
    <div class="box__item" @click="$emit('click')">
        <img class="box__item-cover" :src="box.boxCoverImage">
        <div class="box__item-logoblock">
            <!-- <p class="box__item-logoblock-title">{{ box.boxAutorTitle }}</p> -->
            <img class="box__item-logoblock-img" :src="box.boxImage">
        </div>
        <div class="box__item-info">
            <p class="box__item-info-name">{{ box.boxName }}</p>
            <div class="box__item-info-sale">
                <p class="box__item-info-name status public">PUBLIC SALE</p>
                <!-- <p class="box__item-info-sale-time">08:00 pm, 1 oct.</p> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['box']
}
</script>

<style lang="scss" scoped>
.box__item {
  position: relative;
  height: 28.5rem;
  border-radius: 0.8rem;
  cursor: pointer;
  &-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    object-fit: cover;
  }
  &-logoblock {
    display: flex;
    align-items: center;
    position: absolute;
    top: 1.6rem;
    right: 0.8rem;
    &-title {
      background: rgba(31, 41, 55, 0.25);
      padding: 0.4rem 0.8rem;
      margin-right: 0.8rem;
      border-radius: 2.6rem;
      max-width: 8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 1.4rem;
      color: $white;
    } 
    &-img {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
    }
  }
  &-info {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 7.1rem;
    background: linear-gradient(180deg, rgba(44, 44, 44, 0.31) 0%, rgba(0, 0, 0, 0.4) 100%);
    backdrop-filter: blur(2.5px);
    padding: 1.2rem 1.6rem;
    border-radius: 0 0 0.8rem 0.8rem;
    &-name {
      font-family: OpenSans-Bold;
      font-weight: 700;
      font-size: 1.8rem;
      color: $white;
      &.public {
        color: $green;
      }
    }
    &-sale {
      text-align: right;
      &-time {
        background: rgba(0, 0, 0, 0.38);
        margin-top: 0.8rem;
        padding: 0.4rem 0.8rem;
        border-radius: 0.4rem;
        font-family: OpenSans-SemiBold;
        font-weight: 600;
        font-size: 1.4rem;
        color: $white;
      }
    }
  }

  @media (max-width: 460px) {
    height: 20.4rem;
    margin-top: 1.6rem;
    &:first-child {
      margin: 0;
    }
    &-logoblock {
      &-title {
        font-size: 1rem;
      }
      &-img {
        width: 2.8rem;
        height: 2.8rem;
      }
    }
    &-info {
      height: 6.4rem;
      padding: 1.2rem 0.8rem;
      &-name {
        font-size: 1.6rem;
        &.status {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>


