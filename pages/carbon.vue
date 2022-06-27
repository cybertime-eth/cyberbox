<template>
	<section id="carbon">
		<div class="carbon">
			<div class="carbon__tracker">
				<h2 class="carbon__title">Personal carbon offset tracker</h2>
				<!-- <CustomSelect class="carbon__tracker-picker" :options="dateOptions" @change="filterByYear"/> -->
				<p class="carbon__tracker-year">2022</p>
				<div class="carbon__tracker-block">
					<div class="carbon__tracker-block-status" ref="trackerProgress">
						<circle-progress :size="progressSize" :progress="certificateOccupancy"/>
						<div class="carbon__tracker-block-status-bg">
							<img class="carbon__tracker-block-status-bg-img" src="/occupancy.svg">
							<img class="carbon__tracker-block-status-bg-leaf" src="/leaf-tiny.svg" v-if="certificateOccupancy < 35">
							<img class="carbon__tracker-block-status-bg-leaf" src="/leaf-large.svg" v-else-if="certificateOccupancy >= 100">
							<img class="carbon__tracker-block-status-bg-leaf" src="/leaf-medium.svg" v-else-if="certificateOccupancy >= 65">
							<img class="carbon__tracker-block-status-bg-leaf" src="/leaf-small.svg" v-else>
						</div>
					</div>
					<div class="carbon__tracker-block-info">
						<div class="carbon__tracker-block-info-summary">
							<div class="carbon__tracker-block-info-summary-item">
								<span class="carbon__tracker-block-info-summary-item-name">NFT Carbon certificates</span>
								<span class="carbon__tracker-block-info-summary-item-conent">{{ formatCO2(totalCertCO2) }} ton CO2</span>
							</div>
							<div class="carbon__tracker-block-info-summary-item">
								<span class="carbon__tracker-block-info-summary-item-name">NFT Trading CO2 offset</span>
								<span class="carbon__tracker-block-info-summary-item-conent">{{ formatCO2(totalTradingCO2) }} ton CO2</span>
							</div>
							<div class="carbon__tracker-block-info-summary-item total">
								<span class="carbon__tracker-block-info-summary-item-name">Total CO2 offset</span>
								<span class="carbon__tracker-block-info-summary-item-conent">{{ formatCO2(totalCO2Offset) }} ton CO2</span>
							</div>
						</div>
						<div class="carbon__tracker-block-info-certificate">
							<button class="carbon__tracker-block-info-certificate-button gradient-button" @click="gotoLending">Buy NFT Certificate</button>
							<a class="carbon__tracker-block-info-certificate-bonus" @click="showExchangeBonus=true" v-if="!bonusPurchased"><img class="carbon__tracker-block-info-certificate-img" src="/gift.svg" alt="bonus"></a>
						</div>
					</div>
				</div>
			</div>
			<div class="carbon__certificates">
				<h2 class="carbon__title">NFT Carbon Offset Certificates</h2>
				<!-- <div class="carbon__certificates-header">
					<CustomSwitch class="carbon__certificates-header-switch" label="My Certificates" :value="myCertificate" @onChange="changeMyCertificateStatus"/>
				</div> -->
				<div class="carbon__certificates-list">
					<certificate :certificate="certificate" :key="idx" v-for="(certificate, idx) of filteredCertificates"/>
				</div>
			</div>
			<ExchangeBonus @closeModal="showExchangeBonus = false" :bonusAvailable="currYearCertCount === 12" @onExchange="showExchangeTokenModal" v-if="showExchangeBonus"/>
			<ExchangeToken @closeModal="showExchangeToken = false" v-if="showExchangeToken"/>
			<SuccessfullBuy v-if="showSuccessModal" :image="bonusImage" :name="certificateName" :certificate="true"/>
		</div>
	</section>
</template>

<script>
import { CERTIFICATE_TOKEN_TYPE } from '@/config'
import CustomSelect from '@/components/utility/CustomSelect.vue'
import CircleProgress from '@/components/utility/CircleProgress.vue'
import certificate from '@/components/certificate.vue'
import ExchangeBonus from '@/components/modals/exchangeBonus.vue'
import ExchangeToken from '@/components/modals/exchangeToken.vue'
import SuccessfullBuy from '@/components/modals/successBuy'

const MAX_TON_AMOUNT = 20

