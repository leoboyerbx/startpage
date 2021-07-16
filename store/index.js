export const state = () => ({
  gridDisplay: true,
  gridCols: 4,
  maxCols: 4,
  minCols: 2,
  darkTheme: null,
  matchedDarkTheme: false,
  themeTransition: false,
})
export const getters = {
  dark(state) {
    if (state.darkTheme === null) {
      return state.matchedDarkTheme
    } else {
      return state.darkTheme
    }
  },
}
export const mutations = {
  gridDisplay(state, set = true) {
    state.gridDisplay = set
  },
  gridCols(state, set) {
    state.gridCols = set
  },
  addCol(state) {
    if (state.gridCols < state.maxCols) state.gridCols++
  },
  rmCol(state) {
    if (state.gridCols > state.minCols) state.gridCols--
  },
  matchedDarkTheme(state, set) {
    state.matchedDarkTheme = set
  },
  theme(state, set) {
    if (set === 'system') {
      state.darkTheme = null
    } else {
      state.darkTheme = set === 'dark'
      localStorage.setItem('theme', set)
    }
  },
  darkTemeAuto(state) {
    localStorage.setItem('theme', 'system')
    state.darkTheme = null
  },
}

export const actions = {}
