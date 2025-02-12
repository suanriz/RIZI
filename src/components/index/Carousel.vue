<script lang="ts" setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
import { computed, onMounted } from 'vue'
import { useIndexStore } from '@/stores/indexStore'

const indexStore = useIndexStore()
const banners = computed(() => indexStore.banners)

const handleOpenNewTab = (link: string) => window.open(link, '_blank')

onMounted(() => {
  indexStore.handleGetBanner()
})
</script>

<template>
  <section>
    <a-carousel
      arrows
      autoplay
    >
      <div
        v-for="item in banners"
        :key="item.id"
        :class="{ 'hasLink': item.link }"
        @click="item.link && handleOpenNewTab(item.link)"
      >
        <img
          class="bannerImg"
          :src="item.img"
          :alt="item.alt"
          @load="indexStore.loading = false"
        >
      </div>
      <template #prevArrow>
        <div class="custom-slick-arrow prev-arrow">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow next-arrow">
          <right-circle-outlined />
        </div>
      </template>
    </a-carousel>
  </section>
</template>

<style lang="sass" scoped>
.hasLink
  cursor: pointer

section
  margin-top: 2%
:deep(.slick-slide)
  text-align: center
  .bannerImg
    width: 100%
:deep(.slick-arrow.prev-arrow)
  left: 10px
  z-index: 1
:deep(.slick-arrow.next-arrow)
  right: 10px
:deep(.slick-arrow.custom-slick-arrow)
  width: 30px
  height: 30px
  font-size: 30px
  color: var(--mainWhite)
  transition: ease all 0.3s
  opacity: 0.5
  z-index: 1
:deep(.slick-arrow.custom-slick-arrow:before) 
  display: none
:deep(.slick-arrow.custom-slick-arrow:hover) 
  color: var(--mainWhite)
  opacity: 1
:deep(.slick-slide h3)
  color: var(--mainWhite)
</style>
