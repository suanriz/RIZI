<script lang="ts" setup>
import type { GoodsListMailType } from '@/utils/type'
import { computed, reactive, ref, watch, onMounted, UnwrapRef } from 'vue'
import { useIndexStore } from '@/stores/indexStore'
import { QUICKCART_TYPE } from '@/utils/site'
import { sendEmail } from '@/utils/lib'

const activeTab = ref(1)
const isCheckoutModalShow = ref(false)
const formRef = ref<HTMLFormElement | null>(null)
const formData: UnwrapRef<GoodsListMailType> = reactive({
  email: '',
  date: '',
  content: '',
  totalPrice: 0
})
const indexStore = useIndexStore()
const checkGroup = reactive({
  indeterminate: true,
  checkAll: false,
})
const quickcartData = computed(() => indexStore.quickcart)
const favouritesData = computed(() => indexStore.favourites)

const renderTabData = () => {
  if (activeTab.value === 1)
    return quickcartData.value
  return favouritesData.value
}

const onCheckAllChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  Object.assign(checkGroup, {
    checkAll: target.checked,
    indeterminate: false,
  })
  indexStore.$updateQuickcart(target.checked ? 'checkAll' : 'inverse')
}

const renderPrice = () => {
  let totalPrice = 0
  let totalSale = 0
  quickcartData.value.forEach(good => {
    if (!good.checked) return
    totalPrice += good.price * (good?.count ?? 1)
    totalSale += (good.onSale || good.price) * (good?.count ?? 1)
  })
  return { totalPrice, totalSale }
}

const checkBoxStatus = (newValue: (boolean | undefined)[]) => {
  const checkAll = newValue.every(x => x)
  Object.assign(checkGroup, {
    indeterminate: !checkAll && newValue.some(x => x),
    checkAll: checkAll,
  })
}

const handleSentMail = () => {
  indexStore.quickcart = indexStore.quickcart.filter(x => !x.checked)
  closeCheckoutModal()
}

const renderList = () => {
  let list = ''
  quickcartData.value.forEach((x, index) => {
    if (!x.checked) return
    list += `${index + 1}. ${x.name} x${x.count} NT$${(x.count ?? 1) * (x.onSale ?? x.price)}\n`
  })
  return list
}

const handleSendList = () => {
  formRef.value?.validate()
    .then(() => {
      formData.date = new Intl.DateTimeFormat(undefined, {
        month: '2-digit',
        day: '2-digit',
      }).format(new Date()).replace(/\//g, '-')
      formData.content = renderList()
      formData.totalPrice = renderPrice().totalPrice
      sendEmail('evvyk7h', formData, handleSentMail)
    })
}

const closeCheckoutModal = () => {
  formRef?.value?.resetFields()
  isCheckoutModalShow.value = false
}

watch(() => quickcartData.value.map(x => x.checked), (newValue) => {
  checkBoxStatus(newValue)
})

onMounted(() => {
  checkBoxStatus(quickcartData.value.map(x => x.checked))
})
</script>

<template>
  <section class="contentWrap">
    <Divider title="購物車" />
    <div class="filterWrap">
      <a-tabs v-model:active-key="activeTab">
        <a-tab-pane
          v-for="option in QUICKCART_TYPE"
          :key="option.value"
          :tab="option.label"
          show-size-changer
        />
      </a-tabs>
    </div>
    <div
      v-show="quickcartData.length > 0 && activeTab === 1"
      class="checkAllWrap"
    >
      <a-checkbox
        v-model:checked="checkGroup.checkAll"
        :indeterminate="checkGroup.indeterminate"
        @change="onCheckAllChange"
      >
        Check all
      </a-checkbox>
    </div>
    <div
      v-if="renderTabData().length > 0"
      class="goodWrap"
      :class="{ 'quickcartWrap': activeTab === 1 }"
    >
      <div
        v-for="good in renderTabData()"
        :key="good.id"
        class="flexCenter"
        :class="activeTab === 1 ? 'quickcartItem' : 'favouritesItem'"
      >
        <div class="flexCenter goodFrontBox">
          <a-checkbox
            v-if="activeTab === 1"
            v-model:checked="good.checked"
            class="checkBoxWrap"
          />
          <div class="imgWrap">
            <img v-lazy="good.img">
          </div>
          <div class="flexCenter nameWrap">
            <span>{{ good.name }}</span>
          </div>
        </div>
        <div class="flexCenter goodBackBox">
          <div class="flexCenter priceWrap">
            <div
              v-if="good.onSale"
              class="priceTxt onSalePriceTxt"
            >
              <span>NT$</span>{{ good.price }}
            </div>
            <div class="priceTxt">
              <span>NT$</span>{{ good.onSale ?? good.price }}
            </div>
          </div>
          <div
            v-if="activeTab === 1"
            class="flexCenter inputWrap"
          >
            <a-input-number
              id="inputNumber"
              v-model:value="good.count"
              :min="1"
              :max="999"
            />
          </div>
          <div class="flexCenter actionBtn">
            <button
              v-if="activeTab === 1"
              @click="() => {
                indexStore.$updateFavourites('add', good)
                indexStore.$updateQuickcart('del', good)
              }"
            >
              收藏
            </button>
            <button
              v-if="activeTab === 1"
              @click="indexStore.$updateQuickcart('del', good)"
            >
              刪除
            </button>
            <button
              v-if="activeTab === 2"
              @click="() => {
                indexStore.$updateQuickcart('add', good)
                indexStore.$updateFavourites('del', good)
              }"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="noGood"
    >
      還有沒商品資訊
      <MoreBtn
        link="/store"
        no-good-link
      >
        這裡有多種風味任您挑選
      </MoreBtn>
    </div>
    <div
      v-show="activeTab === 1"
      class="checkout"
    >
      <div class="priceWrap">
        售價
        <div>
          <span>NT$</span>{{ renderPrice().totalPrice }}
        </div>
      </div>
      <div class="priceWrap">
        折扣
        <div>
          <span>NT$</span>{{ renderPrice().totalPrice - renderPrice().totalSale }}
        </div>
      </div>
      <div class="priceWrap">
        金額
        <div>
          <span>NT$</span>{{ renderPrice().totalSale }}
        </div>
      </div>
      <button
        :disabled="!quickcartData.some(x => x?.checked)"
        @click="isCheckoutModalShow = true"
      >
        結帳
      </button>
    </div>
  </section>
  <a-modal
    v-model:open="isCheckoutModalShow"
    title="以下是您選購的商品"
    cancel-text="意念收貨"
    ok-text="寄送明細到信箱"
    :closable="false"
    :keyboard="false"
    :mask-closable="false"
    @cancel="closeCheckoutModal"
    @ok="handleSendList"
  >
    <ol>
      <li
        v-for="good in quickcartData.filter(x => x.checked)"
        :key="good.id"
      >
        {{ `${good.name} x${good.count} NT$${(good.count ?? 1) * (good.onSale ?? good.price)}` }}
      </li>
    </ol>
    <br>
    <p class="modalCheckout">
      結帳金額：NT$ {{ renderPrice().totalSale }}
    </p>
    <a-form
      ref="formRef"
      :model="formData"
      hide-required-mark
      class="formWrap"
      no-style
    >
      真的會收到信件哦
      <a-form-item
        label="信箱"
        name="email"
        :rules="[
          { required: true, message: '請輸入信箱' },
          { type: 'email', message: '輸入信箱有誤' }
        ]"
      >
        <a-input v-model:value="formData.email" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="sass" scoped>