export default {
  components: {
	CustomSelect,
	CircleProgress,
	certificate,
	ExchangeBonus,
	ExchangeToken,
	SuccessfullBuy
  },
  data() {
	return {
	  myCertificate: false,
	  certificateList: [],
	  filteredCertificates: [],
	  yearFilter: 2022,
	  progressSize: 0,
	  certificateOccupancy: 0,
	  totalCertCO2: 0,
	  totalTradingCO2: 0,
	  totalCO2Offset: 0,
	  currYearCertCount: 0,
	  showExchangeBonus: false,
	  showExchangeToken: false,
	  bonusPurchased: false
	}
  },
  computed: {
	dateOptions() {
	  return [
		{ key: '2022', value: '2022' }
	  ]
	},
	certificateDateOptions() {
	  return [
		{ key: '2022', value: '2022' },
	  ]
	},
	address() {
	  return this.$store.state.address
	},
	ownedCertificates() {
	  return this.$store.state.certificateList
	},
	saleCertificates() {
	  return this.$store.state.certificateSaleList
	},
	showSuccessModal() {
      return this.$store.state.successBuyToken
	},
	bonusImage() {
	  const date = new Date()
	  return `/certificates/${date.getFullYear()}/rare.jpg`
	},
	certificateName() {
	  return 'Rare 2022'
	},
	refiPrice() {
	  return this.$store.state.cMCO2Price
	}
  },
  async created() {
	this.yearFilter = new Date().getFullYear()
	this.certificateList = this.getCertificatesOfYear(this.yearFilter)
	if (process.broswer) {
	  if (!this.isMobie()) {
		this.progressSize = Math.round(0.6945 * document.body.offsetHeight / 1000)
	  } else {
		this.progressSize = Math.round(3.125 * document.body.offsetHeight / 1000)
	  }
	}
	if (this.$route.query.mycert) {
	  this.myCertificate = true
	}

	const trackingInfo = await this.$store.dispatch('getCarbonData')
	this.totalCertCO2 = trackingInfo.totalCount
	this.totalTradingCO2 = trackingInfo.totalTradingCelo * trackingInfo.producerFee / 1000 * this.refiPrice
	this.totalCO2Offset = this.totalCertCO2 + this.totalTradingCO2
	this.certificateOccupancy = Math.round(this.totalCertCO2 / MAX_TON_AMOUNT * 100)
	this.$store.dispatch('getCertificates')
  },
  mounted() {
	this.updateCertificateList()
	if (this.$refs.trackerProgress) {
	  this.progressSize = this.$refs.trackerProgress.offsetWidth
	}
  },
  watch: {
	address() {
	  if (this.$store.state.address) {
		this.$store.dispatch('checkBuyTokenApproved', 1.0)
		if (this.filteredCertificates.length === 0) {
		  this.updateCertificateList()
		}
	  }
	},
	ownedCertificates() {
	  this.updateCertificateList()
	}
  },
  methods: {
	formatCO2(value) {
	  return value > 0 ? value.toFixed(1) : 0
	},
	updateCertificateList() {
	  if (this.$store.state.address) {
		const newList = JSON.parse(JSON.stringify(this.certificateList))
		const additionalList = []
		const date = new Date()
		const currYear = date.getFullYear()
		const currMonth = date.getMonth() + 1
		let ownedCount = 0
		let currYearCertCount = 0
		const bonusNft = this.ownedCertificates.find(item => item.year === currYear && item.token_type === CERTIFICATE_TOKEN_TYPE.BONUS)
		this.bonusPurchased = !!bonusNft
		newList.forEach((item, index) => {
		  const foundIndex = this.ownedCertificates.findIndex(oItem => oItem.year === item.year && oItem.month === item.month )
		  if (foundIndex >= 0) {
			newList[index] = {
			  ...this.ownedCertificates[foundIndex],
			  image: this.getCertificateImage(newList[index])
			}
			if (this.ownedCertificates[foundIndex].year === currYear) {
			  currYearCertCount++
			}
			ownedCount++
		  } else {
			if (newList[index].year === currYear && newList[index].month < currMonth) {
			  const foundSaleIndex = this.saleCertificates.findIndex(oItem => oItem.year === item.year && oItem.month === item.month && oItem.year === currYear && oItem.month !== currMonth)
			  if (foundSaleIndex >= 0) {
				newList[index].offset = false
				newList[index].contract_id = this.saleCertificates[foundSaleIndex].contract_id
				newList[index].price = this.saleCertificates[foundSaleIndex].price
			  }
			}
		  }
		})
		if (currMonth < 12) {
		  for (let i = currMonth + 1; i <= 12; i++) {
			const foundIndex = this.ownedCertificates.findIndex(oItem => oItem.year === currYear && oItem.month === i)
			if (foundIndex >= 0) {
			  newList.push(this.ownedCertificates[foundIndex])
			}
		  }
		}

		this.certificateList = newList
		this.currYearCertCount = currYearCertCount
		this.changeFilter()
	  }
	},
	changeFilter() {
	  if (this.myCertificate) {
		this.filteredCertificates = this.ownedCertificates.filter(item => item.year === this.yearFilter)
	  } else {
		this.filteredCertificates = this.certificateList
	  }
	},
	changeMyCertificateStatus() {
	  this.myCertificate = !this.myCertificate
	  this.changeFilter()
	},
	showExchangeTokenModal() {
	  this.showExchangeBonus = false
	  this.showExchangeToken = true
	},
	filterByYear(yearStr) {
	  let newCertifictes = []
	  const year = parseInt(yearStr)
	  this.yearFilter = year
	  this.certificateList = this.getCertificatesOfYear(year)
	  this.changeFilter()
	},
	gotoLending() {
	  this.sendEvent({
		category: 'Browse',
		eventName: 'minter_enter',
		properties: {
		  minter_enter: 'Tracker_button'
		}
	  })
	  this.$router.push('/lending')
	}
  }
}
</script>

