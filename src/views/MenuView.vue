<script lang="ts" setup>
import type { GoodType, CakeDetailType } from '@/utils/type'
import { useIndexStore } from '@/stores/indexStore'
import { computed, onMounted, watch } from 'vue'
import { renderTitle } from '@/utils/lib'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexStore = useIndexStore()
const recommendList = computed(() => indexStore.menuList.filter(x => x.id !== Number(route.params.id)).slice(0, 4))
const cake = computed<GoodType<CakeDetailType> | '商品不存在'>(() => indexStore.menuDetail)

watch(route, (newValue) => {
  indexStore.handleGetMenu({ id: Number(newValue.params.id) })
  indexStore.loading = false
})

watch(cake, (newValue) => {
  const name = typeof newValue === 'object'
    ? newValue.name
    : '商品不存在'
  document.title = renderTitle(name)
})

onMounted(() => {
  if (indexStore.menuList.length < 2)
    indexStore.handleGetMenu()
  indexStore.handleGetMenu({ id: Number(route.params.id) })
})
</script>

<template>
  <section
    v-if="typeof cake === 'object' && cake?.id"
    class="contentWrap"
  >
    <div class="productMain">
      <ImgGroup :data="cake" />
      <div
        class="productText"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <h3>{{ cake.name }}</h3>
        <div class="price">
          <p><span>NT$</span>{{ cake.price }}</p>
        </div>
        <ul type="circle">
          <li>
            風味描述 : {{ cake.detail.features.flavor }}
          </li>
          <li>
            產品特色 : {{ cake.detail.features.features }}
          </li>
          <li>
            原料選用 : {{ cake.detail.features.ingredients }}
          </li>
          <li>
            保存期限 : {{ cake.detail.features.shelfLife }}
          </li>
        </ul>
      </div>
    </div>
    <Divider title="營養標示" />
    <div class="productDetails">
      <table>
        <thead>
          <tr>
            <th>一次提供量</th>
            <th>熱量(kcal)</th>
            <th>糖(g)</th>
            <th>蛋白質(g)</th>
            <th>飽和脂肪(g)</th>
            <th>鈉(mg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="nutrition in cake.detail.nutritionFacts"
              :key="nutrition"
            >
              {{ nutrition }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    <MoreBtn :link="'/menu/type'" />
  </section>
  <div
    v-else-if="cake === '商品不存在'"
    class="noGood"
  >
    商品不存在
    <MoreBtn
      link="/menu/type"
      no-good-link
    >
      看看其他店內限定販售的商品
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
.productDetails
  overflow-x: auto
  margin: 0 4%
  padding-bottom: 2px
  table
    th
      background-color: var(--tableTH)
    td , th
      border: 1px solid var(--deepGray)
      font-size: 16px
      font-weight: 100
      letter-spacing: 0.04em
      color: var(--mainTxt)
      line-height: 25px
      padding: 13px
      text-align: center
      margin-left: 40px
</style>
