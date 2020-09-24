import qs from 'qs'
// axios
import request from '@/utils/request'
// user api

// 获取全部任务信息
export function findAll(params) {
  return request({
    url: '/api/task/findAll',
    method: 'post',
    data: qs.stringify(params)
  })
}

// findOne
export function findOne(params) {
  return request({
    url: '/api/task/findOne',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 保存数据
export function save(params) {
  return request({
    url: '/api/task/save',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 编辑数据
export function update(params) {
  return request({
    url: '/api/task/update',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 删除数据
export function remove(params) {
  return request({
    url: '/api/task/delete',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 已完成任务
export function findAllCompleteTask(params) {
  return request({
    url: '/api/task/findAllCompleteTask',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 未完成任务
export function findAllUndoneTask(params) {
  return request({
    url: '/api/task/findAllUndoneTask',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 我完成的任务
export function findMyCompleteTask(params) {
  return request({
    url: '/api/task/findMyCompleteTask',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 我未完成的任务
export function findMyUndoneTask(params) {
  return request({
    url: '/api/task/findMyUndoneTask',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 开始
export function start(params) {
  return request({
    url: '/api/task/start',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 完成
export function over(params) {
  return request({
    url: '/api/task/over',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 工时
export function workHour(params) {
  return request({
    url: '/api/task/workHour',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 项目下拉
export function pullDownProject(params) {
  return request({
    url: '/api/task/pullDownProject',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 我的任务查询
export function findMyTask(params) {
  return request({
    url: '/api/task/findMyTask',
    method: 'post',
    data: qs.stringify(params)
  })
}