<style lang="scss" scoped>
.carbon {
  &__title {
	padding-bottom: 1rem;
	font-family: Cabin-Medium;
	font-weight: 500;
	font-size: 3.2rem;
	text-align: center;
  }
  &__tracker {
	padding-top: 4.2rem;
  	padding-bottom: 6rem;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	&-year {
	  margin: 0 auto;
	  text-align: center;
	  font-weight: 600;
	  font-size: 1.6rem;
	  color: $grayDark;
	}
	&-picker {
	  width: 8.2rem;
	  margin: 0 auto;
	}
	&-block {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding-top: 6rem;
	  &-status {
		width: 40.2rem;
		height: 40.2rem;
		margin-right: 14.6rem;
		position: relative;
		&-bg {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  position: absolute;
		  left: 50%;
		  top: 50%;
		  width: 27rem;
		  height: 27rem;
		  transform: translate(-50%, -50%);
		  &-img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		  }
		  &-leaf {
			position: relative;
		  }
		}
	  }
	  &-info {
		&-summary {
		  width: 39.1rem;
		  padding: 1.8rem 1.6rem;
		  border: 1px solid $modalColor;
		  border-radius: 8px;
		  &-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 1.6rem;
			margin-bottom: 2rem;
			&-content {
			  font-weight: 600;
			}
			&:last-child {
			  margin: 0;
			  padding-top: 1.3rem;
			  border-top: 1px solid #F3F4F6;
			  * {
				font-weight: 600;
				color: $green;
			  }
			  color: $green;
			}
		  }
		}
		&-certificate {
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  width: 100%;
		  margin-top: 2.8rem;
		  &-button {
			padding: 1.3rem 2.4rem;
			border-radius: 2.3rem;
			font-weight: 600;
    		font-size: 1.6rem;
    		color: $grayDark;
			&::after {
			  background: linear-gradient(to right, #365BE0, #D676CF, #FFE884);
			}
		  }
		  &-bonus {
			display: flex;
			cursor: pointer;
		  }
		  &-img {
			width: 3.4rem;
		  }
		}
	  }
	}
  }
  &__certificates {
	padding: 5.8rem 6rem 0;
	.carbon__title {
	  padding-bottom: 0;
	}
	&-header {
	  display: flex;
	  justify-content: flex-end;
	  &-switch {
		::v-deep .custom-switch-text {
		  font-weight: 400;
		}
	  }
	}
	&-list {
	  display: grid;
	  grid-template-columns: repeat(6, 20rem);
	  grid-column-gap: 2.4rem;
	  grid-row-gap: 3.5rem;
	  padding-top: 5.4rem;
	  padding-bottom: 2.4rem;
	}
  }
  @media (max-width: 460px) {
	&__title {
	  padding-bottom: 2.5rem;
	  font-family: OpenSans-SemiBold;
	  font-weight: 600;
	  font-size: 1.8rem;
	}
	&__tracker {
	  padding-top: 2.5rem;
	  padding-bottom: 2.8rem;
	  &-block {
		display: block;
		padding-top: 4.4rem;
		&-status {
		  width: 28.8rem;
		  height: 28.8rem;
		  margin: 0 auto 4.3rem;
		  &-bg {
			width: 19.2rem;
			height: 19.2rem;
		  }
		}
		&-info {
		  &-summary {
			width: calc(100% - 5rem);
			margin: 0 0.8rem;
			padding: 1.4rem 1.6rem;
			&-item {
			  margin-bottom: 1.2rem;
			  font-size: 1.4rem;
			  &:last-child {
				padding-top: 1.6rem;
			  }
			}
		  }
		  &-certificate {
			width: calc(100% - 1.6rem);
			margin: 2.8rem 0.8rem 0;
    		flex-direction: column-reverse;
			&-button {
			  width: 100%;
    		  margin-top: 2.4rem;
    		  font-size: 1.4rem;
			}
			&-img {
			  width: 2.3rem;
			}
		  }
		}
	  }
	}
	&__certificates {
	  padding: 3.2rem 0.8rem 0;
	  .carbon__title {
		font-size: 1.6rem;
	  }
	  &-list {
		padding-top: 4rem;
		grid-template-columns: repeat(2, 14.4rem);
		grid-column-gap: 1.6rem;
		grid-row-gap: 1.6rem;
	  }
	}
  }
}
</style>
