import axios from 'axios'
import config from '@/config/config'
import googleResultsApi from '@/api/googleResultsApi'

const grepperApi = {
  endPoint: config.apiEndPoint + '/',

  async query (query) {
    // const response = await axios.get(this.endPoint + 'proxy/grepper/?q=' + query)
    // return response.data
    const response = await axios.get(`https://www.codegrepper.com/api/get_answers_1.php?s=${query}`).catch(err => console.log('Error in grepper step 1 : ', err))
    if (response.data.answers && response.data.answers.length) {
      return response.data
    } else {
      const googleResults = await googleResultsApi.getResults(query).catch(err => console.log('Error in grepper step 2 (google results) : ', err))
      if (googleResults.length) {
        const response2 = await axios.post('https://www.codegrepper.com/api/get_answers_2.php', {
          results: googleResults,
          search: query
          // user_id: 200043
        }).catch(err => console.log('Error in grepper step 3 : ', err))
        return response2.data
      } else {
        return response.data
      }
    }
  }
}

export default grepperApi
