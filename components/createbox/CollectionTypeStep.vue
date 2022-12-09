<template>
    <div class="collection-type-step">
        <h2 class="collection-type-step-title">Select collection type</h2>
        <p class="collection-type-step-subtitle">You can create a collection with legendary, rare, epic and common NFT, or create a simple collection.</p>
        <div class="collection-type-step-box">
            <div class="collection-type-step-box-card" @click="selectCollectionType(1)">
                <div class="collection-type-step-box-card-frame">
                    <div class="collection-type-step-box-card-frame-raritybg"></div>
                    <div class="collection-type-step-box-card-frame-line1"></div>
                    <div class="collection-type-step-box-card-frame-line2"></div>
                    <div class="collection-type-step-box-card-frame-epic">
                        <img class="collection-type-step-box-card-frame-epic-img" src="/fire-filled.svg"> Epic
                    </div>
                </div>
                <h2 class="collection-type-step-box-card-title">Create with rarity</h2>
            </div>
            <div class="collection-type-step-box-card" @click="selectCollectionType(2)">
                <div class="collection-type-step-box-card-frame">
                    <div class="collection-type-step-box-card-frame-simplebg"></div>
                    <div class="collection-type-step-box-card-frame-line1"></div>
                    <div class="collection-type-step-box-card-frame-line2"></div>
                </div>
                <h2 class="collection-type-step-box-card-title">Create simple </h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    selectCollectionType(type) {
      this.$emit('changeStep', 5, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.collection-type-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 14.4rem 0;
  &-title {
    line-height: 1;
    font-family: Cabin-Bold;
    font-size: 3.2rem;
  }
  &-subtitle {
    width: 48.2rem;
    margin-top: 1.8rem;
    text-align: center;
    font-size: 1.6rem;
    color: $grayDark;
  }
  &-box {
    display: flex;
    margin-top: 5rem;
    &-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 38.3rem;
      padding-top: 4.1rem;
      padding-bottom: 4.6rem;
      border: 1px solid $modalColor;
      border-radius: 0.8rem;
      margin-right: 2.5rem;
      cursor: pointer;
      &:last-child {
        margin: 0;
      }
      &-frame {
        position: relative;
        padding: 1.2rem 1.2rem 2.6rem;
        border-radius: 0.4rem;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        &-raritybg, &-simplebg {
          width: 13rem;
          height: 13rem;
          border-radius: 0.4rem;
        }
        &-raritybg {
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.56)), linear-gradient(131.23deg, #365BE0 -10.51%, #D676CF 44.56%, #FFE884 97.84%);
        }
        &-simplebg {
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.56)), linear-gradient(142.99deg, #FC2EF5 -6.48%, #5489D8 55.16%, #2CFF64 111%);
        }
        &-line1, &-line2 {
          height: 0.6rem;
          margin-top: 0.6rem;
          background: $modalColor;
          border-radius: 2.5rem;
        }
        &-line1 {
          width: 7.7rem;
        }
        &-line2 {
          width: 4.7rem;
        }
        &-epic {
          display: flex;
          align-items: center;
          position: absolute;
          right: 0.8rem;
          bottom: 0.8rem;
          box-shadow: 0px 1.32126px 3.30314px rgba(28, 19, 39, 0.06);
          border-radius: 2rem;
          padding: 0.4rem 0.8rem;
		  font-family: OpenSans-Bold;
		  font-weight: 700;
		  font-size: 0.9rem;
		  color: $pink;
          &-img {
            width: 0.7rem;
            margin-right: 0.6rem;
          }
        }
      }
      &-title {
        margin-top: 3.4rem;
        line-height: 1;
		font-family: OpenSans-SemiBold;
        font-weight: 600;
        font-size: 2rem;
      }
    }
  }

  @media (max-width: 460px) {
	width: calc(100% - 1.6rem);
	padding: 2.4rem 0.8rem;
	&-title {
	  font-family: OpenSans-SemiBold;
	  font-weight: 600;
	  font-size: 2.2rem;
	  text-align: center;
	}
	&-subtitle {
	  width: auto;
	}
	&-box {
	  display: block;
	  width: 100%;
	  margin-top: 2rem;
	  &-card {
		flex-direction: row;
		width: calc(100% - 3.2rem);
		padding: 1.6rem;
		&:last-child {
		  margin-top: 1.6rem;
		}
		&-frame {
		  padding: 0.8rem 0.8rem 1.8rem;
		  margin-right: 1.6rem;
		  &-raritybg, &-simplebg {
			width: 8.5rem;
			height: 8.7rem;
		  }
		  &-line1, &-line2 {
			height: 0.4rem;
			margin-top: 0.4rem;
			border-radius: 1.6rem;
		  }
		  &-line1 {
			width: 5.1rem;
		  }
		  &-line2 {
			width: 4rem;
		  }
		  &-epic {
			padding: 0.3rem 0.6rem;
			right: 0.6rem;
			font-size: 0.6rem;
			&-img {
			  width: 0.4rem;
			  margin-right: 0.4rem;
			}
		  }
		}
		&-title {
		  margin: 0;
		  font-size: 1.4rem;
		}
	  }
	}
  }
}
</style>
