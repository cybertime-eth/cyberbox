<template>
	<section id="carbon">
		<div class="carbon">
			<div class="carbon__tracker">
				<h2 class="carbon__title">Personal carbon offset tracker</h2>
				<CustomSelect class="carbon__tracker-picker" :options="dateOptions" />
				<div class="carbon__tracker-block">
					<div class="carbon__tracker-block-status">
						<div class="carbon__tracker-block-status-bg">
							<img class="carbon__tracker-block-status-bg-img" src="/occupancy.svg">
							<img class="carbon__tracker-block-status-bg-leaf" src="/leaf-tiny.svg">
							<!-- <img class="carbon__tracker-block-status-bg-leaf" src="/leaf-small.svg">
							<img class="carbon__tracker-block-status-bg-leaf" src="/leaf-medium.svg">
							<img class="carbon__tracker-block-status-bg-leaf" src="/leaf-large.svg"> -->
						</div>
					</div>
					<div class="carbon__tracker-block-info">
						<div class="carbon__tracker-block-info-summary">
							<div class="carbon__tracker-block-info-summary-item">
								<span class="carbon__tracker-block-info-summary-item-name">NFT Carbon certificates</span>
								<span class="carbon__tracker-block-info-summary-item-conent">4.3 ton CO2</span>
							</div>
							<div class="carbon__tracker-block-info-summary-item">
								<span class="carbon__tracker-block-info-summary-item-name">NFT Traiding CO2 offset</span>
								<span class="carbon__tracker-block-info-summary-item-conent">3.3 ton CO2</span>
							</div>
							<div class="carbon__tracker-block-info-summary-item total">
								<span class="carbon__tracker-block-info-summary-item-name">Total CO2 offset</span>
								<span class="carbon__tracker-block-info-summary-item-conent">5.8 ton CO2</span>
							</div>
						</div>
						<div class="carbon__tracker-block-info-certificate">
							<button class="carbon__tracker-block-info-certificate-button gradient-button" @click="$router.push('/certificate/1')">Offset Carbon certificates</button>
							<img class="carbon__tracker-block-info-certificate-img" src="/gift.svg" alt="gift">
						</div>
					</div>
				</div>
			</div>
			<div class="carbon__certificates">
				<h2 class="carbon__title">NFT Carbon Offset Certificates</h2>
				<div class="carbon__certificates-header">
					<div class="carbon__certificates-header-tab">
						<p class="carbon__certificates-header-tab-item" :class="{active: activeTab === 1}" @click="changeTab(1)">My certificates</p>
						<p class="carbon__certificates-header-tab-item" :class="{active: activeTab === 2}"  @click="changeTab(2)">All certificates</p>
					</div>
					<CustomSelect class="carbon__certificates-header-picker" :options="certificateDateOptions" />
				</div>
				<div class="carbon__certificates-list">
					<certificate :certificate="certificate" :key="idx" v-for="(certificate, idx) of certificateList"/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import CustomSelect from '@/components/utility/CustomSelect.vue'
import certificate from '@/components/certificate.vue'
export default {
  components: {
	CustomSelect,
	certificate
  },
  data() {
	return {
	  activeTab: 2,
	  certificateList: []
	}
  },
  computed: {
	dateOptions() {
	  return [
		{ key: '2022', value: '2022' },
		{ key: '2021', value: '2021' },
		{ key: '2020', value: '2020' }
	  ]
	},
	certificateDateOptions() {
	  return [
		{ key: '2022', value: '2022' },
	  ]
	},
	address() {
	  return this.$store.state.address
	}
  },
  created() {
	const dataList = []
	const today = new Date()
	const currMonth = today.getMonth()
	for (let i = 4; i < 12; i++) {
	  const date = new Date(today.getFullYear(), i, 1)
	  const month = date.toLocaleString('en-us', { month: 'long' })
	  dataList.push({
		name: `${month} ${date.getFullYear()}`,
		image: i <= currMonth ? '/carbon.svg' : '/question-mark.svg',
		future: i > currMonth,
		month: i
	  })
	}
	this.certificateList = dataList
  },
  async mounted() {
	this.updateCertificateList()
  },
  watch: {
	address() {
	  this.updateCertificateList()
	}
  },
  methods: {
	async updateCertificateList() {
	  if (this.$store.state.address) {
		const newList = JSON.parse(JSON.stringify(this.certificateList))
		const nftId = await this.$store.dispatch('getCurrentMonthNFTID')
		if (nftId > 0) {
		  const today = new Date()
		  const currMonth = today.getMonth()
		  const index = newList.findIndex(item => item.month === currMonth)
		  if (index >= 0) {
			newList[index].owner = this.$store.state.fullAddress
		  }
		  this.certificateList = newList
		}
	  }
	},
	changeTab(tab) {
	  if (this.activeTab !== tab) {
		this.activeTab = tab
	  }
	}
  }
}
</script>

<style lang="scss" scoped>
.carbon {
  padding-top: 4.2rem;
  padding-bottom: 10.2rem;
  &__title {
	padding-bottom: 1rem;
	font-family: Cabin-Medium;
	font-weight: 500;
	font-size: 3.2rem;
	text-align: center;
  }
  &__tracker {
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	&-picker {
	  width: 8.2rem;
	  margin: 0 auto;
	}
	&-block {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding-top: 6rem;
	  padding-bottom: 7.8rem;
	  &-status {
		width: 40.2rem;
		height: 34.9rem;
		margin-right: 14.6rem;
		position: relative;
		background: lightgreen;
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
	  padding-bottom: 5rem;
	}
	&-header {
	  display: flex;
      align-items: center;
      justify-content: space-between;
	  &-tab {
		display: flex;
		&-item {
		  padding: 0.6rem 1.6rem;
		  font-size: 1.4rem;
		  cursor: pointer;
		  &.active {
			background: $lightGreen;
		  }
		}
	  }
	  &-picker {
		width: 8.2rem;
	  }
	}
	&-list {
	  display: grid;
	  grid-template-columns: repeat(6, 20rem);
	  grid-column-gap: 2.4rem;
	  grid-row-gap: 3.5rem;
	  padding-top: 4.4rem;
	}
  }
  @media (max-width: 460px) {
	padding-top: 2.5rem;
	&__title {
	  padding-bottom: 2.5rem;
	  font-family: OpenSans-SemiBold;
	  font-weight: 600;
	  font-size: 1.8rem;
	}
	&__tracker {
	  &-block {
		display: block;
		padding-top: 4.4rem;
		padding-bottom: 4.1rem;
		&-status {
		  width: 28.8rem;
		  height: 24.8rem;
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
		padding-bottom: 4rem;
		font-size: 1.6rem;
	  }
	  &-header {
		display: block;
		&-picker {
		  margin: 1.6rem auto 0;
		}
	  }
	  &-list {
		grid-template-columns: repeat(2, 14.4rem);
		grid-column-gap: 1.6rem;
		grid-row-gap: 1.6rem;
	  }
	}
  }
}
</style>
