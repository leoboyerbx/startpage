<template>
  <div
    class="overflow-hidden relative rounded-xl"
    style="background-color: #0d1032"
  >
    <header class="w-full p-3 leading-none flex items-center justify-between">
      <button class="window-button bg-red-400" @click="$emit('close')">
        <span class="button-times">&times;</span>
      </button>
      <button class="window-button bg-yellow-400 mr-auto ml-2" @click="extended = !extended">
        <span class="button-minus">-</span>
      </button>
      <a v-if="answer.source_url" :href="answer.source_url" title="Source" target="_blank" class="text-indigo-50 hover:opacity-100 transition" :class="extended ? 'opacity-50' : 'opacity-0'">
        Source
        <i class="far fa-external-link-alt ml-2"></i>
      </a>
    </header>
    <main :style="{ maxHeight }" class="transition-all duration-300">
      <pre
        ref="content"
        style="background-color: transparent"
        class="prism-wrapper"
      ><code :class="'language-' + language">{{ answer.answer }}</code></pre>
    </main>
  </div>
</template>

<script>

export default {
  name: 'GrepperAnswer',
  components: {},
  props: ['answer', 'language'],
  data: () => ({
    extended: true,
    isMounted: false
  }),
  computed: {
    maxHeight () {
      if (!this.isMounted) return
      if (this.extended) {
        return this.$refs.content.offsetHeight + 'px'
      } else {
        return '0px'
      }
    }
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style scoped>
.prism-wrapper {
  border-radius: 0px;
  margin: 0;
  padding-top: 5px;
}

.window-button {
  @apply text-transparent flex justify-center items-center text-lg hover:text-gray-800 w-4 h-4 rounded-full transition-colors focus:outline-none;
}
.button-times {
  transform: translateY(-2.5px);
}
.button-minus {
  transform: translateY(-2.5px);
}

</style>
