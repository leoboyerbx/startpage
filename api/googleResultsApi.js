import axios from 'axios'

import config from '@/config/config'

const googleResultsApi = {
  endPoint: config.apiEndPoint + '/',
  callback: 'autocompleteCallback',
  async getResults (query) {
    const response = await axios.get(this.endPoint + 'proxy/google/?q=' + query)
    return response.data
  }
}

export default googleResultsApi
