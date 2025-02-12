<script lang="ts" setup>
import type { TabType } from '@/utils/type'
import { ref } from 'vue'

const props = defineProps<{
  tabData: TabType[]
}>()
const emit = defineEmits(['handle-tab-click'])
const activeTab = ref(0)

const handleClick = (index: number) => {
  activeTab.value = index
  emit?.('handle-tab-click', index)
}

defineExpose({ handleClick })
</script>

<template>
  <ul
    class="filter"
    data-aos="fade-right"
    data-aos-duration="800"
    data-aos-easing="ease-in-sine"
  >
    <li
      v-for="(tab, index) in props.tabData"
      :key="tab.name"
      @click="handleClick(index)"
    >
      <p :class="{ activeTab: activeTab === index }">
        <span class="name">{{ tab.name }}</span>
        <span class="sub">{{ tab.sub }}</span>
      </p>
    </li>
  </ul>
</template>

<style lang="sass" scoped>
@mixin activeStyle()
  &:before
    content: ""
    border-left: 3px solid var(--mainRed)
    margin-right: 5px
    position: absolute
    height: 100%
    display: block
    left: 0
  .name
    color: var(--mainRed)

.filter
  padding: 0 4%
  +phone()
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))
  li
    .activeTab
      +activeStyle()
    p
      color: var(--mainTxt)
      font-size: 18px
      font-weight: 300
      letter-spacing: 0.04em
      margin: 0 0 20px 0
      padding-left: 10px
      transition: 0.7s
      position: relative
      &:hover
        transform: translateX(16px)
        +activeStyle()
      .sub
        display: block
        color: var(--deepGray)
        font-size: 14px
        font-weight: 100
        letter-spacing: 0.1em
        margin-top: 5px
</style>
