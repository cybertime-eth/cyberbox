<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Approve</h1>
    <h3 class="nft__content-text">Perform this with your wallet</h3>
    <p class="nft__content-subtitle">Awaiting your approval for Cyber Box to list your NFTs</p>
    <div class="nft__content-buttons">
      <button class="nft__content-buttons-button nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button
        class="nft__content-buttons-button-confirm gradient-button"
        v-if="!approve"
      >
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    approve() {
      const status = this.$store.state.approveToken
      console.log(status)
      if (status === 'approve') {
        this.$emit('changeStep', 3)
        return true
      } else if (status === 'error') {
        this.$router.push('/mycollection')
      } else {
        return false
      }
    }
  },
  async created() {
    this.$store.commit('changeApproveToken', '')
    await this.$store.dispatch('approveToken')
  },
}
</script>

