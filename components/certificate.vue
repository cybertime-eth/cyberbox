<template>
    <div class="certificate__item collection__item">
        <img src="/more.png" alt="more" class="collection__item-more" v-if="owner">
        <div class="collection__item-image">
            <img :src="certificate.image" alt="item">
        </div>
        <div class="collection__item-info">
            <h2 class="collection__item-info-name">{{ certificateName }}</h2>
            <p class="collection__item-info-type">Price</p>
            <div class="collection__item-info-price" v-if="buyAvailable">
                <img src="/celo.svg" alt="celo">
                <h3 class="collection__item-info-price-text">{{ certificate.price }}</h3>
            </div>
            <p class="certificate__item-description" :class="{ 'not-sale': owner || !saleAvailable }" v-else>{{ certificateDescription }}</p>
            <button class="collection__item-info-details" @click="routeCertificate" v-if="owner">Details</button>
            <button class="collection__item-info-details buy" @click="routeCertificate" v-else-if="buyAvailable">Buy</button>
            <button class="collection__item-info-details offset" :class="{ disabled: certificate.future }" @click="routeCertificate" v-else-if="saleAvailable">Offset now</button>
        </div>
    </div>    
</template>

<script>
export default {
  props: ['certificate'],
  computed: {
	certificateName() {
	  return this.getCertificateName(this.certificate)
	},
    owner() {
      return this.$store.state.fullAddress === this.certificate.owner
	},
	priceVisible() {
      return this.certificate.price > 0
	},
	buyAvailable() {
      return !this.owner && this.certificate.price > 0
	},
	saleAvailable() {
	  return this.certificate.offset || this.certificate.future
	},
    certificateDescription() {
      return this.owner || !this.saleAvailable ? 'Not for sale' : '-'
    }
  },
  methods: {
    routeCertificate() {
	  if (this.certificate.future) return
	  if (this.certificate.current) {
		this.$router.push('/lending')
	  } else {
		this.$router.push(`/collections/CBCN/${this.certificate.contract_id}`)
	  }
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
	border-radius: 0.4rem;
	overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  &-description {
    font-size: 1.4rem;
    &.not-sale {
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
