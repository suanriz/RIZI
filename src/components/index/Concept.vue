<script lang="ts" setup>
const VITE_DOMAIN = import.meta.env.VITE_DOMAIN
</script>

<template>
  <section>
    <Divider title="品牌精神" />
    <div class="conceptWrap">
      <div
        class="conceptImgWrap"
        data-aos="fade-right"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <img
          v-lazy="VITE_DOMAIN + 'img/brand/index.gif'"
          alt=" 環境氛圍"
        >
      </div>
      <div
        class="conceptTxtWrap"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <h3>享受生活，過「好日子」</h3>
        <p>
          好日子咖啡輕食店追求品質與效率的完美配方，採用自家烘焙的頂級莊園咖啡豆沖煮新鮮的好咖啡，堅持健康、天然、不添加人工香料的現做輕食，用最短的等待時間萃取最優質的飲食品味。
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@mixin oneCol()
  @media (max-width: 748px)
    @content

section
  overflow-x: clip
.conceptWrap
  width: 100%
  display: flex
  margin: auto
  align-items: center
  +oneCol()
    flex-direction: column
  .conceptImgWrap
    width: 58.44%
    +oneCol()
      width: 100%
    img
      width: 100%
      vertical-align: middle
  .conceptTxtWrap
    width: 234px
    margin-left: 9%
    text-align: justify
    +oneCol()
      width: 80%
      margin-left: 0
    > h3
      font-size: 20px
      font-weight: 300
      letter-spacing: .08em
      color: var(--mainRed)
      height: 80px
      justify-content: center
      direction: rtl
      text-indent: -.5em
      display: flex
      align-items: center
      text-align: center
      line-height: 1.5em
      +oneCol()
        text-indent: -.7em
    > p
      font-size: 16px
      letter-spacing: 0.1em
      line-height: 35px
      font-weight: 100
      color: var(--mainTxt)
      text-indent: 2em
</style>
