export default function ({store}) {
  if (!(localStorage.getItem('theme') === null)) {
    store.commit('theme', localStorage.getItem('theme'))
  }
  window.addEventListener('storage', () => {
    store.commit('theme', localStorage.getItem('theme'))
  })

  store.commit('matchedDarkTheme', window.matchMedia('(prefers-color-scheme: dark)').matches)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    store.commit('matchedDarkTheme', e.matches)
  })
}
