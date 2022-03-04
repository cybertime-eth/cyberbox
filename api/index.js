import axios from 'axios'

const API_URL = 'https://cdn.cyberbox.art/api'

export default {
    async getNftRankings(contract_ids) {
        const url = `${API_URL}/contract_infos/getCollections`
        const payload = {
            contract_ids
        }
        const result = await axios.post(url, payload)
        return result.data?.contract_infos || []
    }
}