<template>
     <div class="modal" :class="{fade: fade}">
       <div class="modal__traits" ref="traits">
         <div class="modal__traits-body" ref="traits">
            <div class="modal__traits-header">
              <img src="/logo.svg" alt="logo" >
              <button class="modal__button gradient-button" @click="closeModal">Close</button>
            </div>
            <div class="modal__traits-filter">
              <div class="modal__traits-filter-category" :key="idx" v-for="(category, idx) in traitCategories" v-if="category.values.length > 0">
                <h2 class="modal__traits-filter-category-name">{{ category.traitType }}</h2>
                <div class="modal__traits-filter-item" :key="traitCategories.length+fIdx" v-for="(filter, fIdx) in traitFilterValues(category)" @click="updateFilterCheck(category, filter)">
                  <div class="modal__traits-filter-item-checkbox">
                    <span class="modal__traits-filter-item-checkbox-check" :class="{ checked: filter.checked }">
                      <img src="/check-white.svg" alt="check" v-if="filter.checked">
                    </span>
                    <span class="modal__traits-filter-item-checkbox-name">{{ filter.traitValue }}</span>
                  </div>
                  <div class="modal__traits-filter-item-used">
                    <p class="modal__traits-filter-item-used-count">{{ filter.useCount }}</p>
                    <p class="modal__traits-filter-item-used-percent">{{ filter.percent }}%</p>
                  </div>
                </div>
                <button class="modal__button-more" @click="showMoreFilters(category)" v-if="!category.showMore && category.values.length > 6">Show more</button>
              </div>
            </div>
            <div class="modal__traits-footer">
              <button class="modal__button" :class="{ disabled: filtersCount === 0 }" @click="clearFilters">Clear{{ clearDescription }}</button>
              <button class="modal__button" @click="closeModal">Done{{ doneDescription }}</button>
            </div>
         </div>
       </div>
     </div>
</template>

<script>
export default {
  props: ['show', 'mintCount', 'filtersCount'],
  data() {
    return {
      fade: true,
      traitCategories: [],
      filtered: false,
      filteredCount: 0
    }
  },
  computed: {
    traitFilters() {
      return this.$store.state.traitFilters
    },
    nftList() {
      return this.$store.state.nftList
    },
    clearDescription() {
      if (this.filtersCount === 0) {
        return ' all filters'
      } else {
        return this.filtersCount > 1 ? ` ${this.filtersCount} filters` : ' 1 filter'
      }
    },
    doneDescription() {
      return this.filteredCount > 0 ? ` (${this.filteredCount})` : ''
    },
    filteredItemsCount() {
      let newFilteredCount = 0
      this.traitCategories.forEach(item => {
        item.values.forEach(filterItem => {
          if (filterItem.checked) {
            newFilteredCount += filterItem.useCount
          }
        })
      })
      return newFilteredCount
    }
  },
  beforeMount() {
    window.addEventListener('click', this.handleClickWindow)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickWindow)
  },
  watch: {
    traitFilters() {
      if (this.traitCategories.length === 0) {
        this.updateTraitCategories()
      }
    },
    nftList() {
      if (this.filtered) {
        this.filteredCount = this.filteredItemsCount
      }
    }
  },
  mounted() {
    setTimeout(() => this.fade = false)
    this.updateTraitCategories()
    if (this.filtersCount > 0) {
      this.filteredCount = this.filteredItemsCount
    }
  },
  methods: {
    handleClickWindow(e) {
      if (!this.fade && !this.$refs.traits.contains(e.target) && !e.target.classList.contains('modal__button-more')) {
        this.closeModal()
      }
    },
    updateTraitCategories() {
      const newTraitCategories = JSON.parse(JSON.stringify(this.$store.state.traitFilters))
      newTraitCategories.map(item => item.values.map(valueItem => valueItem.percent = parseFloat(valueItem.useCount / this.mintCount * 100).toFixed(2)))
      this.traitCategories = newTraitCategories
    },
    traitFilterValues(category) {
      if (category.showMore) {
        return category.values
      } else {
        return category.values.slice(0, 6)
      }
    },
    showMoreFilters(category) {
      const newCategories = [...this.traitCategories]
      const categoryIndex = newCategories.findIndex(item => item.traitType === category.traitType)
      newCategories[categoryIndex].showMore = true
      this.traitCategories = newCategories
    },
    updateFilterCheck(category, filter) {
      const newCategories = JSON.parse(JSON.stringify(this.traitCategories))
      const categoryIndex = newCategories.findIndex(item => item.traitType === category.traitType)
      const filterIndex = category.values.findIndex(item => item.traitType === filter.traitType && item.traitValue === filter.traitValue)
      newCategories[categoryIndex].values[filterIndex].checked = !newCategories[categoryIndex].values[filterIndex].checked
      this.traitCategories = newCategories
      this.$store.commit('setTraitFilters', newCategories)
      const newCheckingCategories = JSON.parse(JSON.stringify(newCategories))
      const checkedFilters = []
      newCheckingCategories.forEach(item => {
        item.values = item.values.filter(filterItem => filterItem.checked)
        if (item.values.length > 0) {
          checkedFilters.push(item)
        }
      });
      this.$emit('updateFilter', checkedFilters, this.filteredItemsCount)
      this.filtered = true
    },
    clearFilters() {
      const newCategories = JSON.parse(JSON.stringify(this.traitCategories))
      newCategories.map(item => item.values.map(filter => filter.checked = false))
      this.traitCategories = newCategories
      this.filteredCount = 0
      this.$store.commit('setTraitFilters', newCategories)
      this.$emit('updateFilter')
    },
    closeModal() {
      this.fade = true
      setTimeout(() => this.$emit('close'), 200)
    }
  }
}
</script>

