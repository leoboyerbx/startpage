<template>
  <div id="app" class="m-0 p-0 w-full min-h-full absolute" :class="{ 'bg-gray-900': dark, dark, 'theme-transition': $store.state.themeTransition }">
    <div class="container mx-auto max-w-6xl px-10 relative">
      <header class="mx-auto mt-10 pt-10 content-center relative z-10">
        <h1 class="font-bold text-center w-auto text-yeleo text-8xl mb-10 dark:text-yeleo-light">...start !</h1>
        <section class="search-wrapper">
          <Search ref='search' :has-answers="hasAnswers" :grep-loading="isGrepperLoading" :tools="tools" @update="searchQuery = $event; hasAnswers = false" />
        </section>
      </header>
      <main class="my-10">
        <Grepper :query="searchQuery" @grep-loading="isGrepperLoading = $event" @hasAnswers="hasAnswers = $event" />
        <Tools :categories="categories" />
      </main>
      <Settings class="z-20" />
    </div>
  </div>
</template>

<script>
import '@/assets/fontawesome/css/all.min.css';

import Tools from '~/components/Tools/Tools'
import Search from '~/components/Search'
import getFavicon from '~/helpers/getFavicon'

export default {
  components: {
    Tools,
    Search
  },
  async asyncData(ctx) {
    const tools = await ctx.$content('tools').fetch()
    const categories = tools.categories
    if (process.server && !ctx.isDev) {
      for (const category of categories) {
        for (const link of category.links) {
          if (!link.icon) {
            link.icon = await getFavicon(link.url)
          }
        }
      }
    }
    return {
      categories
    }
  },
  data: () => ({
    searchQuery: '',
    hasAnswers: false,
    isGrepperLoading: false,
  }),
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
  beforeMount() {
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this))
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange.bind(this))
  },
  computed: {
    dark () {
      return this.$store.getters.dark
    },
    tools() {
      const tools = []
      this.categories.forEach(category => category.links.forEach(link => tools.push(link)))
      return tools
    },
  },
  methods: {
    onVisibilityChange () {
      if (document.visibilityState === 'visible' && this.$store.state.focusWhenVisible) {
        this.$refs.search.focus()
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: scroll;
  /*--fa-secondary-color: theme('colors.yeleo.DEFAULT');*/
}

#app {
  font-family: arboria, sans-serif;
}
#app.theme-transition * {
  transition: all .2s ease 0s !important;
}

.search-wrapper {
  height: 50px;
}

</style>
