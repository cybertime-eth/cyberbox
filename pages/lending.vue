<template>
    <section id="lending">
        <div class="lending">
            <div class="lending__block">
                <client-only>
                    <div class="lending__block-info-name" v-if="isMobile()">
                        <img src="/plant.svg" alt="plant">
                        <p class="lending__block-info-name-value">NFT Carbon Offset Certificate</p>
                    </div>
                </client-only>
                <div class="lending__block-summary">
                    <p class="lending__block-summary-date">{{ currentDate }}</p>
                    <img class="lending__block-summary-img" src="/carbon.svg" alt="certificate">
                </div>
                <div class="lending__block-info">
                    <client-only>
                        <div class="lending__block-info-name" v-if="!isMobile()">
                            <img src="/plant.svg" alt="plant">
                            <p class="lending__block-info-name-value">NFT Carbon Offset Certificate</p>
                        </div>
                    </client-only>
                    <p class="lending__block-info-description">The NFT certificate confirms your contribution the regeneration of nature you carbon negative status</p>
                    <client-only>
                        <p class="lending__block-info-refi" v-if="!isMobile()">NFT = 1 ton of CO2 offsetting</p>
                    </client-only>
                    <div class="lending__block-info-price">
                        <div class="lending__block-info-price-detail">
                            <div class="lending__block-info-price-detail-celo">
                                <img src="/celo.svg" alt="celo">
                                <p class="lending__block-info-price-detail-celo-value">{{ certificate.price }}</p>
                            </div>
                            <p class="lending__block-info-price-detail-value">Price (${{ priceToken }})</p>
                        </div>
                        <button class="lending__block-info-price-buy" @click="clickBuyToken" v-if="!bought">Buy Now</button>
                    </div>
                </div>
            </div>
            <div class="lending__list">
                <div class="lending__collection">
                    <h2 class="lending__title">Collect the  entire  collection  in a  year and get a bonus NFT</h2>
                    <h2 class="lending__collection-description">Participate every  month or buy a certificate once at the end of the year</h2>
                    <div class="lending__collection-list">
                        <div class="lending__collection-item" :key="idx" v-for="(certificate, idx) of certificateList">
                            <p class="lending__collection-item-date">{{ certificateName(certificate) }}</p>
                            <div class="lending__collection-item-box" :class="{owned: certificate.owner || (!certificate.offset && !certificate.future)}">
                                <img class="lending__collection-item-box-img" :src="certificate.image" alt="certificate">
                                <img class="lending__collection-item-box-checked" src="/checked-circle.svg" alt="checkmark" v-if="certificateOwner(certificate)">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lending__market">
                    <h2 class="lending__title">NFT Carbon Offset certificate can be gifted or sold on the secondary market</h2>
                    <div class="lending__market-items">
                        <div class="lending__market-items-item">
                            <div class="lending__market-items-item-img-box">
                                <img class="lending__market-items-item-img" src="/carbon-substract.svg" alt="substract">
                            </div>
                            <p class="lending__market-items-item-description">100% verification of your carbon negative status</p>
                        </div>
                        <div class="lending__market-items-item">
                            <div class="lending__market-items-item-img-box">
                                <img class="lending__market-items-item-img" src="/carbon-unique.svg" alt="unique">
                            </div>
                            <p class="lending__market-items-item-description">Unique art that changes every month</p>
                        </div>
                        <div class="lending__market-items-item">
                            <div class="lending__market-items-item-img-box">
                                <img class="lending__market-items-item-img" src="/carbon-coffee.svg" alt="coffee">
                            </div>
                            <p class="lending__market-items-item-description">The price of an NFT certificate is like a few cups of coffee</p>
                        </div>
                        <div class="lending__market-items-item">
                            <div class="lending__market-items-item-img-box">
                                <img class="lending__market-items-item-img" src="/carbon-valora.svg" alt="valora">
                            </div>
                            <p class="lending__market-items-item-description">Can be purchased with a credit card the Valora app</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lending__guide">
                <h2 class="lending__title">How it’s works?</h2>
                <client-only>
                    <img src="/carbon-diagram.svg" alt="diagram" v-if="!isMobile()">
                    <img src="/carbon-diagram-mobile.svg" alt="diagram" v-else>
                </client-only>
            </div>
            <div class="lending__faq">
                <h2 class="lending__title">FAQ</h2>
                <div class="lending__faq-list">
                    <div class="lending__faq-item">
                        <div class="lending__faq-item-info">
                            <h3 class="lending__faq-item-info-title">How i can buy by credit card?</h3>
                            <p class="lending__faq-item-info-description">By recording all data and transactions on the blockchain, we achieve a level of transparency never before seen in the forestation industry.</p>
                        </div>
                        <button class="lending__faq-item-dropdown">
                            <img src="/attr-array.svg" alt="down">
                        </button>
                    </div>
                    <div class="lending__faq-item">
                        <div class="lending__faq-item-info">
                            <h3 class="lending__faq-item-info-title">How i can buy by credit card?</h3>
                        </div>
                        <button class="lending__faq-item-dropdown">
                            <img src="/attr-array.svg" alt="down">
                        </button>
                    </div>
                </div>
            </div>
            <div class="lending__buy">
                <client-only>
                    <img class="lending__buy-bg" src="/certificate-offset-bg.png" alt="background" v-if="!isMobile()">
                    <img class="lending__buy-bg" src="/certificate-offset-mobile-bg.png" alt="background" v-else>
                </client-only>
                <h2 class="lending__title">Get your NFT Carbon Offset Certificate</h2>
                <button class="lending__buy-btn" :class="{disabled: bought}" @click="clickBuyToken">Buy Now</button>
            </div>
            <div class="lending__footer">
                <p class="lending__footer-description">Supported & Powered by</p>
                <client-only>
                    <img src="/certificate-support.svg" alt="support" v-if="!isMobile()">
                    <img src="/certificate-support-mobile.svg" alt="support" v-else>
                </client-only>
            </div>
        </div>
        <BuyToken v-if="showBuyToken" :nft="certificate" :priceToken="priceToken" :balance="balance" @closeModal="closeModal"/>
        <SuccessfullBuy v-if="showSuccessModal" :image="certificate.image" :name="certificate.name" :certificate="true"/>
    </section>
