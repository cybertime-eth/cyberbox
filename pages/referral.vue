<template>
    <section id="referral">
        <div class="referral">
            <div class="referral__main">
                <div class="referral__main-summary">
                    <h2 class="referral__main-summary-title">
                        <span class="referral__main-summary-title-invite">Invite your friends</span> and earn<br/>money on helping nature
                    </h2>
                    <ul class="referral__main-summary-features indent-features-list">
                      	<li class="indent-features-list-item">
							<span class="indent-features-list-item-mark"/>
							<p class="indent-features-list-item-text">Get passive income from referral for 1 year or more</p>
						</li>
						<li class="indent-features-list-item">
							<span class="indent-features-list-item-mark"/>
							<p class="indent-features-list-item-text">Payment immediately to your wallet!</p>
						</li>
						<li class="indent-features-list-item">
							<span class="indent-features-list-item-mark"/>
							<p class="indent-features-list-item-text">Dynamic % of reward</p>
						</li>
						<li class="indent-features-list-item">
							<span class="indent-features-list-item-mark"/>
							<p class="indent-features-list-item-text">You not only earn, but contribute to the regeneration of nature!</p>
						</li>
						<li class="indent-features-list-item">
							<span class="indent-features-list-item-mark"/>
							<p class="indent-features-list-item-text">A unique and beautiful NFT product that you want to recommend to friends</p>
						</li>
                    </ul>
                    <a class="referral__main-summary-reward" @click="showRewardModal = true">How to get rewarded?</a>
                </div>
                <div class="referral__main-info">
                    <div class="referral__main-info-block">
                        <div class="referral__main-info-block-invited">
							<div class="referral__main-info-block-status">
								<p class="referral__main-info-block-status-count">{{ ownerInfo.clicksInfo['total'] }}</p>
								<p class="referral__main-info-block-status-name">Total invited</p>
							</div>
							<div class="referral__main-info-block-status">
								<p class="referral__main-info-block-status-count">{{ ownerInfo.totalCount }}</p>
								<p class="referral__main-info-block-status-name">Total sales</p>
							</div>
						</div>
						<div class="referral__main-info-block-status">
							<p class="referral__main-info-block-status-count">
								<img :src="getCDNImage('celo.svg')" alt="celo">
								<span class="referral__main-info-block-status-count-amount">{{ formattedEarning(ownerInfo.refer_fee) }}</span>
							</p>
							<p class="referral__main-info-block-status-name">Total earned</p>
							<div class="referral__main-info-block-status-tooltip">
								<img class="referral__main-info-block-status-tooltip-mark" src="/question-gradient.svg" alt="question">
							</div>
						</div>
                    </div>
                    <div class="referral__main-info-address">
                        <div class="referral__main-info-address-block gradient-block" @click="copyReferralLink">
                            <span class="referral__main-info-address-name"> {{ !this.addressCopied ? 'Referral link:' : 'Copied' }} </span>
                            <span class="referral__main-info-address-link">{{ cuttenReferralLink(this.referralUrl) }}</span>
                        </div>
                        <div class="referral__main-info-address-share">
                            <ShareFrame class="referral__main-info-address-share-frame" :class="{ copied: addressCopied }" @onShared="linkShared = true"/>
                        </div>
                    </div>
					<a class="referral__main-info-link" href="/calendar">
						<span class="referral__main-info-link-name">Check promote page</span>
						<span class="referral__main-info-link-arrow">&#x276F;</span>
					</a>
                </div>
            </div>
			<div class="referral__offer gradient-block" v-if="showOfferBlock">
				<a class="referral__offer-close" @click="closeOffer">&#x2715;</a>
				<h2 class="referral__offer-title">Launch offer <img :src="getCDNImage('fire.svg')"></h2>
				<p class="referral__offer-content">
					Get <span class="referral__offer-content-sale">10%</span> <span class="referral__offer-content-percent">100%</span> <b>reward</b> from the sale of the referral until <b>September 1, 2022</b>
				</p>
				<p class="referral__offer-date">Will end in: <b>{{ offerDate }}</b></p>
			</div>
            <div class="referral__certificates">
				<client-only>
					<vue-glide
						class="referral__certificates-glide"
						v-model="sliderActive"
						ref="slider"
						type="carousel"
						:perView="this.isMobile() ? 2.5 : 7"
						:autoplay="1000"
					>
						<vue-glide-slide v-for="(certificate, idx) in certificates" :key="idx">
							<img class="referral__certificates-img" :src="certificate" alt="certificate">
						</vue-glide-slide>
					</vue-glide>
				</client-only>
            </div>
            <div class="referral__list">
                <div class="referral__list-filter">
                    <div class="referral__list-filter-name">
                        <p class="referral__list-filter-name-referral">Top 10 referrals</p>
                        <img class="referral__list-filter-name-img" src="/star-filled.svg" alt="star">
                    </div>
                    <div class="referral__list-filter-items">
                        <p class="referral__list-filter-items-item" :class="{ active: activeFilter === 0 }" @click="changeFilter(0)">24h</p>
                        <p class="referral__list-filter-items-item" :class="{ active: activeFilter === 1 }" @click="changeFilter(1)">7d</p>
                        <p class="referral__list-filter-items-item" :class="{ active: activeFilter === 2 }" @click="changeFilter(2)">30d</p>
                    </div>
                </div>
                <div class="referral__list-owner">
                    <div class="referral__list-owner-header">
                        <p>#</p>
                        <p>Wallet</p>
                        <p>Clicks</p>
                        <p>Sales</p>
                        <p>Earning</p>
                    </div>
                    <!-- <p class="referral__list-owner-position">Your position</p>
                    <div class="referral__list-owner-info">
                        <p>-</p>
                        <p><b>{{ cuttenAddress(this.address) }}</b></p>
                        <p>{{ getClickCountFromReferer(ownerInfo) }}</p>
                        <p>{{ ownerInfo.totalCountInDate }}</p>
                        <p class="referral__list-celo">
                            <img class="referral__list-celo-img" :src="getCDNImage('celo.svg')" alt="celo">
                            <span class="referral__list-celo-price">{{ formattedEarning(ownerInfo.refer_fee) }}</span>
                        </p>
                    </div> -->
                </div>
                <div class="referral__list-users">
                    <div class="referral__list-users-list" :key="idx" v-for="(userInfo, idx) of referralList">
                        <div class="referral__list-users-list-item">
                            <p>{{ idx + 1 }}</p>
                            <p><b>{{ cuttenAddress(userInfo.referAddress) }}</b></p>
                            <p>{{ getClickCountFromReferer(userInfo) }}</p>
                            <p>{{ userInfo.totalCount }}</p>
                            <p class="referral__list-celo">
                                <img class="referral__list-celo-img" :src="getCDNImage('celo.svg')" alt="celo">
                                <span class="referral__list-celo-price">{{ formattedEarning(userInfo.refer_fee) }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<RewardInfoModal @closeModal="showRewardModal = false" v-if="showRewardModal"/>
    </section>
</template>

<script>
import ShareFrame from '@/components/ShareFrame.vue'
import RewardInfoModal from '@/components/modals/rewardInfoModal.vue'
const LAST_OFFER_VIEWED = 'last_offer_viewed'

export default {
  components: {
	ShareFrame,
	RewardInfoModal
  },
  data() {
    return {
      addressCopied: false,
      linkShared: false,
      showRewardModal: false,
      activeFilter: 0,
      referralUrl: '',
      certificates: [],
      ownerInfo: {
        referAddress: '',
        refer_fee: 0,
		totalCount: 0,
		clicksInfo: {
		  'total': 0
		}
      },
	  referralList: [],
	  sliderActive: 0,
	  sliderOptions: {
		// type: 'carousel'
		perView: 6
	  },
	  showOfferBlock: false,
	  offerDate: ''
	}
  },
  head() {
    return {
      meta: [
        { hid: 'og:image', property: 'og:image', content: this.getCDNImage('referral-banner.webp') }
      ]
    }
  },
  computed: {
    address() {
      return this.$store.state.address
	}
  },
  watch: {
    address() {
      if (this.$store.state.address) {
		this.updateReferralUrl()
      }
    },
  },
  async created() {
    this.loadReferralData()
    this.updateReferralUrl()
    const images = []
    for (let i = 0; i < 13; i++) {
      if (i !== 12) {
        images.push(this.getCDNImage(`certificates/${i + 1}.webp`))
      } else {
        images.push(this.getCDNImage('certificates/rare.webp'))
      }
    }
	this.certificates = images
  },
  async mounted() {
    if (process && process.browser) {
      const footerEl = document.querySelector('.footer')
	  footerEl.classList.remove('fixed')

	  const lastOfferShownTime = localStorage.getItem(LAST_OFFER_VIEWED)
	  const date = new Date()
	  const currTime = date.getTime()
	  const offerTime = new Date(2022, 8, 1).getTime() // 20022/09/01
	  const currDate = date.getDate()
	  const lastSavedDate = lastOfferShownTime ? new Date(parseInt(lastOfferShownTime)).getDate() : null
	  const currDay = date.getDay()
	  if (currTime < offerTime && (!lastSavedDate || (date.getDay() === 1 && lastSavedDate && currDate !== lastSavedDate))) {
		let difference = offerTime - currTime
		const offerDay = Math.floor(difference/1000/60/60/24)
		difference -= offerDay*1000*60*60*24

		const offerHour = Math.floor(difference/1000/60/60)
		difference -= offerHour*1000*60*60

		const offerMintue = Math.floor(difference/1000/60)
		difference -= offerMintue*1000*60
		this.offerDate = `${this.formatTimeNumber(offerDay)}d:${this.formatTimeNumber(offerHour)}h:${this.formatTimeNumber(offerMintue)}m`
		this.showOfferBlock = true
	  }
	}
  },
  methods: {
	formatTimeNumber(number) {
	  return number > 9 ? number : `0${number}`
	},
    updateReferralUrl() {
      if (process && process.browser && this.address) {
		this.referralUrl = location.origin + '/calendar' + `?referral=${this.$store.state.fullAddress}`
	  }
    },
    cuttenAddress(address) {
	  if (address) {
		if (!address.includes('.nom')) {
		  const startID = ['0x']
		  const endID = address.split("").slice(-4)
		  const dotArr = [".", ".", "."]
		  return startID
			.concat(dotArr)
			.concat(endID)
			.join("")
		} else {
		  return address
		}
	  } else {
        return '-'
      }
    },
    formattedEarning(value) {
      const price = value / Math.pow(10, 7)
      const diff = price - Math.floor(price)
      const floatingLen = diff.toString().length - 2
      if (diff === 0) {
        return price
      } else {
        if (floatingLen > 3) {
          return price.toFixed(3)
        } else {
          return price.toFixed(floatingLen)
        }
      }
	},
	getClickCountFromReferer(refererInfo) {
	  let countKey = ''
	  switch (this.activeFilter) {
		case 0: countKey = '24h'
		  break
		case 1: countKey = '7d'
		  break
		case 2: countKey = '30d'
		  break
	  }
	  return refererInfo.clicksInfo ? (refererInfo.clicksInfo[countKey] || 0) : 0
	},
    async loadReferralData() {
      const referralData = await this.$store.dispatch('getReferralData', this.activeFilter)
      if (!referralData) return
      if (referralData.userInfo) {
        this.ownerInfo = referralData.userInfo
      }
      this.referralList = referralData.userList.sort((b, a) => a.refer_fee - b.refer_fee)
    },
    copyReferralLink() {
	  this.addressCopied = true
	  this.$copyText(this.referralUrl)
	  setTimeout(() => this.addressCopied = false, 1000)
	},
	closeOffer() {
	  this.showOfferBlock = false
	  if (process && process.browser) {
		localStorage.setItem(LAST_OFFER_VIEWED, new Date().getTime())
	  }
	},
    changeFilter(filter) {
      const oldFilter = this.activeFilter
      this.activeFilter = filter
      if (filter !== oldFilter) {
        this.referralList = []
        this.loadReferralData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.referral {
  .gradient-block {
	position: relative;
	&::after {
	  position: absolute;
	  top: -.15rem; bottom: -.15rem;
	  left: -.15rem; right: -.15rem;
	  content: '';
	  background: linear-gradient(to right, #365BE0, #D676CF, #FFE884);
	  z-index: -1;
	  border-radius: 2.5rem;
	}
  }
  &__main {
    display: flex;
    justify-content: space-between;
    padding: 5.3rem 32.4rem 6.8rem 12rem;
    &-summary {
      max-width: 44.2rem;
      &-title {
        line-height: 3.6rem;
        font-family: Cabin-Medium;
        font-weight: 500;
        font-size: 3.2rem;
        &-invite {
          color: $pink;
        }
      }
      &-features {
		margin-top: 1.6rem;
		.indent-features-list-item {
		  align-items: center;
		  &:nth-child(4), &:last-child {
			align-items: flex-start;
			margin-top: 1.5rem;
			.indent-features-list-item-text {
			  transform: translateY(-0.7rem);
			}
		  }
		  &-text {
			max-width: 27.9rem;
		  }
		}
      }
      &-reward {
        display: block;
        margin-top: 1.4rem;
        font-weight: 600;
        font-size: 1.4rem;
        color: $pink;
        cursor: pointer;
      }
    }
    &-info {
      &-block {
		// background: rgba(255, 255, 255, 0.9);
		width: 28.2rem;
		&-invited {
		  display: flex;
		  .referral__main-info-block-status {
			flex: 1;
			padding: 1.7rem 0;
			margin: 0;
		    &:first-child {
			  margin-right: 1.6rem;
			}
			&-count {
			  font-family: OpenSans-SemiBold;
			  font-size: 1.8rem;
			}
		  }
		}
        &-status {
		  background: $white;
		  padding: 1rem 0;
		  margin-top: 1.6rem;
		  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
		  border-radius: 0.8rem;
		  text-align: center;
		  position: relative;
		  &-tooltip {
			position: absolute;
			top: 0.9rem;
			right: 0.9rem;
			&-mark {
			  width: 1.3rem;
			}
		  }
		  &-count {
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: Cabin-Medium;
			font-weight: 600;
			font-size: 3.2rem;
			img {
			  width: 2.4rem;
			  margin-right: 0.8rem;
			}
		  }
		  &-name {
			margin-top: 0.8rem;
			font-size: 1.4rem;
			color: $grayLight;
		  }
		}
      }
      &-address {
        display: flex;
        align-items: center;
        margin-top: 3.6rem;
        &-block {
          margin-right: 1.6rem;
          padding: 0.8rem 1.6rem;
          background: $white;
          border: 1px solid transparent;
          border-radius: 2.5rem;
          font-size: 1.4rem;
          cursor: pointer;
        }
        &-name {
          margin-right: 1.2rem;
        }
        &-link {
          font-weight: 600;
          font-size: 1.4rem;
        }
	  }
	  &-link {
		display: flex;
		align-items: center;
		margin-top: 3.6rem;
		&-name {
		  margin-right: 1rem;
		  font-family: OpenSans-Regular;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $grayLight;
		}
		&-arrow {
		  font-size: 1.2rem;
		  color: $grayLight;
		}
		&:hover {
		  .referral__main-info-link-name {
			text-decoration: underline;
		  }
		}
	  }
    }
  }
  &__offer {
	width: 29.3rem;
	margin: 0 auto 6.8rem;
	padding: 1.6rem;
	background: $white;
	border-radius: 1.2rem;
	position: relative;
	text-align: center;
	font-size: 1.4rem;
	&.gradient-block::after {
	  border-radius: 1.2rem;
	}
	&-close {
	  position: absolute;
	  top: 1.5rem;
	  right: 1.4rem;
	  font-size: 1.4rem;
	  color: $border;
	  cursor: pointer;
	}
	&-title {
	  font-weight: 600;
	  font-size: 2.2rem;
	  color: $grayDark;
	  img {
		width: 2rem;
     	transform: translateY(0.2rem);
	  }
	}
	&-content {
	  margin-top: 0.8rem;
	  &-sale {
		text-decoration: line-through;
		color: $border;
	  }
	  &-percent {
		font-weight: 600;
		color: $pink;
	  }
	  b {
		font-weight: 600;
	  }
	}
	&-date {
	  margin-top: 1.4rem;
	}
  }
  &__certificates {
	&-glide {
	  transform: translateX(-1.2rem);
	  .glide {
		::v-deep &__track {
		  overflow: visible;
		}
		&__slide {
		  width: 20rem !important;
		  height: 20rem !important;
		  transition: all 0.3s;
		  border-radius: 0.4rem;
		}
	  }
	}
	&-img {
	  width: 20rem;
	  height: 20rem;
	  border-radius: 0.4rem;
	}
  }
  &__list {
    padding: 8.8rem 12rem;
    &-filter {
      display: flex;
      align-items: center;
      &-name {
        display: flex;
        align-items: center;
        margin-right: 5.9rem;
        &-referral {
          margin-right: 1rem;
          font-weight: 600;
          font-size: 2.2rem;
        }
        &-img {
          width: 2rem;
        }
      }
      &-items {
        display: flex;
        &-item {
          padding: 0.6rem 3.1rem;
          font-size: 1.4rem;
          border: 1px solid $modalColor;
		  cursor: pointer;
		  &:first-child {
			border-radius: 2.5rem 0 0 2.5rem;
		  }
		  &:last-child {
			border-radius: 0 2.5rem 2.5rem 0;
		  }
          &.active {
            background: $lightGreen;
            border-color: transparent;
          }
        }
      }
    }
    &-owner {
      margin-top: 3.2rem;
      &-header, &-info {
        display: grid;
        grid-template-columns: 3rem 38.1rem 32rem 39rem 5.4rem;
        background: #FCFCFC;
        padding: 0.6rem 0.8rem;
        p {
          font-size: 1.4rem;
          color: $border;
          b {
            font-weight: 600;
          }
        }
      }
      &-position {
        margin-top: 2rem;
        padding-left: 0.8rem;
        font-weight: 600;
        font-size: 1.2rem;
        color: $green;
      }
      &-info {
        background: transparent;
        grid-template-columns: 4.6rem 36.6rem 32rem 36.2rem 7.5rem;
        margin: 0.8rem 0.8rem 0;
        padding: 3rem 0.8rem 3rem 0;
        border-top: 1px solid rgba(156, 163, 175, 0.4);
        border-bottom: 1px solid rgba(156, 163, 175, 0.4);
        p {
          font-size: 1.6rem;
          color: $textColor;
        }
      }
    }
    &-celo {
      display: flex;
	  align-items: center;
	  justify-content: flex-end;
      &-img {
        width: 2rem;
        margin-right: 0.8rem;
      }
      &-price {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }
    &-users {
      padding: 0 0.8rem;
      margin-top: 2rem;
      &-name {
        font-weight: 600;
        font-size: 1.2rem;
        color: $border;
      }
      &-list {
        margin-top: 0.8rem;
        &-item {
          display: grid;
          grid-template-columns: 4.6rem 36.6rem 32rem 36.2rem 7.5rem;
          padding: 3rem 0;
          border-top: 1px solid rgba(156, 163, 175, 0.4); 
          p {
            font-size: 1.6rem;
            b {
              font-weight: 600;
            }
          }
        }
      }
    }
  }
  @media (max-width: 460px) {
    &__main {
      display: block;
	  padding: 2.4rem 0.8rem 6rem;
	  .gradient-block::after {
		top: -.2rem; bottom: -.2rem;
	  	left: -.2rem; right: -.2rem;
	  }
      &-summary {
        max-width: none;
        &-title {
          line-height: 2.2rem;
          font-size: 2.2rem;
        }
        &-features {
          margin-top: 0.8rem;
        }
        &-reward {
          margin-top: 0.6rem;
        }
      }
      &-info {
        &-block {
          margin-top: 5.7rem;
          width: 100%;
        }
        &-address {
		  margin-top: 2.8rem;
		  margin-right: 1rem;
          &-block {
			flex: 1;
            padding: 1rem 1.6rem;
          }
		}
		&-link {
		  margin-top: 2.8rem;
		}
      }
	}
	&__offer {
	  width: calc(100% - 4.8rem);
	}
    &__certificates {
	  &-glide {
		transform: translateX(-2.6rem);
		.glide {
		  &__slide {
			width: 13.5rem !important;
			height: 13.5rem !important;
		  }
		}
	  }
      &-img {
        width: 13.5rem;
        height: 13.5rem;
      }
    }
    &__list {
      padding: 7.3rem 0.8rem;
      &-filter {
        display: block;
        &-name {
          margin: 0;
          &-referral {
            font-size: 1.6rem;
          }
        }
        &-items {
          width: 100%;
          margin-top: 2.9rem;
          &-item {
            flex: 1;
            padding: 0.4rem 2rem;
            text-align: center;
          }
        }
      }
      &-owner {
        margin-top: 2.8rem;
        &-header {
          padding: 0.8rem;
          grid-template-columns: 3.3rem 8rem 7.3rem 5.5rem 4.7rem;
          p {
            font-size: 1.2rem;
          }
        }
        &-position {
          margin-top: 0.8rem;
        }
        &-info {
          grid-template-columns: 3.3rem 7.4rem 4rem 6rem 7.8rem;
          padding-top: 2.2rem;
          padding-bottom: 2.2rem;
          p {
            font-size: 1.4rem;
            &:nth-child(3), &:nth-child(4) {
              text-align: right;
            }
          }
        }
      }
      &-celo {
        justify-content: flex-end;
        &-img {
          width: 1.5rem;
        }
        &-price {
         font-size: 1.4rem;
        }
      }
      &-users {
        margin-top: 0.8rem;
        &-list {
          &-item {
            grid-template-columns: 3.3rem 7.4rem 4rem 6rem 7.8rem;
            padding-top: 2.2rem;
            padding-bottom: 2.2rem;
            p {
              font-size: 1.4rem;
              &:nth-child(3), &:nth-child(4) {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
}
</style>
