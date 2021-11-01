import { request } from '@/api/service'
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

export function getChildIncludedUser (query) {
  return request({
    url: baseUrl + '/tree/includedUser',
    method: 'get',
    params: query
  })
}
export function getUsers (query) {
  return request({
    url: baseUrl + '/user',
    method: 'get',
    params: query
  })
}
export function bindUser (param) {
  return request({
    url: baseUrl + '/bindUser',
    method: 'post',
    data: param
  })
}
export function serachUserAndGroup (query) {
  return request({
    url: baseUrl + '/serachUserAndGroup',
    method: 'get',
    params: query
  })
}
