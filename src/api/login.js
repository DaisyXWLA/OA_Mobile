import qs from 'qs'
// axios
import request from '@/utils/request'
// user api

// 用户信息 post 方法
export function getLogin(params) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function getLoginInfo(params) {
  return request({
    url: '/api/login/getInfo?' + qs.stringify(params),
    method: 'get'
  })
}
