<template>
    <div class="createbox__collection">
        <div class="createbox__collection-header">
            <h2 class="createbox__collection-header-title">Create a collection</h2>
            <p class="createbox__collection-header-description">Create your collection page on the marketplace. After that you can create Offset box</p>
        </div>
        <div class="createbox__collection-main">
            <div class="createbox__collection-main-info">
                <div class="createbox__collection-main-info-collection">
                    <div class="createbox__collection-main-info-collection-name">
                        <p class="createbox__collection-main-label">*Collection Name</p>
                        <input class="createbox__collection-main-info-collection-input" placeholder="Name your box" v-model="collectionName" @input="checkSubmitAvailable">
                    </div>
                    <div class="createbox__collection-main-info-collection-description">
                        <p class="createbox__collection-main-label">Description<span class="createbox__collection-main-info-collection-description-optional">(Optional)</span></p>
                        <textarea class="createbox__collection-main-info-collection-textarea" placeholder="Add description" maxlength="200" v-model="description" @input="checkSubmitAvailable"></textarea>
                        <p class="createbox__collection-main-info-collection-description-hint">{{ description.length }}/200</p>
                    </div>
                </div>
                <div class="createbox__collection-main-info-social">
                    <p class="createbox__collection-main-info-social-label">Add links to your social media profiles</p>
                    <div class="createbox__collection-main-info-social-links">
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" :src="getCDNImage('socials/telegram.svg')">
                            <p class="createbox__collection-main-info-social-link-name">@name</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL" v-model="telegramUrl" @input="checkSubmitAvailable">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" :src="getCDNImage('socials/twitter.svg')">
                            <p class="createbox__collection-main-info-social-link-name">twitter.com</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="your nickname" v-model="twitterName" @input="checkSubmitAvailable">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" src="/socials/discord.svg">
                            <p class="createbox__collection-main-info-social-link-name">Website URL</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL" v-model="discordUrl" @input="checkSubmitAvailable">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" src="/socials/instagram.svg">
                            <p class="createbox__collection-main-info-social-link-name">Website URL</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL" v-model="instaUrl" @input="checkSubmitAvailable">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" src="/socials/earth.svg">
                            <p class="createbox__collection-main-info-social-link-name">Website URL</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL" v-model="websiteUrl" @input="checkSubmitAvailable">
                        </div>
                    </div>
                </div>
            </div>
            <div class="createbox__collection-main-banner">
                <div class="createbox__collection-main-banner-logo">
                    <p class="createbox__collection-main-banner-label">Collection logo</p>
                    <p class="createbox__collection-main-banner-description">JPEG, PNG, GIF. Recommend 400x400. Max 5mb</p>
                    <div class="createbox__collection-main-banner-box createbox__collection-main-banner-logo-box" :class="{ filled: bannerImage }" @click="changeFile('banner')">
						<input class="createbox__collection-main-fileinput" type="file" accept="image/*" ref="banner" @change="selectBanner('banner', $event)" hidden>
						<img class="createbox__collection-main-banner-preview" src="/picture.svg" alt="preview" v-if="!bannerImage">
						<img class="createbox__collection-main-banner-thumb" :src="bannerImage" alt="logo" v-else>
                    </div>
                </div>
                <div class="createbox__collection-main-banner-cover">
                    <p class="createbox__collection-main-banner-label">Cover image</p>
                    <p class="createbox__collection-main-banner-description">JPEG, PNG. Recommend 1440x236. Max 15mb</p>
                    <div class="createbox__collection-main-banner-box createbox__collection-main-banner-cover-box" :class="{ filled: coverImage }"   @click="changeFile('cover')">
						<input class="createbox__collection-main-fileinput" type="file" accept="image/*" ref="cover" @change="selectBanner('cover', $event)" hidden>
						<img class="createbox__collection-main-banner-preview" src="/picture.svg" alt="preview" v-if="!coverImage">
						<img class="createbox__collection-main-banner-thumb" :src="coverImage" alt="cover" v-else>
                    </div>
                </div>
                <div class="createbox__collection-main-banner-promo">
                    <p class="createbox__collection-main-banner-label">Promo Banner</p>
                    <p class="createbox__collection-main-banner-description">JPEG, PNG. Recommend 424x224. Max 10mb</p>
                    <div class="createbox__collection-main-banner-box createbox__collection-main-banner-promo-box" :class="{ filled: promoImage }" @click="changeFile('promo')">
						<input class="createbox__collection-main-fileinput" ref="promo" accept="image/*" type="file" @change="selectBanner('promo', $event)" hidden>
						<img class="createbox__collection-main-banner-preview" src="/picture.svg" alt="preview" v-if="!promoImage">
						<img class="createbox__collection-main-banner-thumb" :src="promoImage" alt="promo" v-else>
                    </div>
                </div>
            </div>
        </div>
        <div class="createbox__collection-main-create">
            <button class="createbox__collection-main-create-btn" :class="{ disabled: !canCreate }" @click="createCollection">Create collection</button>
            <a class="createbox__collection-main-create-preview" :class="{ disabled: !canPreview }" @click="gotoPreview">Preview</a>
        </div>
    </div>
