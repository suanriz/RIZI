<script lang="ts" setup>
import { MENU_TYPE_INFO } from '@/utils/site'
import { useIndexStore } from '@/stores/indexStore'
import { onMounted } from 'vue'

const indexStore = useIndexStore()
const VITE_DOMAIN = import.meta.env.VITE_DOMAIN

onMounted(() => {
  indexStore.loading = false
})
</script>

<template>
  <section class="contentWrap">
    <Divider title="門市菜單" />
    <div
      v-for="item in MENU_TYPE_INFO"
      :key="item.name"
      class="menuWrap"
      :data-aos="item.aos"
      data-aos-duration="700"
      data-aos-easing="ease-in-sine"
    >
      <div class="imgWrap">
        <img :src="VITE_DOMAIN + item.img">
      </div>
      <div class="itemName">
        <h3>{{ item.name }}</h3>
        <p>{{ item.introduction }}</p>
        <router-link :to="item.link">
          <div class="btnWrap">
            <button>View more</button>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.menuWrap
  display: flex
  justify-content: space-between
  margin-bottom: 4%
  +phone()
    flex-direction: column
:nth-child(even)
  flex-direction: row-reverse
  +phone()
    flex-direction: column
  .imgWrap
    width: 50%
    +phone()
      width: 100%
    img
      object-fit: cover
      vertical-align: middle
      width: 100%
      height: 100%
  .itemName
    width: 48%
    +phone()
      width: 100%
    h3
      font-size: 18px
      font-weight: 300
      letter-spacing: 0.1em
      line-height: 30px
      letter-spacing: 0.04em
      color: var(--mainRed)
    p
      font-size: 16px
      font-weight: 100
      letter-spacing: 0.04em
      color: var(--mainTxt)
      line-height: 25px
    a
      text-decoration: none
      cursor: auto
      .btnWrap
        display: flex
        justify-content: right
        margin-top: 6px
</style>