<style lang="scss">
.modal {
  &.fade {
    .modal__traits {
      right: -708px;
    }
  }
  &__traits {
    position: fixed;
    width: 708px;
    height: 100%;
    right: 0;
    background: $white;
    transition: opacity 0.3s linear, right 0.3s ease-out;
    &-body {
      display: flex;
      flex-direction: column;
      height: calc(100% - 120px);
      padding-bottom: 120px;
      overflow-y: auto;
      position: relative;
    }
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.8rem 1.23rem 1.8rem 0;
      border: 1px solid $modalColor;
    }
    &-filter {
      flex: 1;
      padding-right: 4.6rem;
      &-category {
        &-name {
          padding: 24px;
          font-size: 1.8rem;
        }
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0 12px 24px;
        cursor: pointer;
        &:hover {
          background: $lightGreen;
        }
        &-checkbox {
          display: flex;
          align-items: center;
          cursor: pointer;
          &-check {
            width: 24px;
            height: 24px;
            border: 1px solid $border;
            border-radius: 1px;
            &.checked {
              display: flex;
              align-items: center;
              justify-content: center;
              background: $green;
              border-color: transparent;
            }
          }
          &-name {
            margin-left: 1.2rem;
            font-weight: 600;
            font-size: 1.6rem;
          }
        }
        &-used {
          p {
            text-align: right;
          }
          &-count {
            font-size: 1.16rem;
            font-weight: 600;
          }
          &-percent {
            font-size: 1.08rem;
          }
        }
      }
    }
    &-footer {
      position: fixed;
      bottom: 0;
      display: flex;
      align-items: center;
      width: 680px;
      background: $white;
      padding: 30px 20px;
      border-top: 1px solid $border2;
      .modal__button {
        background: $white;
        flex: 1;
        padding: 18px 0;
        border: 1px solid $border;
        border-radius: 30px;
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }
  &__button {
    padding: 1rem 2.4rem;
    border-radius: 2.5rem;
    font-size: 1.6rem;
    &.disabled {
      pointer-events: none;
    }
    &-more {
      width: 100%;
      background: $modalColor;
      padding: 8px 24px;
      border: 0;
      border-radius: 0;
      font-size: 1.16rem;
    }
  }
  @media (max-width: 460px) {
    &__traits {
      width: 100%;
      &-footer {
        width: calc(100% - 40px);
      }
    }
  }
}
</style>



