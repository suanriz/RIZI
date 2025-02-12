import req from './req'

export const getBanner = (params?: any) => {
  return req.get('/banners', { params })
}

export const getNews = (params?: any) => {
  return req.get('/news', { params })
}

export const getGoods = () => {
  return req.get('/goods')
}

export const getMenu = (params?: any) => {
  const { id, ...res } = params ?? {}
  return req.get(`/menu${id ? `/${id}` : ''}`, { params: res })
}
