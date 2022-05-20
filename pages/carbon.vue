<template>
	<section id="carbon">
		<div class="carbon">
			<div class="carbon__tracker">
				<h2 class="carbon__tracker-title">Personal carbon offset tracker</h2>
				<CustomSelect class="carbon__tracker-picker" :options="dateOptions" />
				<div class="carbon__tracker-block">
					<div class="carbon__tracker-block-status">
						<div class="carbon__tracker-block-status-bg">
							<img class="carbon__tracker-block-status-bg-img" src="/occupancy.svg">
						</div>
					</div>
					<div class="carbon__tracker-block-info">
						<div class="carbon__tracker-block-info-summary">
							<div class="carbon__tracker-block-info-summary-item">
								<span class="carbon__tracker-block-info-summary-item-name">NFT Carbon certificates</span>
								<span class="carbon__tracker-block-info-summary-item-conent">4.3 ton CO2</span>
							</div>
							<div class="carbon__tracker-block-info-summary-item">
								<span class="carbon__tracker-block-info-summary-item-name">NFT Traiding CO2 offset</span>
								<span class="carbon__tracker-block-info-summary-item-conent">3.3 ton CO2</span>
							</div>
							<div class="carbon__tracker-block-info-summary-item total">
								<span class="carbon__tracker-block-info-summary-item-name">Total CO2 offset</span>
								<span class="carbon__tracker-block-info-summary-item-conent">5.8 ton CO2</span>
							</div>
						</div>
						<div class="carbon__tracker-block-info-certificate">
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import CustomSelect from '@/components/utility/CustomSelect.vue'
export default {
  components: {
	CustomSelect
  },
  computed: {
	dateOptions() {
	  return [
		{ key: '2022', value: '2022' },
		{ key: '2021', value: '2021' },
		{ key: '2020', value: '2020' }
	  ]
	}
  }
//   mounted() {
//     const footerEl = document.querySelector('.footer')
//     footerEl.classList.add('fixed')
//   }
}
</script>

<style lang="scss" scoped>
.carbon {
  padding-top: 4.2rem;
  &__tracker {
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	&-title {
	  padding-bottom: 1rem;
	  font-family: Cabin-Medium;
	  font-weight: 500;
	  font-size: 3.2rem;
	  text-align: center;
	}
	&-picker {
	  width: 8.2rem;
	  margin: 0 auto;
	}
	&-block {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding-top: 6rem;
	  &-status {
		width: 40.2rem;
		height: 34.9rem;
		margin-right: 14.6rem;
		position: relative;
		background: lightgreen;
		&-bg {
		  position: absolute;
		  left: 50%;
		  top: 50%;
		  transform: translate(-50%, -50%);
		  &-img {
			width: 27rem;
		  }
		}
	  }
	  &-info {
		&-summary {
		  width: 39.1rem;
		  padding: 1.8rem 1.6rem;
		  border: 1px solid $modalColor;
		  border-radius: 8px;
		  &-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 1.6rem;
			margin-bottom: 2rem;
			&-content {
			  font-weight: 600;
			}
			&:last-child {
			  margin: 0;
			  color: $green;
			}
			&.total {
			   &-name {
				font-weight: 600;
				color: $green;
			  }
			  &-content {
				color: $green;
			  }
			}
		  }
		}
	  }
	}
  }
}
</style>
