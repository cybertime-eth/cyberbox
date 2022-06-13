<template>
    <section id="lending">
        <div class="lending">
            <div class="lending__block">
				<client-only>
					<div v-if="isMobile()">
						<p class="lending__block-info-name">NFT Carbon Offset Certificate</p>
						<p class="lending__block-info-description">Buy a personal NFT certificate to become carbon neutral</p>
					</div>
				</client-only>
                <div class="lending__block-summary">
                    <p class="lending__block-summary-date">{{ currentDate }}</p>
                    <img class="lending__block-summary-img" src="/carbon.svg" alt="certificate">
                </div>
                <div class="lending__block-info">
                    <client-only>
						<div v-if="!isMobile()">
							<p class="lending__block-info-name">NFT Carbon Offset Certificate</p>
							<p class="lending__block-info-description">Buy a personal NFT certificate to become carbon neutral</p>
						</div>
						<p class="lending__block-info-detail" v-else>The NFT certificate confirms your contribution the regeneration of nature you carbon negative status</p>
                    </client-only>
					<ul class="lending__block-info-features features-list">
						<li class="features-list-item">Unique NFT certificate every month</li>
						<li class="features-list-item">1 NFT = 1 ton CO2 offset</li>
						<li class="features-list-item">Collect or sell on the marketplace</li>
					</ul>
                    <div class="lending__block-info-price" v-if="!bought">
                        <div class="lending__block-info-price-detail">
                            <div class="lending__block-info-price-detail-celo">
                                <img src="/celo.svg" alt="celo">
                                <p class="lending__block-info-price-detail-celo-value">{{ certificate.price }}</p>
                            </div>
                            <p class="lending__block-info-price-detail-value">Price (${{ priceToken }})</p>
                        </div>
                        <button class="lending__block-info-price-buy" @click="clickBuyToken">Buy & Offset now</button>
                    </div>
					<div class="lending__block-info-minted" v-else>
						<p class="lending__block-info-minted-description">Congratulations!<br/>You have already bought an NFT Carbon Offset Certificate this month.</p>
					</div>
					<div class="lending__block-info-minted-next" v-if="nextMintVisible">
						<p class="lending__block-info-minted-next-name">Mint the next NFT in:</p>
						<div class="lending__block-info-minted-next-timer">
							<p class="lending__block-info-minted-next-timer-clock">{{ formatClockTime(nextMintDay) }}</p>
							<p class="lending__block-info-minted-next-timer-separator">:</p>
							<p class="lending__block-info-minted-next-timer-clock">{{ formatClockTime(nextMintHour) }}</p>
							<p class="lending__block-info-minted-next-timer-separator">:</p>
							<p class="lending__block-info-minted-next-timer-clock">{{ formatClockTime(nextMintMinute) }}</p>
							<p class="lending__block-info-minted-next-timer-separator">:</p>
							<p class="lending__block-info-minted-next-timer-clock">{{ formatClockTime(nextMintSecond) }}</p>
						</div>
					</div>
                </div>
            </div>
            <div class="lending__list">
                <div class="lending__collection">
                    <h2 class="lending__title">Collect the  entire  collection for 2022</h2>
                    <h2 class="lending__collection-description">Save for the future, sell on our marketplace or exchange 12 NFTs for 1 exclusive NFT</h2>
                    <div class="lending__collection-list">
                        <div class="lending__collection-item" :class="{available: certificateBuyAvailable(certificate), last: !certificateOwner(certificate) && !certificate.offset && !certificate.future}" :key="idx" v-for="(certificate, idx) of certificateList">
                            <p class="lending__collection-item-date">{{ certificateName(certificate) }}</p>
                            <div class="lending__collection-item-box" :class="{'no-bg': certificateOwner(certificate) || (!certificate.offset && !certificate.future)}">
                                <img class="lending__collection-item-box-img" :src="certificate.image" alt="certificate">
                                <img class="lending__collection-item-box-checked" src="/checked-circle.svg" alt="checkmark" v-if="certificateOwner(certificate)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			<div class="lending__reason lending__guide">
				<h2 class="lending__title">Why buy NFT and offset carbon?</h2>
				<p class="lending__guide-description">Every day the inhabitants of the earth leave their carbon footprint. With our NFT certificates you can make your carbon footprint neutral or even negative</p>
				<div class="lending__reason-info">
					<div class="lending__reason-info-item">
						<h3 class="lending__reason-info-item-title">Footprint without carbon offset <img src="/sad-face.svg" alt="sad"></h3>
						<client-only>
							<img class="lending__reason-info-item-diagram" src="/carbon-positive.svg" alt="diagram" v-if="!isMobile()">
							<img class="lending__reason-info-item-diagram" src="/carbon-positive-mobile.svg" alt="diagram" v-else>
						</client-only>
					</div>
					<div class="lending__reason-info-item">
						<h3 class="lending__reason-info-item-title">Footprint with carbon offset <img src="/happy-face.svg" alt="happy"></h3>
						<client-only>
							<img class="lending__reason-info-item-diagram" src="/carbon-neutral.svg" alt="diagram" v-if="!isMobile()">
							<img class="lending__reason-info-item-diagram" src="/carbon-neutral-mobile.svg" alt="diagram" v-else>
						</client-only>
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
            <div class="lending__guide">
                <h2 class="lending__title">How it’s works?</h2>
				<p class="lending__guide-description">No complicated logic and calculations. Buying one unique NFT you offset 1 ton CO2. Everything is simple!</p>
                <client-only>
                    <img class="lending__guide-diagram" src="/carbon-diagram.svg" alt="diagram" v-if="!isMobile()">
                    <img class="lending__guide-diagram" src="/carbon-diagram-mobile.svg" alt="diagram" v-else>
                </client-only>
            </div>
            <!-- <div class="lending__faq">
                <h2 class="lending__title">FAQ</h2>
                <div class="lending__faq-list">
                    <div class="lending__faq-item" :key="idx" v-for="(faqInfo, idx) of faqList">
                        <div class="lending__faq-item-header">
                            <h3 class="lending__faq-item-header-title">{{ faqInfo.title }}</h3>
                            <button class="lending__faq-item-header-dropdown" @click="showFAQDetail(idx)">
                              <img src="/attr-array-inversed.svg" alt="down" v-if="faqInfo.expanded">
							  <img src="/attr-array.svg" alt="down" v-else>
                          </button>
                        </div>
                        <p class="lending__faq-item-description" v-if="faqInfo.expanded">{{ faqInfo.description }}</p>
                    </div>
                </div>
            </div> -->
            <div class="lending__footer">
                <p class="lending__footer-description">Supported & Powered by</p>
                <client-only>
                    <img src="/investors.png" alt="support" v-if="!isMobile()">
                    <img src="/investors-mobile.png" alt="support" v-else>
                </client-only>
            </div>
        </div>
        <BuyToken v-if="showBuyToken" :nft="certificate" :priceToken="priceToken" :balance="balance" @closeModal="closeModal"/>
        <SuccessfullBuy v-if="showSuccessModal===true" :image="certificate.image" :name="certificate.name" :certificate="true"/>
    </section>
