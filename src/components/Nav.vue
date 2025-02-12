<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useIndexStore } from '@/stores/indexStore'
import { NAV_INFO } from '@/utils/site'

const route = useRoute()
const indexStore = useIndexStore()
const quickcartData = computed(() => indexStore.quickcart)
const isNavOpen = ref(false)

const handleResize = () => {
  if (window.innerWidth >= 1000 && isNavOpen.value)
    isNavOpen.value = false
}

watch(route, () => {
  isNavOpen.value = false
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <input
    id="navCheck"
    v-model="isNavOpen"
    type="checkbox"
  >
  <header>
    <div class="headerWrap">
      <label
        for="navCheck"
        class="hamburger"
      />
      <div class="logoWrap">
        <h1>
          <router-link to="/">
            <img
              src="/img/logo.jpg"
              alt="RIZI COFF HOUSE"
            >
          </router-link>
        </h1>
      </div>
      <nav class="navBar">
        <ul>
          <li
            v-for="(item, index) in NAV_INFO"
            :key="item.label + index"
          >
            <router-link
              :to="item.link"
              :class="{ actived: item.link === route.path }"
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="toolBar">
        <div class="quickcart">
          <router-link
            to="/quickcart"
            aria-label="購物車"
          >
            <a-badge
              :offset="[-3, 5]"
              :count="quickcartData.length"
            >
              <img
                src="/img/icon/quickcart.jpg"
                alt="購物車"
              >
            </a-badge>
          </router-link>
        </div>
      </div>
    </div>
  </header>
  <div class="navHeight" />
</template>

<style lang="sass" scoped>
@mixin navFull()
  @media (min-width: 800px)
    @content

.navHeight
  min-height: 70px
  
#navCheck:checked ~ header .hamburger:before
  top: 24px
  box-shadow: 0px 10px 0px #ff00
  transform: rotate(45deg)
  transition: box-shadow 0.3s 0s, top 0.3s 0.3s, transform 0.3s 0.6s
#navCheck:checked ~ header .hamburger:after
  bottom: 23px
  transform: rotate(-45deg)
  transition: bottom 0.3s 0.3s, transform 0.3s 0.6s
#navCheck
  transition: 1s
  display: none
  ~ header nav
    transition: .6s  
#navCheck:checked ~ header nav
  left: 0%
  opacity: 1
  transition: .8s
  z-index: 1
header
  box-shadow: 0px 1px 1px var(--gray)
  background-color: var(--mainWhite)
  position: fixed
  width: 100%
  z-index: 2
.headerWrap
  height: 70px
  max-width: 1280px
  margin: auto
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 4%
  .hamburger
    width: 50px
    height: 50px
    position: relative
    left: 0
    cursor: pointer
    +navFull()
      display: none
    &:before,
    &:after
      content: ""
      position: absolute
      width: 60%
      height: 2.3px
      background-color: var(--mainTxt)
      right: 0
      left: 0
      margin: auto
      transform: rotate(0deg)
    &:before
      top: 15px
      box-shadow: 0px 10px 0px var(--mainTxt)
      transition: box-shadow 0.3s 0.6s, top 0.3s 0.3s, transform 0.3s 0s
    &:after
      bottom: 12px
      transition: bottom 0.3s 0.3s, transform 0.3s 0s
  .logoWrap
    +navFull()
      margin-right: 45px
    img
      width: 144px
      vertical-align: middle
  .navBar
    position: absolute
    width: 100%
    top:100%
    opacity: 1
    left: -100%
    min-height: 100vh
    padding: 0px 0px 35px 7%
    background-color: var(--mainWhite)
    transition: opacity 1s, bottom 0s 0.9s
    border-top: 1px solid var(--gray)
    +navFull()
      width: 100%
      min-width: 476px
      max-width: 700px
      position: static
      opacity: 1
      padding: 0
      border: none
      min-height: auto
    ul
      +navFull()
        display: flex
        justify-content: space-between
      li
        border-bottom: 1px solid var(--gray)
        height: 100%
        +navFull()
          border: none
          display: flex
          margin: 0
          &:hover
            color: var(--mainRed)
        .actived
          color: var(--mainRed)
        a
          display: block
          padding: 20px
          text-decoration: none
          font-size: 16px
          letter-spacing: 0.1em
          font-weight: 400
          color: var(--mainTxt)
          &:hover
            color: var(--mainRed)
          +navFull()
            font-size: 16px
            font-weight: 400
            color: var(--mainTxt)
            padding: 0
            
  .toolBar
    +navFull()
      display: flex
      margin-left: 45px
    .quickcart
      +navFull()
        a
          height: 100%
          display: block
      img
        vertical-align: middle
        width: 43px
        +navFull()
          height: 27px
          width: 30.76px
          margin: 0
</style>
