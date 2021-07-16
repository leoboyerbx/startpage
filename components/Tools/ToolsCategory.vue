<template>
  <article class="bg-white shadow-th-sm rounded-lg w-full overflow-hidden dark:bg-gray-800">
    <header class="py-3 px-4 text-gray-700 dark:text-gray-300 shadow">
      <h3 class="text-xl"><i :class="category.icon" class="mr-2 inline-block transform scale-75"></i>{{ category.name }}</h3>
    </header>
    <main ref="listWrapper" :style="{ maxHeight: maxHeight + 'px' }" class="overflow-y-scroll no-scrollbar transition-all duration-300">
      <div ref="list">
        <a
          v-for="link in category.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          class="flex items-center p-2 text-gray-800 dark:text-gray-300"
          :title="link.title"
        >
          <img :src="link.icon ? apiEndPoint + link.icon.url : require('~/assets/img/globe.svg')" alt="fav" style="width: 16px; height: 16px;" class="ml-2">
          <span class="truncate mx-2">{{ link.title }}</span>
        </a>
      </div>
    </main>
    <footer v-if="category.links.length > 5" class="border-t border-gray-20 dark:border-gray-700 p-2 flex justify-center items-center text-gray-700 dark:text-gray-300 cursor-pointer" @click.prevent="extended = !extended">
      <i class="fas fa-chevron-down fa-2x transition duration-300 transform" :class="{ 'rotate-180': extended }"></i>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'ToolsCategory',
  props: {
    category: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    initialHeight: 200,
    extended: false
  }),
  computed: {
    maxHeight () {
      if (this.extended) {
        return this.$refs.list.offsetHeight
      } else {
        return this.initialHeight
      }
    }
  }
}
</script>
