// import axios from 'axios'

const googleSuggestApi = {
  endPoint: 'https://suggestqueries.google.com/complete/search',
  callback: 'autocompleteCallback',
  getSuggestions (query) {
    return new Promise(resolve => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `${this.endPoint}?jsonp=${this.callback}&client=chrome&q=${query}`
      document.querySelector('head').appendChild(script)

      window[String(this.callback)] = res => {
        script.remove()
        resolve(res[1])
      }
    })
  }
}

export default googleSuggestApi
