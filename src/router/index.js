import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '',
    name: 'login',
    component: () => import('@/views/home/login'), // 路由懒加载
    meta: {
      title: '登录', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/home/index'), // 路由懒加载
    meta: {
      title: '首页', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/home/message'), // 路由懒加载
    meta: {
      title: '消息', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  },
  {
    path: '/addressList',
    name: 'addressList',
    component: () => import('@/views/home/addressList'), // 路由懒加载
    meta: {
      title: '通讯录', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/home/my'),
    meta: {
      title: '我的',
      keepAlive: false
    }
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/home/project'),
    meta: {
      title: '项目',
      keepAlive: false
    }
  },
  {
    path: '/addProject',
    name: 'addProject',
    component: () => import('@/views/home/addProject'),
    meta: {
      title: '新增项目',
      keepAlive: false
    }
  },
  {
    path: '/modifyProject',
    name: 'modifyProject',
    component: () => import('@/views/home/modifyProject'),
    meta: {
      title: '编辑项目',
      keepAlive: false
    }
  },
  {
    path: '/projectDetail',
    name: 'projectDetail',
    component: () => import('@/views/home/projectDetail'),
    meta: {
      title: '项目详情',
      keepAlive: false
    }
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('@/views/home/task'),
    meta: {
      title: '任务',
      keepAlive: false
    }
  },
  {
    path: '/releaseTask',
    name: 'releaseTask',
    component: () => import('@/views/home/releaseTask'),
    meta: {
      title: '发布任务',
      keepAlive: false
    }
  },
  {
    path: '/myTask',
    name: 'myTask',
    component: () => import('@/views/home/myTask'),
    meta: {
      title: '我的任务',
      keepAlive: false
    }
  },
  {
    path: '/taskDetail',
    name: 'taskDetail',
    component: () => import('@/views/home/taskDetail'),
    meta: {
      title: '任务详情',
      keepAlive: false
    }
  },
  {
    path: '/myTaskDetail',
    name: 'myTaskDetail',
    component: () => import('@/views/home/myTaskDetail'),
    meta: {
      title: '我的任务详情',
      keepAlive: false
    }
  },
  {
    path: '/modifyTask',
    name: 'modifyTask',
    component: () => import('@/views/home/modifyTask'),
    meta: {
      title: '编辑任务',
      keepAlive: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/home/search'),
    meta: {
      title: '搜索',
      keepAlive: false
    }
  },
  {
    path: '/projectSearch',
    name: 'projectSearch',
    component: () => import('@/views/home/projectSearch'),
    meta: {
      title: '搜索项目',
      keepAlive: false
    }
  },
  {
    path: '/taskSearch',
    name: 'taskSearch',
    component: () => import('@/views/home/taskSearch'),
    meta: {
      title: '搜索任务',
      keepAlive: false
    }
  },
  {
    path: '/myTaskSearch',
    name: 'myTaskSearch',
    component: () => import('@/views/home/myTaskSearch'),
    meta: {
      title: '搜索我的任务',
      keepAlive: false
    }
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    base: '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: router
  })

export default createRouter()
