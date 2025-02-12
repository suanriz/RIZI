<script lang="ts" setup>
import type { NewsModelType } from '@/utils/type'
import { computed } from 'vue'

const props = defineModel<NewsModelType>({
  required: true
})
const listIdMap = computed(() => props.value.list.map(x => x.id))
const pageId = computed(() => props.value.data.id)
const noPrev = computed(() => listIdMap.value[0] === pageId.value)
const noNext = computed(() => listIdMap.value.at(-1) === pageId.value)

const closeModal = () => props.value.isOpen = false

const handleChangeNews = (type: 'next' | 'prev') => {
  const idIndex = listIdMap.value.findIndex(x => x === pageId.value)
  const searchIndex = type === 'next' ? idIndex + 1 : idIndex - 1
  if (listIdMap.value[searchIndex])
    return props.value.data = props.value.list[searchIndex]
}
</script>

<template>
  <a-modal
    v-model:open="props.isOpen"
    :title="props.data.title"
    @cancel="closeModal"
  >
    <img
      v-lazy="props.data.img"
      class="modalImg"
      :alt="props.data.title"
    >
    <p>{{ props.data.introduction }}</p>
    <template #footer>
      <div class="footerWrap">
        <button
          :disabled="noPrev"
          @click="handleChangeNews('prev')"
        >
          上一篇
        </button>
        <button
          :disabled="noNext"
          @click="handleChangeNews('next')"
        >
          下一篇
        </button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="sass" scoped>
.modalImg
  width: 100%
.footerWrap
  display: flex
  justify-content: center
  gap: 20px
</style>
