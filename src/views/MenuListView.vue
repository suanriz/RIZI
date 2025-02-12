<script lang="ts" setup>
import type { GoodType, PageConfigType, CakeDetailType } from '@/utils/type'
import { computed, ComputedRef, onMounted, ref, watch } from 'vue'
import { useIndexStore } from '@/stores/indexStore'
import { useRoute, useRouter } from 'vue-router'
import { MENU_TAB_TYPE } from '@/utils/site'
import Tab from '@/components/Tab.vue'

const indexStore = useIndexStore()
const route = useRoute()
const router = useRouter()
const storeData = computed(() => indexStore.menuList)
const tabRef = ref<{ handleClick: (_index: number) => void } | null>(null)
const pageConfig = ref({
  current: 1,
  pageSize: 8,
})
const goodData: ComputedRef<GoodType<CakeDetailType>[]> = computed(() => renderData(storeData.value, pageConfig.value))

const renderData = (storeData: GoodType<CakeDetailType>[], pageConfig: PageConfigType) => {
  const star = (pageConfig.current - 1) * pageConfig.pageSize
  const end = star + pageConfig.pageSize
  return storeData.slice(star, end)
}

const handleChangeTabId = (id: number) => tabRef.value?.handleClick(id)

const handleTabClick = (index: number) => {
  if (index !== 0) {
    indexStore.handleGetMenu({ type: index })
    pageConfig.value.current = 1
  } else {
    indexStore.handleGetMenu()
  }
}

watch(route, () => {
  indexStore.loading = false
})

onMounted(() => {
  if (route.query && route.query.type) {
    handleChangeTabId(~~route.query.type)
    router.replace({ query: {} })
    indexStore.loading = false
    return
  }
  indexStore.handleGetMenu()
  indexStore.loading = false
})
</script>

<template>
  <section class="contentWrap">
    <Divider title="詳細菜單" />
    <div class="shoppingWrap">
      <Tab
        ref="tabRef"
        :tab-data="MENU_TAB_TYPE"
        @handle-tab-click="handleTabClick"
      />
      <div
        class="shopWrap"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <div class="shopItem">
          <GoodCard
            v-for="good in goodData"
            :key="good.name"
            :data="good"
          />
        </div>
        <Pagination
          v-model="pageConfig"
          :total="storeData.length"
        />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.shoppingWrap
  display: flex
  +phone()
    flex-direction: column
  .shopWrap
    flex: 1
</style>
