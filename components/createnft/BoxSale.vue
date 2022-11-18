<template>
  <div class="box__sale">
    <div class="box__sale-header">
		<h2 class="box__sale-header-title">Create Box</h2>
		<p class="box__sale-header-description">Enter information about the carbon box</p>
    </div>
    <div class="box__sale-setting">
		<div class="box__sale-setting-info">
			<div class="box__sale-setting-info-name">
				<p class="box__sale-setting-info-label">* Box Name</p>
				<input class="box__sale-setting-info-input" placeholder="Name your box" v-model="boxName" @input="checkSubmitAvailable">
			</div>
			<div class="box__sale-setting-info-description">
				<p class="box__sale-setting-info-label">Collection description <span>(Optional)</span></p>
				<textarea class="box__sale-setting-info-textarea" placeholder="Add description" maxlength="200" v-model="boxDescription"/>
				<p class="box__sale-setting-info-textarea-letters">{{ boxDescription.length }}/200</p>
			</div>
			<div class="box__sale-setting-info-author">
				<p class="box__sale-setting-info-label">About autor <span>(Optional)</span></p>
				<textarea class="box__sale-setting-info-textarea" placeholder="Add description" maxlength="200" v-model="boxAuthorDetail"/>
				<p class="box__sale-setting-info-textarea-letters">{{ boxAuthorDetail.length }}/200</p>
			</div>
			<div class="box__sale-setting-info-royalty">
				<p class="box__sale-setting-info-label">Royalty</p>
				<div class="box__sale-setting-info-royalty-block">
					<input class="box__sale-setting-info-input" type="number" v-model="boxRoyalty" @input="checkSubmitAvailable">
					<button class="box__sale-setting-info-royalty-button minus">-</button>
					<button class="box__sale-setting-info-royalty-button">+</button>
				</div>
				<p class="box__sale-setting-info-royalty-description">Royalties are how much you gain for each sale of your artwork on the secondary market. If you set it at 5%, each and every time anyone sells any copies of the artwork on this site, you get 5% of that sale — at the current sale price!</p>
			</div>
			<div class="box__sale-setting-info-price" v-if="!timerOn">
				<p class="box__sale-setting-info-price-label semibold">* Price</p>
				<input class="box__sale-setting-info-input box__sale-setting-info-price-input" placeholder="0" v-model="boxPrice" @input="checkSubmitAvailable">
			</div>
			<!-- <CustomSwitch label="Add Timer" :value="timerOn" @onChange="changeTimerStatus"/> -->
			<div class="box__sale-setting-info-timer-block" v-if="timerOn">
				<div class="box__sale-setting-info-presale">
					<input type="checkbox" class="box__sale-setting-info-presale-checkbox">
					<p class="box__sale-setting-info-presale-label">Pre-Sale <span>(whitelist)</span></p>
					<button class="box__sale-setting-info-presale-address">
						Add wallet addresses
						<span class="box__sale-setting-info-presale-address-count">0</span>
					</button>
					<img class="box__sale-setting-info-presale-info" src="/question.svg">
				</div>
				<div class="box__sale-setting-info-public">
					<p class="box__sale-setting-info-public-label semibold">Public-Sale</p>
					<div class="box__sale-setting-info-public-time">
						<div class="box__sale-setting-info-public-time-block">
							<p class="box__sale-setting-info-public-time-block-label semibold">Start</p>
							<input class="box__sale-setting-info-public-time-block-time" placeholder="--:-- AM">
							<input class="box__sale-setting-info-public-time-block-date" placeholder="--.--.2022">
						</div>
						<div class="box__sale-setting-info-public-time-block">
							<p class="box__sale-setting-info-public-time-block-label semibold">End</p>
							<input class="box__sale-setting-info-public-time-block-time" placeholder="--:-- AM">
							<input class="box__sale-setting-info-public-time-block-date" placeholder="--.--.2022">
						</div>
					</div>
				</div>
				<div class="box__sale-setting-info-price in-timer">
					<p class="box__sale-setting-info-price-label semibold">* Price</p>
					<input class="box__sale-setting-info-input box__sale-setting-info-price-input" placeholder="0">
				</div>
			</div>
		</div>
		<div class="box__sale-setting-image">
			<div class="box__sale-setting-image-box">
				<p class="box__sale-setting-image-label">Upload file for Box</p>
				<input class="box__sale-setting-image-box-input" type="file" accept="image/png, image/gif, image/jpeg" ref="boxImage" @change="selectBoxBanner('image', $event)" hidden>
				<div class="box__sale-setting-image-area box__sale-setting-image-box-area" :class="{ selected: boxImage }" @click="changeBoxBanner('boxImage')">
					<img class="box__sale-setting-image-area-image" :src="boxImage" v-if="boxImage">
					<img class="box__sale-setting-image-preview" src="/picture.svg" v-else>
				</div>
			</div>
			<div class="box__sale-setting-image-choose">
				<p class="box__sale-setting-image-label">Or chouse our image:</p>
				<div class="box__sale-setting-image-choose-block">
					<div class="box__sale-setting-image-choose-block-box" :class="{ selected: boxPreImageNum === 1 }" @click="boxPreImageNum = 1">
						<img class="box__sale-setting-image-choose-block-box-picture" src="/box-1.png">
					</div>
					<div class="box__sale-setting-image-choose-block-box" :class="{ selected: boxPreImageNum === 2 }" @click="boxPreImageNum = 2">
						<img class="box__sale-setting-image-choose-block-box-picture" src="/box-2.png">
					</div>
					<div class="box__sale-setting-image-choose-block-box" :class="{ selected: boxPreImageNum === 3 }" @click="boxPreImageNum = 3">
						<img class="box__sale-setting-image-choose-block-box-picture" src="/box-3.png">
					</div>
				</div>
			</div>
			<div class="box__sale-setting-image-cover">
				<p class="box__sale-setting-image-label">Upload cover</p>
				<p class="box__sale-setting-image-cover-description">JPEG, PNG. Recommend 1440x236. Max 15mb</p>
				<input class="box__sale-setting-image-cover-input" type="file" accept="image/png, image/gif, image/jpeg" ref="boxCover" @change="selectBoxBanner('cover', $event)" hidden>
				<div class="box__sale-setting-image-area box__sale-setting-image-cover-area" :class="{ selected: boxCover }" @click="changeBoxBanner('boxCover')">
					<img class="box__sale-setting-image-area-image" :src="boxCover" v-if="boxCover">
					<img class="box__sale-setting-image-preview" src="/picture.svg" v-else>
				</div>
			</div>
		</div>
	</div>
	<div class="box__sale-buttons">
		<button class="box__sale-buttons-button prev" @click="backToPrevStep">
			<img class="box__sale-buttons-button-icon" src="/arrow-left-long.svg">
			Previous step
		</button>
		<button class="box__sale-buttons-button" :class="{ disabled: !isSubmitAvailable }" @click="submitOffsetBox">Create carbon Box</button>
	</div>
  </div>
