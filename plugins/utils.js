import Vue from 'vue'

Vue.mixin({
  methods: {
	getNFTImage(nft) {
		const ipfsIconContracts = ['cshape', 'cak', 'cpaint']
	  if (ipfsIconContracts.includes(nft.contract) && nft.image.split('ipfs://').length > 1) {
		return 'https://ipfs.io/ipfs/' + nft.image.split('ipfs://')[1]
	  }
	  return nft.image
	}
  }
})
