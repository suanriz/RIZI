<script lang="ts" setup>
const faviconLink = document.createElement('link')
faviconLink.rel = 'icon'
faviconLink.type = 'image/svg+xml'
faviconLink.href = import.meta.env.BASE_URL + 'img/favicon.svg'
document.head.appendChild(faviconLink)
</script>

<template>
  <router-view />
</template>