</template>

<script>

import API from '@/api'
import CustomSwitch from '@/components/utility/CustomSwitch'

export default {
  components: {
	CustomSwitch
  },
  data() {
    return {
	  boxName: '',
	  boxDescription: '',
	  boxAuthorDetail: '',
	  boxRoyalty: null,
	  boxPrice: null,
	  boxImage: null,
	  boxImageFile: null,
	  boxPreImageNum: null,
	  boxCover: null,
	  boxCoverFile: null,
	  timerOn: false,
	  isSubmitAvailable: false,
	  isSubmitDisabled: false
    }
  },
  // TODO
  created() {
	// this.boxName = 'StreetArt4-1'
	// this.boxDescription = 'In 2111, the "year of Nuggets", during the official meeting of all countries on the Day of Protection from Children the majority suggested holding an annual competition, a World DIY contest among chil'
	// this.boxAuthorDetail = "Amur is a multidisciplinary artist, founder of the creative association +111°, creative director\n.\n+111° - creative association, originally formed as\na graffiti team\n\nAfter 5 years of active existence"
	// this.boxRoyalty = 10
	// this.boxPrice = 30
	// this.boxImage = "https://ipfs.moralis.io:2053/ipfs/QmeVAMS15iocLUBVF78HRRM5Xi7zHYArVSwT4BPKXMY2P8/BoxImages/Rectangle 604-1.png"
	// this.boxCover = "https://ipfs.moralis.io:2053/ipfs/QmeVAMS15iocLUBVF78HRRM5Xi7zHYArVSwT4BPKXMY2P8/BoxImages/Rectangle 604-2.png"
	// this.isSubmitAvailable = true
  },
  methods: {
	changeBoxDescription(e) {
	  this.boxDescription = e.target.value
	},
	changeBoxAuthor(e) {
	  this.boxAuthorDetail = e.target.value
	},
    changeTimerStatus() {
	//   this.timerOn = !this.timerOn
	},
	checkSubmitAvailable() {
	  if (!this.isSubmitDisabled) {
		this.isSubmitAvailable = this.boxName && this.boxRoyalty && this.boxPrice && this.boxImage && this.boxCover
	  }
	},
	changeBoxBanner(refName) {
	  this.$refs[refName].click()
	},
	updateBoxBanner(type, src) {
	  switch (type) {
		case 'image':
		  this.boxImage = src
		  this.boxPreImageNum = null
		break
		case 'cover':
	 	  this.boxCover = src
		break
	  }
	},
	selectBoxBanner(type, e) {
	  const file = e.target.files[0]
	  if (!file) return
	  
	  const src = URL.createObjectURL(file)
	  this.updateBoxBanner(type, src)
	  this.checkSubmitAvailable()

	  const reader = new FileReader()
	  reader.onloadend = () => {
		switch (type) {
		  case 'image':
			this.boxImageFile = {
			  name: file.name,
			  content: reader.result
			}
		  break
		  case 'cover':
		    this.boxCoverFile = {
			  name: file.name,
			  content: reader.result
			}
		  break
		}
	  }
	  reader.readAsDataURL(file)
	},
	async uploadBoxImagesToIPFS(boxInfo) {
	  const ipfsArray = []
	  const nftArray = [
		...(boxInfo.legendaryNfts || []),
		...(boxInfo.epicNfts || []),
		...(boxInfo.rareNfts || []),
		...(boxInfo.commonNfts || []),
		this.boxImageFile,
		this.boxCoverFile
	  ]
	  let nftIndex = 0
	  nftArray.forEach(nft => {
		const file = nft.file ? nft.file : nft
		if (file) {
		  ipfsArray.push({
			path: `BoxImages/${file.name}`,
			content: file.content
		  })
		}
	  })
	  const resultArray = await API.uploadImageToIPFS(ipfsArray)
	  if (boxInfo.legendaryNfts) {
		boxInfo.legendaryNfts.map(nft => {
		  nft.image = resultArray[nftIndex].path
		  nftIndex++
	    })
	  }
	  if (boxInfo.epicNfts) {
		boxInfo.epicNfts.map(nft => {
		  nft.image = resultArray[nftIndex].path
		  nftIndex++
	    })
	  }
	  if (boxInfo.rareNfts) {
		boxInfo.rareNfts.map(nft => {
		  nft.image = resultArray[nftIndex].path
		  nftIndex++
	    })
	  }
	  if (boxInfo.commonNfts) {
		boxInfo.commonNfts.map(nft => {
		  nft.image = resultArray[nftIndex].path
		  nftIndex++
	    })
	  }

	  boxInfo.boxImage = resultArray[nftIndex].path
	  boxInfo.boxCover = resultArray[++nftIndex].path
	  return nftArray.length === resultArray.length ? boxInfo : null
	},
	backToPrevStep() {
	  this.$emit('onPrevStep')
	},
	// TODO
	// submitOffsetBox() {
	//   this.isSubmitAvailable = false
	//   let preSelectedImage = null
	//   if (this.boxPreImageNum) {
	// 	preSelectedImage = location.origin + '/' + `box-${this.boxPreImageNum}.png`
	//   }
	// 	const legendaryNfts = [{
	// 	image: "https://ipfs.moralis.io:2053/ipfs/QmeVAMS15iocLUBVF78HRRM5Xi7zHYArVSwT4BPKXMY2P8/BoxImages/art1.png",
	// 	name: "Art1",
	// 	quantity: 10
	// 	}]
	// 	const epicNfts = [{
	// 	image: "https://ipfs.moralis.io:2053/ipfs/QmeVAMS15iocLUBVF78HRRM5Xi7zHYArVSwT4BPKXMY2P8/BoxImages/art2.png",
	// 	name: "Art2",
	// 	quantity: 10
	// 	}]
	// 	const rareNfts = [{
	// 	image: "https://ipfs.moralis.io:2053/ipfs/QmeVAMS15iocLUBVF78HRRM5Xi7zHYArVSwT4BPKXMY2P8/BoxImages/art3.png",
	// 	name: "Art3",
	// 	quantity: 10
	// 	}]
	// 	const commonNfts = [{
	// 	image: "https://ipfs.moralis.io:2053/ipfs/QmeVAMS15iocLUBVF78HRRM5Xi7zHYArVSwT4BPKXMY2P8/BoxImages/art4.png",
	// 	name: "Art4",
	// 	quantity: 10
	// 	}]
	// 	console.log('1111', this.$store.state.boxNftInfo)
	// 	const boxInfo = {
	// 		...this.$store.state.boxNftInfo,
	// 		name: this.boxName,
	// 		description: this.boxDescription,
	// 		authorDetail: this.boxAuthorDetail,
	// 		royalty: this.boxRoyalty,
	// 		price: this.boxPrice,
	// 		preImage: preSelectedImage,
	// 		boxImage: this.boxImage,
	// 		boxCover: this.boxCover,
	// 		legendaryNfts,
	// 		epicNfts,
	// 		rareNfts,
	// 		commonNfts,
	// 		boxAddress: '0x9b963e5a009f7ae8fde4b4d4c9bbba46f90cadc1'
	// 	}

	// 	this.$store.commit('changeBoxNftInfo', boxInfo)
	// 	this.$emit('onComplete')
	// },
	async submitOffsetBox() {
	  this.isSubmitAvailable = false
	  let preSelectedImage = null
	  if (this.boxPreImageNum) {
		preSelectedImage = location.origin + '/' + `box-${this.boxPreImageNum}.png`
	  }
	  const boxInfo = {
		...JSON.parse(JSON.stringify(this.$store.state.boxNftInfo)),
		name: this.boxName,
		description: this.boxDescription,
		authorDetail: this.boxAuthorDetail,
		royalty: this.boxRoyalty,
		price: this.boxPrice,
		preImage: preSelectedImage
	  }
	  const newBoxInfo = await this.uploadBoxImagesToIPFS(boxInfo)
	  if (!newBoxInfo) return

	  this.$store.commit('changeBoxNftInfo', newBoxInfo)
	  this.$emit('onComplete')
	}
  }
}