</template>

<script>
import BuyToken from '@/components/modals/buyToken'
import SuccessfullBuy from '@/components/modals/successBuy'
import { mont } from 'bn.js';
export default {
  components: {
    BuyToken,
    SuccessfullBuy
  },
  data() {
    return {
      certificateList: [],
      showBuyToken: false,
      certificate: {},
      balance: 0,
      celoPrice: 0,
      priceToken: 0,
      bought: false
    }
  },
  computed: {
    address() {
      return this.$store.state.address
    },
    currentDate() {
      const today = new Date()
      const month = today.toLocaleString('en-us', { month: 'long' })
      return `${month} ${today.getFullYear()}`
    },
    ownedCertificates() {
	  return this.$store.state.certificateList
	},
    showSuccessModal() {
      return this.$store.state.successBuyToken
    }
  },
  created() {
    const today = new Date()
    const currMonth = today.getMonth()
    const month = today.toLocaleString('en-us', { month: 'long' })
    this.certificate = {
      name: `Carbon Offset Certificate ${month} ${today.getFullYear()}`,
      contract: 'certificate',
      image: '/carbon.svg',
      price: 0.01,
      nftid: currMonth + 1,
      refiOffset: 0.01 * 25 / 1000 * this.$store.state.cMCO2Price
    }
    this.certificateList = this.getCertificatesOfYear(new Date().getFullYear())
    this.loadMyCertificates()
  },
  async mounted() {
    this.updateCertificateList()
    await this.loadBalance()
  },
  watch: {
    address() {
      if (this.$store.state.address) {
        if (this.certificateList.length === 0) {
          this.updateCertificateList()
        }
        
        if (!this.balance) {
          this.loadBalance()
          if (!this.$store.state.buyTokenApproved) {
            this.$store.dispatch('checkBuyTokenApproved', this.certificate.price)
          }
        }
      }
    },
    ownedCertificates() {
	  this.updateCertificateList()
	},
    showSuccessModal() {
      if (this.$store.state.successBuyToken) {
        this.showBuyToken = false
      } else {
        this.loadMyCertificates()
      }
    }
  },
  methods: {
    certificateName(certificate) {
      return this.getCertificateName(certificate)
    },
    certificateOwner(certificate) {
      return certificate.owner === this.$store.state.fullAddress
    },
    async loadBalance() {
      if (this.$store.state.address) {
        this.balance = await this.$store.dispatch('getBalance')
      }
      const price = await this.$store.dispatch('getPriceToken')
      this.celoPrice = price.value
      this.priceToken = (price.value * this.certificate.price).toFixed(2)
    },
    loadMyCertificates() {
      this.$store.dispatch('getCertificates')
    },
    updateCertificateList() {
      if (!this.address) return
      const today = new Date()
      const newList = JSON.parse(JSON.stringify(this.certificateList))
      newList.forEach((item, index) => {
        const foundIndex = this.ownedCertificates.findIndex(oItem => oItem.year === item.year && oItem.month === item.month )
        if (foundIndex >= 0) {
          const newItem = this.ownedCertificates[foundIndex]
          newList[index] = newItem
          if (newItem.year === today.getFullYear() && newItem.month === today.getMonth() + 1) {
            this.bought = true
          }
        }
      })
      this.certificateList = newList
    },
    clickBuyToken() {
      this.showBuyToken = true
      this.$store.commit('setNewNft', {
        ...this.certificate,
        price: this.certificate.price * 1000
      })
    },
    closeModal() {
      this.showBuyToken = false
      this.$store.commit('setNewNft', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.lending {
  &__block {
    display: flex;
    padding: 5.8rem 16.9rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    &-summary {
      margin-right: 13.9rem;
      &-date {
        font-weight: 600;
        font-size: 1.6rem;
        text-align: center;
      }
      &-img {
        width: 42.8rem;
        height: 42.8rem;
        margin-top: 1.8rem;
      }
    }
    &-info {
      width: 53.5rem;
      margin-top: 2.2rem;
      &-name {
        display: flex;
        align-items: center;
        img {
          width: 2.6rem;
          margin-right: 1.6rem;
        }
        &-value {
          font-family: Cabin-Regular;
          font-weight: 500;
          font-size: 3.2rem;
        }
      }
      &-description {
        font-size: 1.4rem;
      }
      &-refi {
        margin-top: 3.2rem;
        font-weight: 600;
        font-size: 1.6rem;
      }
      &-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: $white;
        padding: 1.4rem 0.8rem;
        margin-top: 3.2rem;
        border-radius: 8px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        &-detail {
          &-celo {
            display: flex;
            align-items: center;
            img {
              width: 2.4rem;
              margin-right: 1rem;
            }
            &-value {
              font-weight: 600;
              font-size: 3.2rem;
            }
          }
          &-value {
            font-size: 1.4rem;
            color: $grayLight;
          }
        }
        &-buy {
          width: 14.8rem;
          height: 4.8rem;
          background: linear-gradient(to right, #365BE0, #D676CF, #FFE884);
          font-weight: 700;
          font-size: 1.6rem;
          color: $white;
        }
      }
    }
  }
  &__title {
    max-width: 59rem;
    margin: 0 auto;
    font-family: Cabin-Regular;
    font-weight: 500;
    font-size: 3.2rem;
    text-align: center;
  }
  &__list {
    padding: 0 7rem;
  }
  &__collection {
    padding-top: 8.2rem;
    padding-bottom: 15.2rem;
    &-description {
      max-width: 30rem;
      margin: 1rem auto 0;
      font-weight: 400;
      font-size: 1.4rem;
      text-align: center;
      color: $grayDark;
    }
    &-list {
      display: grid;
      grid-template-columns: repeat(6, 20rem);
      grid-column-gap: 2rem;
      grid-row-gap: 2rem;
      padding-top: 7.2rem;
    }
    &-item {
      &-date {
        padding-bottom: 1.6rem;
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 1;
        text-align: center;
      }
      &-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20rem;
        height: 20.2rem;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), linear-gradient(46.74deg, #365BE0 -17.17%, #D676CF 48.99%, #FFE884 113%);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        &.owned {
          background: none;
        }
        &-img {
          max-width: 100%;
        }
        &-checked {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 2.5rem;
          height: 2.5rem;
          opacity: 0.9;
        }
      }      
    }
  }
  &__market {
    padding-bottom: 14rem;
    .lending__title {
      max-width: 62rem;
      padding-bottom: 12.9rem;
    }
    &-items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 3.6rem;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        &-img-box {
          height: 10.9rem;
        }
        &-description {
          margin-top: 1.8rem;
          font-size: 1.8rem;
          text-align: center;
          color: $grayDark;
        }
      }
    }
  }
  &__guide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
    padding-top: 8.2rem;
    padding-bottom: 7.6rem;
    .lending__title {
      margin-bottom: 7.3rem;
    }
    img {
      max-width: 57.5rem;
    }
  }
  &__faq {
    padding-top: 8rem;
    padding-bottom: 11.1rem;
    &-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 4.6rem;
      .lending__faq-item:first-child {
        margin-top: 0;
      }
    }
    &-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 61.8rem;
      padding: 1.6rem;
      margin-top: 1.6rem;
      border: 1px solid $modalColor;
      border-radius: 4px 4px 0px 0px;
      &-info {
        margin-right: 2rem;
        &-title {
          font-weight: 600;
          font-size: 2rem;
        }
        &-description {
          margin-top: 0.8rem;
          font-size: 1.6rem;
          color: $grayDark;
        }
      }
      &-dropdown {
        background: transparent;
        border: 0;
        img {
          width: 1.2rem;
        }
      }
    }
  }
  &__buy {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 7.3rem;
    padding-bottom: 8.4rem;
    position: relative;
    &-bg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 30.4rem;
    }
    .lending__title, &-btn {
      position: relative;
    }
    &-btn {
      width: 42.4rem;
      height: 4.8rem;
      background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
      border-radius: 2.5rem;
      margin-top: 6.3rem;
      font-weight: 700;
      font-size: 1.6rem;
      color: $white;
      &.disabled {
        background: $white;
        pointer-events: none;
        border: 1px solid $modalColor;
        color: $border2;
      }
    }
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10.9rem;
    padding-bottom: 15.4rem;
    &-description {
      padding-bottom: 4.7rem;
      font-size: 1.8rem;
      text-align: center;
      color: $grayLight;
    }
    img {
      max-width: 36.6rem;
    }
  }
  @media (max-width: 460px) {
    &__block {
      display: block;
      padding: 2.4rem 0.9rem 3.8rem;
      &-summary {
        margin: 0;
        &-date {
          font-size: 1.2rem;
        }
        &-img {
          width: 100%;
          height: auto;
        }
      }
      &-info {
        width: auto;
        margin: 0;
        &-name {
          padding-bottom: 2.4rem;
          img {
            width: 1.7rem;
            margin-right: 0.8rem;
          }
          &-value {
            font-family: OpenSans-Bold;
            font-size: 1.75rem;
          }
        }
        &-description {
          padding-top: 1.8rem;
        }
        &-price {
          margin-top: 1.8rem;
          padding: 1.8rem 0.8rem;
          &-detail {
            &-celo {
              img {
                width: 2rem;
                margin-right: 1rem;
              }
              &-value {
                font-size: 2.2rem;
              }
            }
            &-value {
              margin-top: 1rem;
            }
          }
        }
      }
    }
    &__list {
      padding: 0 0.8rem;
    }
    &__title {
      max-width: 100%;
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 1.6rem;
      text-align: left;
    }
    &__collection {
      padding-top: 4.2rem;
      padding-bottom: 8.7rem;
      &-description {
        margin-top: 0.8rem;
        text-align: left;
      }
      &-list {
        grid-template-columns: repeat(2, 14.4rem);
        grid-column-gap: 1.6rem;
        padding-top: 2.4rem;
      }
      &-item {
        &-date {
          padding-bottom: 1.2rem;
          font-size: 1.2rem;
        }
        &-box {
          width: 14.4rem;
          height: 14.4rem;
          &-checked {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }
    &__market {
      padding-bottom: 8.2rem;
      .lending__title {
        max-width: 100%;
        padding-bottom: 3.8rem;
      }
      &-items {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 2.4rem;
        grid-row-gap: 4.7rem;
        &-item {
          &-img-box {
            height: 4.8rem;
          }
          &-img {
            max-width: 5.2rem;
            max-height: 4.8rem;
          }
          &-description {
            margin-top: 0.8rem;
            font-size: 1.2rem;
          }
        }
      }
    }
    &__guide {
      padding-top: 3.8rem;
      padding-bottom: 4.7rem;
      .lending__title {
        margin-bottom: 3.9rem;
        text-align: left;
      }
      img {
        max-width: 29.3rem;
      }
    }
    &__faq {
      padding: 3.8rem 0.8rem;
      &-list {
        padding-top: 1.6rem;
      }
      &-item {
        width: calc(100% - 1.6rem);
        padding: 1.6rem 0.8rem;
        margin-top: 0.8rem;
        &-info {
          margin-right: 1rem;
          &-title {
            font-size: 1.6rem;
          }
          &-description {
            font-size: 1.4rem;
          }
        }
        &-dropdown {
          line-height: 1.5rem;
        }
      }
    }
    &__buy {
      padding: 4.4rem 1.6rem 5.4rem;
      .lending__title {
        text-align: center;
      }
      &-bg {
        height: 21.4rem;
      }
      &-btn {
        width: 14.8rem;
        margin-top: 2.4rem;
      }
    }
    &__footer {
      padding-top: 5rem;
      padding-bottom: 13.4rem;
      &-description {
        padding-bottom: 2rem;
        font-size: 1.2rem;
      }
      img {
        max-width: 30.3rem;
      }
    }
  }
}
</style>
