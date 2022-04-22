import Vue from 'vue'
import { CDN_ROOT } from "@/config"

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
	}
  }
})
