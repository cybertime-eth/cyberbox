import axios from 'axios'

const API_URL = 'https://cdn.cyberbox.art/api'

export default {
    async getRarityNfts(payload) {
        const startId = (payload.page - 1) * 48
        const url = `${API_URL}/contract_infos/getRarityNfts?symbol=${payload.contract}&from=${startId}&count=48&direction=${payload.direction}`
        const result = await axios.get(url)
        return result.data?.contract_infos || []
    },
    async getNftRankings(contract_ids) {
        const url = `${API_URL}/contract_infos/getCollections`
        const payload = {
            contract_ids
        }
        const result = await axios.post(url, payload)
        return result.data?.contract_infos || []
    },
    async addClickHistory(address) {
        const url = `${API_URL}/account_refers/addClickHistory?address=${address}`
        const result = await axios.get(url)
        return result.data?.account_refer || {}
    },
    async getClickCount(address) {
        const url = `${API_URL}/account_refers/getClickCount?address=${address}`
        const result = await axios.get(url)
        return result.data ? JSON.parse(result.data) : {}
    },
    async uploadImageToIPFS(ipfsArray) {
        const res = await axios.post('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', ipfsArray, {
            headers: { 
                "X-API-KEY": 'ymjHNi36z9W2T3KrZIV0Wo5g7DDesCg95uCh4M1UzrMHFDUOMpdQvGPKFVEmcLnN',
                'Content-Type': 'application/json',
                "accept": "application/json"
            }
        })
        return res.data
    }
}