import Vue from 'vue'
import { CDN_ROOT, CERTIFICATE_TOKEN_TYPE } from "@/config"

Vue.mixin({
  methods: {
	getNFTImage(nft) {
		if (nft.contract !== 'nomdom') {
			if (nft.image && nft.image.split('ipfs://').length > 1) {
				return 'https://ipfs.io/ipfs/' + nft.image.split('ipfs://')[1]
			}
			return nft.image
		} else {
			return CDN_ROOT + nft.contract + `/${nft.image}.png`
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
				image: (year !== currYear || year === currYear && i <= currMonth) ? '/carbon.svg' : '/question-mark.svg',
				year,
				month: i,
				offset: year === currYear && i === currMonth,
				future: year === currYear && i > currMonth
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
		if (certificate.token_type === CERTIFICATE_TOKEN_TYPE.YEAR || certificate.token_type === CERTIFICATE_TOKEN_TYPE.BONUS) {
            return 'Carbon Super Rare Offset Certificate #1'
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
	sendEvent(event) {
		try {
			let properties = {}
			if (event.properties) {
				properties = Object.assign({}, event.properties, properties);
			}
			const identify = new amplitude.Identify()
			let userProperties = {}
			if (!this.isMobile()) {
				userProperties = {
					utm_campaign: 'cyberbox_analytics',
					referring_domain: 'cyberbox.vercel.app'
				}
			}
			if (event.eventName === 'connect') {
				userProperties.auth_type = properties.connect
			}
			amplitude.setUserProperties(userProperties)
			amplitude.identify(identify)
			amplitude.logEvent(event.eventName, properties)
		} catch(error) {
			console.log(error)
		}
	},
	sendRevenueEvent(productId, price, priceTotal, collection) {
		try {
			const revenue = new amplitude.Revenue().setProductId(productId).setPrice(price)
			amplitude.logRevenueV2(revenue)

			const collectionRevenue = new amplitude.Revenue().setPrice(priceTotal).setEventProperties({ collection })
			amplitude.logRevenueV2(collectionRevenue)
		} catch(error) {
			console.log(error)
		}
	}
  }
})
