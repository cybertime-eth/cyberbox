export default() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ipfs/0.65.0/index.min.js'
    script.integrity="sha512-jmfCU6IgczOQPLR/FNk/G1PxSsS26fKmbPUzIfSGmRDDlE6QyEGXy1NJqrSDFygrZYa8o0YRgFt64fKxmS4SlA=="
    script.crossorigin="anonymous"
    script.referrerpolicy="no-referrer"
	document.head.appendChild(script)
}