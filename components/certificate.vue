<template>
    <div class="certificate__item collection__item" @click="routeCertificate">
        <img src="/more.png" alt="more" class="collection__item-more" v-if="owner">
        <div class="collection__item-image">
            <img :src="certificate.image" alt="item">
        </div>
        <div class="collection__item-info">
            <h2 class="collection__item-info-name">{{ certificate.name }}</h2>
            <p class="collection__item-info-type">Price</p>
            <div class="collection__item-info-price" v-if="buyAvailable">
                <img src="/celo.svg" alt="celo">
                <h3 class="collection__item-info-price-text">{{ certificate.price }}</h3>
            </div>
            <p class="certificate__item-description" :class="{ owned: owner }" v-else>{{ certificateDescription }}</p>
            <!-- <h3 class="collection__item-info-price-null">Not for sale</h3> -->
            <button class="collection__item-info-details" v-if="owner" @click="routeCertificate">Details</button>
            <button class="collection__item-info-details buy" v-else-if="buyAvailable">Buy</button>
            <button class="collection__item-info-details offset" :class="{ disabled: certificate.future }" v-else>Offset now</button>
        </div>
    </div>    
</template>

<script>
export default {
  props: ['certificate'],
  computed: {
    owner() {
      return this.$store.state.fullAddress === this.certificate.owner
    },
    certificateDescription() {
      return this.owner ? 'Not for sale' : '-'
    },
    buyAvailable() {
      return !this.owner && this.certificate.market_status === 'LISTED'
    }
  },
  methods: {
    routeCertificate() {
      if (this.certificate.future) return
      this.$router.push('/certificate/1')
    }
  }
}
</script>

<style lang="scss" scoped>
.certificate__item {
  height: 39.7rem;
  .collection__item-info-name {
    padding-bottom: 4rem;
    border-bottom: .1rem solid $modalColor;
  }
  .collection__item-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), linear-gradient(46.74deg, #365BE0 -17.17%, #D676CF 48.99%, #FFE884 113%);
    max-width: 20rem;
    img {
      max-width: 100%;
    }
  }
  &-description {
    font-size: 1.4rem;
    &.owned {
      color: $border;
    }
  }
  .collection__item-info-details {
    &.buy {
      background: $white;
      border: 1px solid $modalColor;
    }
    &.offset {
      background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
      color: $white;
      &.disabled {
        background: $white;
        pointer-events: none;
        border: 1px solid $modalColor;
        color: $border2;
      }
    }
  }
}
</style>
