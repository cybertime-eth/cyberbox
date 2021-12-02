<template>
  <div class="filter">
    <div class="filter__content">
      <div class="filter__items">
        <div class="filter__items-block" v-for="filter of filteredItems">
          <h2>{{ filter.name }}</h2>
          <div class="filter__items-item" v-for="item of filter.elements">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countItems: [],
    }
  },
  async created() {
    this.countItems = await this.$store.dispatch('getCountAttributes')
    console.log(this.countItems)
  },
  computed: {
    filteredItems() {
      const filters = this.filters
      const countItems = this.countItems
      console.log(filters, countItems)
      return this.filters
    },
    filters() {
      return this.$store.state.filter
    }
  }
}
</script>
<style lang="scss">
.filter {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &__content {
    position: relative;
    width: 70.8rem;
    height: 100%;
    background: $white;
  }
}
</style>
