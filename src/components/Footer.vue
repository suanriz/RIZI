<script lang="ts" setup>
import type { InfoDataType } from '@/utils/type'
import { SHOP_INFO, CONTACT_INFO } from '@/utils/site'

const headOffice = SHOP_INFO.find(x => x.id === 1) as InfoDataType
</script>

<template>
  <footer>
    <div class="footerWrap">
      <div class="topWrap">
        <div class="logoWrap">
          <img
            v-lazy="'/img/logoFooter.png'"
            alt="logo"
          >
        </div>
        <div class="contactWrap">
          <div class="contactRIZI">
            <div class="contact">
              <p>創始店鋪</p>
              <div>
                <img
                  v-lazy="'/img/icon/address.png'"
                  alt="地址"
                >
                <span>{{ headOffice.address }}</span>
              </div>
              <div>
                <img
                  v-lazy="'/img/icon/tel.png'"
                  alt="電話"
                >
                <span>{{ headOffice.tel }}</span>
              </div>
              <div>
                <img
                  v-lazy="'/img/icon/mail.png'"
                  alt="信箱"
                >
                <span>RIZI@gmail.com</span>
              </div>
            </div>
          </div>
          <div
            v-for="contactGroup in CONTACT_INFO"
            :key="JSON.stringify(contactGroup)"
            class="contactGroup"
          >
            <router-link
              v-for="contact in contactGroup"
              :key="contact.name"
              :to="contact.link"
            >
              {{ contact.name }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="bottomWrap">
        <div class="copyrightWrap">
          <p>Copyright © {{ new Date().getFullYear() }} RIZI Company. All rights reserved.</p>
        </div>
        <div class="snsWrap">
          <router-link to="/contact">
            <img
              v-lazy="'/img/icon/facebook.png'"
              alt="facebook"
            >
          </router-link>
          <router-link to="/contact">
            <img
              v-lazy="'/img/icon/instagram.png'"
              alt="instagram"
            >
          </router-link>
          <router-link to="/contact">
            <img
              v-lazy="'/img/icon/line.png'"
              alt="line"
            >
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@mixin oneCol()
  @media (max-width: 386px)
    @content

footer
  width: 100%
  background-color: var(--mainGray)
  color: var(--mainTxt)
  font-weight: 300
  font-size: 12px
  padding: 20px 0
  .footerWrap
    margin: auto
    max-width: 1280px
    padding: 0 4%
    .topWrap
      display: flex
      flex-direction: column
      align-items: center
      +pc()
        flex-direction: row
        justify-content: space-between
      .logoWrap
        max-width: 246px
        aspect-ratio: 246 / 108
        vertical-align: middle
        img
          width: 100%
      .contactWrap
        margin: 3.4% 0
        justify-content: space-between
        align-items: flex-end
        display: flex
        +pc()
          width: 60%
          margin-left: 6%
        +oneCol
          flex-direction: column
          align-items: center
        .contactRIZI
          .contact
            display: flex
            flex-direction: column
            margin: auto
            align-items: center
            align-items: flex-start
            +oneCol
              align-items: center
            p
              font-size: 12px
              letter-spacing: 0.08em
            div
              display: flex
              align-items: center
              margin-top: 14px
              img
                width: 14px
                vertical-align: middle
                margin-right: 2px
              span
                letter-spacing: 0.08em
        .contactGroup
          display: flex
          flex-direction: column
          justify-content: center
          margin-left: 14px
          align-items: stretch
          +pc()
            padding-top: 0px
          +oneCol
            flex-direction: row
            margin-left: 0px
            padding-top: 0px
            margin: initial
          @media (max-width: 225px)
            flex-direction: column
          a
            color: var(--mainTxt)
            text-decoration: none
            letter-spacing: 0.08em
            margin-top: 14px
            line-height: 14px
            +oneCol
              margin: 14px 6px 0
    .bottomWrap
      display: flex
      flex-direction: column-reverse
      align-items: center
      +pc()
        margin-top: 20px
        flex-direction: row
        justify-content: space-between
      .copyrightWrap > p
        margin-top: 14px
        text-align: center
        line-height: 1.5em
        +pc()
          margin-top: 0px
      .snsWrap
        margin-top: 3.4%
        +pc()
          margin-top: 0px
        a + a
          margin-left: 6px
        a > img
          width: 23px
          transition: 0.3s
          vertical-align: middle
          &:hover
            transform: translateY(-10px)
</style>
