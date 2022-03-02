export default() => {
	const script = document.createElement('script')
	script.src = 'https://www.googletagmanager.com/gtag/js?id=G-2YVPEFEZ6C'
	script.async = true
	document.head.appendChild(script)

	window.dataLayer = window.dataLayer || []
	function gtag(){dataLayer.push(arguments)}
	gtag('js', new Date())
	gtag('config', 'G-2YVPEFEZ6C')

	const script2 = document.createElement('script')
	script2.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-P72DPCX');
	`
	document.head.appendChild(script2)
}