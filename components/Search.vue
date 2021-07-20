<template>
  <form class="search-bar search-input"
        @submit.prevent="submitQuery(queryToSubmit)"
        @keydown.down.prevent="nextSuggestion"
        @keydown.up.prevent="prevSuggestion"
        @keyup.prevent.esc="hideSuggestions = !hideSuggestions"
        @focusin="hideSuggestions = false"
  >
    <section class="flex flex-row items-center">
      <button tabindex="0" type="submit" class="ml-5 focus:outline-none hover:text-yeleo focus:text-yeleo transition-colors"><i class="fas fa-search"></i></button>
      <input
        ref='input'
        v-model="query"
        tabindex="1"
        autofocus
        type="text"
        class="mx-4 flex-grow focus:outline-none pt-2 pb-3 text-gray-800 font-light"
        @input="updateQuery"
      >
      <div class="mr-5 text-sm text-gray-300 hidden pointer-events-none select-none sm:block transition transform duration-200" :class="{'translate-x-5': !grepLoading}">
        <span class=" transition-all duration-200" :class="{ 'text-yeleo': query.length > 0 }">
          <span class="keyhint transition-all duration-200" :class="{ 'border-transparent bg-yeleo text-white': query.length > 0 }">ENTER</span> to search,
        </span>
        <span class="transition-all duration-200 ml-1" :class="{ 'text-yeleo': hasAnswers }">
          <span class="keyhint transition-all duration-200" :class="{ 'border-transparent bg-yeleo text-white': hasAnswers }">ESC</span> to Grepp'
          <i class="fas fa-spinner-third animate-spin transition duration-100 ml-1" :class="{ 'opacity-0': !grepLoading, 'delay-200': grepLoading }"></i>
        </span>
      </div>
    </section>
    <section v-show="suggestions.length && !hideSuggestions" class="flex flex-col suggestions-wrapper pb-3" @mouseout="selectedSuggestion = null">
      <a v-for="(suggestion, i) in suggestions"
         :key="i"
         class="flex flex-row items-center cursor-default"
         :class="{ 'bg-gray-200': i === selectedSuggestion }"
         @click="submitQuery(suggestion)"
         @mouseover="selectedSuggestion = i"
      >
        <img v-if="suggestion.isTool" :src="getIconForLink(suggestion)" class="ml-5" style="width: 16px; height: 16px;" alt="s">
        <i v-else class="fas fa-search ml-5 fa-sm"></i>
        <span class="text-gray-900 mx-4 py-2 font-light" v-html="formatSuggestion(suggestion.title)"></span>
      </a>
    </section>
  </form>
</template>

<script>
import googleSuggestApi from '@/api/googleSuggestApi'

export default {
  name: 'Search',
  props: {
    hasAnswers: {
      type: Boolean,
      required: false,
      default: false
    },
    grepLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    tools: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    query: '',
    baseQuery: '',
    suggestions: [],
    selectedSuggestion: null,
    hideSuggestions: false,
  }),
  computed: {
    queryToSubmit () {
      if (this.selectedSuggestion === null) {
        return {
          title: this.query
        }
      } else {
        return this.suggestions[this.selectedSuggestion]
      }
    }
  },
  watch: {
    query (newVal) {
      this.$emit('update', newVal)
      this.hideSuggestions = false
    }
  },
  methods: {
    formatSuggestion (suggestion) {
      if (suggestion.toLowerCase().startsWith(this.baseQuery.toLowerCase())) {
        suggestion = `${this.baseQuery}<span class="font-medium">${suggestion.slice(this.baseQuery.length)}</span>`
      } else {
        suggestion = `<span class="font-medium">${suggestion}</span>`
      }
      return suggestion
    },
    submitQuery (query) {
      let url
      if (query.url) {
        url = query.url
      } else {
        url = `https://www.google.com/search?q=${query.title}`
      }
      this.query = ''
      this.updateQuery()
      window.open(url, '_blank')
    },
    nextSuggestion () {
      if (this.suggestions.length) {
        if (this.selectedSuggestion === null || this.selectedSuggestion < this.suggestions.length - 1) {
          if (this.selectedSuggestion === null) {
            this.selectedSuggestion = 0
          } else {
            this.selectedSuggestion++
          }
          this.query = this.suggestions[this.selectedSuggestion].title
        } else {
          this.selectedSuggestion = null
          this.query = this.baseQuery
        }
      }
    },
    prevSuggestion () {
      if (this.suggestions.length) {
        if (this.selectedSuggestion === null || this.selectedSuggestion > 0) {
          if (this.selectedSuggestion === null) {
            this.selectedSuggestion = this.suggestions.length - 1
          } else {
            this.selectedSuggestion--
          }
          this.query = this.suggestions[this.selectedSuggestion].title
        } else {
          this.selectedSuggestion = null
          this.query = this.baseQuery
        }
      }
    },
    updateQuery () {
      if (this.query.length) {
        this.suggestions = this.tools.filter(link => {
          return (link.title.toLowerCase().includes(this.query.toLowerCase()))
        }).map(link => { link.isTool = true; return link; })

        googleSuggestApi.getSuggestions(this.query).then(suggestions => {
          suggestions.forEach(suggestion => {
            this.suggestions.push({
              title: suggestion
            })
          })
          this.baseQuery = this.query
          this.selectedSuggestion = null
        })
      } else {
        this.selectedSuggestion = null
        this.suggestions = []
        this.baseQuery = ''
      }
    },
    getIconForLink(link) {
        return link.customIcon || link.icon || (require(this.$store.state.darkTheme ? '~/assets/img/globe-white.svg' : '~/assets/img/globe.svg'))
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style scoped>
.search-input {
  border-radius: 25px;
  min-height: 50px;
}
.suggestions-wrapper {
  position: relative;
  display: none;
}
.suggestions-wrapper::before {
  content: '';
  position: absolute;
  left: 20px;
  right: 20px;
  top: 0;
  height: 1px;
  @apply bg-gray-200;
}

.search-input:focus-within .suggestions-wrapper, .search-input:hover .suggestions-wrapper {
  display: block;
}
.keyhint {
  /*@apply bg-gray-200 py-1 px-2 rounded text-white;*/
  @apply border py-1 px-2 rounded;
}

.search-bar {
  @apply flex flex-col flex-grow text-lg text-gray-500 border border-gray-200 transition-all overflow-hidden max-w-3xl mx-auto bg-white;
  border-radius: 25px;
  min-height: 50px;
}
.search-bar:hover, .search-bar:focus-within {
  box-shadow:  0 0 25px rgba(0, 0, 0, 0.15);
  border-color: transparent;
}

.grep-loading {
  animation: loading-grep .4s alternate infinite;
}

@keyframes loading-grep {
  to {
    @apply border-yeleo-light text-yeleo
  }
}

</style>
