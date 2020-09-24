import qs from 'qs'
// axios
import request from '@/utils/request'
// user api

// 获取全部项目信息
export function findAll(params) {
  return request({
    url: '/api/project/findAll',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 我负责的项目
export function findMyResponsibleInfo(params) {
  return request({
    url: '/api/project/findMyResponsibleInfo',
    method: 'post',
    data: qs
  })
}

// 我参与的项目
export function findMyParticipateInfo(params) {
  return request({
    url: '/api/project/findMyParticipateInfo',
    method: 'post',
    data: qs
  })
}

// 详情
export function findOne(params) {
  return request({
    url: '/api/project/findOne',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 新增项目
export function save(params) {
  return request({
    url: '/api/project/save',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 删除项目
export function deleteProject(params) {
  return request({
    url: '/api/project/delete',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 编辑项目
export function update(params) {
  return request({
    url: '/api/project/update',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 人员下拉
export function pullDownInfo(params) {
  return request({
    url: '/api/project/pullDownInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}