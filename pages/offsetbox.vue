<template>
    <section id="offsetbox">
        <div class="offsetbox">
        </div>
    </section>
</template>


<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async fetchBoxList() {
      this.loading = true
      await this.$store.dispatch('getBoxCollectionInfo')
      this.loading = false
    }
  }
}
</script>