</template>

<script>
import { CERTIFICATE_TOKEN_TYPE } from '@/config'
import BuyToken from '@/components/modals/buyToken'
import SuccessfullBuy from '@/components/modals/successBuy'
const CERTIFICATE_MINT_PRICE = 0.1

export default {
  components: {
    BuyToken,
    SuccessfullBuy
  },
  data() {
    return {
	  certificateList: [],
	  faqList: [],
      showBuyToken: false,
      certificate: {},
      balance: 0,
      celoPrice: 0,
      priceToken: 0,
	  bought: false,
	  nextMintTimer: null,
	  nextMintVisible: false,
	  leftMintTime: 0,
	  nextMintDay: 0,
	  nextMintHour: 0,
	  nextMintMinute: 0,
	  nextMintSecond: 0,
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
	saleCertificates() {
	  return this.$store.state.certificateSaleList
	},
    showSuccessModal() {
      return this.$store.state.successBuyToken
    }
  },
  beforeDestroy() {
	if (this.nextMintTimer) {
	  clearInterval(this.nextMintTimer)
	}
  },
  created() {
    const today = new Date()
    const currMonth = today.getMonth()
    const month = today.toLocaleString('en-us', { month: 'long' })
    this.certificate = {
      name: `Carbon Offset Certificate ${month} ${today.getFullYear()}`,
      contract: 'monthnft',
      image: '/carbon.svg',
      price: CERTIFICATE_MINT_PRICE,
      nftid: currMonth + 1,
      refiOffset: CERTIFICATE_MINT_PRICE * 25 / 1000 * this.$store.state.cMCO2Price
    }
    this.certificateList = this.getCertificatesOfYear(new Date().getFullYear(), true)
	this.loadMyCertificates()
	this.faqList = [{
	  title: 'How i can buy by credit card?',
	  description: 'By recording all data and transactions on the blockchain, we achieve a level of transparency never before seen in the forestation industry.',
	  expanded: true
	}, {
	  title: 'How i can buy by credit card?',
	  description: 'By recording all data and transactions on the blockchain, we achieve a level of transparency never before seen in the forestation industry.',
	}]
	this.$store.commit('changeSuccessBuyToken', false)
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
      return this.getCertificateName(certificate, false)
    },
    certificateOwner(certificate) {
      return certificate.owner === this.$store.state.fullAddress
	},
	certificateBuyAvailable(certificate) {
	  return !this.certificateOwner(certificate) && (certificate.offset || certificate.price)
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
	  const today = new Date()
	  const currYear = today.getFullYear()
	  const currMonth = today.getMonth() + 1
	  const newList = JSON.parse(JSON.stringify(this.certificateList))
      newList.forEach((item, index) => {
        const foundIndex = this.ownedCertificates.findIndex(oItem => oItem.year === item.year && oItem.month === item.month)
        if (foundIndex >= 0) {
          const newItem = this.ownedCertificates[foundIndex]
          newList[index] = newItem
          if (newItem.year === today.getFullYear() && newItem.month === today.getMonth() + 1) {
			this.bought = true
		  }
		} else {
		  const foundSaleIndex = this.saleCertificates.findIndex(oItem => oItem.year === item.year && oItem.month === item.month && oItem.year === currYear && oItem.month !== currMonth)
		  if (foundSaleIndex >= 0) {
			newList[index].offset = false
			newList[index].contract_id = this.saleCertificates[foundSaleIndex].contract_id
			newList[index].price = this.saleCertificates[foundSaleIndex].price
		  }
		}
	  })
	  this.certificateList = newList

	  const ownedCount = this.ownedCertificates.filter(item => item.year === currYear && item.token_type === CERTIFICATE_TOKEN_TYPE.MONTH).length
	  const bonusNft = this.ownedCertificates.find(item => item.year === currYear && item.token_type === CERTIFICATE_TOKEN_TYPE.BONUS)
	  this.nextMintVisible = ownedCount < 12 && !bonusNft
	  if (this.nextMintVisible && !this.nextMintTimer) {
		const currTime = today.getTime()
		const nextMintTime = new Date(today.getFullYear(), today.getMonth() + 1, 1).getTime()
		this.leftMintTime = nextMintTime - currTime
		this.countNextMintTime()
		this.nextMintTimer = setInterval(this.countNextMintTime, 1000)
	  }
	},
	countNextMintTime() {
	  let difference = this.leftMintTime
	  this.nextMintDay = Math.floor(difference/1000/60/60/24)
      difference -= this.nextMintDay*1000*60*60*24

      this.nextMintHour = Math.floor(difference/1000/60/60)
      difference -= this.nextMintHour*1000*60*60

      this.nextMintMinute = Math.floor(difference/1000/60)
      difference -= this.nextMintMinute*1000*60

	  this.nextMintSecond = Math.floor(difference/1000)
	  this.leftMintTime = this.leftMintTime - 1000
	},
	formatClockTime(time) {
	  return time < 10 ?  `0${time}` : time
	},
	showFAQDetail(index) {
	  const newFaqList = JSON.parse(JSON.stringify(this.faqList))
	  newFaqList[index].expanded = !newFaqList[index].expanded
	  this.faqList = newFaqList
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
		font-family: Cabin-Regular;
		font-weight: 500;
		font-size: 3.2rem;
	  }
      &-description {
		padding-top: 0.8rem;
        font-size: 1.4rem;
	  }
	  &-features {
		margin-top: 2rem;
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
          width: 16.8rem;
          height: 4.8rem;
          background: linear-gradient(to right, #365BE0, #D676CF, #FFE884);
          font-weight: 700;
          font-size: 1.6rem;
          color: $white;
        }
	  }
	  &-minted {
		&-description {
		  padding-top: 4.8rem;
		  line-height: 2rem;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $green;
		}
		&-next {
		  padding-top: 4.8rem;
		  &-name {
			font-weight: 400;
			font-size: 1.4rem;
			color: $border;
		  }
		  &-timer {
			display: flex;
			align-items: center;
			padding-top: 1.4rem;
			&-clock, &-separator {
			  font-weight: 600;
			  font-size: 2rem;
			}
			&-clock {
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  width: 4.4rem;
			  height: 4.4rem;
			  background: $white;
			  border: 2px solid $modalColor;
			  border-radius: 0.4rem;
			}
			&-separator {
			  padding: 0 0.5rem;
			}
		  }
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
    padding-bottom: 6.6rem;
    &-description {
      max-width: 36.7rem;
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
		border-radius: 0.4rem;
        position: relative;
        &.no-bg {
          background: none;
        }
        &-img {
		  max-width: 100%;
		  border-radius: 0.4rem;
		  object-fit: cover;
		  &.last {
			opacity: 0.7;
		  }
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
	  &.available {
		.lending__collection-item-date {
		  color: $green;
		}
		.lending__collection-item-box-img {
		  border-radius: 0.8rem;
		  border: 4px solid $green;
		}
	  }
	  &.last {
		.lending__collection-item-date {
		  color: $border;
		}
		.lending__collection-item-box-img {
		  opacity: 0.7;
		}
	  }
    }
  }
  &__market {
	padding: 14rem 6rem;
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
    background: $white2;
    padding-top: 8.2rem;
    padding-bottom: 5.8rem;
	&-description {
	  max-width: 47.3rem;
	  margin-top: 1.6rem;
	  text-align: center;
	  font-weight: 400;
	  font-size: 1.6rem;
	}
    &-diagram {
	  max-width: 57.5rem;
	  margin-top: 8.5rem;
    }
  }
  &__reason {
	padding-bottom: 10.2rem;
	&-info {
	  margin-top: 9.6rem;
	  &-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 9.4rem;
		&:first-child {
		  padding: 0;
		}
		&-title {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  font-weight: 600;
		  font-size: 2rem;
		  img {
			margin-left: 0.8rem;
		  }
		  }
		  &-diagram {
			margin-top: 5.4rem;
		  }
	  }
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
      width: 61.8rem;
      padding: 1.6rem;
      margin-top: 1.6rem;
      border: 1px solid $modalColor;
      border-radius: 4px 4px 0px 0px;
      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-title {
          font-weight: 600;
          font-size: 2rem;
        }
        &-dropdown {
		  display: flex;
          background: transparent;
          border: 0;
          img {
            width: 1.2rem;
          }
        }
      }
      &-description {
		margin-top: 0.8rem;
		font-size: 1.6rem;
		color: $grayDark;
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
      max-width: 64.4rem;
    }
  }
  @media (max-width: 460px) {
    &__block {
      display: block;
      padding: 2.4rem 0.9rem 4.4rem;
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
		  text-align: center;
		  font-family: OpenSans-Bold;
		  font-size: 1.75rem;
        }
        &-description {
		  max-width: 75%;
    	  margin: 0 auto;
		  padding-bottom: 2.4rem;
		  text-align: center;
		}
		&-detail {
		  margin-top: 1.6rem;
		  font-weight: 400;
		  font-size: 1.4rem;
		  color: $grayDark;
		}
		&-features {
		  margin-top: 1.6rem;
		}
        &-price {
          margin-top: 3rem;
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
		&-minted {
		  &-next {
			padding-top: 3rem;
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
      padding-top: 3.2rem;
      padding-bottom: 4.4rem;
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
      padding: 3.2rem 0.8rem 4.5rem;
      .lending__title {
        max-width: 100%;
        padding-bottom: 3rem;
      }
      &-items {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 2.4rem;
        grid-row-gap: 4.7rem;
        &-item {
		  align-items: flex-start;
          &-img-box {
            height: 4.8rem;
          }
          &-img {
            max-width: 5.2rem;
            max-height: 4.8rem;
          }
          &-description {
			margin-top: 0.8rem;
			text-align: left;
            font-size: 1.2rem;
          }
        }
      }
    }
    &__guide {
      padding: 3.8rem 0.8rem 4rem;
      .lending__title {
		width: 100%;
        margin: 0;
        text-align: left;
	  }
	  &-description {
		max-width: 100%;
		margin-top: 0.8rem;
		text-align: left;
		font-size: 1.4rem;
	  }
      &-diagram {
		margin-top: 4.6rem;
        max-width: 27.8rem;
      }
	}
	&__reason {
	  padding-bottom: 4.6rem;
	  &-info {
		margin-top: 3.2rem;
		&-item {
		  padding-top: 4rem;
		  &-title {
			font-size: 1.4rem;
			img {
			  max-width: 1.5rem;
			}
		  }
		  &-diagram {
			margin-top: 2.4rem;
		  }
		}
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
        &-header {
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
    &__footer {
      padding-top: 3.6rem;
      padding-bottom: 16rem;
      &-description {
        padding-bottom: 2rem;
        font-size: 1.2rem;
      }
      img {
        max-width: 30.4rem;
      }
    }
  }
}
</style>
