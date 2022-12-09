<template>
  <div class="createbox__nft">
    <div class="createbox__nft-header">
		<h2 class="createbox__nft-header-title">Add NFT for Box collection</h2>
		<p class="createbox__nft-header-description" v-if="rarityMode">Decide how many carbon tokens you want to burn and add nft to each rarity. Rarity is calculated based on the number of burned tokens.</p>
    </div>
    <div class="createbox__nft-setting">
		<!-- <div class="createbox__nft-setting-token">
			<div class="createbox__nft-setting-step">
				<p class="createbox__nft-setting-step-num">1</p>
				<p class="createbox__nft-setting-step-name">Enter the number of carbon tokens you are going to burn by creating a box</p>
			</div>
			<div class="createbox__nft-setting-token-detail">
				<p class="createbox__nft-setting-token-detail-info">Enter the number of carbon tokens to burn</p>
				<div class="createbox__nft-setting-token-detail-inputblock">
					<div class="createbox__nft-setting-token-detail-inputbox">
						<input class="createbox__nft-setting-token-detail-input" placeholder="0" :value="1000" readonly>
					</div>
					<a class="createbox__nft-setting-token-detail-buy">Buy cMCO2</a>
				</div>
			</div>
			<div class="createbox__nft-setting-token-units">
				<p class="createbox__nft-setting-token-units-unit">1000</p>
				<p class="createbox__nft-setting-token-units-unit">10000</p>
				<p class="createbox__nft-setting-token-units-unit">30000</p>
				<p class="createbox__nft-setting-token-units-unit">100000</p>
			</div>
			<p class="createbox__nft-setting-token-balance">Balance: <b>{{ cmco2Balance }} cMCO2</b></p>
		</div> -->
		<div class="createbox__nft-setting-nfts">
			<div class="createbox__nft-setting-stepbox">
				<div class="createbox__nft-setting-step">
					<p class="createbox__nft-setting-step-num">1</p>
					<p class="createbox__nft-setting-step-name">Load your nft into each window according to rarity</p>
				</div>
				<img class="createbox__nft-setting-step-info" src="/question.svg">
			</div>
			<div class="createbox__nft-setting-nfts-file">
				<p class="createbox__nft-setting-nfts-file-label">Upload file for NFTs</p>
				<p class="createbox__nft-setting-nfts-file-kinds">JPEG, PNG, GIF, MP4. Max 50 MB</p>
			</div>
			<div class="createbox__nft-setting-nfts-block" :key="idx" v-for="(block, idx) of nftBlocks">
				<div class="createbox__nft-setting-nfts-add">
					<div class="createbox__nft-setting-nfts-add-block">
						<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="block.common.name" @input="changeNftName('common', idx, $event)">
						<div class="createbox__nft-setting-nfts-add-block-category">
							<div class="createbox__nft-setting-nfts-add-block-category-plus">
								<input class="createbox__nft-setting-nfts-add-block-category-fileinput common" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('common', idx)" @change="selectNftImage('common', idx, $event)" hidden>
								<div @click="changeNftFile('common', idx)">
									<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!block.common.image">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg" v-if="block.common.disabled">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg" v-else>
									</button>
									<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="block.common.image" v-else>
								</div>
								<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>{{ block.common.quantity }}</b></p>
							</div>
							<div class="createbox__nft-setting-nfts-add-block-category-box" :class="{ 'can-delete': idx > 0 }">
								<!-- <a class="createbox__nft-setting-nfts-add-block-category-delete" v-if="idx > 0" @click="clickDeleteNft('common', idx)">Delete</a> -->
								<div class="createbox__nft-setting-nfts-add-block-category-type">
									<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Common</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="createbox__nft-setting-nfts-add" :class="{disabled: block.rare.disabled}" v-if="rarityMode">
					<div class="createbox__nft-setting-nfts-add-block">
						<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="block.rare.name" @input="changeNftName('rare', idx, $event)">
						<div class="createbox__nft-setting-nfts-add-block-category">
							<div class="createbox__nft-setting-nfts-add-block-category-plus">
								<input class="createbox__nft-setting-nfts-add-block-category-fileinput rare" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('rare', idx)" @change="selectNftImage('rare', idx, $event)" hidden>
								<div @click="changeNftFile('rare', idx)">
									<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!block.rare.image">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg" v-if="block.rare.disabled">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg" v-else>
									</button>
									<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="block.rare.image" v-else>
								</div>
								<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>{{ block.rare.quantity }}</b></p>
							</div>
							<div class="createbox__nft-setting-nfts-add-block-category-box" :class="{ 'can-delete': idx > 0 }">
								<!-- <a class="createbox__nft-setting-nfts-add-block-category-delete" v-if="idx > 0" @click="clickDeleteNft('rare', idx)">Delete</a> -->
								<div class="createbox__nft-setting-nfts-add-block-category-type rare">
									<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/snow.svg" v-if="block.rare.disabled">
									<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/snow-filled.svg" v-else>
									<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Rare</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="createbox__nft-setting-nfts-add" :class="{disabled: block.epic.disabled}" v-if="rarityMode">
					<div class="createbox__nft-setting-nfts-add-block">
						<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="block.epic.name" @input="changeNftName('epic', idx, $event)">
						<div class="createbox__nft-setting-nfts-add-block-category">
							<div class="createbox__nft-setting-nfts-add-block-category-plus">
								<input class="createbox__nft-setting-nfts-add-block-category-fileinput epic" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('epic', idx)" @change="selectNftImage('epic', idx, $event)" hidden>
								<div @click="changeNftFile('epic', idx)">
									<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!block.epic.image">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg" v-if="block.epic.disabled">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg" v-else>
									</button>
									<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="block.epic.image" v-else>
								</div>
								<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>{{ block.epic.quantity }}</b></p>
							</div>
							<div class="createbox__nft-setting-nfts-add-block-category-box" :class="{ 'can-delete': idx > 0 }">
								<!-- <a class="createbox__nft-setting-nfts-add-block-category-delete" v-if="idx > 0" @click="clickDeleteNft('epic', idx)">Delete</a> -->
								<div class="createbox__nft-setting-nfts-add-block-category-type epic">
									<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/fire-filled-grey.svg" v-if="block.epic.disabled">
									<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/fire-filled.svg" v-else>
									<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Epic</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="createbox__nft-setting-nfts-add" :class="{disabled: block.legendary.disabled}" v-if="rarityMode">
					<div class="createbox__nft-setting-nfts-add-block">
						<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="block.legendary.name" @input="changeNftName('legendary', idx, $event)">
						<div class="createbox__nft-setting-nfts-add-block-category">
							<div class="createbox__nft-setting-nfts-add-block-category-plus">
								<input class="createbox__nft-setting-nfts-add-block-category-fileinput legendary" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('legendary', idx)" @change="selectNftImage('legendary', idx, $event)" hidden>
								<div @click="changeNftFile('legendary', idx)">
									<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!block.legendary.image">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg" v-if="block.legendary.disabled">
										<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg" v-else>
									</button>
									<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="block.legendary.image" v-else>
								</div>
								<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>{{ block.legendary.quantity }}</b></p>
							</div>
							<div class="createbox__nft-setting-nfts-add-block-category-box" :class="{ 'can-delete': idx > 0 }">
								<!-- <a class="createbox__nft-setting-nfts-add-block-category-delete" v-if="idx > 0" @click="clickDeleteNft('legendary', idx)">Delete</a> -->
								<div class="createbox__nft-setting-nfts-add-block-category-type legendary">
									<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/diamond.svg" v-if="block.legendary.disabled">
									<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/diamond-filled.svg" v-else>
									<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Legendary</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="createbox__nft-setting-nfts-add-buttonbox">
				<button class="createbox__nft-setting-nfts-add-button" :class="{ active: isSubmitAvailable }" @click="clickAddBlock">
					<p class="createbox__nft-setting-nfts-add-button-name">Add New Block</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-black.svg" v-if="isSubmitAvailable">
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg" v-else>
				</button>
				<div class="createbox__nft-setting-nfts-add-detail" v-if="!rarity">
					<p class="createbox__nft-setting-nfts-add-detail-count">Total NFT’s: 1</p>
					<p class="createbox__nft-setting-nfts-add-detail-quantity">Total quantity: {{ totalQuantity }}</p>
				</div>
			</div>
			<div class="createbox__nft-setting-nfts-total" v-if="rarityMode">
				<p class="createbox__nft-setting-nfts-total-count">Total NFT's: {{ rarity ? 4 : 1 }}</p>
				<p class="createbox__nft-setting-nfts-total-quantity">Total quantity: {{ totalQuantity }}</p>
			</div>
		</div>
	</div>
	<button class="createbox__nft-next" :class="{ disabled: !isSubmitAvailable }" @click="gotoNextStep">
		Next step
		<img class="createbox__nft-next-icon" src="/arrow-right-white.svg" v-if="isSubmitAvailable">
		<img class="createbox__nft-next-icon" src="/arrow-right.svg" v-else>
	</button>
  </div>
