import axios from 'axios'

export default async (query) => {
  try {
    const response = await axios.get(
      '/.netlify/functions/getGrepperAnswers?query=' + encodeURI(query)
    )
    return response.data
  } catch (e) {
    return false
  }
}
