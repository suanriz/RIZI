<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <a-result
    status="warning"
    title="此頁面不存在"
  >
    <template #extra>
      <button @click="router.push('/')">
        回首頁
      </button>
    </template>
  </a-result>
</template>

<style lang="sass" scoped>
.content
  width: 100%
  max-width: 1280px
  display: flex
  flex-direction: column
  flex:1
</style>
