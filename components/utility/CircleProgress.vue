<template>
    <div class="circle-progress-bar">
        <client-only>
            <vue-ellipse-progress
                :size="size"
                :progress="acutalProgress"
                animation="default 0 0"
                :thickness="18"
                :emptyThickness="18"
                :color="backgroundColor"
                emptyColor="#F8F8F8"
                :dot="dotStyle"
            />
        </client-only>
    </div>
</template>

<script>
export default {
  props: ['size', 'progress'],
  computed: {
    backgroundColor() {
      return {
        radial: false,
        colors: [{
          color: '#365BE0',
          offset: "0",
          opacity: '1'
        }, {
            color: '#D676CF',
            offset: "50",
            opacity: '1'
        }, {
            color: '#FFE884',
            offset: "100",
            opacity: '1'
        }]
      }
    },
    dotStyle() {
      return {
        size: 35,
        backgroundColor: 'white',
        border: '1px solid #E39BB6',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
      }
    },
    acutalProgress() {
      return Math.round(this.progress * 0.72)
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-progress-bar {
  position: relative;
  .ep-container {
    position: relative;
  }
}
</style>
