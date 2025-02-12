<script lang="ts" setup>
import type { NewsType, PageConfigType, NewsModelType } from '@/utils/type'
import { useIndexStore } from '@/stores/indexStore'
import { computed, onMounted, ref } from 'vue'
import { NEWS_TYPE } from '@/utils/site'

const indexStore = useIndexStore()
const storeData = computed(() => indexStore.news)
const pageConfig = ref({
  current: 1,
  pageSize: 4,
})
const newsData = computed(() => renderData(storeData.value, pageConfig.value))
const newsParams = computed(() => indexStore.newsParams)
const activeTab = ref(0)
const modalConfig = ref<NewsModelType>({
  isOpen: false,
  list: [],
  data: {
    id: 0,
    title: '',
    introduction: '',
    link: '',
    img: '',
    type: 0
  }
})

const renderData = (storeData: NewsType[], pageConfig: PageConfigType) => {
  const star = (pageConfig.current - 1) * pageConfig.pageSize
  const end = star + pageConfig.pageSize
  return storeData.slice(star, end)
}

const handleTabChange = (key: number) => {
  const params = {
    ...newsParams.value,
    type: key,
  }
  indexStore.handleGetNews(params)
}

const handleOpenModal = (data: NewsType) => {
  modalConfig.value.isOpen = true
  modalConfig.value.list = storeData.value
  modalConfig.value.data = data
}

onMounted(() => {
  indexStore.handleGetNews()
})
</script>

<template>
  <section class="contentWrap">
    <Divider title="最新消息" />
    <div class="filterWrap">
      <a-tabs
        v-model:active-key="activeTab"
        @change="handleTabChange"
      >
        <a-tab-pane
          v-for="option in NEWS_TYPE"
          :key="option.value"
          :tab="option.label"
          show-size-changer
        />
      </a-tabs>
    </div>
    <div class="newsWrap">
      <div
        v-for="news in newsData"
        :key="news.title"
        class="news"
        @click="handleOpenModal(news)"
      >
        <div class="newsImgWrap">
          <img
            v-lazy="news.img"
            :alt="news.title"
            @load="indexStore.loading = false"
          >
        </div>
        <div class="newsTxtWrap">
          <h3>{{ news.title }}</h3>
          <p>{{ news.introduction }}</p>
        </div>
      </div>
    </div>
    <Pagination
      v-model="pageConfig"
      :total="storeData.length"
    />
  </section>
  <NewsModal v-model="modalConfig" />
</template>

<style lang="sass" scoped>
@mixin oneCol()
  @media (max-width: 499px)
    @content

.newsWrap
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  margin: auto
  width: 100%
  .news
    width: 48.5%
    margin-bottom: 4%
    cursor: pointer
    +oneCol()
      width: 100%
    .newsImgWrap
      width: 100%
      aspect-ratio: 475 / 300
      overflow: hidden
      img
        width: 100%
        transition: transform 0.3s ease
    .newsImgWrap:hover img
      transform: scale(1.2)
    .newsTxtWrap
      padding: 0 4%
      h3
        font-size: 18px
        font-weight: 400
        letter-spacing: 0.1em
        line-height: 30px
        margin: 8px 0
        color: var(--mainTxt)
        &:hover
          color: var(--mainRed)
      p
        font-size: 16px
        font-weight: 100
        letter-spacing: 0.04em
        overflow: hidden
        text-overflow: ellipsus
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        word-break: break-all
        color: var(--mainTxt)
        line-height: 25px
        &:hover
          color: var(--mainRed)
</style>
