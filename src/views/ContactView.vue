<script lang="ts" setup>
import type { EmailType } from '@/utils/type'
import { CONTACT_OPTIONS } from '@/utils/site'
import { sendEmail } from '@/utils/lib'
import { ref } from 'vue'

const formRef = ref<HTMLFormElement | null>(null)
const initData = {
  cause: '',
  name: '',
  email: '',
  subject: '',
  content: '',
}
const formData = ref<EmailType>({ ...initData })
const resetFormData = () => formData.value = { ...initData }

const handleSendEmail = () => {
  if (!formRef.value?.checkValidity()) return
  sendEmail('40ouhzr', { ...formData.value }, resetFormData)
}

</script>

<template>
  <section class="contentWrap">
    <Divider title="聯絡我們" />
    <div class="contactWrap">
      <form
        ref="formRef"
        action=""
        method="get"
        @submit.prevent="handleSendEmail"
      >
        <div class="itemWrap cause">
          <label for="cause">聯絡事項</label>
          <select
            id="cause"
            v-model="formData.cause"
            name="input_cause"
            required
          >
            <option
              v-for="option in CONTACT_OPTIONS"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="itemGroup">
          <div class="itemWrap">
            <label for="name">姓名</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              name="input_name"
              required
            >
          </div>
          <div class="itemWrap">
            <label for="email">信箱</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              name="input_email"
              required
            >
          </div>
        </div>
        <div class="itemWrap">
          <label for="subject">主旨</label>
          <input
            id="subject"
            v-model="formData.subject"
            type="text"
            name="input_subject"
            required
          >
        </div>
        <div class="itemWrap">
          <label for="content">內容</label>
          <textarea
            id="content"
            v-model="formData.content"
            name=""
            cols="80"
            rows="10"
            required
          />
        </div>
        <div
          class="fromBtn"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-easing="ease-in-sine"
        >
          <button type="submit">
            送出信件
          </button>
        </div>
      </form>
    </div>
    <p class="info">
      <img
        src="/img/icon/mail.webp"
        alt="信箱"
      >真的會收到信件哦！
    </p>
  </section>
</template>

<style lang="sass" scoped>
@mixin oneCol()
  @media (max-width:625px)
    @content

section
  display: flex
  flex-direction: column
  align-items: center
  .contactWrap
    max-width: 800px
    width: 100%
    form
      > :not(:first-child)
        margin-top: 22px
    .cause
      width: 50%
      padding-right: 4%
      +oneCol()
        width: 100%
        padding-right:0
    .itemGroup
      display: flex
      width: 100%
      +oneCol()
        flex-wrap: wrap
      .itemWrap
        width: 50%
        margin-right: 0px
        +oneCol()
          width: 100%
          &:last-child
            margin-top: 22px
    .itemWrap
      display: flex
      text-align: right
      label
        color: var(--mainTxt)
        font-size: 16px
        font-weight: 300
        margin-right: 25px
        width: 64px
        line-height: 30px
      textarea
        flex: 1
        height: 130px
        resize: none
        border: 1px solid var(--deepGray)
        min-width: 168px
      select
        flex: 1
        height: 30px
        background-color: var(--mainWhite)
        color: var(--mainTxt)
        border: 1px solid var(--deepGray)
        min-width: 168px
      input
        outline: var(--deepGray)
        outline-color: var(--shadowLight)
        &[type="text"]
          flex: 1
          height: 30px
          margin-right: 8%
          border: 1px solid var(--deepGray)
          +oneCol()
            margin-right: 0
        &[type="email"]
          flex: 1
          height: 30px
          margin: 0
          border: 1px solid var(--deepGray)
        &[id="subject"]
          flex: 1
          margin-right: 0
    .fromBtn
      display: flex
      justify-content: right
  .info
    color: var(--mainTxt)
    font-size: 16px
    font-weight: 300
    letter-spacing: 00.08em
    margin-top:30px
    display: flex
    align-items: center
    img
      vertical-align: middle
      margin-right: 8px
</style>