</template>

<script>

import API from '@/api'
const fs = require('fs')

export default {
  data() {
    return {
	  bannerImage: null,
	  coverImage: null,
	  promoImage: null,
	  bannerFile: null,
	  coverFile: null,
	  promoFile: null,
	  canCreate: false,
	  canPreview: false,
	  collectionName: '',
	  description: '',
	  telegramUrl: '',
	  twitterName: '',
	  discordUrl: '',
	  instaUrl: '',
	  websiteUrl: ''
    }
  },
  created() {
	const boxCollection = this.$store.state.boxCollection
	if (boxCollection) {
	  if (boxCollection.name) {
		this.collectionName = boxCollection.name
	  }
	  if (boxCollection.description) {
		this.description = boxCollection.description
	  }
	  if (boxCollection.website) {
		this.websiteUrl = boxCollection.website
	  }
	  if (boxCollection.twitter) {
		this.twitterName = boxCollection.twitter.split('https://twitter.com/')[1]
	  }
	  if (boxCollection.discord) {
		this.discordUrl = boxCollection.discord
	  }
	  if (boxCollection.telegram) {
		this.telegramUrl = boxCollection.telegram
	  }
	  if (boxCollection.logo) {
		this.bannerImage = boxCollection.logo
	  }
	  if (boxCollection.banner) {
		this.coverImage = boxCollection.banner
	  }
	  if (boxCollection.image) {
		this.promoImage = boxCollection.image
	  }
	  this.checkSubmitAvailable()
	}
  },
  methods: {
	changeFile(type) {
	  const element = this.$refs[type]
	  element.click()
	},
	updateBanner(type, src) {
	  switch (type) {
		case 'banner':
		  this.bannerImage = src
		break
		case 'cover':
		  this.coverImage = src
		break
		case 'promo':
		  this.promoImage = src
		break
	  }
	},
	selectBanner(type, e) {
	  if (e.target.files.length === 0) return

	  const file = e.target.files[0]
	  const src = URL.createObjectURL(file)
	  this.updateBanner(type, src)
	  this.checkSubmitAvailable()

	  switch (type) {
		case 'banner':
		  this.bannerFile = file
		break
		case 'cover':
		  this.coverFile = file
		break
		case 'promo':
		  this.promoFile = file
		break
	  }
	},
	checkSubmitAvailable() {
	  this.canPreview = !!this.collectionName
	  this.canCreate = this.collectionName && (this.twitterName && this.telegramUrl) && this.bannerImage && this.coverImage && this.promoImage
  },
  makeCollectionData() {
    const collectionPreview = {}
    if (this.collectionName) {
      collectionPreview.name = this.collectionName
    }
    if (this.description) {
      collectionPreview.description = this.description
    }
    if (this.websiteUrl) {
      collectionPreview.website = this.websiteUrl
    }
    if (this.twitterName) {
      collectionPreview.twitter = `https://twitter.com/${this.twitterName}`
    }
    if (this.discordUrl) {
      collectionPreview.discord = this.discordUrl
    }
    if (this.telegramUrl) {
      collectionPreview.telegram = this.telegramUrl
    }
    if (this.bannerImage) {
      collectionPreview.logo = this.bannerImage
    }
    if (this.coverImage) {
      collectionPreview.banner = this.coverImage
    }
    if (this.promoImage) {
      collectionPreview.image = this.promoImage
    }
    return collectionPreview
  },
	gotoPreview() {
      const collectionInfo = this.makeCollectionData()
      this.$store.commit('setBoxCollection', collectionInfo)
	  this.$router.push('/boxcollection/preview')
	},
	async uploadBannerImagesToIPFS(type) {
	  let oldBannerType = null
	  let bannerCount = 0
	  const ipfsArray = []
	  const bannerTypes= ['banner', 'cover', 'promo']
	  const reader = new FileReader()
	  
	  while (bannerCount < 3) {
		const type = bannerTypes[bannerCount]
		if (type !== oldBannerType) {
		  let file = null
		  switch (type) {
		    case 'banner':
			  file = this.bannerFile
			break
			case 'cover':
			  file = this.coverFile
			break
			case 'promo':
			  file = this.promoFile
			break
		  }
		  reader.onloadend = () => {
			ipfsArray.push({
			  path: `BoxImages/${file.name}`,
			  content: reader.result
			})
			bannerCount++
		  }
		  reader.readAsDataURL(file)
		}
		oldBannerType = type
	  }
	  const resultArray = await API.uploadImageToIPFS(ipfsArray)
	  bannerTypes.forEach((bType, idx) => {
		this.updateBanner(bType, resultArray[idx].path)
	  })
	},
	async createCollection() {
	  await this.uploadBannerImagesToIPFS()
	  const collectionInfo = this.makeCollectionData()
	  collectionInfo.id = this.$store.state.boxCollectionList.length + 1
      this.$store.commit('addBoxCollectionToList', collectionInfo)
	  this.$emit('create')
	}
  }
}
</script>

