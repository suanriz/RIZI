import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url === '/goods') {
      config.baseURL = import.meta.env.VITE_API_GOODS_BASE_URL
      config.url = ''
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // eslint-disable-next-line no-console
    if (error) console.log(error)
  }
)

export default request
