<script lang="ts" setup>
import type { GoodType, PageConfigType, CoffeeDetailType } from '@/utils/type'
import { computed, ComputedRef, onMounted, ref } from 'vue'
import { useIndexStore } from '@/stores/indexStore'
import { STORE_TAB_TYPE } from '@/utils/site'

const indexStore = useIndexStore()
const storeData = computed(() => indexStore.goodsList)
const goodData: ComputedRef<GoodType<CoffeeDetailType>[]> = computed(() => renderData(storeData.value, pageConfig.value))
const pageConfig = ref({
  current: 1,
  pageSize: 8,
})

const renderData = (storeData: GoodType<CoffeeDetailType>[], pageConfig: PageConfigType) => {
  const star = (pageConfig.current - 1) * pageConfig.pageSize
  const end = star + pageConfig.pageSize
  return storeData.slice(star, end)
}

const handleTabClick = (index: number) => {
  if (index !== 0) {
    indexStore.handleGetGoods({ type: index })
    pageConfig.value.current = 1
  } else {
    indexStore.handleGetGoods()
  }
}

onMounted(() => {
  indexStore.handleGetGoods()
  indexStore.loading = false
})
</script>

<template>
  <section class="contentWrap">
    <Divider title="線上購物" />
    <div class="shoppingWrap">
      <Tab
        :tab-data="STORE_TAB_TYPE"
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
  justify-content: space-between
  margin: auto
  +phone()
    flex-direction: column
</style>
