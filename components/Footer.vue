<template>
	<section class="footer">
		<div class="footer__container container-xl">
			<a class="footer__logo" href="/">
				<img src="/footer-logo.svg" alt="logo" >
			</a>
			<div class="footer__links">
				<div class="footer__links-box">
					<div class="footer__links-social">
						<a class="footer__links-social-link" href="https://twitter.com/cybertime_eth" target="_blank">
							<img class="footer__links-social-link-icon" src="/socials/twitter-gray.svg" alt="twitter">
						</a>
						<a class="footer__links-social-link" href="https://t.me/cybertime_eth" target="_blank">
							<img class="footer__links-social-link-icon" src="/socials/telegram-gray.svg" alt="telegram">
						</a>
						<a class="footer__links-social-link" href="https://cybertime.medium.com/" target="_blank">
							<img class="footer__links-social-link-icon" src="/socials/medium-gray.svg" alt="medium">
						</a>
						<a class="footer__links-social-link" href="https://discord.gg/cKcWfCux4s" target="_blank">
							<img class="footer__links-social-link-icon" src="/socials/discord-gray.svg" alt="discord">
						</a>
					</div>
					<a class="footer__links-link" href="https://cybertime.finance/" target="_blank">
						<img class="footer__links-link-icon" src="/help.svg" alt="help">
					</a>
				</div>
				<button class="footer__links-button" @click="gotoTop">
					<img class="footer__links-button-icon" src="/circle-arrow-up.svg" alt="up">
				</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	methods: {
		gotoTop() {
			window.scrollTo(0, 0)
		}
	}
}
</script>

<style lang="scss">
.footer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background: $white2;
	padding: 2.8rem 5.1rem;
	border: 1px solid #F3F4F6;
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