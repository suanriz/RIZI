<script lang="ts" setup>
const prop = defineProps({
  title: String
})
</script>

<template>
  <div class="divider">
    <h2>{{ prop.title }}</h2>
  </div>
</template>

<style lang="sass" scoped>
.divider
  aspect-ratio: 924 / 48
  max-width: 960px
  width: 100%
  min-height: 40px
  background-image: url(/img/divider.jpg)
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  display: flex
  align-items: center
  justify-content: center
  margin: 30px auto 4%
  +phone()
    margin-bottom: 20px
  h2
    text-align: center
    font-size: 20px
    line-height: 20px
    font-weight: 500
    letter-spacing: 0.04em
    color: var(--mainRed)
</style>
