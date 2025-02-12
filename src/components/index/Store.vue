<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useIndexStore } from '@/stores/indexStore'

const indexStore = useIndexStore()
const shopData = computed(() => indexStore.goodsList.filter(x => x.tag.includes(0)))

onMounted(() => {
  indexStore.handleGetGoods()
})
</script>

<template>
  <section>
    <Divider title="立即購買" />
    <div
      class="storeWrap"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <GoodCard
        v-for="good in shopData"
        :key="good.name"
        :data="good"
      />
    </div>
    <MoreBtn link="store" />
  </section>
</template>

<style lang="sass" scoped>
.storeWrap
  display: grid
  justify-content: space-between
  grid-template-columns: repeat(4, 1fr)
  grid-gap: 16px
  padding: 0 4%
  +cardThreeCol()
    grid-template-columns: repeat(3, 1fr)
  +cardTwoCol()
    grid-template-columns: repeat(2, 1fr)
  +cardOneCol()
    grid-template-columns: 1fr
    justify-items: center
</style>