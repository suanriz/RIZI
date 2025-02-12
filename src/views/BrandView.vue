<script lang="ts" setup>
import { STEP_INFO } from '@/utils/site'
import { useIndexStore } from '@/stores/indexStore'

const indexStore = useIndexStore()
</script>

<template>
  <section>
    <div class="contentWrap brandDividerWrap">
      <Divider title="品牌精神" />
    </div>
    <img
      src="/img/brand/view.jpg"
      alt="品牌專業"
      @load="indexStore.loading = false"
    >
    <div class="contentWrap">
      <div
        class="conceptTxtWrap"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <h3>享受生活，過「好日子」</h3>
        <p>
          好日子咖啡輕食店追求品質與效率的完美配方，採用自家烘焙的頂級莊園咖啡豆沖煮新鮮的好咖啡<br>堅持健康、天然、不添加人工香料的現做輕食，用最短的等待時間萃取最優質的飲食品味
        </p>
      </div>
      <Divider title="黃金步驟" />
      <div class="stepWrap">
        <div
          v-for="step, index in STEP_INFO"
          :key="step.title"
          class="step"
          :data-aos="step.aos"
          data-aos-duration="700"
        >
          <div class="stepImgWrap">
            <h3 class="title">
              {{ step.title }}
            </h3>
            <span class="sub">{{ step.sub }}</span>
            <span class="number">{{ index + 1 }}</span>
            <img v-lazy="step.img">
          </div>
          <div class="stepImgTxtWrap">
            <p>{{ step.introduction }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@mixin twoCol()
  @media (max-width: 650px)
    @content

@mixin oneCol()
  @media (max-width: 340px)
    @content

section
  max-width: 1280px
  width: 100%
  .brandDividerWrap
    margin-bottom: 0
  img
    width: 100%

.conceptTxtWrap
  > h3
    font-size: 20px
    letter-spacing: 0.04em
    line-height:1.5em
    color: var(--mainRed)
    text-align: center
    font-weight: 400
    margin: 6.3% auto 2.3% auto
  > p
    font-size: 16px
    font-weight: 100
    letter-spacing: 0.1em
    line-height: 35px
    text-align: center
    color: var(--mainTxt)
    margin-bottom: 11.72%

.stepWrap
  width: 100%
  display: flex
  justify-content: space-between
  +twoCol()
    flex-wrap: wrap
    justify-content: space-around
  +oneCol()
    justify-content: center
  .step
    max-width: 200px
    width: calc(100% / 4 - 10px)
    +twoCol()
      width: calc(50% - 16px)
    +oneCol()
      width: calc(100%)
    &:nth-child(even)
      margin-top: 60px
      +oneCol()
        margin-top: 0px
    .stepImgWrap
      position: relative
      width: 100%
      .title
        position: absolute
        top: 12px
        left: 38px
        font-weight: 400
        color: var(--mainWhite)
        font-size: 25px
        text-shadow: 0px 0px 6px var(--shadowDeep), 0px 0px 3px var(--shadowDeep), 0px 0px 1px var(--shadowDeep)
      .sub
        position: absolute
        top: 40px
        left: 41px
        font-weight: 400
        color: var(--mainWhite)
        font-size: 12px
        text-shadow: 0px 0px 6px var(--shadowDeep), 0px 0px 3px var(--shadowDeep), 0px 0px 1px var(--shadowDeep)
      .number
        position: absolute
        top: 5px
        left: 11px
        font-size: 50px
        font-weight: 500
        color: var(--mainWhite)
        opacity: 0.7
        text-shadow: 0px 0px 6px var(--shadowDeep), 0px 0px 3px var(--shadowDeep), 0px 0px 1px var(--shadowDeep)
      img
        width: 100%
        border-radius: 20px
        vertical-align: middle
    .stepImgTxtWrap
      padding: 5% 6.5%
      font-size: 16px
      font-weight: 100
      letter-spacing: 0.08em
      line-height: 25px
      color: var(--mainTxt)
      text-align: justify
</style>
