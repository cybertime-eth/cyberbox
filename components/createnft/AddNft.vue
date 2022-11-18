<template>
  <div class="createbox__nft">
    <div class="createbox__nft-header">
		<h2 class="createbox__nft-header-title">Add NFT for Box collection</h2>
		<p class="createbox__nft-header-description" v-if="rarityMode">Decide how many carbon tokens you want to burn and add nft to each rarity. Rarity is calculated based on the number of burned tokens.</p>
    </div>
    <div class="createbox__nft-setting">
		<div class="createbox__nft-setting-token">
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
		</div>
		<div class="createbox__nft-setting-nfts">
			<div class="createbox__nft-setting-stepbox">
				<div class="createbox__nft-setting-step">
					<p class="createbox__nft-setting-step-num">2</p>
					<p class="createbox__nft-setting-step-name">Load your nft into each window according to rarity</p>
				</div>
				<img class="createbox__nft-setting-step-info" src="/question.svg">
			</div>
			<div class="createbox__nft-setting-nfts-file">
				<p class="createbox__nft-setting-nfts-file-label">Upload file for NFTs</p>
				<p class="createbox__nft-setting-nfts-file-kinds">JPEG, PNG, GIF, MP4. Max 50 MB</p>
			</div>
			<div class="createbox__nft-setting-nfts-add" :key="lIdx" v-for="(nft, lIdx) of legendaryNFTs">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="nft.name" @input="changeNftName('legendary', lIdx, $event)">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<input class="createbox__nft-setting-nfts-add-block-category-fileinput legendary" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('legendary', lIdx)" @change="selectNftImage('legendary', lIdx, $event)" hidden>
							<div @click="changeNftFile('legendary', lIdx)">
								<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!nft.image">
									<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg">
								</button>
								<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="nft.image" v-else>
							</div>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>10</b></p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type legendary">
							<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/diamond-filled.svg">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Legendary</p>
						</div>
					</div>
				</div>
				<div class="createbox__nft-setting-nfts-add-buttonbox">
					<button class="createbox__nft-setting-nfts-add-button">
						<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
						<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
					</button>
					<div class="createbox__nft-setting-nfts-add-detail" v-if="!rarity">
						<p class="createbox__nft-setting-nfts-add-detail-count">Total NFT’s: 1</p>
						<p class="createbox__nft-setting-nfts-add-detail-quantity">Total quantity: 10</p>
					</div>
				</div>
			</div>
			<div class="createbox__nft-setting-nfts-add" :key="eIdx + 100" v-for="(nft, eIdx) of epicNFTs" v-if="rarityMode">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="nft.name" @input="changeNftName('epic', eIdx, $event)">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<input class="createbox__nft-setting-nfts-add-block-category-fileinput epic" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('epic', eIdx)" @change="selectNftImage('epic', eIdx, $event)" hidden>
							<div @click="changeNftFile('epic', eIdx)">
								<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!nft.image">
									<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg">
								</button>
								<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="nft.image" v-else>
							</div>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>10</b></p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type epic">
							<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/fire-filled.svg">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Epic</p>
						</div>
					</div>
				</div>
				<button class="createbox__nft-setting-nfts-add-button">
					<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
				</button>
			</div>
			<div class="createbox__nft-setting-nfts-add" :key="rIdx + 200" v-for="(nft, rIdx) of rareNFTs" v-if="rarityMode">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="nft.name" @input="changeNftName('rare', rIdx, $event)">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<input class="createbox__nft-setting-nfts-add-block-category-fileinput rare" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('rare', rIdx)" @change="selectNftImage('rare', rIdx, $event)" hidden>
							<div @click="changeNftFile('rare', rIdx)">
								<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!nft.image">
									<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg">
								</button>
								<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="nft.image" v-else>
							</div>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>10</b></p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type rare">
							<img class="createbox__nft-setting-nfts-add-block-category-type-icon type-icon" src="/snow-filled.svg">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Rare</p>
						</div>
					</div>
				</div>
				<button class="createbox__nft-setting-nfts-add-button">
					<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
				</button>
			</div>
			<div class="createbox__nft-setting-nfts-add" :key="cIdx + 300" v-for="(nft, cIdx) of commonNFTs" v-if="rarityMode">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name" :value="nft.name" @input="changeNftName('common', cIdx, $event)">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<input class="createbox__nft-setting-nfts-add-block-category-fileinput common" type="file" accept="image/png, image/gif, image/jpeg" :ref="refName('common', cIdx)" @change="selectNftImage('common', cIdx, $event)" hidden>
							<div @click="changeNftFile('common', cIdx)">
								<button class="createbox__nft-setting-nfts-add-block-category-plus-button gradient-button" v-if="!nft.image">
									<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-pink.svg">
								</button>
								<img class="createbox__nft-setting-nfts-add-block-category-plus-nft" :src="nft.image" v-else>
							</div>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: <b>10</b></p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name type-name">Common</p>
						</div>
					</div>
				</div>
				<button class="createbox__nft-setting-nfts-add-button">
					<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
				</button>
			</div>
			<div class="createbox__nft-setting-nfts-total">
				<p class="createbox__nft-setting-nfts-total-count">Total NFT's: 4</p>
				<p class="createbox__nft-setting-nfts-total-quantity">Total quantity: 40</p>
			</div>
		</div>
	</div>
	<button class="createbox__nft-next" :class="{ disabled: !isSubmitAvailable }" @click="gotoNextStep">
		Next step
		<img class="createbox__nft-next-icon" src="/arrow-right-white.svg">
	</button>
  </div>
