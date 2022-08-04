import Vue from 'vue'
import { CDN_ROOT, COLLECTION_CDN_ROOT, CERTIFICATE_TOKEN_TYPE, RESOURCE_CDN_ROOT } from "@/config"

Vue.mixin({
  methods: {
	getNFTImage(nft, detail = false, isCloud = false) {
		if (!isCloud || nft.contract === 'CBCN') {
			if (nft.contract !== 'CBCN') {
				if (nft.nftSymbol !== 'CBCN') {
					if (nft.image && nft.image.split('ipfs://').length > 1) {
						return 'https://ipfs.io/ipfs/' + nft.image.split('ipfs://')[1]
					}
					return nft.image
				} else {
					try {
						const month = nft.image.substring(this.nft.image.lastIndexOf('/') + 1).split('.')[0]
						return this.getCertificateImage({
							month
						}, detail)
					} catch(e) {
						console.log(e)
						return certificate.image
					}
				}
			} else {
				return this.getCertificateImage(nft, detail)
			}
		} else {
			let contractId = nft.contract_id
			let fileExtension = 'cwebp'
			if (nft.contract === 'knoxnft') {
				contractId = nft.image.substring(nft.image.lastIndexOf('/') + 1).split('.')[0]
				fileExtension = 'webp'
			} else if (nft.contract === 'nomdom') {
				contractId = nft.image
			}
			const folder = detail ? '500/' : '280/'
			return COLLECTION_CDN_ROOT + folder + nft.contract + `/${contractId}.${fileExtension}`
		}
	},
	isMobile() {
		if(process.browser) {
			const isMobile = /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()) && navigator.userAgent.search('PC') === -1
			const isTablet = /ipad|nexus 7|nexus 9|android 3.0|kindle|silk|kftt|kfot|kfjwa|kfjwi|kfsowi|kfthwa|kfthwi|kfapwa|kfapwi/i.test(navigator.userAgent.toLowerCase()) && navigator.userAgent.search('PC') === -1
			return window.innerWidth < 768 && (isMobile || isTablet)
		} else {
			return false
		}
	},
	getCertificatesOfYear(year, all = false) {
		const today = new Date()
		const dataList = []
		const currYear = today.getFullYear()
		const currMonth = today.getMonth() + 1
		const endMonth = all ? 12 : currMonth
		const startMonth = (year === 2022 && all || year !== 2022) ? 1 : 6
		for (let i = startMonth; i <= endMonth; i++) {
			dataList.push({
				image: `${RESOURCE_CDN_ROOT}/certificates/${i}.webp`,
				year,
				month: i,
				offset: year === currYear && i === currMonth,
				future: year === currYear && i > currMonth,
			})
		}
		return dataList
	},
	getCertificateName(certificate, fullYear = true) {
		if (!certificate.token_type && certificate.tag_element0) {
			certificate.token_type = parseInt(certificate.tag_element0)
			certificate.year = parseInt(certificate.tag_element1)
			certificate.month = parseInt(certificate.tag_element2)
        }
        if (certificate.nftSymbol && certificate.image) {
            try {
                const month = parseInt(certificate.image.substring(this.nft.image.lastIndexOf('/') + 1).split('.')[0])
                certificate.token_type = CERTIFICATE_TOKEN_TYPE.MONTH
                certificate.year = 2022
                certificate.month = month
                if (month > 12) {
                  certificate.token_type = CERTIFICATE_TOKEN_TYPE.BONUS
                  certificate.year = 2022
                  certificate.month = 0
                }
            } catch(e) {
                console.log(e)
            }
        }
		if (certificate.token_type === CERTIFICATE_TOKEN_TYPE.YEAR || certificate.token_type === CERTIFICATE_TOKEN_TYPE.BONUS) {
            return 'Rare 2022'
        } else {
			try {
				const date = new Date(certificate.year, certificate.month - 1, 1)
				const month = date.toLocaleString('en-us', { month: 'long' })
				if (fullYear) {
					return `${month} ${certificate.year}`
				} else {
					return `${month} ${certificate.year.toString().substr(2, 3)}`
				}
			} catch {
				return 'Unknown'
			}
			
        }
	},
	getCertificateImage(certificate, detail = false) {
	  const folderName = detail ? 'detail' : 'thumb'
      const month = certificate.month || certificate.tag_element2
	  return CDN_ROOT + `CBCN/${folderName}/${month}.png`
	},
	getCDNImage(imageName) {
	 return `${RESOURCE_CDN_ROOT}/${imageName}`
	},
	cuttenReferralLink(referralUrl) {
	  if (referralUrl) {
		// const splits = referralUrl.split(/^https?:\/\//)
		// const urlSuffix = !this.isMobile() ? splits[1].substr(-11) : splits[1].substr(-4)
		// const resultUrl = location.protocol + '//' + splits[1].substr(0, 2) + '...' + urlSuffix
		const splits = referralUrl.split('referral=')
		const resultUrl = location.host + '/calendar?referral=' + (splits.legnth > 1 ? splits[1] : '')
		return resultUrl
	  } else {
		return ''
	  }
	},
	sendEvent(event) {
		// try {
		// 	let properties = {}
		// 	if (event.properties) {
		// 		properties = Object.assign({}, event.properties, properties);
		// 	}
		// 	const identify = new amplitude.Identify()
		// 	let userProperties = {}
		// 	if (!this.isMobile()) {
		// 		userProperties = {
		// 			utm_campaign: 'cyberbox_analytics',
		// 			referring_domain: 'cyberbox.vercel.app'
		// 		}
		// 	}
		// 	if (event.eventName === 'connect') {
		// 		userProperties.auth_type = properties.connect
		//   	}
		// 	amplitude.setUserProperties(userProperties)
		// 	amplitude.identify(identify)
		// 	amplitude.logEvent(event.eventName, properties)
		// } catch(error) {
		// 	console.log(error)
		// }
	},
	sendRevenueEvent(productId, price, priceTotal, collection) {
		// try {
		// 	const revenue = new amplitude.Revenue().setProductId(productId).setPrice(price)
		// 	amplitude.logRevenueV2(revenue)

		// 	const collectionRevenue = new amplitude.Revenue().setPrice(priceTotal).setEventProperties({ collection })
		// 	amplitude.logRevenueV2(collectionRevenue)
		// } catch(error) {
		// 	console.log(error)
		// }
	}
  }
})
