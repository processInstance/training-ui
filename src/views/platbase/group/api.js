import { request } from '@/api/service' // 改成这个请求真实后端
const baseUrl = '/platbase/group'
export function page (query) {
  return request({
    url: baseUrl + '/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: baseUrl + '',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
}

export function putObj (id, obj) {
  debugger
  return request({
    url: baseUrl + '/' + id,
    method: 'put',
    data: obj
  })
}

export function getTree (query) {
  return request({
    url: baseUrl + '/tree',
    method: 'get',
    params: query
  })
}

export function treeSearch (query) {
  return request({
    url: baseUrl + '/tree/search',
    method: 'get',
    params: query
  })
}
