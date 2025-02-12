import type { NewsType, BannerType, GoodType, ApiType, CoffeeDetailType, CakeDetailType } from '@/utils/type'
import { getBanner, getNews, getGoods, getMenu } from '@/utils/api'
import { renderTitle } from '@/utils/lib'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

const initState = {
  loading: false as boolean,
  banners: [] as BannerType[],
  news: [] as NewsType[],
  newsParams: {} as Partial<NewsType> & Partial<ApiType>,
  goodsDetail: {} as GoodType<CoffeeDetailType> | '商品不存在',
  goodsList: [] as GoodType<CoffeeDetailType>[],
  goodsParams: {} as Partial<GoodType<CoffeeDetailType>> & Partial<ApiType>,
  menuDetail: {} as GoodType<CakeDetailType> | '商品不存在',
  menuList: [] as GoodType<CakeDetailType>[],
  menuParams: {} as Partial<GoodType<CakeDetailType>> & Partial<ApiType>,
  quickcart: [] as GoodType<CoffeeDetailType>[],
  favourites: [] as GoodType<CoffeeDetailType>[],
}

export const useIndexStore = defineStore('indexStore', {
  state: () => ({ ...initState }),
  persist: {
    pick: ['quickcart', 'favourites']
  },
  actions: {
    $updateQuickcart(type: 'add' | 'del' | 'checkAll' | 'inverse', good?: GoodType<CoffeeDetailType>) {
      const inQuickcartIndex = this?.quickcart?.findIndex(x => x.id === good?.id)
      switch (type) {
        case 'add':
          if (!good) return
          good['checked'] = true
          if (inQuickcartIndex !== -1) {
            this.quickcart[inQuickcartIndex].count = (this.quickcart[inQuickcartIndex]?.count ?? 0) + 1
          } else {
            good['count'] = 1
            this.quickcart.push(good)
          }
          message.success('加入成功')
          return
        case 'del':
          if (!good) return
          return this.quickcart = this.quickcart.filter(x => x.id !== good.id)
        case 'checkAll':
          return this.quickcart.forEach(x => x.checked = true)
        case 'inverse':
          return this.quickcart.forEach(x => x.checked = false)
      }
    },
    $updateFavourites(type: 'add' | 'del', good: GoodType<CoffeeDetailType>) {
      const inFavourites = this.favourites.some(x => x.id === good.id)
      switch (type) {
        case 'add':
          message.success('加入成功')
          if (inFavourites) return
          good.count = 1
          good.checked = true
          this.favourites.push(good)
          return
        case 'del':
          this.favourites = this.favourites.filter(x => x.id !== good.id)
          return
      }
    },
    async handleGetBanner() {
      await getBanner()
        .then(res => {
          this.banners = res.data
        })
    },
    async handleGetNews(params?: Partial<NewsType> & Partial<ApiType>) {
      if (params && params.type === 0)
        delete params.type
      await getNews(params)
        .then(res => {
          this.news = res.data
          this.newsParams = params ?? {}
        })
    },
    async handleGetGoods(params?: Partial<GoodType<CoffeeDetailType>> & Partial<ApiType>) {
      await getGoods()
        .then(res => {
          const goods: GoodType<CoffeeDetailType>[] = res.data.goods
          if (params && typeof params.id === 'number') {
            const goodDetail = goods.find(x => x?.id === params?.id)
            if (goodDetail) {
              this.goodsDetail = goodDetail
            } else {
              this.goodsDetail = '商品不存在'
              this.loading = false
              document.title = renderTitle('商品不存在')
            }
          } else if (params && params.type) {
            this.goodsList = goods.filter(x => x.type === params.type)
          } else {
            this.goodsList = res.data.goods
          }
          this.goodsParams = params ?? {}
        })
    },
    async handleGetMenu(params?: Partial<GoodType<CakeDetailType>> & Partial<ApiType>) {
      const notFound = () => {
        this.menuDetail = '商品不存在'
        this.loading = false
        document.title = renderTitle('商品不存在')
      }
      await getMenu(params)
        .then(res => {
          if (params && params.id) {
            this.menuDetail = res.data
          } else if (params && params.id === 0) {
            notFound()
          } else {
            this.menuList = res.data
          }
          this.menuParams = params ?? {}
        }).catch(() => {
          notFound()
        })
    },
  }
})