</script>

<style lang="scss">
.box__sale {
  padding-bottom: 7.8rem;
  &-header {
	margin: 5.3rem auto 0;
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
	padding: 7.8rem 17.2rem 0;
	&-info {
	  flex: 1;
	  max-width: 53.6rem;
	  &-label {
		line-height: 1;
		font-family: OpenSans-SemiBold;
		font-weight: 600;
		font-size: 1.6rem;
		span {
		  font-family: OpenSans-Regular;
		  font-weight: 500;
		  color: $border;
		}
	  }
	  &-input {
		width: calc(100% - 2rem);
		height: 1.5rem;
		margin-top: 1.6rem;
		padding: 1.2rem 1rem;
		border: 1px solid $border2;
		border-radius: 4px;
		&:focus {
		  border-color: $grayDark;
		}
	  }
	  &-textarea {
		width: calc(100% - 2rem);
		height: 14.6rem;
		border-radius: 4px;
		padding: 1.8rem 1rem;
		margin-top: 1.6rem;
		resize: none;
		&-letters {
		  width: 100%;
		  margin-top: 1.8rem;
		  line-height: 1;
		  text-align: right;
		  font-size: 1.2rem;
		  color: $border;
		}
		&:focus {
		  border-color: $grayDark;
		}
	  }
	  &-description {
		margin-top: 3.8rem;
	  }
	  &-author {
		margin-top: 4rem;
	  }
	  &-royalty {
		margin-top: 4rem;
		&-block {
		  display: flex;
		  justify-content: space-between;
		  margin-top: 1.8rem;
		  input {
			flex: 1;
			width: auto;
			margin-top: 0;
		  }
		}
		&-button {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  width: 4rem;
		  height: 4rem;
		  background: $white;
		  border: 1px solid $grayDark;
		  border-radius: 4px;
		  font-size: 2.4rem;
		  &.minus {
			margin: 0 0.8rem;
		  }
		}
		&-description {
		  margin-top: 1.4rem;
		  line-height: 2rem;
		  font-size: 1.4rem;
		  color: $textColor2;
		}
	  }
	  &-price, .custom-switch {
		margin-top: 3.8rem;
	  }
	  &-timer-block {
		margin-top: 4.2rem;
	  }
	  &-presale {
		display: flex;
		align-items: center;
		&-checkbox {
		  width: 2.4rem;
		  height: 2.4rem;
		  margin-right: 1.6rem;
		  background: $white;
		  border: 1px solid $border;
		  border-radius: 1px;
		}
		&-label {
		  margin-right: 3.8rem;
		  font-family: OpenSans-Medium;
		  font-weight: 600;
		  font-size: 1.6rem;
		  span {
			font-weight: 500;
			color: $border;
		  }
		}
		&-address {
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  width: 20.5rem;
		  background: $white;
		  padding: 0.6rem 1.5rem 0.6rem 1rem;
		  margin-right: 3.5rem;
		  border: 1px solid $pink;
		  border-radius: 2rem;
		  font-family: OpenSans-Medium;
		  font-weight: 600;
		  font-size: 1.4rem;
		  &.disabled {
			border-color: $border;
			color: $border;
		  }
		  &-count {
			color: $border;
		  }
		}
		&-info {
		  width: 1.5rem;
		}
	  }
	  &-price {
		width: 100%;
		margin-top: 2.4rem;
		&-label {
		  font-size: 1.4rem;
		  color: $grayLight;
		}
		&.in-timer {
		  &-input {
			width: 29.2rem;
		  }
		}
	  }
	  &-public {
		margin-top: 5.3rem;
		&-label {
		  line-height: 1;
		  font-size: 1.6rem;
		}
		&-time {
		  margin-top: 3.1rem;
		  &-block {
			display: flex;
			align-items: center;
			margin-bottom: 1rem;
			&-label {
			  width: 4rem;
			  margin-right: 2.6rem;
			}
			input {
			  width: 5.4rem;
			  height: 1.4rem;
			  background: rgba(118, 118, 128, 0.12);
			  border-radius: 0.6rem;
			  padding: 0.7rem 1.6rem;
			  margin-right: 0.8rem;
			  &:last-child {
				width: 6.4rem;
				margin: 0;
			  }
			}
		  }
		}
	  }
	}
	&-image {
	  flex: 1;
	  max-width: 31.6rem;
	  &-label {
		font-family: OpenSans-SemiBold;
		font-weight: 600;
		font-size: 1.6rem;
	  }
	  &-area {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed $border;
		border-radius: 4px;
		margin-top: 1.6rem;
		cursor: pointer;
		&-image {
		  width: 100%;
		}
	  }
	  &-box {
		&-area {
		  height: 31.2rem;
		  &.selected {
			border-style: none;
		  }
		}
	  }
	  &-choose {
		margin-top: 2.4rem;
		&-block {
		  display: flex;
		  margin-top: 1.6rem;
		  &-box {
			width: 8.8rem;
			height: 8.8rem;
			margin-right: 2.4rem;
			border: 1px dashed $border;
			border-radius: 4px;
			cursor: pointer;
			&:last-child {
			  margin: 0;
			}
			&-picture {
			  width: 100%;
			}
			&.selected {
			  border-style: solid;
			  border-radius: 0;
			}
		  }
		}
	  }
	  &-cover {
		margin-top: 5.8rem;
		&-description {
		  margin-top: 0.6rem;
		  font-size: 1.4rem;
		  color: $grayLight;
		}
		&-area {
		  height: 11.9rem;
		  &.selected {
			border-style: none;
		  }
		}
	  }
	}
  }
  &-buttons {
	display: flex;
	width: fit-content;
	background: $white;
	margin: 11rem auto 0;
	&-button {
	  display: flex;
	  align-items: center;
	  background: $pink;
	  padding: 1.6rem 2.4rem;
	  font-weight: 600;
	  font-size: 1.4rem;
	  color: $white;
	  &.prev {
		background: $white;
		border: 1px solid $textColor;
		margin-right: 1.6rem;
		color: $textColor;
	  }
	  &-icon {
		width: 1.2rem;
		margin-right: 1.4rem;
	  }
	  &.disabled {
		background: $white;
		border: 1px solid $border;
		color: $border;
		pointer-events: none;
	  }
	}
  }
}
</style>
