import { request } from '@/api/service' // 改成这个请求真实后端
const baseUrl = '/platbase/user'
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
  return request({
    url: baseUrl + '/' + id,
    method: 'put',
    data: obj
  })
}
