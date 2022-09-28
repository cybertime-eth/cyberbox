<template>
    <div class="createnft-step">
        <div class="createnft-step-substeps">
            <p class="createnft-step-substeps-step active">1</p>
            <p class="createnft-step-substeps-step">2</p>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.createnft-step {
  &-substeps {
	display: flex;
	width: fit-content;
	margin: 0 auto;
	&-step {
	  width: 2.4rem;
	  height: 2.4rem;
	  border: 2px solid $border2;
	  border-radius: 50%;
	  text-align: center;
	  line-height: 2.4rem;
	  font-size: 1.2rem;
	  color: $border2;
	  position: relative;
	  &:first-child {
		margin-right: 15rem;
		&::after {
		  content: "";
		  position: absolute;
		  top: 50%;
		  left: calc(100% + 2px);
		  width: 15rem;
		  height: 2px;
		  background: $border2;
		  z-index: -1;
		}
	  }
	  &.active {
		border-color: $pink;
		color: $pink;
	  }
	}
  }
}
</style>