<style lang="scss" scoped>
.createbox__collection {
  padding: 5.3rem 12rem 11rem;
  font-family: OpenSans-Regular;
  &-header {
    max-width: 42.4rem;
    margin: 0 auto;
    &-title {
      line-height: 1;
      font-family: Cabin-Medium;
      font-weight: 500;
      font-size: 3.2rem;
      text-align: center;
    }
    &-description {
      margin-top: 1rem;
      font-size: 1.6rem;
      text-align: center;
    }
  }
  &-main {
    display: flex;
    justify-content: space-between;
    margin-top: 5rem;
    &-label {
      line-height: 1;
      font-weight: 600;
      font-size: 1.6rem;
    }
    &-info {
      flex: 1;
      max-width: 58.8rem;
      &-collection {
        &-input {
          width: calc(100% - 2rem);
          height: 2.4rem;
          padding: 1.2rem 1rem;
          margin-top: 1.6rem;
          border: 1px solid $border2;
          border-radius: 0.4rem;
		  font-size: 1.6rem;
		  &:focus {
			border-color: $grayDark;
		  }
        }
        &-description {
          margin-top: 3.2rem;
          &-optional {
			font-weight: 500;
			color: $border;
		  }
          &-hint {
            width: 100%;
            margin-top: 1.8rem;
            text-align: right;
            font-size: 1.2rem;
            color: $border;
          }
        }
        &-textarea {
          width: calc(100% - 2rem);
          height: 11rem;
          padding: 1.8rem 1rem;
          margin-top: 1.6rem;
          border: 1px solid $border2;
          border-radius: 0.4rem;
          font-size: 1.6rem;
		  resize: none;
		  &:focus {
			border-color: $grayDark;
		  }
        }
      }
      &-social {
        margin-top: 3.2rem;
        &-label {
          font-weight: 600;
          font-size: 1.8rem;
        }
        &-links {
          padding-top: 0.8rem;
        }
        &-link {
          display: flex;
          align-items: center;
          margin-top: 0.8rem;
          padding: 1.8rem 1rem;
          border: 1px solid $modalColor;
          border-radius: 0.4rem;
		  &:focus-within {
			border: 1px solid $grayDark;
		  }
          &-icon {
            width: 2rem;
            margin-right: 1rem;
          }
          &-name {
            margin-right: 0.8rem;
            font-size: 1.4rem;
          }
          &-input {
            flex: 1;
            border: 0;
            padding: 0;
            font-size: 1.4rem;
          }
        }
      }
    }
    &-banner {
	  &-box {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed $border;
		border-radius: 4px;
		cursor: pointer;
	  }
      &-logo {
        &-box {
          width: 12.6rem;
          height: 12.6rem;
          margin-top: 1.6rem;
          border-radius: 50%;
		  overflow: hidden;
		  &.filled {
			border: 0;
		  }
        }
      }
      &-label {
        font-weight: 600;
        font-size: 1.6rem;
      }
      &-description {
        margin-top: 0.8rem;
		font-size: 1.4rem;
      }
      &-preview {
        width: 1.7rem;
	  }
	  &-thumb {
		width: 100%;
		height: 100%;
      }
      &-cover {
		margin-top: 3.2rem;
        &-box {
          width: 38.4rem;
          height: 13.6rem;
          margin-top: 1.6rem;
        }
      }
      &-promo {
		margin-top: 3.2rem;
        &-box {
          width: 18rem;
          height: 13.6rem;
          margin-top: 1.6rem;
        }
      }
    }
    &-create {
      width: 18rem;
      margin: 16rem auto 0;
      text-align: center;
      &-btn {
        width: 100%;
        height: 4.8rem;
        background: $pink;
        text-align: center;
        border-radius: 2.5rem;
        font-family: OpenSans-Regular;
        font-weight: 600;
        font-size: 1.4rem;
		color: $white;
		&.disabled {
		  pointer-events: none;
          background: $white;
          border: 1px solid $border;
          color: $border;
		}
      }
      &-preview {
        display: block;
        width: 100%;
        height: 4.8rem;
        line-height: 4.8rem;
        margin-top: 1.6rem;
        text-align: center;
        font-family: OpenSans-Regular;
        font-weight: 600;
        font-size: 1.4rem;
        color: $black;
		cursor: pointer;
		&.disabled {
		  pointer-events: none;
          color: $border;
		}
      }
    }
  }
}
</style>


