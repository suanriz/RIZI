<script lang="ts" setup>
const props = defineProps({
  link: { type: String, required: true },
  noGoodLink: { type: Boolean, required: false },
})
</script>

<template>
  <div class="moreWrap">
    <div
      class="more"
      :class="{ 'noGoodLink': props.noGoodLink }"
    >
      <router-link :to="props.link">
        <slot>View More</slot>
      </router-link>
      <img
        v-lazy="'/img/icon/more.svg'"
        alt="看更多"
      >
    </div>
  </div>
</template>

<style lang="sass" scoped>
.moreWrap
  display: flex
  justify-content: flex-end
  font-weight: 400
  transition: 0.7s
  padding: 0 4%
  margin-top: 4%
  &:hover
    transform: translateX(3.6%)
    .more img
        filter: grayscale(0)
        opacity: 1
  .more
    width: fit-content
    a
      font-size: 16px
      letter-spacing: 0.04em
      color: var(--deepGray)
      text-decoration: none
      &:hover
        color: var(--mainRed)
    img
      width: 20px
      vertical-align: sub
      margin-left: 5px
      filter: grayscale(1)
      opacity: .5
  .noGoodLink
    a 
      color: var(--mainRed)
    img
      filter: grayscale(0)
      opacity: 1
</style>
