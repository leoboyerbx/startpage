import getFavicons from 'get-website-favicon'

export default async function (url) {
  const faviconData = await getFavicons(url)
  if (faviconData.icons.length) {
    let icon = faviconData.icons[0]
    for (let i = 1; i < faviconData.icons.length; i++) {
      if (icon.rank > faviconData.icons[i].rank) {
        icon = faviconData.icons[i]
      }
    }
    return icon.src
  }
  return false
}
