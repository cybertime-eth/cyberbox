<template>
  <div class="list-nft__content">
    <h1 class="list-nft__content-title">Approve</h1>
    <h3 class="list-nft__content-text">Perform this with your wallet</h3>
    <p class="list-nft__content-subtitle">Awaiting your approval for Cyber Box to list your NFTs</p>
    <div class="list-nft__content-buttons">
      <button class="list-nft__content-buttons-button list-nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button
        class="list-nft__content-buttons-button-confirm gradient-button"
      >
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => {
      this.$emit('changeStep', 3)
    }, 3000)
  }
}
</script>

