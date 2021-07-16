<template>
  <div id="app" class="m-0 p-0 w-full min-h-full absolute" :class="{ 'bg-gray-900': dark, dark, 'theme-transition': $store.state.themeTransition }">
    <div class="container mx-auto max-w-6xl px-10 relative">
      <header class="mx-auto mt-10 pt-10 content-center relative z-10">
        <h1 class="font-bold text-center w-auto text-yeleo text-8xl mb-10 dark:text-yeleo-light">...start !</h1>
        <section class="search-wrapper">
<!--          <Search @update="searchQuery = $event; hasAnswers = false" :has-answers="hasAnswers" />-->
        </section>
      </header>
      <main class="my-10">
<!--        <Grepper :query="searchQuery" @hasAnswers="hasAnswers = $event" />-->
        <Tools :categories="categories" />
      </main>
      <Settings class="z-20" />
    </div>
  </div>
</template>

<script>
import Tools from '~/components/Tools/Tools'
export default {
  components: {
    Tools
  },
  async asyncData(ctx) {
    const categories = await ctx.$content('toolsCategories').fetch()
    return {
      categories
    }
  },
  data: () => ({
    searchQuery: '',
    hasAnswers: false
  }),
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
  computed: {
    dark () {
      return this.$store.getters.dark
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
