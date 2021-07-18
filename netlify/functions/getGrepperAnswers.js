import axios from 'axios'

exports.handler = async ({ queryStringParameters }, context) => {
  const query = queryStringParameters.query
  if (!query) return { statusCode: 400, body: 'Query parameter not provided' }
  try {
    const response = await axios.get(
      `https://www.codegrepper.com/api/get_answers_1.php?s=${query}`
    )
    if (response.data.answers && response.data.answers.length) {
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } else {
      const googleRes = await axios.get(
        `https://www.googleapis.com/customsearch/v1?cx=${
          process.env.GOOGLE_SEARCH_CX
        }&q=${encodeURI(query)}&key=${process.env.GOOGLE_SEARCH_KEY}`
      )
      const googleResults = googleRes.data?.items?.map((result) => result.link)
      if (googleResults?.length) {
        const response2 = await axios.post(
          'https://www.codegrepper.com/api/get_answers_2.php',
          {
            results: googleResults,
            search: query,
            // user_id: 200043
          }
        )
        return {
          statusCode: 200,
          body: JSON.stringify(response2.data),
        }
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(response.data),
        }
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Error in grepper step 1 : ' + e,
    }
  }
}
