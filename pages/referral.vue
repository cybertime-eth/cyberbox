<template>
    <section id="referral">
        <div class="referral">
            <div class="referral__main">
                <div class="referral__main-summary">
                    <h2 class="referral__main-summary-title">
                        <span class="referral__main-summary-title-invite">Invite your friends</span> and earn<br/>money on helping nature
                    </h2>
                    <p class="referral__main-summary-description">Get income 10% from CyberBox profit of NFT Offset Certificate within one year. Just send your referral link to friends and acquaintances, tell us how personal <b>NFT Offset certificates</b> work and get passive income!</p>
                    <a class="referral__main-summary-reward" @click="showRewardModal = true">How to get rewarded?</a>
                </div>
                <div class="referral__main-info">
                    <div class="referral__main-info-block">
                        <div class="referral__main-info-block-withdraw">
                            <div class="referral__main-info-block-withdraw-price">
                                <div class="referral__main-info-block-withdraw-price-block">
                                    <img class="referral__main-info-block-withdraw-price-block-celo" :src="getCDNImage('celo.svg')" alt="celo">
                                    <p class="referral__main-info-block-withdraw-price-block-value">{{ ownerInfo.refer_fee ? ownerInfo.refer_fee.toFixed(1) : 0 }}</p>
                                </div>
                                <p class="referral__main-info-block-withdraw-ready">Ready for withdraw</p>
                            </div>
                        </div>
                        <div class="referral__main-info-block-total">
                            <div class="referral__main-info-block-total-status">
                                <p class="referral__main-info-block-total-status-count">0</p>
                                <p class="referral__main-info-block-total-status-name">Total invited</p>
                            </div>
                            <div class="referral__main-info-block-total-status">
                                <p class="referral__main-info-block-total-status-count">{{ ownerInfo.totalCount }}</p>
                                <p class="referral__main-info-block-total-status-name">Total sales</p>
                            </div>
                            <div class="referral__main-info-block-total-status">
                                <p class="referral__main-info-block-total-status-count">
                                    <img :src="getCDNImage('celo.svg')" alt="celo">
                                    <span class="referral__main-info-block-total-status-count-amount">{{ formattedEarning(ownerInfo.refer_fee) }}</span>
                                </p>
                                <p class="referral__main-info-block-total-status-name">Total earned</p>
                            </div>
                        </div>
                    </div>
                    <div class="referral__main-info-address">
                        <div class="referral__main-info-address-block" @click="copyReferralLink">
                            <span class="referral__main-info-address-name"> {{ !this.addressCopied ? 'Referral link:' : 'Copped' }} </span>
                            <span class="referral__main-info-address-link">{{ cuttenReferralLink(this.referralUrl) }}</span>
                        </div>
                        <div class="referral__main-info-address-share">
                            <ShareFrame class="referral__main-info-address-share-frame" :class="{ copied: addressCopied }" @onShared="linkShared = true"/>
                        </div>
                    </div>
                </div>
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
                    <p class="referral__list-owner-position">Your position</p>
                    <div class="referral__list-owner-info">
                        <p>115</p>
                        <p><b>{{ cuttenAddress(this.address) }}</b></p>
                        <p>-</p>
                        <p>{{ ownerInfo.totalCount }}</p>
                        <p class="referral__list-celo">
                            <img class="referral__list-celo-img" :src="getCDNImage('celo.svg')" alt="celo">
                            <span class="referral__list-celo-price">{{ formattedEarning(ownerInfo.refer_fee) }}</span>
                        </p>
                    </div>
                </div>
                <div class="referral__list-users">
                    <p class="referral__list-users-name">All users</p>
                    <div class="referral__list-users-list" :key="idx" v-for="(userInfo, idx) of referralList">
                        <div class="referral__list-users-list-item">
                            <p>{{ idx + 1 }}</p>
                            <p><b>{{ cuttenAddress(userInfo.referAddress) }}</b></p>
                            <p>-</p>
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
        totalCount: 0        
      },
	  referralList: [],
	  sliderActive: 0,
	  sliderOptions: {
		// type: 'carousel'
		perView: 6
	  }
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
	}
  },
  methods: {
    updateReferralUrl() {
      if (process && process.browser && this.address) {
		this.referralUrl = location.origin + location.pathname + `?referral=${this.$store.state.fullAddress}`
	  }
    },
    cuttenAddress(address) {
	  if (address) {
		const startID = ['0x']
		const endID = address.split("").slice(-4)
		const dotArr = [".", ".", "."]
		return startID
		  .concat(dotArr)
		  .concat(endID)
		  .join("")
	  } else {
        return '-'
      }
    },
    formattedEarning(value) {
      const price = value / 1000
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
  &__main {
    display: flex;
    justify-content: space-between;
    padding: 5.3rem 12rem 8.5rem;
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
      &-description {
        margin-top: 1.6rem;
        line-height: 2.2rem;
        font-size: 1.8rem;
        color: $grayDark;
        b {
          font-weight: 600;
        }
      }
      &-reward {
        display: block;
        margin-top: 2.6rem;
        font-weight: 600;
        font-size: 1.4rem;
        color: $pink;
        cursor: pointer;
      }
    }
    &-info {
      &-block {
        width: 38.7rem;
        background: rgba(255, 255, 255, 0.9);
        padding: 4.3rem 2.4rem 3.4rem;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        border-radius: 2.4rem;
        &-withdraw {
          &-price {
            &-block {
              display: flex;
              align-items: center;
              &-celo {
                width: 3.4rem;
                margin-right: 0.8rem;
              }
              &-value {
                font-family: Cabin-Bold;
                font-weight: 700;
                font-size: 3.2rem;
              }
            }
          }
          &-ready {
            margin-top: 0.8rem;
            font-size: 1.2rem;
            color: $grayLight;
          }
        }
        &-total {
          display: flex;
          justify-content: space-between;
          margin-top: 3.4rem;
          padding-top: 2.6rem;
          border-top: 1px solid $modalColor;
          &-status {
            text-align: center;
            &-count {
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 1.8rem;
              img {
                width: 1.6rem;
                margin-right: 0.8rem;
              }
            }
            &-name {
              margin-top: 0.8rem;
              font-size: 1.2rem;
            }
          }
        }
      }
      &-address {
        display: flex;
        align-items: center;
        margin-top: 1.8rem;
        &-block {
          margin-right: 1.8rem;
          position: relative;
          padding: 0.8rem 1.6rem;
          background: $white;
          border: 1px solid transparent;
          border-radius: 2.5rem;
          font-size: 1.4rem;
          cursor: pointer;
          &::after {
            position: absolute;
            top: -.2rem; bottom: -.2rem;
            left: -.2rem; right: -.2rem;
            content: '';
            background: linear-gradient(to right, #365BE0, #D676CF, #FFE884);
            z-index: -1;
            border-radius: 2.5rem;
          }
        }
        &-name {
          margin-right: 1.2rem;
        }
        &-link {
          font-weight: 600;
          font-size: 1.4rem;
        }
      }
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
    padding: 7.8rem 12rem;
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
      margin-top: 1.6rem;
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
      &-summary {
        max-width: 27.8rem;
        &-title {
          line-height: 2.2rem;
          font-size: 1.8rem;
        }
        &-description {
          margin-top: 0.8rem;
          line-height: 2rem;
          font-size: 1.4rem;
        }
        &-reward {
          margin-top: 1.6rem;
        }
      }
      &-info {
        &-block {
          margin-top: 4rem;
          padding-left: 0.8rem;
          padding-right: 0.8rem;
          width: calc(100% - 1.6rem);
          &-withdraw {
            &-price {
              &-block {
               &-celo {
                width: 2.6rem;
               }
              }
            }
          }
          &-total {
            margin-top: 3.2rem;
            padding-top: 2.4rem;
          }
        }
        &-address {
          margin-top: 2rem;
          &-block {
            padding: 1rem 1.6rem;
            margin-right: 0.8rem;
          }
          &-share {
            &-frame {
              ::v-deep .dropdown-menu {
                right: -2.4rem !important;
              }
              &.copied {
                ::v-deep .dropdown-menu {
                  right: -5.8rem !important;
                } 
              }
            }
            
          }
        }
      }
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
