<template>
  <div class="modal">
    <div class="modal__block">
      <h2 class="modal__title">Connect your wallet</h2>
      <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
      <div class="modal__connect">
        <button class="modal__connect-button" @click="connectMetaTrust" v-if="!isMobile">
          MetaMask
          <img src="/auth/metamask.svg" alt="metamask" class="modal__connect-button-image">
        </button>
<!--        <button class="modal__connect-button" @click="connectMetaTrust">-->
<!--          TrustWallet-->
<!--          <img src="/auth/trastwallet.svg" alt="metamask" class="modal__connect-button-image">-->
<!--        </button>-->
        <button class="modal__connect-button" @click="connectWallet">
          WalletConnect
          <img src="/auth/WalletConnect.png" alt="metamask" class="modal__connect-button-image">
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isMobile() {
      return /(?!.*PC.*)(?:iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile)/i
        || /(?:ipad|a1_07|a1-810|a1-811|a1-830|a3000-h|a3300-hv|a3500-f|a3500-fl|a3500-h|a3-a10|a5500-f|a5500-h|a7600-f|a7600-h|android 3|archos 101|archos 80g9|aries_785|arnova 101|at100|at10-a|at200|at300|b1-710|b1-711|b1-730|b1-770|b1-780|b1-810|b1-830|b1-850|b1-a71|b6000-f|b6000-h|b8000-f|b8000-h|b8080-f|b8080-h|bn nookhd+|bnrv200|bntv250|bntv250a|bntv400|bntv450|bntv600|breeze 10|cm_tenderloin|dell streak 7|dl1010q|e2281|e-tab ivory|gt-n5100|gt-n5110|gt-n8000|gt-n8010|gt-n8013|gt-n8020|gt-p1000|gt-p1010|gt-p3100|gt-p3110|gt-p3113|gt-p5100|gt-p5110|gt-p5113|gt-p5200|gt-p5210|gt-p5220|gt-p7300|gt-p7310|gt-p7500|gt-p7510|hpwos|hudl 2|ideapad|ideatab|k00e|k00f|k010|k011|k012|k017|k01a|kfapwa |kfapwi|kfarwi|kfaswi|kfauwi|kfdowi|kffowi|kfgiwi|kfjwa|kfjwi|kfmewi|kfot|kfsawa|kfsawi|kfsowi|kfsuwi|kftbwi|kfthwa|kfthwi|kftt|kindle|lguk410|lguk750|lguk932|lg-v400|lg-v410|lg-v490|lg-v495|lg-v496|lg-v497|lg-v500|lg-v520|lg-v521|lg-v522|lg-v700|lg-v930|lifetab|m532|me172v|me173x|me301t|me302c|me302kl|me371mg|mediapad|memo pad|micromax_a101|mz601|mz604|nexus 10|nexus 7|nx008hd8g|nx16a10132s|nx16a11264|nx16a8116k|nx700qc|nx785qc8g|nxa116qc164|nxa8qc116|onda v989|p310a|p310x|p320x|padfone|playbook|pmp5580c|pmp7280c3g|pmt3377_wi|pmt7077_3g|qmv7a|qmv7b|qtair7|qtaqz3|qv830|rct6103w46|rct6203w46|rct6213w87dk|rct6213w87m|rct6303w87dk|rct6303w87m|rct6513w87|rct6573w23|rct6603w47m7|rct6603w87m7|rct6703w13|rct6773w22|rct6773w42b|rct6873w42m|rct6973w43|rct6k03w13|s5000-f|s5000-h|s6000l-f|s920_row|sch-i705|sch-i800|sch-i915|sch-i925|sgh-i467|sgh-i497|sgh-i777|sgp311|sgp312|sgp321|sgp511|sgp512|sgp521|sgp561|sgp611|sgp612|sgp621|sgp712|sgp771|sgpt12|sgpt13|shv-e210k|slider sl101|smart tab|sm-p550|sm-p600|sm-p605|sm-p900|sm-p905|sm-t\d\d\d|tab 2 a10-70f|tab 2 a7-30hc|tab 2 a8-50f|tab 2 a8-50lc|tab s8-50f|tab2a7-10f|tab2a7-20f|tablet|tb2-x30f|tb3-710f|tb3-710i|tb3-850f|tb3-850m|tb3-x70f|tb-8504f|tb-8704f|tb-x103f|tb-x304f|tc802a|tf300t|tf700t|touchpad|tf201|tf101|venue 7 3730|venue 7 hspa+|venue 8 3830|venue 8 7840|venue 8 hspa+|vk810 4g|vk815|vodafone smart ii|xolo a700|xoom|yb1-x90f|yoga b6000-f|yoga b8000-f|yt3-850f|yt3-x50f|yt3-x90f|yt-x703f|zaffire 1010)/i
    }
  },
  methods: {
    async connectMetaTrust() {
      await this.$store.dispatch('connectMetaTrust')
    },
    async connectWallet() {
      await this.$store.dispatch('walletConnect', true)
    },
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal {
  &__connect {
    padding-top: 4.4rem;
    &-button {
      margin-bottom: 1.4rem;
      background: $white;
      border-radius: .4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 1rem;
      width: 30rem;
      cursor: pointer;
      &-image {
        width: 2.4rem;
      }
    }
  }
}
@media screen and (max-width: 460px) {
  .modal__connect-button {
    width: 25rem;
  }
}
</style>
