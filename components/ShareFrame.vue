<template>
    <div class="share-frame">
        <dropdown-menu class="share-frame-dropdown" :right="true" v-model="showShareFrame" v-if="dropdownVisible">
            <a class="share-frame__link dropdown-toggle"><img src="/upload.svg" alt="share"></a>
            <div slot="dropdown">
                <h2 class="share-frame__title">Share link to this page</h2>
                <div class="share-frame__block">
                    <div class="share-frame__block-item">
                        <a class="share-frame__block-item-link" :href="sharingUrlForSocial('facebook')" target="_blank" @click="shareLink"><img class="share-frame__block-item-link-facebook" src="/socials/facebook.svg" alt="facebook"></a>
                        <p class="share-frame__block-item-name">Facebook</p>
                    </div>
                    <div class="share-frame__block-item">
                        <a class="share-frame__block-item-link" :href="sharingUrlForSocial('telegram')" target="_blank" @click="shareLink"><img class="share-frame__block-item-link-telegram" src="/socials/telegram.svg" alt="telegram"></a>
                        <p class="share-frame__block-item-name">Telegram</p>
                    </div>
                    <div class="share-frame__block-item">
                        <a class="share-frame__block-item-link" :href="sharingUrlForSocial('twitter')" target="_blank" @click="shareLink"><img class="share-frame__block-item-link-twitter" src="/socials/twitter.svg" alt="twitter"></a>
                        <p class="share-frame__block-item-name">Twitter</p>
                    </div>
                    <div class="share-frame__block-item">
                        <a class="share-frame__block-item-link" @click="copyLink"><img class="share-frame__block-item-link-copy" src="/socials/link.svg" alt="copy"></a>
                        <p class="share-frame__block-item-name">{{ !isCopied ? 'Copy' : 'Coped!' }}</p>
                    </div>
                </div>                
            </div>
        </dropdown-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownVisible: false,
      showShareFrame: false,
      isCopied: false
    }
  },
  created() {
	this.$nextTick(function() {
      this.dropdownVisible = true
    })
  },
  methods: {
    sharingUrlForSocial(socialName) {
      if (!process.browser) return ''
      let sharingUrl = ''
      switch (socialName) {
        case 'facebook': sharingUrl = 'https://www.facebook.com/sharer/sharer.php?u='
          break
        case 'telegram': sharingUrl = 'https://t.me/share/url?url='
          break
        case 'twitter': sharingUrl = 'https://twitter.com/intent/tweet?url='
          break
      }
      sharingUrl += encodeURIComponent(location.href)
      return sharingUrl
    },
    shareLink() {
      this.$emit('onShared')
    },
    copyLink() {
      if (!process.browser || this.isCopied) return
      this.$copyText(location.href)
      this.isCopied = true
    }
  }
}
</script>

<style lang="scss" scoped>
.share-frame {
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
    height: 3.6rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
  ::v-deep .dropdown-menu {
    top: calc(100% + 0.6rem) !important;
    width: 25.2rem;
    background: $white;
    padding: 1.6rem;
    border-radius: 0.8rem;
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  &__title {
    text-align: center;
    font-weight: 600;
    font-size: 1.6rem;
  }
  &__block {
    display: flex;
    justify-content: space-between;
    margin-top: 1.6rem;
    &-item {
      text-align: center;
      &-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        background: $white;
        margin: 0 auto;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        border-radius: 50%;
        cursor: pointer;
      }
      &-name {
        margin-top: 0.8rem;
        font-size: 1.2rem;
        color: $border;
      }
    }
  }
}
</style>