</template>
<script>
export default {
  props: ['rarity'],
  data() {
    return {
	  legendaryNFTs: [],
	  epicNFTs: [],
	  rareNFTs: [],
	  commonNFTs: [],
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
	this.rarityMode = this.rarity
	if (this.$route.query.simple) {
	  this.rarityMode = false
	}
	if (!this.boxNft || !this.boxNft.legendaryNFTs) {
	  const nftInfo = {
		name: '',
		quantity: 10,
		image: null,
		file: null
	  }
	  this.legendaryNFTs.push({...nftInfo})
	  if (this.rarityMode) {
		this.epicNFTs.push({...nftInfo})
	    this.rareNFTs.push({...nftInfo})
	    this.commonNFTs.push({...nftInfo})
	  }
	  // TODO
	//   this.legendaryNFTs.push({
	// 	...nftInfo,
	// 	name: 'Art1'
	//   })
	//   this.epicNFTs.push({
	// 	...nftInfo,
	// 	name: 'Art2'
	//   })
	//   this.rareNFTs.push({
	// 	...nftInfo,
	// 	name: 'Art3'
	//   })
	//   this.commonNFTs.push({
	// 	...nftInfo,
	// 	name: 'Art4'
	//   })
	// ----
	}
	this.checkBoxNftInfo()
  },
  methods: {
	refName(type, index) {
	  return `${type}${index + 1}`
	},
	checkBoxNftInfo() {
	  const boxNftInfo = this.boxNft
	  if (boxNftInfo && boxNftInfo.legendaryNFTs) {
		this.legendaryNFTs = boxNftInfo.legendaryNfts
	    this.epicNFTs = boxNftInfo.epicNfts || []
	    this.rareNFTs = boxNftInfo.rareNfts || []
	    this.commonNFTs = boxNftInfo.commonNfts || []
	    this.rarityMode = boxNftInfo.rarity
	  }

	// TODO COMMENT
	  if (!boxNftInfo || !boxNftInfo.collection || !boxNftInfo.collection.collectionAddress) {
		this.isSubmitDisabled = true
	  } else {
		this.isSubmitDisabled = false
	  }
	},
	updateNftInfo(type, index, nftInfo) {
	  switch(type) {
		case 'legendary':
		  if (index > 0) {
			this.legendaryNFTs = [
			  ...this.legendaryNFTs.slice(0, index - 1),
			  {
				...this.legendaryNFTs[index],
				...nftInfo
			  },
			  this.legendaryNFTs.slice(index)
			]
		  } else {
			this.legendaryNFTs = [
			  {
				...this.legendaryNFTs[0],
				...nftInfo
			  },
			  ...this.legendaryNFTs.slice(index + 1)
			]
		  }
		break
		case 'epic':
		  if (index > 0) {
			this.epicNFTs = [
			  ...this.epicNFTs.slice(0, index - 1),
			  {
				...this.epicNFTs[index],
				...nftInfo
			  },
			  this.epicNFTs.slice(index)
			]
		  } else {
			this.epicNFTs = [
			  {
				...this.epicNFTs[0],
				...nftInfo
			  },
			  ...this.epicNFTs.slice(index + 1)
			]
		  }
		break
		case 'rare':
		  if (index > 0) {
			this.rareNFTs = [
			  ...this.rareNFTs.slice(0, index - 1),
			  {
				...this.rareNFTs[index],
				...nftInfo
			  },
			  this.rareNFTs.slice(index)
			]
		  } else {
			this.rareNFTs = [
			  {
				...this.rareNFTs[0],
				...nftInfo
			  },
			  ...this.rareNFTs.slice(index + 1)
			]
		  }
		break
		case 'common':
		  if (index > 0) {
			this.commonNFTs = [
			  ...this.commonNFTs.slice(0, index - 1),
			  {
				...this.commonNFTs[index],
				...nftInfo
			  },
			  this.commonNFTs.slice(index)
			]
		  } else {
			this.commonNFTs = [
			  {
				...this.commonNFTs[0],
				...nftInfo
			  },
			  ...this.commonNFTs.slice(index + 1)
			]
		  }
		break
	  }
	},
	checkSubmitAvailable() {
	  if (this.isSubmitDisabled) return
	  let isAvailable = true

	  if (this.legendaryNFTs.length === 0) {
		isAvailable = false
	  } else {
		this.legendaryNFTs.forEach(item => {
		  if (!item.name || !item.image || !item.file) {
			isAvailable = false
		  }
		})
	  }

	  if (this.rarity) {
		if (isAvailable) {
		  if (this.epicNFTs.length === 0) {
			isAvailable = false
		  } else {
			this.epicNFTs.forEach(item => {
			  if (!item.name || !item.image || !item.file) {
			    isAvailable = false
			  }
			})
		  }
		}
		
		if (isAvailable) {
		  if (this.rareNFTs.length === 0) {
			isAvailable = false
		  } else {
			this.rareNFTs.forEach(item => {
			  if (!item.name || !item.image || !item.file) {
			    isAvailable = false
			  }
			})
		  }
		}
		
		if (isAvailable) {
		  if (this.commonNFTs.length === 0) {
			isAvailable = false
		  } else {
			this.commonNFTs.forEach(item => {
			  if (!item.name || !item.image || !item.file) {
			    isAvailable = false
			  }
			})
		  }
	    }
	  }

	  this.isSubmitAvailable = isAvailable
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
	  this.$store.commit('changeBoxNftInfo', {
		legendaryNfts: this.legendaryNFTs,
		epicNfts: this.epicNFTs,
		rareNfts: this.rareNFTs,
		commonNfts: this.commonNFTs,
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
	display: flex;
	justify-content: space-between;
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
	  &-add {
		margin-top: 2.3rem;
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
			font-size: 1.6rem;
			&:focus {
			  border-color: $grayLight;
			}
		  }
		  &-category {
			display: flex;
			justify-content: space-between;
			margin-top: 0.8rem;
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
		  &-name {
			margin-right: 1.4rem;
			font-size: 1.4rem;
			color: $border;
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
		  color: $border;
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
}
</style>
