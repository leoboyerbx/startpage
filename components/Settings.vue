<template>
  <div v-click-away="close" class="fixed top-0 left-0 mt-2 ml-4 text-gray-700 dark:text-gray-300">
    <button @click="open = !open"
            class="focus:outline-none p-3 text-2xl transition hover:text-gray-700 dark:hover:text-gray-300"
            :class="{ 'text-gray:700': open, 'text-gray-400': !open }"
    >
      <i class="fas fa-sliders-h"></i>
    </button>
    <div class="settings-wrapper ml-1 flex flex-col font-light text-sm p-4 shadow-th rounded-xl overflow-hidden bg-white dark:bg-gray-800" :class="{ open }">
      <span class="mb-2">Theme</span>
      <div class="mb-4">
        <button title="Light" class="display-button" @click="$store.commit('theme', 'light')" :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.darkTheme === false }"><i class="fas fa-sun"></i></button>
        <button title="Dark" class="display-button ml-1" @click="$store.commit('theme', 'dark')" :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.darkTheme === true }"><i class="fas fa-moon"></i></button>
        <button title="Follow system preference" class="display-button ml-1" @click="$store.commit('darkTemeAuto')" :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.darkTheme === null }"><i class="fas fa-magic"></i></button>
      </div>
      <span class="mb-2">Tools display mode</span>
      <div class="mb-4 flex">
        <button class="display-button text-xl" @click="$store.commit('gridDisplay', false)" :class="{ 'bg-gray-200 dark:bg-gray-600': !$store.state.gridDisplay }"><i class="fas fa-th-list"></i></button>
        <button class="display-button text-xl mx-2" @click="$store.commit('gridDisplay', true)" :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.gridDisplay }"><i class="fas fa-th"></i></button>
        <div class="flex text-xs ml-2" v-show="$store.state.gridDisplay">
          <button @click="$store.commit('rmCol')" class="pl-3 pr-2 py-0 border-2 border-gray-700 dark:border-gray-300 border-r-0 rounded-l-full focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"><i class="fas fa-minus"></i></button>
          <span class="text-lg font-medium flex items-center px-1 border-b-2 py-0 border-t-2 border-gray-700 dark:border-gray-300 leading-none">{{ $store.state.gridCols }}</span>
          <button @click="$store.commit('addCol')" class="pr-3 pl-2 py-0 border-2 border-gray-700 dark:border-gray-300 border-l-0 rounded-r-full focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data: () => ({
    open: false
  }),
  methods: {
    close () {
      this.open = false
    }
  }
}
</script>

<style scoped>
.display-button {
  @apply p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none;
  line-height: 1;
}
.settings-wrapper {
  transform: scale(0.5);
  opacity: 0;
  transition: transform .2s cubic-bezier(0.65, 0.05, 0.36, 1), opacity .2s cubic-bezier(0.65, 0.05, 0.36, 1);
  transform-origin: 10% 0;
  pointer-events: none;
}
.settings-wrapper.open {
  transform: scale(1);
  opacity: 1;
  pointer-events: all;
}
</style>
