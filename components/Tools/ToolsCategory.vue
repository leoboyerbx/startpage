<template>
  <article class="w-full">
    <header class="py-3 px-4 border-b border-yeleo dark:border-yeleo-light text-gray-700 dark:text-gray-300">
      <h3 class="text-xl"><i :class="category.icon" class="mr-2 fa-lg inline-block transform scale-75"></i>{{ category.name }}
      </h3>
    </header>
    <main ref="listWrapper" :style="{ maxHeight: maxHeight + 'px' }"
          class="overflow-hidden transition-all duration-300">
      <div ref="list" class="flex flex-wrap gap-x-4 gap-y-8 py-4">
        <ToolItem
          v-for="link in category.links" :key="link.url"
          :link="link"/>
      </div>
    </main>
    <footer v-if="category.links.length > 5"
            class="p-2 flex items-center text-yeleo dark:text-yeleo-light cursor-pointer gap-2"
            @click.prevent="extended = !extended">
      <i class="fas fa-chevron-down transition duration-300 transform" :class="{ 'rotate-180': extended }"></i>
      <span>{{ !extended ? 'See all...' : 'See less' }}</span>
    </footer>
  </article>
</template>

<script>
import ToolItem from '~/components/Tools/ToolItem'

export default {
  name: 'ToolsCategory',
  components: {ToolItem},
  props: {
    category: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    initialHeight: 136,
    extended: false,
    resizeUpdate: 0
  }),
  computed: {
    maxHeight() {
      // eslint-disable-next-line no-unused-expressions
      this.resizeUpdate;
      if (this.extended) {
        return this.$refs.list.offsetHeight
      } else {
        return this.initialHeight
      }
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.onResize.bind(this));
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize.bind(this));
  },
  methods: {
    onResize () {
      this.resizeUpdate++
    }
  }
}
</script>
<style scoped>

/*header {*/
/*  position: relative;*/
/*}*/
/*header::after {*/
/*  content: '';*/
/*  position: absolute;*/
/*  left: 1rem;*/
/*  right: 1rem;*/
/*  bottom: 0;*/
/*  height: 1px;*/
/*  @apply bg-gray-400;*/
/*}*/
</style>
