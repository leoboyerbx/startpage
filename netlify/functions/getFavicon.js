import getFavicon from '~/helpers/getFavicon'

function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(str)
}

exports.handler = async function ({ queryStringParameters }, context) {
  try {
    const url = queryStringParameters.url
    if (!url) return { statusCode: 400, body: 'Url parameter not provided' }
    if (!validURL(url)) return { statusCode: 400, body: 'Invalid Url' }
    const favicon = await getFavicon(url)
    return {
      statusCode: 200,
      body: JSON.stringify({ iconUrl: favicon }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Internal server error',
    }
  }
}
