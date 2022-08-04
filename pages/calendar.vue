<template>
    <section id="lending">
        <div class="lending">
            <div class="lending__block">
				<client-only>
					<div v-if="isMobile()">
						<p class="lending__block-info-name">NFT Offset Calendar 2022</p>
						<p class="lending__block-info-description">Buy NFT every month, change your carbon footprint and track progress</p>
					</div>
				</client-only>
                <div class="lending__block-summary">
                    <p class="lending__block-summary-date">{{ currentDateName }}</p>
                    <img class="lending__block-summary-img" :src="currentCertificateImage" alt="certificate">
                </div>
                <div class="lending__block-info">
                    <client-only>
						<div v-if="!isMobile()">
							<p class="lending__block-info-name">NFT Offset Calendar 2022</p>
							<p class="lending__block-info-description">Buy NFT every month, change your carbon footprint and track progress</p>
						</div>
						<p class="lending__block-info-detail" v-else>The NFT certificate confirms your contribution the regeneration of nature you carbon negative status</p>
                    </client-only>
					<ul class="lending__block-info-features features-list">
						<li class="features-list-item">On-chain confirmation of your offset</li>
						<li class="features-list-item">Unique design every month</li>
						<li class="features-list-item">1 tCO2 in offset tracker</li>
						<li class="features-list-item">Chance to get into the ReFi DAO club</li>
					</ul>
                    <div class="lending__block-info-price" v-if="!bought">
                        <div class="lending__block-info-price-detail">
                            <div class="lending__block-info-price-detail-celo">
                                <img :src="getCDNImage('celo.svg')" alt="celo">
                                <p class="lending__block-info-price-detail-celo-value">{{ certificate.price }}</p>
                            </div>
                            <p class="lending__block-info-price-detail-value">Price (${{ priceToken }})</p>
                        </div>
                        <button class="lending__block-info-price-buy" @click="clickBuyToken">Buy & Offset now</button>
                    </div>
					<div class="lending__block-info-minted" v-else>
						<p class="lending__block-info-minted-description">Congratulations!<br/>You have already bought an NFT Carbon Offset Certificate this month.</p>
					</div>
					<div class="lending__block-referral" v-if="address">
						<div class="lending__block-referral-info">
							<p class="lending__block-referral-info-name">Earn passive income by helping nature</p>
							<dropdown-menu class="lending__block-referral-info-dropdown" :hover="true" :right="true" v-model="showReferralInfo">
								<img class="lending__block-referral-info-trigger" src="/question.svg" alt="question" @click="handleClickReferralInfo">
								<div slot="dropdown">
									<p class="lending__block-referral-info-content">
										1. Share your referral link<br/>
										2. Invite your friends to buy a carbon certificate on the mint page<br/>
										3. Earn CELO for each purchased certificate through your referral link<br/>
									</p>
								</div>
							</dropdown-menu>
						</div>
						<div class="lending__block-referral-box">
							<div class="lending__block-referral-box-info" @click="copyReferralLink">
								<p class="lending__block-referral-box-info-name">{{ referralUrlCopied ? 'Copied' : 'Referral Link:' }}</p>
								<p class="lending__block-referral-box-info-url">{{ cuttenReferralLink(this.referralUrl) }}</p>
							</div>
							<a class="lending__block-referral-box-link" href="/referral">
								<span class="lending__block-referral-box-link-name">Referral program</span>
								<span class="lending__block-referral-box-link-arrow">&#x276F;</span>
							</a>
						</div>
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
                            <div class="lending__collection-item-box no-bg">
                                <img class="lending__collection-item-box-img" :src="certificate.image" alt="certificate">
                                <img class="lending__collection-item-box-checked" :src="getCDNImage('checked-circle.svg')" alt="checkmark" v-if="certificateOwner(certificate)">
								<div class="lending__collection-item-box-status">
									<div class="lending__collection-item-box-status-item">
										<p class="lending__collection-item-box-status-item-name">Status:</p>
										<p class="lending__collection-item-box-status-item-info">{{ getCertificateStatus(certificate) }}</p>
									</div>
									<div class="lending__collection-item-box-status-item">
										<p class="lending__collection-item-box-status-item-name">Sold:</p>
										<p class="lending__collection-item-box-status-item-info">{{ getCertificatePrice(certificate) }}</p>
									</div>
									<div class="lending__collection-item-box-status-item">
										<p class="lending__collection-item-box-status-item-name">Offset:</p>
										<p class="lending__collection-item-box-status-item-info">{{ getCertificateOffset(certificate) }}</p>
									</div>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="lending__list-exclusive">
					<div class="lending__list-exclusive-info">
						<h2 class="lending__list-exclusive-info-title">Access to ReFi DAO club</h2>
						<p class="lending__list-exclusive-info-description">Those who have collected the entire collection have a choice, keep them for themselves or burn them! By burning, you get new NFT with access to the private ReFi DAO club</p>
						<p class="lending__list-exclusive-info-read" @click="showExchangeBonus=true">Read more &#x276F;</p>
					</div>
					<img class="lending__list-exclusive-img" :src="getCDNImage('certificates/rare.webp')" alt="bonus">
				</div>
            </div>
			<div class="lending__reason lending__guide">
				<h2 class="lending__title">Why buy NFT and offset carbon?</h2>
				<p class="lending__guide-description">Every day the inhabitants of the earth leave their carbon footprint. With our NFT certificates you can make your carbon footprint neutral or even negative</p>
				<div class="lending__reason-info">
					<div class="lending__reason-info-item">
						<h3 class="lending__reason-info-item-title">Footprint without carbon offset <img :src="getCDNImage('sad-face.svg')" alt="sad"></h3>
						<client-only>
							<img class="lending__reason-info-item-diagram" :src="getCDNImage('carbon-positive.svg')" alt="diagram" v-if="!isMobile()">
							<img class="lending__reason-info-item-diagram" :src="getCDNImage('carbon-positive-mobile.svg')" alt="diagram" v-else>
						</client-only>
					</div>
					<div class="lending__reason-info-item">
						<h3 class="lending__reason-info-item-title">Footprint with carbon offset <img :src="getCDNImage('happy-face.svg')" alt="happy"></h3>
						<client-only>
							<img class="lending__reason-info-item-diagram" :src="getCDNImage('carbon-neutral.svg')" alt="diagram" v-if="!isMobile()">
							<img class="lending__reason-info-item-diagram" :src="getCDNImage('carbon-neutral-mobile.svg')" alt="diagram" v-else>
						</client-only>
					</div>
				</div>
			</div>
			<div class="lending__market">
				<h2 class="lending__title">NFT Carbon Offset certificate can be gifted or sold on the secondary market</h2>
				<div class="lending__market-items">
					<div class="lending__market-items-item">
						<div class="lending__market-items-item-img-box">
							<img class="lending__market-items-item-img" :src="getCDNImage('carbon-substract.svg')" alt="substract">
						</div>
						<p class="lending__market-items-item-description">100% verification of your carbon negative status</p>
					</div>
					<div class="lending__market-items-item">
						<div class="lending__market-items-item-img-box">
							<img class="lending__market-items-item-img" :src="getCDNImage('carbon-unique.svg')" alt="unique">
						</div>
						<p class="lending__market-items-item-description">Unique art that changes every month</p>
					</div>
					<div class="lending__market-items-item">
						<div class="lending__market-items-item-img-box">
							<img class="lending__market-items-item-img" :src="getCDNImage('carbon-coffee.svg')" alt="coffee">
						</div>
						<p class="lending__market-items-item-description">The price of an NFT certificate is like a few cups of coffee</p>
					</div>
					<div class="lending__market-items-item">
						<div class="lending__market-items-item-img-box">
							<img class="lending__market-items-item-img" :src="getCDNImage('carbon-valora.svg')" alt="valora">
						</div>
						<p class="lending__market-items-item-description">Can be purchased with a credit card the Valora app</p>
					</div>
				</div>
			</div>
            <div class="lending__guide">
                <h2 class="lending__title">How it’s works?</h2>
				<p class="lending__guide-description">No complicated logic and calculations. Buying one unique NFT you offset 1 ton CO2. Everything is simple!</p>
                <client-only>
                    <img class="lending__guide-diagram" :src="getCDNImage('carbon-diagram.svg')" alt="diagram" v-if="!isMobile()">
                    <img class="lending__guide-diagram" :src="getCDNImage('carbon-diagram-mobile.svg')" alt="diagram" v-else>
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
                    <img :src="getCDNImage('investors.webp')" alt="support" v-if="!isMobile()">
                    <img :src="getCDNImage('investors-mobile.webp')" alt="support" v-else>
                </client-only>
            </div>
        </div>
        <BuyToken v-if="showBuyToken" :nft="certificate" :priceToken="priceToken" :balance="balance" @closeModal="closeModal"/>
		<ExchangeBonus @closeModal="showExchangeBonus = false" :bonusAvailable="bonusAvailable" @onExchange="showExchangeTokenModal" v-if="showExchangeBonus"/>
		<ExchangeToken @closeModal="showExchangeToken = false" v-if="showExchangeToken"/>
		<SuccessfullBuy v-if="showSuccessModal===true" :image="nftImage" :name="nftName" :certificate="true"/>
    </section>
