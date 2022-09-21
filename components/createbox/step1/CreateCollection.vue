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
                        <input class="createbox__collection-main-info-collection-input" placeholder="Name your box">
                    </div>
                    <div class="createbox__collection-main-info-collection-description">
                        <p class="createbox__collection-main-label">Description<span class="createbox__collection-main-info-collection-description-optional">(Optional)</span></p>
                        <textarea class="createbox__collection-main-info-collection-textarea" placeholder="Add description"></textarea>
                        <p class="createbox__collection-main-info-collection-description-hint">0/200</p>
                    </div>
                </div>
                <div class="createbox__collection-main-info-social">
                    <p class="createbox__collection-main-info-social-label">Add links to your social media profiles</p>
                    <div class="createbox__collection-main-info-social-links">
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" :src="getCDNImage('socials/telegram.svg')">
                            <p class="createbox__collection-main-info-social-link-name">@name</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" :src="getCDNImage('socials/twitter.svg')">
                            <p class="createbox__collection-main-info-social-link-name">twitter.com</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="your nickname">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" src="/socials/discord.svg">
                            <p class="createbox__collection-main-info-social-link-name">Website URL</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" src="/socials/instagram.svg">
                            <p class="createbox__collection-main-info-social-link-name">Website URL</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL">
                        </div>
                        <div class="createbox__collection-main-info-social-link">
                            <img class="createbox__collection-main-info-social-link-icon" src="/socials/earth.svg">
                            <p class="createbox__collection-main-info-social-link-name">Website URL</p>
                            <input class="createbox__collection-main-info-social-link-input" placeholder="Website URL">
                        </div>
                    </div>
                </div>
            </div>
            <div class="createbox__collection-main-banner">
                <div class="createbox__collection-main-banner-logo">
                    <p class="createbox__collection-main-banner-label">Collection logo</p>
                    <p class="createbox__collection-main-banner-description">JPEG, PNG, GIF. Recommend 400x400. Max 5mb</p>
                    <div class="createbox__collection-main-banner-logo-box">
                        <img class="createbox__collection-main-banner-thumb" src="/picture.svg" alt="logo">
                    </div>
                </div>
                <div class="createbox__collection-main-banner-cover">
                    <p class="createbox__collection-main-banner-label">Cover image</p>
                    <p class="createbox__collection-main-banner-description">JPEG, PNG. Recommend 1440x236. Max 15mb</p>
                    <div class="createbox__collection-main-banner-cover-box">
                        <img class="createbox__collection-main-banner-thumb" src="/picture.svg" alt="cover">
                    </div>
                </div>
                <div class="createbox__collection-main-banner-promo">
                    <p class="createbox__collection-main-banner-label">Promo Banner</p>
                    <p class="createbox__collection-main-banner-description">JPEG, PNG. Recommend 424x224. Max 10mb</p>
                    <div class="createbox__collection-main-banner-promo-box">
                        <img class="createbox__collection-main-banner-thumb" src="/picture.svg" alt="promo">
                    </div>
                </div>
            </div>
        </div>
        <div class="createbox__collection-main-create" :class="{ disabled: !canCreate }">
            <button class="createbox__collection-main-create-btn" @click="createCollection">Create collection</button>
            <a class="createbox__collection-main-create-preview">Preview</a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      canCreate: true
    }
  },
  methods: {
	createCollection() {
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
        }
        &-description {
          margin-top: 3.2rem;
          &-optional {
            color: $textColor;
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
      &-logo {
        &-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 12.6rem;
          height: 12.6rem;
          margin-top: 1.6rem;
          border-radius: 50%;
          border: 1px dashed $border;
          border-radius: 50%;
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
      &-thumb {
        width: 1.7rem;
      }
      &-cover {
        margin-top: 3.2rem;
        &-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38.4rem;
          height: 13.6rem;
          margin-top: 1.6rem;
          border: 1px dashed $border;
        }
      }
      &-promo {
        margin-top: 3.2rem;
        &-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18rem;
          height: 13.6rem;
          margin-top: 1.6rem;
          border: 1px dashed $border;
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
      }
      &.disabled {
        .createbox__collection-main-create-btn {
          pointer-events: none;
          background: $white;
          border: 1px solid $border;
          color: $border;
        }
        .createbox__collection-main-create-preview {
          pointer-events: none;
          color: $border;
        }
      }
    }
  }
}
</style>


