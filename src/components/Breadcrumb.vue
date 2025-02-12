<script lang="ts" setup>
import type { BreadcrumbDataType } from '@/utils/type'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const breadcrumbData = computed(() => {
  const pathSplit = route.path.split('/').filter(x => x && !Number(x))
  const breadcrumb: BreadcrumbDataType[] = []
  let path = ''
  pathSplit.forEach((x) => {
    path += `/${x}`
    const matchedRoute = route.matched[0].children.find(x => x.path.replace(/\/:\w+/g, '') === path)
    if (matchedRoute)
      breadcrumb.push({
        name: matchedRoute.name ? String(matchedRoute.name) : 'name未設置',
        link: matchedRoute.path,
      })
  })
  return breadcrumb
})
</script>

<template>
  <section>
    <div class="breadcrumbWrap">
      <ul class="breadcrumb">
        <li>
          <router-link to="/index">
            首頁
          </router-link>
        </li>
        <li
          v-for="breadcrumb in breadcrumbData"
          :key="breadcrumb.link"
        >
          <router-link :to="breadcrumb.link">
            {{ breadcrumb.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="sass" scoped>
section
  width: 100%
  background-color: var(--mainGray)
  display: flex
  justify-content: center
  .breadcrumbWrap
    width: 100%
    max-width: 1080px
    .breadcrumb
      margin: auto
      display: flex
      padding: 5px 4% 8px
      > li
        font-size: 12px
        &:last-child > a
          cursor: auto
        > a
          color: var(--deepGray)
          font-size: 12px
          display: inline-block
          height: 12px
          line-height: 12px
        + li::before
          content: "/"
          color: var(--deepGray)
          font-size: 11px
          height: 12px
          line-height: 12px
          padding: 0 4px
</style>
