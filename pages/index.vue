<template>
  <section id="main">
    <div class="main">
      <img class="main__bg" :src="backgroundImage">
	  <div class="main__marketplace">
		<div class="main__marketplace-content">
			<h1 class="main__marketplace-content-title">Web3 marketplace for<br/>learning & teaching</h1>
			<p class="main__marketplace-content-subtitle">We help experts monetize their knowledge through Web3 courses and users learn from professionals</p>
			<p class="main__marketplace-content-question">Are you an expert?</p>
			<a class="main__marketplace-content-apply" href="https://cyberbox.notion.site/Test-demand-raise-funds-and-attract-the-learners-before-creating-a-course-3121453ce57645b1849f6c6ff6eb9a26">
				<button class="btn-apply">Apply now</button>
			</a>
		</div>
	  </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
	return {
	  isWeb: true
	}
  },
  mounted() {
	this.isWeb = !this.isMobile();
  },
  computed: {
	backgroundImage() {
	  return this.isWeb ? '/main-bg.png' : '/main-bg-mobile.png';
	}
  }
}
</script>

<style lang="scss">
.main {
  position: relative;
  width: 100%;
  height: calc(100vh - 9.5rem);
  overflow: hidden;
  &__bg {
	width: 100%;
	height: 100%;
  }
  &__marketplace {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.6);
	width: 100%;
	max-width: 110rem;
	padding: 8.7rem 0;
	border: 1.1rem solid $white;
	border-radius: 1.9rem;
	&-content {
	  width: 100%;
	  max-width: 58.6rem;
	  margin: 0 auto;
	  text-align: center;
	  &-title {
		font-size: 5rem;
		line-height: 6.1rem;
		color: $white;
	  }
	  &-subtitle {
		margin-top: 2rem;
		font-size: 2rem;
		line-height: 2.4rem;
		color: $modalColor;
	  }
	  &-question {
		padding: 4.2rem 0;
		font-weight: 600;
		font-size: 2rem;
		color: $white;
	  }
	  &-apply {
		.btn-apply {
		  background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
		  padding: 1.8rem 5.8rem;
		  border-radius: 3rem;
		  font-weight: 700;
		  font-size: 1.6rem;
		  color: $white;
		}
	  }
	}	
  }

  @media (max-width: 460px) {
	height: calc(100vh - 6.5rem);
	&__marketplace {
	  max-width: 27.2rem;
	  padding: 2.8rem 1.6rem;
	  border-width: 0.4rem;
	  border-radius: 1.1rem;
	  &-content {
		max-width: none;
		&-title {
		  font-size: 2.8rem;
		  line-height: 3.2rem;
		}
		&-subtitle {
		  margin-top: 1.6rem;
		  font-size: 1.4rem;
		  line-height: 2rem;
		}
		&-question {
		  padding: 2.8rem 0;
		  font-size: 1.6rem;
		}
		&-apply {
		  .btn-apply {
			padding: 0.8rem 3.8rem;
			font-size: 1.4rem;
		  }	
		}
	  }
	}
  }
}
</style>
