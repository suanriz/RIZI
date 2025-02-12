<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useIndexStore } from '@/stores/indexStore'

const indexStore = useIndexStore()
const menuData = computed(() => indexStore.menuList.filter(x => x.indexImg).slice(0, 7))

onMounted(() => indexStore.handleGetMenu())
</script>

<template>
  <section v-if="menuData.length > 0">
    <Divider title="熱門菜單" />
    <div class="menuWrap">
      <div
        v-for="item in menuData"
        :key="item.name"
        class="itemWrap"
      >
        <div class="itemName">
          <p>{{ item.name }}</p>
        </div>
        <router-link :to="item.link">
          <div class="itemInner">
            <p>{{ item.name }}</p>
            <p>了解更多</p>
          </div>
          <div class="itemImgWrap">
            <img
              v-lazy="item.indexImg"
              :alt="item.name"
            >
          </div>
        </router-link>
      </div>
    </div>
    <MoreBtn link="menu/type" />
  </section>
</template>

<style lang="sass" scoped>
@mixin oneCol()
  @media (max-width: 351px)
    @content

section
  display: flex
  flex-direction: column
  .menuWrap
    width: 100%
    max-height: 500px
    display: grid
    gap:10px
    grid-template-rows: 43% 29% 28% 
    grid-template-columns:28% 22% 12% 21% 17%
    padding:0 40px 20px 0
    +phone()
      min-height: auto
      max-height: 685px
      gap:8px
      grid-template-rows: 16.8% 16.6% 16.6% 16.6% 16.6% 16.8% 
      grid-template-columns: 50% 50%
      padding: 0 8px 40px 0
    +oneCol()
      grid-template-rows: 14.28% 14.28% 14.28% 14.28% 14.28% 14.28% 14.32%
      grid-template-columns: 100%
      gap:6px
      max-height: 752.5px
      padding: 0 0 36px 0
    :nth-child(1)
      grid-area: 1 / 1 / span 3 / span 1
      +phone()
        grid-area: 5 / 2 / span 2 / span 1
      +oneCol()
        grid-area: 7 / 1 / span 1 / span 1
    :nth-child(2)
      grid-area: 1 / 2 / span 1 / span 2
      +phone()
        grid-area: 2 / 2 / span 2 / span 1
      +oneCol()
        grid-area: 2 / 1 / span 1 / span 1
    :nth-child(3)
      grid-area: 1 / 4 / span 1 / span 2
      +phone()
        grid-area: 1 / 2 / span 1 / span 1
      +oneCol()
        grid-area: 1 / 1 / span 1 / span 1
    :nth-child(4)
      grid-area: 2 / 2 / span 2 / span 1
      +phone()
        grid-area: 3 / 1 / span 3 / span 1
      +oneCol()
        grid-area: 6 / 1 / span 1 / span 1
    :nth-child(5)
      grid-area: 2 / 3 / span 2 / span 2
      +phone()
        grid-area: 1 / 1 / span 2 / span 1
      +oneCol()
        grid-area: 5 / 1 / span 1 / span 1
    :nth-child(6)
      grid-area: 2 / 5 / span 1 / span 1
      +phone()
        grid-area: 6 / 1 / span 1 / span 1
      +oneCol()
        grid-area: 3 / 1 / span 1 / span 1
    :nth-child(7)
      grid-area: 3 / 5 / span 1 / span 1
      +phone()
        grid-area: 4 / 2 / span 1 / span 1
      +oneCol()
        grid-area: 4 / 1 / span 1 / span 1
    .itemWrap
      width: 100%
      position: relative
      .itemName
        font-size: 18px
        font-weight: 500
        letter-spacing: 0.04em
        color: var(--mainTxt)
        position: absolute
        bottom: 15px
        left: 15px
        text-shadow: 0 0 1px var(--mainWhite), 0 0 2px var(--mainWhite), 0 0 3px var(--mainWhite),0 0 5px var(--mainWhite), 0 0 8px var(--mainWhite), 0 0 10px var(--mainWhite) 
        opacity: 1
      .itemInner
        width: 100%
        height: 100%
        position: absolute
        text-align: center
        font-size: 20px
        color: var(--mainRed)
        background-color: var(--shadowLight)
        box-sizing: border-box
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        opacity: 0
        transition: 0.6s ease
        transform: rotateY(180deg)
        &:hover
          opacity: 1
          transition: 1s ease
          transform: rotateY(0deg)
        :first-child
          font-size: 20px
          font-weight: 400
          letter-spacing: 0.04em
          padding-bottom: 14%
          position: relative
          +phone()
            padding-bottom: 8%
          @media (max-width: 520px)
            padding-bottom: 14%
          +oneCol()
            padding-bottom: 8%
          @media (max-width: 250px)
            padding-bottom: 14%
          &:after
            content: ""
            width: 100px
            height: 1px
            background-color: var(--mainRed)
            position: absolute
            top: 31px
            margin: 0 auto
            left: 0
            right: 0
          &::before
            content: ""
            width: 5px
            height: 5px
            background-color: var(--mainRed)
            position: absolute
            top: 29px
            margin: 0 auto
            left: 0
            right: 0
            transform: rotate(45deg)
        :last-child
          font-size: 14px
          font-weight: 300
          border: 1px solid var(--mainRed)
          padding: 3.5%
          box-sizing: border-box
          &:hover
            background-color: var(--mainRed)
            color: var(--shadowLight)
      .itemImgWrap
        width: 100%
        height: 100%
        overflow: hidden          
        img
          width: 100% 
          height: 100%
          vertical-align: middle
          object-fit: cover
          object-position: center
        img[alt="熱壓蘑菇芝士"]
          +phone()
            object-position: left
        img[alt="清爽西瓜特調"]
          +phone()
            object-position: bottom
        img[alt="冰心莓果優格"]
          object-position: top
        img[alt="莓果幕斯塔"]
          +oneCol()
            object-position: top
</style>
