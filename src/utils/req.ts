import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url === '/goods') {
      config.baseURL = import.meta.env.MODE === 'dev'
        ? 'http://localhost:5173/db.json'
        : 'https://suanriz.github.io/rizi/db.json'
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
