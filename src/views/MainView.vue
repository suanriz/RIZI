<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIndexStore } from '@/stores/indexStore'

const route = useRoute()
const indexStore = useIndexStore()
const loading = computed(() => indexStore.loading)
const colorPrimary = ref('#702222')
const colorTextBase = ref('#505050')

onMounted(() => {
  const _colorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--mainRed').trim()
  const _colorTextBase = getComputedStyle(document.documentElement).getPropertyValue('--mainTxt').trim()
  if (_colorPrimary) colorPrimary.value = _colorPrimary
  if (_colorTextBase) colorTextBase.value = _colorTextBase
})
</script>

<template>
  <a-config-provider
    :theme="{ token: { colorPrimary: colorPrimary, colorTextBase: colorTextBase, fontFamily: 'Noto Sans TC, sans-serif' } }"
  >
    <div
      v-show="loading"
      class="loadingWrap"
    >
      <a-spin size="large" />
    </div>
    <Nav />
    <Breadcrumb v-if="route.path !== '/index'" />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </a-config-provider>
</template>

<style lang="sass" scoped>
.loadingWrap
  min-width: 100%
  min-height: 100%
  background: var(--mainWhite)
  display: flex
  justify-content: center
  margin-top:160px

.content
  width: 100%
  max-width: 1280px
  display: flex
  flex-direction: column
  flex:1
</style>
