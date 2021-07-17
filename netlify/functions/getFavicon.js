import getFavicon from '~/helpers/getFavicon'

exports.handler = async function ({ queryStringParameters }, context) {
  const url = queryStringParameters.url
  if (!url) return { statusCode: 400, body: 'Url parameter not provided' }

  const favicon = await getFavicon(url)
  return {
    statusCode: 200,
    body: JSON.stringify({ iconUrl: favicon }),
  }
}
