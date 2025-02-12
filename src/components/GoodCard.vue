<script lang="ts" setup>
import type { CakeDetailType, CoffeeDetailType, GoodType } from '@/utils/type'
import { useIndexStore } from '@/stores/indexStore'
import { computed } from 'vue'

const props = defineProps<{ data: GoodType<CakeDetailType | CoffeeDetailType> }>()
const { name, link, img, price, onSale, tag } = props.data
const indexStore = useIndexStore()
const isCoffee = computed(() => !Object.prototype.hasOwnProperty.call(props.data, 'indexImg'))
</script>

<template>
  <div class="goodWrap">
    <router-link :to="link">
      <div
        class="goodImgWrap"
        :class="{ new: tag?.includes(1) }"
      >
        <img
          v-lazy="img"
          alt="name"
        >
      </div>
      <div class="goodInfoWrap">
        <div
          v-if="isCoffee"
          class="addToCart"
          @click.prevent="indexStore.$updateQuickcart('add', data as GoodType<CoffeeDetailType>)"
        >
          加入購物車
        </div>
        <h3>{{ name }}</h3>
        <div class="priceWrap">
          <div
            v-if="onSale"
            class="onSalePriceTxt"
          >
            <span>NT$</span>{{ price }}
          </div>
          <div>
            <span>NT$</span>{{ onSale ?? price }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="sass" scoped>
.goodWrap
  width: 100%
  border-top-right-radius: 10px
  border-top-left-radius: 10px
  box-shadow: 0 0 2px var(--deepGray), 0 0 10px var(--tagBG)
  &:hover
    background-color: var(--tableTH)
    box-shadow: 0 0 2px var(--shadow), 0 0 10px var(--shadow)
    a > .goodInfoWrap
      .addToCart
        opacity: 1
  a
    display: flex
    flex-direction: column
    text-decoration: none
    color: var(--mainBlack)
    height:100%
    .goodImgWrap
      position: relative
      img
        width: 100%
        vertical-align: middle
        border-top-right-radius: 10px
        border-top-left-radius: 10px
      &.new::after
        content: "☰ New"
        font-size: 12px
        color: var(--mainTxt)
        position: absolute
        right: -5px
        top: 10px
        width: 40px
        height: 19px
        padding: 5px 5px 0px 7px
        background-color: var(--tagBG)
      &.new::before
        content: ""
        position: absolute
        right: -5px
        top: 34px
        border-top: 5px solid var(--deepGray)
        border-right: 5px solid transparent

    .goodInfoWrap
      display: flex
      flex-direction: column
      flex: 1
      padding: 5% 8% 7%
      position: relative
      .addToCart
        position: absolute
        background: var(--cardAddToCart)
        color: var(--mainWhite)
        margin: auto
        text-align: center
        line-height: 30px
        letter-spacing: .5em
        font-weight: 500
        bottom: 100%
        left: 0
        width: 100%
        height: 30px
        text-indent:-.5em
        direction: rtl
        transition: 0.5s
        opacity: 0
        &:hover
          background: var(--cardAddToCartHover)
      h3
        flex: 1
        font-size: 16px
        letter-spacing: 0.08em
        line-height: 24px
        font-weight: 100
        text-align: center
</style>