</template>
<script>

const NFT_TYPE_LEGENDARY = 'legendary'
const NFT_TYPE_EPIC = 'epic'
const NFT_TYPE_RARE = 'rare'
const NFT_TYPE_COMMON = 'common'

export default {
  props: ['rarity'],
  data() {
    return {
	  nftBlocks: [],
	  totalQuantity: 0,
	  isSubmitDisabled: false,
	  isSubmitAvailable: false,
	  rarityMode: true
    }
  },
  computed: {
	cmco2Balance() {
	  const balance = this.$store.state.balance * this.$store.state.cMCO2Price
	  return balance.toFixed(2)
	},
	boxNft() {
	  return this.$store.state.boxNftInfo
	}
  },
  watch: {
	boxNft() {
	  if (this.$store.state.boxNftInfo && this.$store.state.boxNftInfo.collection) {
		this.checkBoxNftInfo()
	  }
	}
  },
  created() {
	if (!this.boxNft || !this.boxNft.commonNfts) {
	  const nftInfo = {
		name: '',
		quantity: 0,
		image: null,
		file: null,
		disabled: true
	  }
	  this.nftBlocks = [{
		common: {
		  ...nftInfo,
		  disabled: false
		},
		rare: {...nftInfo},
		epic: {...nftInfo},
		legendary: {...nftInfo}
	  }]
	} else {
	  this.checkBoxNftInfo()
	}
  },
  methods: {
	refName(type, index) {
	  return `${type}${index + 1}`
	},
	checkBoxNftInfo() {
	  const boxNftInfo = this.boxNft
	  if (boxNftInfo && boxNftInfo.commonNfts) {
		const newNftBlocks = []
		const blockCount = boxNftInfo.commonNfts.length
		this.rarityMode = boxNftInfo.rarity
		for (let i = 0; i < blockCount; i++) {
		  const commonNft = boxNftInfo.commonNfts[i]
		  const rareNft = this.rarityMode ? boxNftInfo.rareNfts[i] : null
		  const epicNft = this.rarityMode ? boxNftInfo.epicNfts[i] : null
		  const legendaryNft = this.rarityMode ? boxNftInfo.legendaryNfts[i] : null
		  newNftBlocks.push({
			common: commonNft,
			rare: rareNft,
			epic: epicNft,
			legendary: legendaryNft
		  })
		}
		this.nftBlocks = newNftBlocks
	  }
	  // TODO COMMENT
	  if (!boxNftInfo || !boxNftInfo.collection || !boxNftInfo.collection.collectionAddress) {
		this.isSubmitDisabled = true
	  } else {
		this.isSubmitDisabled = false
	  }
	},
	countNftQuantity() {
	  let newTotalQuantity = 0
	  this.nftBlocks.forEach(block => {
		newTotalQuantity += block.common.quantity
		newTotalQuantity += block.rare.quantity
		newTotalQuantity += block.epic.quantity
		newTotalQuantity += block.legendary.quantity
	  })
	  this.totalQuantity = newTotalQuantity
	},
	getNftInfoWith(type, index, nftInfo) {
	  let oldNftInfo = {}
	  switch(type) {
		case NFT_TYPE_COMMON:
		  oldNftInfo = this.nftBlocks[index].common
		break
		case NFT_TYPE_RARE:
		  oldNftInfo = this.nftBlocks[index].rare
		break
		case NFT_TYPE_EPIC:
		  oldNftInfo = this.nftBlocks[index].epic
		break
		case NFT_TYPE_LEGENDARY:
		  oldNftInfo = this.nftBlocks[index].legendary
		break
	  }
	  return {
		name: nftInfo.name !== undefined ? nftInfo.name : oldNftInfo.name,
		image: nftInfo.image !== undefined ? nftInfo.image : oldNftInfo.image,
		file: nftInfo.file !== undefined ? nftInfo.file : oldNftInfo.file,
	  }
	},
	updateNftInfo(type, index, nftInfo) {
	  const newNftBlocks = JSON.parse(JSON.stringify(this.nftBlocks))
	  const oldBlock = newNftBlocks[index]
	  const newNftInfo = this.getNftInfoWith(type, index, nftInfo)
	  let newNftBlock = {}
	  switch(type) {
		case NFT_TYPE_COMMON:
		  newNftBlock = {
			...oldBlock,
			common: {
			  ...newNftInfo,
			  quantity: (newNftInfo.name && newNftInfo.image) ? 125 : 0
			},
			rare: {
			  ...oldBlock.rare,
			  disabled: !newNftInfo.name || !newNftInfo.image
			}
		  }
		break
		case NFT_TYPE_RARE:
		  newNftBlock = {
			...oldBlock,
			rare: {
			  ...newNftInfo,
			  quantity: (newNftInfo.name && newNftInfo.image) ? 25 : 0
			},
			epic: {
			  ...oldBlock.epic,
			  disabled: !newNftInfo.name || !newNftInfo.image
			},
		  }
		break
		case NFT_TYPE_EPIC:
		  newNftBlock = {
			...oldBlock,
			epic: {
			  ...newNftInfo,
			  quantity: (newNftInfo.name && newNftInfo.image) ? 5 : 0
			},
			legendary: {
			  ...oldBlock.legendary,
			  disabled: !newNftInfo.name || !newNftInfo.image
			}
		  }
		break
		case NFT_TYPE_LEGENDARY:
		  newNftBlock = {
			...oldBlock,
			legendary: {
			  ...newNftInfo,
			  quantity: (newNftInfo.name && newNftInfo.image) ? 1 : 0
			}
		  }
		break
	  }
	  if (index > 0) {
		this.nftBlocks = [
			...newNftBlocks.slice(0, index),
			newNftBlock,
			...newNftBlocks.slice(index + 1)
		]
	  } else {
		this.nftBlocks = [
			newNftBlock,
			...newNftBlocks.slice(index + 1)
		]
	  }
	  this.countNftQuantity()
	},
	checkSubmitAvailable() {
	  if (this.isSubmitDisabled) return
	  let isAvailable = true

	  this.nftBlocks.forEach(block => {
		if (isAvailable) {
		  if (this.rarityMode) {
			isAvailable = block.common.quantity > 0 && block.epic.quantity > 0 && block.rare.quantity > 0 && block.legendary.quantity > 0
		  } else {
			isAvailable = block.common.quantity > 0
		  }
		}
	  })
	  this.isSubmitAvailable = isAvailable
	},
	canAddNft(type) {
	  let nfts = []
	  let readyCount = 0
	  switch (type) {
		case NFT_TYPE_LEGENDARY:
		  nfts = this.legendaryNFTs
		  break
		case NFT_TYPE_EPIC:
		  nfts = this.epicNFTs
		  break
		case NFT_TYPE_RARE:
		  nfts = this.rareNFTs
		  break
		case NFT_TYPE_COMMON:
		  nfts = this.commonNFTs
		  break
	  }

	  nfts.forEach(nft => {
		if (nft.name && nft.image) {
		  readyCount++;
		}
	  })
	  return nfts.length <= 10 && readyCount === nfts.length
	},
	updateNftsQuantity(nfts) {
	  const quantity = Math.floor(10 / nfts.length)
	  const lastQuantity = quantity + 10 % nfts.length
	  nfts.map((nft, index) => {
		if (index < nfts.length - 1) {
		  nft.quantity = quantity
		} else {
		  nft.quantity = lastQuantity
		}
	  })
	  return nfts
	},
	clickAddBlock() {
	  const nftInfo = {
		name: '',
		quantity: 0,
		image: null,
		file: null,
		disabled: true
	  }
	  this.nftBlocks = [
		...JSON.parse(JSON.stringify(this.nftBlocks)),
		{
		  common: {
			...nftInfo,
			disabled: false
		  },
		  rare: {...nftInfo},
		  epic: {...nftInfo},
		  legendary: {...nftInfo}
	  }]
	},
	clickDeleteBlock(index) {
	  let newNftBlocks = JSON.parse(JSON.stringify(this.nftBlocks))
	  if (index > 0) {
		newNftBlocks = [
		  ...newNftBlocks.slice(0, index),
		  ...newNftBlocks.slice(index + 1)
		]
	  } else {
		newNftBlocks = newNftBlocks.slice(index + 1)
	  }
	  this.nftBlocks = newNftBlocks
	  this.countNftQuantity()
	},
	changeNftName(type, index, e) {
	  this.updateNftInfo(type, index, {
		name: e.target.value
	  })
	  this.checkSubmitAvailable()
	},
	changeNftFile(type, index) {
	  const refName = this.refName(type, index)
	  const element = this.$refs[refName][0]
	  element.click()
	},
	selectNftImage(type, index, e) {
	  const file = e.target.files[0]
	  if (!file) return
	  const src = URL.createObjectURL(file)
	  this.updateNftInfo(type, index, {
		image: src
	  })

	  const reader = new FileReader()
	  reader.onloadend = () => {
		const fileInfo = {
		  name: file.name,
		  content: reader.result
		}
		this.updateNftInfo(type, index, {
		  file: fileInfo
		})
		this.checkSubmitAvailable()
	  }
	  reader.readAsDataURL(file)
	},
    gotoNextStep() {
	  const commonNfts = []
	  const rareNfts = []
	  const epicNfts = []
	  const legendaryNfts = []
	  this.nftBlocks.forEach(block => {
		commonNfts.push(block.common)
		if (this.rarityMode) {
		  rareNfts.push(block.rare)
		  epicNfts.push(block.epic)
		  legendaryNfts.push(block.legendary)
		}
	  })
	  this.$store.commit('changeBoxNftInfo', {
		legendaryNfts,
		epicNfts,
		rareNfts,
		commonNfts,
		rarity: this.rarityMode
	  })
	  this.$emit('onNextStep')
	}
  }
}
</script>
<style lang="scss">
.createbox__nft {
  padding: 0 6rem;
  &-header {
	max-width: 42.4rem;
	margin: 4.8rem auto 0;
	&-title {
	  font-family: Cabin-Medium;
	  font-weight: 500;
	  font-size: 3.2rem;
	  line-height: 1;
	  text-align: center;
	}
	&-description {
	  margin-top: 1rem;
	  text-align: center;
	  line-height: 2rem;
	  font-size: 1.6rem;
	}
  }
  &-setting {
	// display: flex;
	// justify-content: space-between;
	max-width: 49.3rem;
	margin-top: 7.9rem;
	&-step {
	  display: flex;
	  align-items: center;
	  &-num {
		min-width: 2.8rem;
		width: 2.8rem;
		height: 2.8rem;
		margin-right: 1.6rem;
		background: $grayDark;
		border-radius: 50%;
		text-align: center;
		line-height: 2.8rem;
		font-family: OpenSans-SemiBold;
		font-weight: 600;
		font-size: 1.4rem;
		color: $white;
	  }
	  &-name {
		font-family: OpenSans-SemiBold;
		font-weight: 600;
		font-size: 1.6rem;
	  }
	}
	&-stepbox {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	//   .createbox__nft-setting-step {
	// 	&-num {
	// 	  background: transparent;
	// 	  border: 1px solid $border;
	// 	  color: $border;
	// 	}
	// 	&-name {
	// 	  color: $border;
	// 	}
	//   }
	}
	&-token {
	  max-width: 49.3rem;
	  margin-right: 13.6rem;
	  &-detail {
		margin-top: 1rem;
		padding-top: 2.3rem;
		border-top: 1px solid $border2;
		&-info {
		  font-size: 1.4rem;
		}
		&-inputblock {
		  display: flex;
		  align-items: center;
		  margin-top: 2.2rem;
		}
		&-inputbox {
		  flex: 1;
		  position: relative;
		  margin-right: 2rem;
		  &::after {
			content: "cMCO2";
			display: block;
			position: absolute;
			top: 1.2rem;
			right: 1.6rem;
			pointer-events: none;
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.4rem;
			color: $grayLight;
		  }
		}
		&-input {
		  width: calc(100% - 3.2rem);
		  height: 1.8rem;
		  padding: 1.2rem 1.6rem;
		  border: 1px solid $grayLight;
		  border-radius: 2.5rem;
    	  font-size: 1.6rem;
		}
		&-buy {
		  font-family: OpenSans-SemiBold;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $green;
		  cursor: default;
		}
	  }
	  &-units {
		display: flex;
		margin-top: 1.6rem;
		&-unit {
		  margin-right: 2.4rem;
		  font-family: OpenSans-SemiBold;
		  line-height: 2rem;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $border2;
		  cursor: pointer;
		  &:last-child {
			margin: 0;
		  }
		}
	  }
	  &-balance {
		margin-top: 2.6rem;
		line-height: 2rem;
		font-size: 1.4rem;
	  }
	}
	&-nfts {
	  flex: 1;
	  &-file {
		display: flex;
		justify-content: space-between;
		margin-top: 2.5rem;
		padding-top: 2.2rem;
		border-top: 1px solid $border2;
		&-label, &-kinds {
		  line-height: 2rem;
		  font-family: OpenSans-SemiBold;
		  font-weight: 600;
		  font-size: 1.4rem;
		//   color: $border2;
		  color: $grayLight;
		}
	  }
	  &-block {
		margin-top: 3.8rem;
		&:first-child {
		  margin: 0;
		}
	  }
	  &-add {
		margin-top: 2.3rem;
		&.disabled {
		  * {
		    pointer-events: none;
		  }
		  .createbox__nft-setting-nfts-add-block {
			&-category {
			  * {
				color: $border2 !important;
			  }
			  &-plus-button {
				border: 0.2rem solid $border2;
				&::after {
				  display: none;
				}
			  }
			}
		  }
		}
		&-block {
		  padding: 1.8rem 1.6rem;
		  box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.06);
		  border-radius: 0.8rem;
		  &-input {
			width: 100%;
			height: 1.8rem;
			padding: 0;
			border: 0;
			padding-bottom: 1.2rem;
			border-bottom: 1px solid $modalColor;
			border-radius: 0;
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.6rem;
			&:focus {
			  border-color: $grayLight;
			}
		  }
		  &-category {
			display: flex;
			justify-content: space-between;
			margin-top: 0.8rem;
			&-box {
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			//   &.can-delete {
			// 	width: 22.9rem;
			//   }
			}
			&-plus {
			  display: flex;
			  align-items: center;
			  &-button, &-nft {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 3.1rem;
				height: 3.1rem;
				margin-right: 1.6rem;
				background: $white;
				border-radius: 0.4rem;
				&::after {
				  border-radius: 0.4rem;
				}
			  }
			  &-quantity {
				font-family: OpenSans-SemiBold;
				font-weight: 600;
				font-size: 1.4rem;
				color: $grayLight;
				b {
				  color: $textColor;
				}
			  }
			}
			&-delete {
			  margin-right: 7.8rem;
			  font-size: 1.4rem;
			  color: $red;
			  cursor: pointer;
			}
			&-type {
			  display: flex;
			  align-items: center;
			  padding: 0.5rem 0.8rem;
			  box-shadow: 0px 2px 5px rgba(28, 19, 39, 0.06);
			  border-radius: 2rem;
			  &-icon {
				width: 1.2rem;
				margin-right: 0.4rem;
				// &.epic {
				//   width: 0.9rem;
				// }
				// &.legendary {
				//   margin-top: 0.6rem;
				// }
			  }
			  &-name {
				font-family: OpenSans-Bold;
				font-weight: 700;
				font-size: 1.4rem;
				color: $border;
			  }
			  &.legendary {
				.type-icon {
				  margin-top: 0.6rem;
				}
				.type-name {
				  color: $darkYellow;
				}
			  }
			  &.epic {
				.type-icon {
				  width: 0.9rem;
				}
				.type-name {
				  color: $darkPink;
				}
			  }
			  &.rare {
				.type-name {
				  color: $lightBlue;
				}
			  }
			}
		  }
		}
		&-buttonbox {
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  margin-top: 1.4rem;
		  .createbox__nft-setting-nfts-add-button {
			margin: 0;
		  }
		}
		&-button {
		  display: flex;
		  align-items: center;
		  background: transparent;
		  margin-top: 1.4rem;
		  cursor: default;
		  pointer-events: none;
		  &-name {
			margin-right: 1.4rem;
			font-size: 1.4rem;
			color: $border;
		  }
		  &.active {
			cursor: pointer;
			pointer-events: auto;
			.createbox__nft-setting-nfts-add-button-name {
			  color: $grayDark;
			}
		  }
		}
		&-detail {
		  display: flex;
		  &-count, &-quantity {
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.4rem;
			color: $grayDark;
		  }
		  &-count {
			margin-right: 2.4rem;
		  }
		}
	  }
	  &-total {
		display: flex;
		align-items: center;
		margin-top: 2.6rem;
		&-count, &-quantity {
		  font-family: OpenSans-SemiBold;
		  font-weight: 600;
		  font-size: 1.4rem;
		}
		&-count {
		  margin-right: 2.4rem;
		}	  
	  }
	}
  }
  &-next {
	display: flex;
	align-items: center;
	width: 18rem;
	background: $pink;
	padding: 1.6rem 4rem;
	margin: 13.6rem auto 0;
	margin-top: 13.4rem;
	border: 1px solid transparent;
	font-family: OpenSans-SemiBold;
	font-weight: 600;
	font-size: 1.4rem;
	color: $white;
	&.disabled {
	  pointer-events: none;
	  background: $white;
	  color: $border;
	  border: 1px solid $border;
	}
	&-icon {
	  margin-left: 1.4rem;
	}
  }

  @media (max-width: 460px) {
	padding: 0 0.8rem 16.8rem;
	&-header {
	  max-width: none;
	  margin-top: 4rem;
	  &-title {
		font-family: OpenSans-SemiBold;
		font-weight: 600;
		font-size: 1.8rem;
	  }
	  &-description {
		margin-top: 0.6rem;
		font-size: 1.4rem;
	  }
	}
	&-setting {
	  display: block;
	  margin-top: 3.3rem;
	  &-step {
		align-items: flex-start;
		&-num {
		  min-width: 2.4rem;
		  width: 2.4rem;
		  height: 2.4rem;
		  line-height: 2.4rem;
		  font-size: 1.2rem;
		}
		&-name {
		  font-size: 1.4rem;
		}
	  }
	  &-stepbox {
		align-items: flex-start;
	  }
	  &-token {
		max-width: none;
		margin: 0;
		&-detail {
		  margin-top: 1.2rem;
		  padding-top: 0.8rem;
		  &-inputblock {
			margin-top: 1.6rem;
		  }
		  &-inputbox {
			margin: 0;
		  }
		  &-input {
			width: calc(100% - 2.8rem);
			height: 1.6rem;
			padding: 1.2rem 1.4rem;
		  }
		  &-buy {
			display: none;
		  }
		}
		&-units {
		  width: fit-content;
		  margin: 0.8rem auto 0;
		}
	  }

	  &-nfts {
		margin-top: 5.8rem;
		&-file {
		  display: block;
		  margin-top: 1.2rem;
		  padding-top: 2.4rem;
		  &-kinds {
			margin-top: 0.8rem;
		  }
		}
		&-add {
		  margin-top: 1.6rem;
		  &-block {
			padding: 1.8rem 0.8rem;
			&-category {
			  &-plus {
				&-button, &-nft {
				  width: 5.6rem;
				  height: 5.6rem;
				}
			  }
			  &-delete {
				display: none;
			  }
			}
		  }
		}
	  }
	}
	&-next {
	  margin-top: 5.8rem;
	}
  }
}
</style>
