<script lang="ts" setup>
import { SHOP_INFO } from '@/utils/site'

const VITE_DOMAIN = import.meta.env.VITE_DOMAIN
</script>

<template>
  <section>
    <Divider title="門市資訊" />
    <div class="infoWrap">
      <div
        v-for="item in SHOP_INFO"
        :key="item.name"
        class="itemWrap"
        :data-aos="item.aos"
        data-aos-duration="700"
        data-aos-easing="ease-in-sine"
      >
        <div class="itemImgWrap">
          <a-image
            :src="VITE_DOMAIN + item.img"
            :alt="item.name"
          />
        </div>
        <div class="itemTxtWrap">
          <h3 :data="item.name">
            {{ item.name }}
          </h3>
          <div class="item">
            <div>
              <img
                v-lazy="VITE_DOMAIN + 'img/icon/tel.webp'"
                alt=" 電話"
              >
            </div>
            <div>
              <span>{{ item.tel }}</span>
            </div>
          </div>
          <div class="item">
            <div>
              <img
                v-lazy="VITE_DOMAIN + 'img/icon/opening.webp'"
                alt=" 營業時間"
              >
            </div>
            <div>
              <span>{{ item.opening }}</span>
            </div>
          </div>
          <div class="item">
            <div>
              <img
                v-lazy="VITE_DOMAIN + 'img/icon/address.webp'"
                alt=" 地址"
              >
            </div>
            <div>
              <span>{{ item.address }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@mixin oneCol()
  @media (max-width: 399px)
    @content

section
  overflow-x: clip
.infoWrap
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap:10px
  justify-content: space-between
  width: 100%
  +phone()
    grid-template-columns:  1fr
    justify-items: center
    gap:30px
  .itemWrap
    max-width: 282px
    width: 100%
    +phone()
      max-width: 100%
      display: flex
    +oneCol
      flex-direction: column
      + .itemWrap
        margin-top: 20px
    .itemImgWrap
      +phone()
        width: 55%
        margin-right: 8px
      +oneCol
        width: 100%
        margin-right: 0px
        display: flex
        justify-content: center
      >div img
        width: 100%
        vertical-align: middle
    .itemTxtWrap
      +phone()
        width: 45%
        display: flex
        flex-direction: column
        justify-content: center
      +oneCol
        width: 100%
        max-width: 282px
        margin: auto
      h3
        margin: 0 0 0 35px 
        font-size: 20px
        font-weight: 300
        letter-spacing: 0.04em
        color: var(--mainWhite)
        position: relative
        margin-top:20px
        -webkit-text-stroke: 3px var(--mainRed)
        text-shadow: 1px 0px 2px var(--mainRed), 0px 1px 2px var(--mainRed), -1px 0px 0px var(--mainRed),0px -1px 0px var(--mainRed),2px 0px 2px var(--mainRed), 0px 2px 2px var(--mainRed), -2px 0px 0px var(--mainRed),0px -2px 0px var(--mainRed)
        +phone()
          margin-top:0
        +oneCol
          margin-top:20px
        &::before
          content: attr(data)
          position: absolute
          width: 200px
          height: 100px
          color: var(--mainWhite)
          z-index: 1
          -webkit-text-stroke: 0
      .item
        margin-top:20px
        display: flex
        div 
          >img
            vertical-align: middle
            aspect-ratio: 1 / 1
          > span
            font-size: 16px
            letter-spacing: 0.04em
            line-height: 24px
            font-weight: 100
            display: inline-block
            margin: 0 0 0 10px
</style>
