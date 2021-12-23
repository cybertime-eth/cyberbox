import Vue from 'vue'

Vue.mixin({
  methods: {
	getNFTImage(nft) {
	  if (nft.contract === 'cshape' && nft.image.split('ipfs://').length > 1) {
		return 'https://ipfs.io/ipfs/' + nft.image.split('ipfs://')[1]
	  }
	  return nft.image
	},
	getFloorPrice(nftList) {
	  const prices = (nftList || []).map(item => item.price || 0)
	  const floorPrice = prices.length > 0 ?  prices.sort((a, b) => a - b)[0] : 0
	  return floorPrice > 0 ? floorPrice.toFixed(2) : 0
	},
	isMobile() {
		if(process.browser) {
			const isMobile = /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()) && navigator.userAgent.search('PC') === -1
	  	const isTablet = /ipad|nexus 7|nexus 9|android 3.0|kindle|silk|kftt|kfot|kfjwa|kfjwi|kfsowi|kfthwa|kfthwi|kfapwa|kfapwi/i.test(navigator.userAgent.toLowerCase()) && navigator.userAgent.search('PC') === -1
			return isMobile || isTablet
		} else {
			return false
		}
	}
  }
})