@mixin oneCol()
  @media (max-width: 536px)
    @content

@mixin xxPhone()
  @media (max-width: 312px)
    @content

.checkAllWrap
  padding:10px
  font-weight: 100
.quickcartWrap
  border-top: 1px solid var(--lightGray)
.goodWrap
  display: flex
  flex-direction: column
  justify-items: start
  align-items: center
  border-bottom: 1px solid var(--lightGray)
  font-weight: 100
  .quickcartItem + .quickcartItem ,
  .favouritesItem + .favouritesItem
    border-top: 1px solid var(--lightGray)
  .quickcartItem:nth-child(even),
  .favouritesItem:nth-child(even)
    background-color: var(--quickcartLine)
  .quickcartItem ,.favouritesItem
    width: 100%
    justify-content: space-between
    padding: 10px
    +oneCol()
      flex-direction: column
    .goodFrontBox 
      gap: 10px
      margin-right: 10px
      justify-content: flex-start
      width: 100%
      +oneCol()
        margin-right: 0
        width: 100%
      +xxPhone()
        flex-wrap: wrap
      .checkBoxWrap
        width: 20px
      .imgWrap
        width: 80px
        img
          width: 80px
          vertical-align: middle
      .nameWrap
        width: 100%
        flex: 1
        justify-content: flex-start
        min-width: 77.88px
    .goodBackBox
      gap: 10px
      +oneCol()
        width: 100%
        justify-content: flex-end
        padding-left: 30px
      +xxPhone()
        flex-wrap: wrap
        justify-content: center
        padding-left: 0
        margin-top: 10px
      .priceWrap
        width: 70px
      .inputWrap
        text-align: center
        width: 90px
      .actionBtn
        width: 66px
        flex-direction: column
        button + button
          margin-top:10px
  .favouritesItem .goodBackBox .actionBtn
    width: 114px

.checkout
  padding: 10px
  display: flex
  justify-content: flex-end
  align-items: center
  flex-wrap: wrap
  gap: 10px
  font-weight: 100
  @media (max-width: 399px)
    flex-direction: column

.modalCheckout
  text-align: right
  color: var(--mainRed)
.formWrap
  width: 100%
  display: flex
  flex-direction: column
  align-items: flex-end
  margin: 10px 0
  .ant-form-item
    max-width: 250px
    margin-inline-end: 0px
    margin-bottom: 0
    :deep(.ant-form-item-label)
      flex: 0 0 auto
      padding: 0
      label
        font-size:16px
      .ant-form-item-required:after
        display: block
    :deep(.ant-form-item-control)
      flex: 1 0 calc(100% - 46.45px)
      input
        border-radius: 0
</style>
