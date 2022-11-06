<template>
	<section class="footer" :class="{ fixed: footerFixed, hidden: footerHidden }">
		<div class="footer__container container-xl">
			<a class="footer__logo" href="/">
				<img :src="getCDNImage('footer-logo.svg')" alt="logo" >
			</a>
			<div class="footer__links">
				<div class="footer__links-box">
					<div class="footer__links-social">
						<a class="footer__links-social-link" href="https://twitter.com/cybertime_eth" target="_blank">
							<img class="footer__links-social-link-icon" :src="getCDNImage('socials/twitter-gray.svg')" alt="twitter">
						</a>
						<a class="footer__links-social-link" href="https://t.me/cybertime_eth" target="_blank">
							<img class="footer__links-social-link-icon" :src="getCDNImage('socials/telegram-gray.svg')" alt="telegram">
						</a>
						<a class="footer__links-social-link" href="https://cybertime.medium.com/" target="_blank">
							<img class="footer__links-social-link-icon" :src="getCDNImage('socials/medium-gray.svg')" alt="medium">
						</a>
						<a class="footer__links-social-link" href="https://discord.gg/cKcWfCux4s" target="_blank">
							<img class="footer__links-social-link-icon" :src="getCDNImage('socials/discord-gray.svg')" alt="discord">
						</a>
					</div>
					<a class="footer__links-link" href="https://docs.cyberbox.art/	" target="_blank">
						<img class="footer__links-link-icon" :src="getCDNImage('help.svg')" alt="help">
					</a>
				</div>
				<button class="footer__links-button" @click="gotoTop">
					<img class="footer__links-button-icon" :src="getCDNImage('circle-arrow-up.svg')" alt="up">
				</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
	  return {
		footerFixed: true,
		footerHidden: false
	  }
	},
	computed: {
	  routeName() {
		return this.$route.name
	  }
	},
	watch: {
	  routeName() {
		this.updateLayout()
	  }
	},
	created() {
	  this.updateLayout()
	},
	methods: {
	  updateLayout() {
		const nonFixedRoutes = ['index', 'explorer', 'tracker', 'calendar']
		if (nonFixedRoutes.includes(this.routeName) || (this.routeName !== 'index' && process.browser && window.innerWidth <= 460)) {
		  this.footerFixed = false
		}
		if (this.routeName.includes('createbox')) {
		  this.footerHidden = true
		}
	  },
	  gotoTop() {
		window.scrollTo(0, 0)
	  }
	},
}
</script>

<style lang="scss">
.footer {
	background: $white2;
	padding: 2.8rem 5.1rem;
	border: 1px solid #F3F4F6;
	&.fixed {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	&.hidden {
	  	display: none;
	}
	&__container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&__links {
		display: flex;
		align-items: center;
		&-social {
			display: flex;
			align-items: center;
			&-link {
				margin-right: 2.15rem;
				&:last-child {
					margin-right: 0;
				}
			}
		}
		&-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&-link {
			margin-left: 4.7rem;
		}
		&-button {
			margin-left: 4.1rem;
		}
	}

	@media(max-width: 460px) {
		background: $white;
		padding: 2rem 1rem;
		display: none;
		&.sidemenu {
		  display: block;
		  z-index: 100;
		}
		.container-xl {
			width: 100%;
		}
		&__logo {
			display: none;
		}
		&__links {
			width: 100%;
			&-box {
				width: 100%;
			}
			&-social {
				&-link {
					margin-right: 3.2rem;
				}
			}
			&-button {
				display: none;
			}
		}
	}
}
</style>