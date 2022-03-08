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
    }
}