<template>
  <div v-click-away='close' class='fixed top-0 left-0 mt-2 ml-4 text-gray-700 dark:text-gray-300'>
    <button class='focus:outline-none p-3 text-2xl transition hover:text-gray-700 dark:hover:text-gray-300'
            :class="{ 'text-gray:700': open, 'text-gray-400': !open }"
            @click='open = !open'
    >
      <i class='fas fa-sliders-h'></i>
    </button>
    <div
      class='settings-wrapper ml-1 flex flex-col font-light text-sm p-4 shadow-th rounded-xl overflow-hidden bg-white dark:bg-gray-800'
      :class='{ open }'>
      <span class='mb-2'>Theme</span>
      <div class='mb-4'>
        <button title='Light' class='display-button'
                :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.darkTheme === false }"
                @click="$store.commit('theme', 'light')"><i class='fas fa-sun'></i></button>
        <button title='Dark' class='display-button ml-1'
                :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.darkTheme === true }"
                @click="$store.commit('theme', 'dark')"><i class='fas fa-moon'></i></button>
        <button title='Follow system preference' class='display-button ml-1'
                :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.darkTheme === null }"
                @click="$store.commit('darkTemeAuto')"><i class='fas fa-magic'></i></button>
      </div>
      <span class='mb-2'>Auto focus</span>
      <div class='mb-4'>
        <button title='Disabled' class='display-button'
                :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.focusWhenVisible === false }"
                @click="$store.commit('setAutoFocus', false)"><i class='fas fa-ban'></i></button>
        <button title='Focus when page visible' class='display-button ml-1'
                :class="{ 'bg-gray-200 dark:bg-gray-600': $store.state.focusWhenVisible === true }"
                @click="$store.commit('setAutoFocus', true)"><i class='fas fa-check'></i></button>
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
    close() {
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
