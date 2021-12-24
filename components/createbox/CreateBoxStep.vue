<template>
  <div class="step-first">
    <div class="step-first-file">
      <div class="step-first-file-drop">
        <h2 class="step-first-file-drop-title">Drag & drop file</h2>
        <p class="step-first-file-drop-subtitle">or browse media on your device</p>
      </div>
      <div class="step-first-file-text">
        <p class="step-first-file-text-subtitle">Support: png, jpeg, gif, mp4</p>
        <p class="step-first-file-text-subtitle">Size not more than 50 mb</p>
      </div>
      <div class="step-first-file-boxes">
        <h3 class="step-first-file-boxes-title">Or chouse our image:</h3>
        <div class="step-first-file-boxes-images">
          <img src="/box-1.png" alt="box">
          <img src="/box-2.png" alt="box">
          <img src="/box-3.png" alt="box">
        </div>
      </div>
    </div>
    <div class="step-first-info">
      <h2 class="step-first-info-title">Create new mystery box</h2>
      <div class="step-first-info-form">
        <h3 class="step-first-info-form-title">*Name</h3>
        <input type="text" class="step-first-info-form-input" placeholder="Box name">
      </div>
      <div class="step-first-info-form">
        <h3 class="step-first-info-form-title">Description</h3>
        <textarea class="step-first-info-form-textarea" placeholder="Write a little story for your boxing."></textarea>
        <h4 class="step-first-info-form-length">0/200</h4>
      </div>
      <div class="step-first-info-form">
        <h3 class="step-first-info-form-title">Rules</h3>
        <p class="step-first-info-form-subtitle">Optional. Write what advantages the nft cards will give in your box for
          buyers. Or maybe some other rules are inherent in your boxing.</p>
        <textarea class="step-first-info-form-textarea" placeholder="F.ex."></textarea>
      </div>
      <div class="step-first-info-form">
        <h3 class="step-first-info-form-title">External Link</h3>
        <p class="step-first-info-form-subtitle">
          Magic Box will include a link to this URL on this item's detail page,
          so that users can click to learn more about it. You are welcome to link to your own webpage with more details.
        </p>
        <input type="text" class="step-first-info-form-input" placeholder="https://yoursite.com/item/123">
      </div>
      <div class="step-first-info-form step-first-info-form-category">
        <h3 class="step-first-info-form-title">Category</h3>
        <div class="step-first-info-form-block">
          <div class="step-first-info-form-checkbox">
            <input type="checkbox" class="step-first-info-form-checkbox-input">
            <h3 class="step-first-info-form-checkbox-text">Game</h3>
          </div>
          <div class="step-first-info-form-checkbox">
            <input type="checkbox" class="step-first-info-form-checkbox-input">
            <h3 class="step-first-info-form-checkbox-text">Art</h3>
          </div>
          <div class="step-first-info-form-checkbox">
            <input type="checkbox" class="step-first-info-form-checkbox-input">
            <h3 class="step-first-info-form-checkbox-text">Collectibles</h3>
          </div>
          <div class="step-first-info-form-checkbox">
            <input type="checkbox" class="step-first-info-form-checkbox-input">
            <h3 class="step-first-info-form-checkbox-text">Combo box</h3>
          </div>
        </div>
      </div>
      <div class="step-first-info-form">
        <h3 class="step-first-info-form-title">Royalty</h3>
        <input type="text" class="step-first-info-form-input" placeholder="10">
        <p class="step-first-info-form-content">
          The given royalty will be reflected on the balance of the BNB address you’re <br>
          currently using: <br>
          0xEb8Ae373xs786A7173A1995694bD2ec857E90577
        </p>
      </div>
      <div class="step-first-info-form">
        <h3 class="step-first-info-form-title">Payment token</h3>
        <div class="step-first-info-form-payment">
          <input type="radio" class="step-first-info-form-payment-radio">
          <h3 class="step-first-info-form-payment-coin">SAVENFT</h3>
          <h3 class="step-first-info-form-payment-commission">5% fees</h3>
        </div>
        <div class="step-first-info-form-payment">
          <input type="radio" class="step-first-info-form-payment-radio">
          <h3 class="step-first-info-form-payment-coin">BNB</h3>
          <h3 class="step-first-info-form-payment-commission">25% fees</h3>
        </div>
      </div>
      <div class="step-first-info-form">
        <h3 class="step-first-info-form-title">Price</h3>
        <input type="text" class="step-first-info-form-input" placeholder="Enter price for box">
      </div>
      <button class="gradient-button step-first-info-button" @click="nextStep">Next step <img src="/array-right-long.svg" alt="array"></button>
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
.step-first {
  display: grid;
  grid-template-columns: 56.4rem 56.4rem;
  grid-column-gap: 10.4rem;
  padding-top: 5.5rem;
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
      &-category {
        padding-top: 1.6rem;
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
      &-payment {
        display: grid;
        grid-template-columns: 2.6rem 8.6rem 15rem;
        align-items: center;
        padding-top: 2.4rem;
        &-radio {
          width: 2.4rem;
          height: 2.4rem;
          margin: 0;
        }
        &-coin {
          padding-left: 1.6rem;
        }
        &-commission {
          padding-left: 5.6rem;
        }
      }
    }
    &-button {
      width: 14.6rem;
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
