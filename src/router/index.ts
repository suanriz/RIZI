import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { useIndexStore } from '@/stores/indexStore'
import { renderTitle, } from '@/utils/lib'
import MainView from '@/views/MainView.vue'
import HomeView from '@/views/HomeView.vue'
import { SITE_NAME } from '@/utils/site'
import AOS from 'aos'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainView,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: HomeView,
        meta: { requiresLoading: true }
      },
      {
        path: '/news',
        name: '最新消息',
        component: () => import('@/views/NewsView.vue'),
        meta: { requiresLoading: true }
      },
      {
        path: '/menu',
        name: '門市菜單',
        component: () => import('@/views/MenuTypeView.vue'),
      },
      {
        path: '/menu/type',
        name: '詳細菜單',
        component: () => import('@/views/MenuListView.vue'),
        meta: { requiresLoading: true }
      },
      {
        path: '/menu/type/good/:id',
        name: '品項細節',
        component: () => import('@/views/MenuView.vue'),
        meta: { requiresLoading: true }
      },
      {
        path: '/store',
        name: '線上購物',
        component: () => import('@/views/StoreView.vue'),
        meta: { requiresLoading: true }
      },
      {
        path: '/store/good/:id',
        name: '產品細節',
        component: () => import('@/views/GoodView.vue'),
        meta: { requiresLoading: true }
      },
      {
        path: '/brand',
        name: '品牌精神',
        component: () => import('@/views/BrandView.vue'),
        meta: { requiresLoading: true }
      },
      {
        path: '/contact',
        name: '聯絡我們',
        component: () => import('@/views/ContactView.vue'),
      },
      {
        path: '/quickcart',
        name: '購物車',
        component: () => import('@/views/QuickcartView.vue'),
      },
      {
        path: '/404',
        name: '此頁面不存在',
        meta: { title: true },
        component: () => import('@/views/NotFound.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PATH_BASE),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }

})

router.beforeResolve((to, _from, next) => {
  const indexStore = useIndexStore()
  if (to.meta.requiresLoading)
    indexStore.loading = true
  next()
})

router.beforeEach(async (to, from) => {
  if (to.fullPath === from.fullPath) return false
  document.title = to.name ? renderTitle(String(to.name)) : SITE_NAME
  if (to.fullPath === '/index') {
    const isAppMounted = document.getElementById('app')?.outerHTML !== '<div id="app" data-v-app=""><!----></div>'
    if (isAppMounted) {
      setTimeout(() => {
        AOS.refresh()
      }, 1000)
    }
  }
})

export default router