</template>

<script>
import { CERTIFICATE_TOKEN_TYPE, CDN_ROOT } from '@/config'
import API from '@/api'
import BuyToken from '@/components/modals/buyToken'
import ExchangeBonus from '@/components/modals/exchangeBonus.vue'
import ExchangeToken from '@/components/modals/exchangeToken.vue'
import SuccessfullBuy from '@/components/modals/successBuy'
import { mont } from 'bn.js';
const CERTIFICATE_MINT_PRICE = 15

export default {
  components: {
	BuyToken,
	ExchangeBonus,
	ExchangeToken,
    SuccessfullBuy
  },
  data() {
    return {
	  certificateList: [],
	  faqList: [],
	  referralUrl: '',
	  referralUrlCopied: false,
      showBuyToken: false,
	  certificate: {},
	  currentDateName: '',
	  currentCertificateImage: '',
      balance: 0,
      celoPrice: 0,
      priceToken: 0,
	  bought: false,
	  nextMintTimer: null,
	  nextMintVisible: false,
	  showReferralInfo: false,
	  bonusAvailable: false,
	  showExchangeBonus: false,
	  showExchangeToken: false,
	  bonusPurchased: false,
	  leftMintTime: 0,
	  nextMintDay: 0,
	  nextMintHour: 0,
	  nextMintMinute: 0,
	  nextMintSecond: 0,
    }
  },
  head() {
    return {
      meta: [
        { hid: 'og:image', property: 'og:image', content: this.getCDNImage('calendar-banner.webp') }
      ]
    }
  },
  computed: {
    address() {
      return this.$store.state.address
	},
	nftImage() {
	  if (!this.bonusPurchased) {
		return this.certificate.image
	  } else {
		return this.getCDNImage('certificates/rare.webp')
	  }
	},
	nftName() {
	  if (!this.bonusPurchased) {
		return this.certificate.name
	  } else {
		return 'Rare 2022'
	  }
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
    const currMonth = today.getMonth() + 1
	const month = today.toLocaleString('en-us', { month: 'long' })
	this.currentCertificateImage = CDN_ROOT + `CBCN/detail/${currMonth}.png`
    this.certificate = {
      name: `Carbon Offset Certificate ${month} ${today.getFullYear()}`,
	  contract: 'CBCN',
      image: this.currentCertificateImage,
      price: CERTIFICATE_MINT_PRICE,
      nftid: currMonth,
      refiOffset: CERTIFICATE_MINT_PRICE * 45 / 1000 * this.$store.state.cMCO2Price
	}
	this.currentDateName = `${month} ${today.getFullYear()}`
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
	this.updateReferralUrl()
	this.updateCertificateList()
    await this.loadBalance()
  },
  watch: {
    address() {
      if (this.$store.state.address) {
		this.updateReferralUrl()
        if (this.certificateList.length === 0) {
          this.updateCertificateList()
        }

        if (!this.balance) {
          this.loadBalance()
		}
      }
    },
    ownedCertificates() {
	  this.updateCertificateList()
	},
    showSuccessModal() {
      if (this.$store.state.successBuyToken) {
		this.showBuyToken = false
		this.showExchangeToken = false
		if (this.bonusAvailable) {
		  this.bonusPurchased = true
		}
      } else {
		this.showExchangeToken = false
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
	  const date = new Date()
	  return !this.certificateOwner(certificate) && (certificate.offset || (!certificate.offset && certificate.year === date.getFullYear() && certificate.month === (date.getMonth() + 1) && certificate.price))
	},
	certificateMinted(certificate) {
	  const date = new Date()
	  const currYear = date.getFullYear()
	  const currMonth = date.getMonth() + 1
	  return certificate.year < currYear || (certificate.year === currYear && certificate.month < currMonth)
	},
	getCertificateStatus(certificate) {
	  
	  if (certificate.owner || this.certificateMinted(certificate)) {
		return 'Minted'
	  } else {
		return certificate.offset ? 'Minting' : 'Comming soon'
	  }
	},
	getCertificatePrice(certificate) {
	  if (certificate.owner || certificate.offset || this.certificateMinted(certificate)) {
		return '15'
	  } else {
		return '-'
	  }
	},
	getCertificateOffset(certificate) {
	  if (certificate.owner || certificate.offset || this.certificateMinted(certificate)) {
		const offset = 15 * (55 / 1000) * this.$store.state.cMCO2Price
		return `${offset.toFixed(1)} ton CO2`
	  } else {
		return '-'
	  }
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
	updateReferralUrl() {
	  if (process && process.browser && this.address) {
		if (this.$route.query.referral && this.$store.state.fullAddress.toLowerCase() !== this.$route.query.referral.toLowerCase()) {
		  this.certificate = {
			...this.certificate,
			referrer: this.$route.query.referral
		  }
		  API.addClickHistory(this.$route.query.referral.toLowerCase())
		}
		this.referralUrl = location.origin + location.pathname + `?referral=${this.$store.state.fullAddress}`
	  }
	},
	handleClickReferralInfo() {
	  if (this.isMobile() && this.showReferralInfo) {
		this.showReferralInfo = false
	  }
	},
	copyReferralLink() {
	  this.referralUrlCopied = true
	  this.$copyText(this.referralUrl)
	  setTimeout(() => this.referralUrlCopied = false, 1000)
	},
    updateCertificateList() {
	  const today = new Date()
	  const currYear = today.getFullYear()
	  const currMonth = today.getMonth() + 1
	  const newList = JSON.parse(JSON.stringify(this.certificateList))
	  let currYearCertCount = 0
      newList.forEach((item, index) => {
        const foundIndex = this.ownedCertificates.findIndex(oItem => oItem.year === item.year && oItem.month === item.month)
        if (foundIndex >= 0) {
          const newItem = this.ownedCertificates[foundIndex]
		  newList[index] = {
			...newItem,
			image: this.getCertificateImage(newItem)
		  }
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
	  this.bonusAvailable = ownedCount === 12 && !bonusNft
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
	showExchangeTokenModal() {
	  this.showExchangeBonus = false
	  this.showExchangeToken = true
	},
	showFAQDetail(index) {
	  const newFaqList = JSON.parse(JSON.stringify(this.faqList))
	  newFaqList[index].expanded = !newFaqList[index].expanded
	  this.faqList = newFaqList
	},
    clickBuyToken() {
	  this.showBuyToken = true
	  this.$store.dispatch('checkBuyTokenApproved', this.certificate.price)
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
		border-radius: 0.4rem;
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
		max-width: 35.9rem;
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
		  padding-top: 3.2rem;
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
	&-referral {
	  width: calc(100% - 3.2rem);
	  margin-top: 3.2rem;
	  padding: 1.6rem;
	  border: 1px solid $modalColor;
	  border-radius: 0.8rem;
	  &-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-name {
		  background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;
		  font-weight: 600;
		  font-size: 1.4rem;
		}
		&-trigger {
		  width: 1.5rem;
		}
		::v-deep .dropdown-menu {
		  top: -1rem !important;
		  width: 23.4rem;
		  padding: 0.8rem;
		  background: rgba(0, 0, 0, 0.57);
		  backdrop-filter: blur(13px);
		  border-radius: 4px;
		  transform: translateY(-100%);
		}
		&-content {
		  font-size: 1.2rem;
    	  line-height: 1.6rem;
    	  color: $white;
		}
	  }
	  &-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.6rem;
		&-info {
		  display: flex;
		  align-items: center;
		  max-width: 30.8rem;
		  padding: 0.8rem 1.6rem;
		  border: 1px solid $modalColor;
		  border-radius: 2.5rem;
		  cursor: pointer;
		  &-name {
			width: 8.7rem;
			margin-right: 1.6rem;
			white-space: nowrap;
			font-size: 1.4rem;
		  }
		  &-url {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 1.4rem;
			font-weight: 600;
		  }
		}
		&-link {
		  display: flex;
		  align-items: center;
		  cursor: pointer;
		  &-name {
			margin-right: 1rem;
			font-weight: 600;
			font-size: 1.4rem;
			color: $grayLight;
		  }
		  &-arrow {
			font-size: 1.2rem;
			color: $grayLight;
		  }
		  &:hover {
			.lending__block-referral-box-link-name {
			  text-decoration: underline;
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
	&-exclusive {
	  position: relative;
	  display: flex;
	  justify-content: space-between;
	  width: 65rem;
	  background: $white;
	  margin: 8.9rem auto;
	  padding: 2.4rem;
	  box-shadow: 0px 4px 19px rgba(172, 83, 169, 0.2);
	  border-radius: 1.2rem;
	  &::after {
		position: absolute;
		top: -.1rem; bottom: -.1rem;
		left: -.1rem; right: -.1rem;
		background: linear-gradient(93.06deg, #FC2EF5 8.21%, #5489D8 50.57%, #2CFF64 100%);
		content: '';
		z-index: -1;
		border-radius: 1.2rem;
	  }
	  &-info {
		max-width: 34.4rem;
		&-title {
		  font-family: Cabin-Bold;
		  font-weight: 700;
		  font-size: 3.2rem;
		}
		&-description, &-read {
		  margin-top: 1.6rem;
		  font-size: 1.4rem;
		}
		&-read {
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $pink;
		  cursor: pointer;
		}
	  }
	  &-img {
		width: 19.4rem;
		height: 19.4rem;
		border-radius: 0.4rem;
	  }
	}
  }
  &__collection {
    padding-top: 8.2rem;
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
        }
        &-checked {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 2.5rem;
          height: 2.5rem;
          opacity: 0.9;
		}
		&-status {
		  display: none;
		  position: absolute;
		  left: 0;
		  top: 0;
		  right: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0.23);
		  backdrop-filter: blur(8px);
		  border-radius: 0.4rem;
		  padding: 0 1.6rem 1.6rem 1.6rem;
		  &-item {
			display: flex;
			align-items: flex-end;
			margin-bottom: 0.8rem;
			&:last-child {
			  margin: 0;
			}
			&-name {
			  width: 4.6rem;
			  margin-right: 0.8rem;
			  font-size: 1.4rem;
			  color: $border2;
			}
			&-info {
			  font-weight: 600;
			  font-size: 1.4rem;
			  color: $white;
			}
		  }
		}
		&:hover, &:focus-within {
		  .lending__collection-item-box-status {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		  }
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
		  max-width: 27.8rem;
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
	  &-referral {
		position: relative;
		width: calc(100% - 1.6rem);
		padding-left: 0.8rem;
		padding-right: 0.8rem;
	    &-info {
		  display: block;
		  &-dropdown {
			position: absolute;
			bottom: 1.8rem;
			right: 1rem;
		  }
		  ::v-deep .dropdown-menu {
			top: calc(100% + 0.8rem) !important;
			transform: none;
		  }
	  	}
	    &-box {
		  display: block;
		  margin-top: 2rem;
		  &-link {
			margin-top: 1.6rem;
		  }
		}
	  }
    }
    &__list {
	  padding: 0 0.8rem;
	  &-exclusive {
		display: block;
		width: calc(100% - 1.6rem);
		margin-top: 3.5rem;
		margin-bottom: 4.8rem;
		padding-left: 0.8rem;
		padding-right: 0.8rem;
		&-info {
		  width: 100%;
		  &-title {
			font-family: OpenSans-Regular;
			font-size: 1.8rem;
		  }
		  &-description {
			margin-top: 0.8rem;
		  }
		}
		&-img {
		  display: block;
		  margin: 2.4rem auto 0;
		}
	  }
    }
    &__title {
      max-width: 100%;
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 1.6rem;
      text-align: left;
    }
    &__collection {
      padding-top: 4.5rem;
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
		  &-status {
			padding: 0 1rem 1rem 1rem;
			&-item {
			  &-name {
				width: 3.6rem;
			    margin-right: 0.6rem;
			    font-size: 1rem;
			  }
			  &-info {
				font-size: 1rem;
			  }
			}
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
