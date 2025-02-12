export type ApiType = {
  _like: string // 模糊查詢
  _lte: number  // 小於等於
  _gte: number  // 大於等於
  _limit: number// 比數限制
  _page: number
  _sort: number
  _order: 'asc' | 'desc'
  type_like: number
}

export type OptionType = {
  label: string
  value: number | string
}

export type NavInfoType = {
  label: string
  link: string
}

export type InfoDataType = {
  id: number
  name: string
  tel: string
  opening: string
  address: string
  img: string
  aos: string
}

export type BannerType = {
  id: number
  img: string
  link?: string
  alt: string
}

export type NewsType = {
  id: number
  title: string
  introduction: string
  link: string
  img: string
  type: number
}

export type TabType = {
  name: string
  sub: string
  type: number
}

export type CakeDetailType = {
  imgs: string[]
  features: {
    flavor: string
    features: string
    ingredients: string
    shelfLife: string
  }
  nutritionFacts: string[]
}
export type CoffeeDetailType = {
  imgs: string[]
  features: {
    flavor: string
    flavorDetail: string
    roast: string
    acidity: string
  };
  info: string[]
}
export type GoodType<T extends CakeDetailType | CoffeeDetailType> = {
  id: number
  name: string
  link: string
  img: string
  indexImg?: string
  price: number
  onSale?: number
  type: number
  tag: number[]
  count?: number
  checked?: boolean
  detail: T
}

export type MenuListType = {
  name: string
  introduction: string
  img: string
  link: string
  aos: string
}

export type PageConfigType = {
  current: number
  pageSize: number
}

export type EmailType = {
  cause: string
  name: string
  email: string
  subject: string
  content: string
}

export type GoodsListMailType = {
  email: string
  date: string
  content: string
  totalPrice: number
}

export type BreadcrumbDataType = {
  name: string
  link: string
}

export type NewsModelType = {
  isOpen: boolean
  list: NewsType[] | []
  data: NewsType
}

export type ContactInfoType = {
  name: string
  link: string
}

export type StepDataType = {
  title: string
  sub: string
  introduction: string
  img: string
  aos: string
}
