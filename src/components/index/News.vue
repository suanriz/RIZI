<script lang="ts" setup>
import type { NewsModelType, NewsType } from '@/utils/type'
import { useIndexStore } from '@/stores/indexStore'
import { ref, computed, onMounted } from 'vue'

const indexStore = useIndexStore()
const newsData = computed(() => indexStore.news)
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

const handleOpenModal = (data: NewsType) => {
  modalConfig.value.isOpen = true
  modalConfig.value.list = newsData.value
  modalConfig.value.data = data
}

onMounted(() => {
  indexStore.handleGetNews({ _limit: 3 })
})
</script>

<template>
  <section>
    <Divider title="最新消息" />
    <div class="newsWrap">
      <div
        v-for="news in newsData"
        :key="news.title"
        class="itemWrap"
        @click="handleOpenModal(news)"
      >
        <div class="item">
          <h3>{{ news.title }}</h3>
          <p>{{ news.introduction }}</p>
        </div>
        <div class="itemImgWrap">
          <img
            src="/img/icon/moreOutline.svg"
            alt="看更多"
          >
        </div>
      </div>
    </div>
    <MoreBtn link="news" />
  </section>
  <NewsModal v-model="modalConfig" />
</template>

<style lang="sass" scoped>
.newsWrap
  padding: 0 4%
  .itemWrap + .itemWrap
    margin-top: 4%
    @media (max-width: 767px)
      margin-top: 25px
  .itemWrap
    text-decoration: none
    transition: 0.7s
    display: flex
    justify-content: space-between
    align-items: center
    cursor: pointer
    &:hover
      transform: translateX(3.6%)
      .itemImgWrap
          filter: grayscale(0)
          opacity: 1
    .item
      h3
        font-size: 18px
        font-weight: 400
        letter-spacing: 0.1em
        line-height: 1.2em
        color: var(--mainTxt)
        margin-bottom: 2%
        &:hover
          color: var(--mainRed)
      p
        font-size: 14px
        font-weight: 300
        line-height: 1.2em
        letter-spacing: 0.1em
        color: var(--mainTxt)
        &:hover
          color: var(--mainRed)
    .itemImgWrap
      margin-left: 6px
      filter: grayscale(1)
      opacity: .5
      img
        width: 20px
        vertical-align: middle
</style>
