<script lang="ts" setup>
import type { CakeDetailType, CoffeeDetailType, GoodType } from '@/utils/type'
import { useIndexStore } from '@/stores/indexStore'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  data: GoodType<CakeDetailType | CoffeeDetailType>
}>()
const indexStore = useIndexStore()
const largePicSrc = ref<string | undefined>(props.data.detail.imgs[0])
const currentIndex = ref(0)
const isAlbumOpen = ref(false)

const updateLargePicSrc = (path: string, index: number) => {
  largePicSrc.value = path
  currentIndex.value = index
}

watch(() => props.data, (newValue) => {
  currentIndex.value = 0
  if (typeof newValue === 'string') {
    largePicSrc.value = undefined
  } else {
    largePicSrc.value = newValue.img
  }
})

onMounted(() => {
  indexStore.loading = false
})
</script>

<template>
  <div class="mainPicWrap">
    <div
      class="smallPic"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-easing="ease-in-sine"
    >
      <img
        v-for="( img, index) in props.data.detail.imgs"
        :key="img + props.data.id"
        :src="img"
        @click="updateLargePicSrc(img, index)"
      >
    </div>
    <div
      class="largePic"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-easing="ease-in-sine"
    >
      <a-image
        :key="`${largePicSrc}${data.id}`"
        :src="largePicSrc"
        :preview="{ visible: isAlbumOpen }"
        @click="isAlbumOpen = true"
      />
      <div style="display: none">
        <a-image-preview-group
          :key="props.data.id + currentIndex"
          :preview="{ visible: isAlbumOpen, onVisibleChange: (visible: boolean) => (isAlbumOpen = visible), current: currentIndex }"
        >
          <a-image
            v-for="img in props.data.detail.imgs"
            :key="img + props.data.id"
            :src="img"
          />
        </a-image-preview-group>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.mainPicWrap
    display: flex
    width: 60%
    height: fit-content
    justify-content: space-between
    +mainPicCol()
      flex-direction: column-reverse
    +mainWrapCol()
      width: 100%
    .smallPic
      width: 18%
      display: flex
      flex-direction: column
      justify-content: space-between
      +mainPicCol()
        flex-direction: row
        width: 100%
      +mainSmallPicCol()
        flex-wrap: wrap
      >img
        cursor: pointer
        vertical-align: middle
        display: block
        aspect-ratio: 1/1
        +mainPicCol()
          width: 23%
        +mainSmallPicCol()
          width: 48.65%
          &:nth-child( -n + 2)
            margin-bottom: 2.86%
    .largePic
      width: 79.24%
      max-width: 500px
      +mainPicCol()
        width: 100%
        margin-bottom: 2.66%
        max-width: 580px
      +mainWrapCol()
        width: 100%
      >img
        width: 100%
        vertical-align: middle
        aspect-ratio: 1/1
</style>
