<script lang="ts" setup>
import type { GoodType, CoffeeDetailType } from '@/utils/type'
import { useIndexStore } from '@/stores/indexStore'
import { computed, onMounted, watch } from 'vue'
import { renderTitle } from '@/utils/lib'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexStore = useIndexStore()
const recommendList = computed(() => indexStore.goodsList.filter(x => x.id !== Number(route.params.id)).slice(0, 4))
const coffee = computed<GoodType<CoffeeDetailType> | '商品不存在'>(() => indexStore.goodsDetail)

watch(route, (newValue) => {
  indexStore.handleGetGoods({ id: Number(newValue.params.id) })
  indexStore.loading = false
})

watch(coffee, (newValue) => {
  const name = typeof newValue === 'object'
    ? newValue.name
    : '商品不存在'
  document.title = renderTitle(name)
})

onMounted(() => {
  if (indexStore.goodsList.length < 2)
    indexStore.handleGetGoods()
  indexStore.handleGetGoods({ id: Number(route.params.id) })
})
</script>

<template>
  <section
    v-if="typeof coffee === 'object' && coffee?.id"
    class="contentWrap"
  >
    <div class="productMain">
      <ImgGroup :data="coffee" />
      <div
        class="productText"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <h3>{{ coffee.name }}</h3>
        <div class="price">
          <p><span>NT$</span>{{ coffee.price }}</p>
        </div>
        <ul type="circle">
          <li>
            主調風味 : {{ coffee.detail.features.flavor }}
          </li>
          <li>
            風味描述 : {{ coffee.detail.features.flavorDetail }}
          </li>
          <li>
            烘焙程度 : {{ coffee.detail.features.roast }}
          </li>
          <li>
            酸度評鑑 : {{ coffee.detail.features.acidity }}<sup
              title="酸度的感受因人而異，我們以五種水果來做最甜到最酸的評準
草莓果醬(1分)、葡萄(2分)、蘋果(3分)、橘子(4分)、檸檬(5分)
希望透過這樣的評分，讓咖啡豆有酸度的比較值，提供消費者在購買上參考"
            >[註]</sup>(酸度由弱至強是1~5分)
          </li>
        </ul>
        <div class="btnGroup">
          <button
            type="submit"
            @click="indexStore.$updateQuickcart('add', coffee)"
          >
            加入購物車
          </button>
          <button
            type="submit"
            class="buttonPrimary"
            @click="indexStore.$updateFavourites('add', coffee)"
          >
            加入收藏清單
          </button>
        </div>
      </div>
    </div>
    <Divider title="商品資訊" />
    <ul class="productDetails">
      <li
        v-for="info in coffee.detail.info"
        :key="info"
      >
        {{ info }}
      </li>
    </ul>
    <Divider title="好評推薦" />
    <div class="productRecommend">
      <div
        class="shopWrap"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div class="shopItem">
          <GoodCard
            v-for="good in recommendList"
            :key="good.id"
            :data="good"
          />
        </div>
      </div>
    </div>
    <MoreBtn :link="'/store'" />
  </section>
  <div
    v-else-if="coffee === '商品不存在'"
    class="noGood"
  >
    商品不存在
    <MoreBtn
      link="/store"
      no-good-link
    >
      這裡有多種風味任您挑選
    </MoreBtn>
  </div>
</template>

<style lang="sass" scoped>
section
  margin-top: 30px
.productMain
  display: flex
  justify-content: space-between
  +mainWrapCol()
    flex-direction: column
  .productText
    width: 38%
    display: flex
    flex-direction: column
    +mainWrapCol()
      width: 100%
    h3
      font-size: 20px
      font-weight: 500
      letter-spacing: 0.1em
      line-height: 30px
      +mainWrapCol()
        margin-top:20px
    .price
      margin: 20px 0 30px
      p
        font-size: 20px
        letter-spacing: 0.04em
        color: var(--mainRed)
        font-weight: 300
        display: inline-block
        margin-right: 10px
      span
        font-size: 18px
    ul
      margin-bottom: 20px
      flex-grow: 1
      li
        text-indent: -5em
        font-size: 16px
        font-weight: 100
        letter-spacing: 0.04em
        color: var(--mainTxt)
        line-height: 25px
        margin-bottom: 15px
        padding-left: 5em
        sup
          font-size: 14px
          color: var(--mainRed)
          position: relative
          top: -6px
    .btnGroup
      display: flex
      flex-direction: column
      button
        width: 100%
      :first-child
        margin-bottom: 12px
.productDetails
  margin: 0 4%
  padding-bottom: 2px
  li
    font-size: 16px
    font-weight: 100
    letter-spacing: 0.04em
    color: var(--mainTxt)
    line-height: 25px
    margin-bottom: 15px
</style>
