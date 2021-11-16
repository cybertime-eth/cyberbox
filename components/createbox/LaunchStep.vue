<template>
  <div class="launch">
    <div class="launch__info">
      <div class="container-xl launch__info-container">
        <img src="/box-1-big.png" alt="box" class="launch__info-image">
        <div class="launch__info-box">
          <h1 class="launch__info-box-name">The Paradox Forge</h1>
          <p class="launch__info-box-amount">The remain amount: 324/5000</p>
          <div class="launch__info-box-price">
            <img src="/savenft.png" alt="savenft" class="launch__info-box-price-image">
            <h1 class="launch__info-box-price-content">0.38477 SAVENFT</h1>
            <h4 class="launch__info-box-price-money">= 30$</h4>
          </div>
          <p class="launch__info-box-description">These animated postcards feature stunning vistas from four different locations in Big Time: Time’s End
            - the last planet at the end of the universe. The Syphon - where ancient technology draws power from a
            collapsing star. The Paradox Forge - where alien craftsmen harness cosmic power for their own dark purpose.
            <br> <br>
            The Infinity Vault - what terrible secrets are held within its walls? In addition to the standard postcards,
            each pack has the chance of including special limited editions. And several lucky buyers may find a VIP
            Access Pass, allowing exclusive early entry into the world of Big Time!
          </p>
        </div>
      </div>
    </div>
    <div class="launch__list-nft container-xl">
      <h2 class="launch__list-nft-title">Series Content</h2>
      <div class="launch__list-nft-items">
        <div class="launch__list-nft-item">
          <img src="/item-1.png" alt="item" class="launch__list-nft-item-image">
          <div class="launch__list-nft-item-info">
            <h3 class="launch__list-nft-item-info-name">Lucky NFT</h3>
            <p class="launch__list-nft-item-quantity">Quantity 300</p>
            <p class="launch__list-nft-item-probability">Probability 0,1%</p>
            <p class="launch__list-nft-item-type launch__list-nft-item-type-ssr">SSR</p>
          </div>
        </div>
        <div class="launch__list-nft-item">
          <img src="/item-2.png" alt="item" class="launch__list-nft-item-image">
          <div class="launch__list-nft-item-info">
            <h3 class="launch__list-nft-item-info-name">Lucky NFT</h3>
            <p class="launch__list-nft-item-quantity">Quantity 300</p>
            <p class="launch__list-nft-item-probability">Probability 0,1%</p>
            <p class="launch__list-nft-item-type launch__list-nft-item-type-ssr">SSR</p>
          </div>
        </div>
        <div class="launch__list-nft-item">
          <img src="/item-3.png" alt="item" class="launch__list-nft-item-image">
          <div class="launch__list-nft-item-info">
            <h3 class="launch__list-nft-item-info-name">Lucky NFT</h3>
            <p class="launch__list-nft-item-quantity">Quantity 300</p>
            <p class="launch__list-nft-item-probability">Probability 0,1%</p>
            <p class="launch__list-nft-item-type launch__list-nft-item-type-sr">SR</p>
          </div>
        </div>
        <div class="launch__list-nft-item">
          <img src="/item-4.png" alt="item" class="launch__list-nft-item-image">
          <div class="launch__list-nft-item-info">
            <h3 class="launch__list-nft-item-info-name">Lucky NFT</h3>
            <p class="launch__list-nft-item-quantity">Quantity 300</p>
            <p class="launch__list-nft-item-probability">Probability 0,1%</p>
            <p class="launch__list-nft-item-type launch__list-nft-item-type-sr">SR</p>
          </div>
        </div>
        <div class="launch__list-nft-item">
          <img src="/item-1.png" alt="item" class="launch__list-nft-item-image">
          <div class="launch__list-nft-item-info">
            <h3 class="launch__list-nft-item-info-name">Lucky NFT</h3>
            <p class="launch__list-nft-item-quantity">Quantity 300</p>
            <p class="launch__list-nft-item-probability">Probability 0,1%</p>
            <p class="launch__list-nft-item-type launch__list-nft-item-type-ssr">SSR</p>
          </div>
        </div>
      </div>
      <h3 class="launch__list-nft-subtitle">Total: 5000 NFT’s</h3>
      <div class="launch__list-nft-rules">
        <h2 class="launch__list-nft-rules-title">Rule Introduction</h2>
        <p class="launch__list-nft-rules-subtitle">
          There will be 31320 Mystery Boxes on sale, including 1250 boxes reserved for the community.
          Every user can only buy a maximum of 100 boxes.
          <br>
          1.KAKA Rabbit holders enjoy the following benefits: <br>
          a.Receive Mystery Box airdrops occasionally and possibly earn back your investment in three to four airdrops.
          <br>
          b.Get mining rewards from the KAKA official website that include popular tokens. <br>
          c.Get various priority rights for some specified events. <br>
          d.Accumulate more privileges and benefits over time that can be found on the KAKA official website. <br>
          2.All cards except SSR grade support reopening, and the repurchase price of some rare serial number nft
          may be as high as 10 times the issue price.
        </p>
      </div>
    </div>
    <div class="launch__buttons">
      <button class="gradient-button launch__buttons-button" @click="changeStep(2)"><img src="/array-right-long.svg" alt="array">Back</button>
      <button class="gradient-button launch__buttons-button" @click="$router.push('/')">Mint Box</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    changeStep(step) {
      this.$emit('changeStep', step)
    }
  }
}
</script>
<style lang="scss">
.launch {
  padding-bottom: 10rem;
  &__info {
    padding-top: 5.5rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    &-container {
      display: grid;
      grid-template-columns: 39.9rem 1fr;
      grid-column-gap: 10.4rem;
      justify-content: space-between;
    }
    &-image {
      width: 39.9rem;
    }
    &-box {
      &-amount {
        padding-top: 1.3rem;
      }
      &-price {
        display: flex;
        align-items: center;
        padding-top: 3rem;
        &-image {
          width: 3.2rem;
        }
        &-content {
          padding-left: 1rem;
        }
        &-money {
          padding-left: 1.5rem;
        }
      }
      &-description {
        padding-top: 3.4rem;
        width: 65.2rem;
      }
    }
  }
  &__list-nft {
    padding-top: 9rem;
    &-title {
      letter-spacing: 0.03em;
    }
    &-subtitle {
      letter-spacing: 0.04em;
      padding-top: 1.6rem;
    }
    &-items {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(auto-fill, 23.1rem);
      grid-column-gap: 2.1rem;
      padding-top: 1.3rem;
    }
    &-item {
      width: 23.1rem;
      height: 36.8rem;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: .4rem;
      &-image {
        width: 23.1rem;
        height: 23.2rem;
      }
      &-info {
        padding: .8rem 1.6rem 1rem;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }
      &-quantity {
        padding-top: 1.5rem;
      }
      &-probability {
        padding-top: 1rem;
      }
      &-type {
        padding: .2rem .4rem;
        align-self: flex-end;
        box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
        font-family: Orbitron-Black;
        margin-top: 1rem;
        &-ssr {
          color: #F8C30A;
        }
        &-sr {
          color: #528FD2;
        }
        &-r {
          color: #B8D12C;
        }
        &-n {
          color: #995CFC;
        }
      }
    }
    &-rules {
      padding-top: 5.5rem;
      &-title {
        letter-spacing: 0.03em;
      }
      &-subtitle {
        padding-top: 1.6rem;
        line-height: 2rem;
        letter-spacing: 0.03em;
        width: 65.1rem;
      }
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 36rem;
    margin: 0 auto;
    padding-top: 7.8rem;
    &-button {
      width: 17.4rem;
      height: 5.2rem;
      cursor: pointer;
      img {
        transform: rotate(180deg);
        margin-right: 1rem;
      }
    }
  }
}
</style>
