<template>
  <a
    :href="link.url"
    target="_blank"
    class="link flex flex-col items-center p-2 text-gray-800 flex-shrink-0 w-40 dark:text-gray-300"
    :title="link.title"
  >
    <div class="relative w-8 h-8 my-5">
      <img :src="icon" alt="fav" class="link-hover-opacity w-full absolute top-0 opacity-0 transition duration-500 filter blur-md">
      <img
        :src="icon"
        alt="fav" class="w-full absolute top-0 transition duration-500">
    </div>
    <div class="line-clamp mx-2 w-full text-center">{{ link.title }}</div>
  </a>
</template>
<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    }
  },
  computed: {
    icon() {
      return this.link.customIcon || this.link.icon || (require(this.$store.state.darkTheme ? '~/assets/img/globe-white.svg' : '~/assets/img/globe.svg'))
    }
  }
}
</script>
<style>

.link:hover .link-hover-opacity {
  opacity: 0.5;
}
.link:hover .link-hover-scale {
  transform: scale(1.02);
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
