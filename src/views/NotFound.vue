<template>
  <a-result
    status="warning"
    title="此頁面不存在"
  >
    <template #extra>
      <button>
        <router-link to="/">
          回首頁
        </router-link>
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
