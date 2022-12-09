<template>
  <div class="create-nft">
    <div class="create-nft-file">
      <div class="create-nft-file-drop">
        <h2 class="create-nft-file-drop-title">Drag & drop file</h2>
        <p class="create-nft-file-drop-subtitle">or browse media on your device</p>
      </div>
      <div class="create-nft-file-text">
        <p class="create-nft-file-text-subtitle">Support: png, jpeg, gif, mp4</p>
        <p class="create-nft-file-text-subtitle">Size not more than 50 mb</p>
      </div>
    </div>
    <div class="create-nft-info">
      <h2 class="create-nft-info-title">Create NFT</h2>
      <div class="create-nft-info-form">
        <h3 class="create-nft-info-form-title">*Name</h3>
        <input type="text" class="create-nft-info-form-input" placeholder="NFT name">
      </div>
      <div class="create-nft-info-form">
        <h3 class="create-nft-info-form-title">Description</h3>
        <textarea class="create-nft-info-form-textarea" placeholder="A few words about your NFT"></textarea>
        <h4 class="create-nft-info-form-length">0/200</h4>
      </div>
      <div class="create-nft-info-form">
        <h3 class="create-nft-info-form-title">External Link</h3>
        <p class="create-nft-info-form-subtitle">
          Cyber box will include a link to this URL on this item's detail page, so that users can click to learn more
          about it. You are welcome to link to your own webpage with more details.
        </p>
        <input type="text" class="create-nft-info-form-input" placeholder="https://yoursite">
      </div>
      <div class="create-nft-info-form create-nft-info-form-type">
        <h3 class="create-nft-info-form-title">NFT type</h3>
        <input type="text" class="create-nft-info-form-input" value="Other">
      </div>
      <div class="create-nft-info-form create-nft-info-form-category">
        <h3 class="create-nft-info-form-title">Category</h3>
        <div class="create-nft-info-form-block">
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Art</h3>
          </div>
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Music</h3>
          </div>
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Games</h3>
          </div>
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Photography</h3>
          </div>
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Sports</h3>
          </div>
        </div>
        <div class="create-nft-info-form-block">
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Collectibles</h3>
          </div>
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Metaverses</h3>
          </div>
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">DeFi</h3>
          </div>
          <div class="create-nft-info-form-checkbox">
            <input type="checkbox" class="create-nft-info-form-checkbox-input">
            <h3 class="create-nft-info-form-checkbox-text">Memes</h3>
          </div>
        </div>
      </div>
      <div class="create-nft-info-attributes">
        <div class="create-nft-info-attributes-text">
          <h3 class="create-nft-info-attributes-text-title">Attributes</h3>
          <p class="create-nft-info-attributes-text-subtitle">Attributes will be displayed under each of your cards.</p>
        </div>
        <button class="gradient-button create-nft-info-attributes-button"><img src="/plus.svg" alt="plus"></button>
      </div>
      <div class="create-nft-info-form">
        <h3 class="create-nft-info-form-title">*Quantity</h3>
        <p class="create-nft-info-form-content">
          The number of copies that can be minted.
        </p>
        <input type="text" class="create-nft-info-form-input" placeholder="1">
      </div>
      <button class="gradient-button create-nft-info-button">Create NFT</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    nextStep() {
      this.$emit('changeStep', 2)
    }
  }
}
</script>
<style lang="scss">
.create-nft {
  display: grid;
  grid-template-columns: 56.4rem 56.4rem;
  grid-column-gap: 10.4rem;
  padding-top: 3.2rem;
  padding-bottom: 13.5rem;
  &-file {
    &-drop {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: $modalColor;
      border: .1rem dashed $black;
      width: 56.4rem;
      height: 56.4rem;
      &-subtitle {
        font-size: 1.8rem;
        padding-top: 2.2rem;
        letter-spacing: 0.03em;
      }
    }
    &-text {
      display: flex;
      align-items: center;
      padding-top: 1.6rem;
      &-subtitle {
        color: $grayLight;
        padding-right: 1.6rem;
      }
    }
    &-boxes {
      padding-top: 5rem;
      &-title {
        letter-spacing: 0.03em;
      }
      &-images {
        padding-top: 1.5rem;
        img {
          border: .1rem solid $border2;
          width: 14.6rem;
          margin-right: 1.6rem;
        }
      }
    }
  }
  &-info {
    &-title {
      letter-spacing: 0.03em;
      padding-bottom: 2rem;
    }
    &-form {
      padding-bottom: 3.4rem;
      &-type {
        padding-top: 2.3rem;
      }
      &-title {
        font-family: OpenSans-Regular;
        letter-spacing: 0.06em;
      }
      &-subtitle {
        padding-top: .8rem;
      }
      &-input {
        margin-top: 1.6rem;
        height: 1.7rem;
        width: 97%;
      }
      &-textarea {
        resize: none;
        width: 97%;
        height: 11.3rem;
        margin-top: 1.6rem;
        padding-top: 1.8rem;
        letter-spacing: 0.03em;
      }
      &-length {
        padding-top: 1.8rem;
        text-align: right;
        color: $border;
      }
      &-block {
        display: flex;
        align-items: center;
        padding-top: 1.5rem;
      }
      &-checkbox {
        display: flex;
        align-items: center;
        padding-right: 2rem;
        &-input {
          width: 2.4rem;
          height: 2.4rem;
        }
        &-text {
          letter-spacing: 0.03em;
          padding-left: 1rem;
        }
      }
      &-content {
        color: $textColor2;
        letter-spacing: 0.03em;
        padding-top: 1.4rem;
      }
    }
    &-attributes {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      padding-bottom: 4.2rem;
      &-text {
        &-subtitle {
          padding-top: .4rem;
          color: $textColor3;
        }
      }
      &-button {
        width: 4.6rem;
        height: 4.6rem;
        border-radius: .4rem;
        &::after {
          border-radius: .4rem;
        }
      }
    }
    &-button {
      width: 16.4rem;
      height: 5.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        padding-left: 1.4rem;
      }
    }
  }
}
</style>
