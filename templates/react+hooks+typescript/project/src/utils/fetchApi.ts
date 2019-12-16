import { message } from 'antd'
import { API_BATMAN } from './constants'

function checkStatus (resp: Response) {
  if (resp.status === 302) {
    window.location.href = '/login'
  }
  if (resp.status === 404) {
    message.error('page not found')
  }
  if (resp.status === 403) {
    message.error('没有权限，请联系运营人员！')
  }
  return resp
}

function mergeParams (params: any) {
  return {
    ...params,
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Connection: 'keep-alive',
      ...params.headers,
    },
  }
}

function fetchData (url: string, params: any) {
  const fetchparam = mergeParams(params)
  const realUrl = url.indexOf('http') === -1 ? `${API_BATMAN}/${url}` : url
  return fetch(realUrl, fetchparam).then((resp) => checkStatus(resp))
}

const fetchJSON = (url: string, params: any) =>
  fetchData(url, params)
    .then((resp) => resp.json())
    .then((result: { status: number; data: any; msg?: string }) => {
      if (result.status) {
        return result.data
      }
      message.error(result.msg, 2)
      return false
    })

const downloadFetch = (url: string, params: any, filename?: string) =>
  fetchData(url, params)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename || '导出.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
    })

const buildParams = (obj: any) => {
  if (!obj) {
    return ''
  }
  const params: string[] = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.push(`${key}=${obj[key]}`)
    }
  }
  return params.join('&')
}

const fetchJSONByMethod = (method: string, headers?: any, download?: boolean) => (url: string) => (query?: any, filename?: string) => {
  const params: any = {
    method,
    headers: headers || {},
  }
  let queryUrl = url
  switch (method) {
    case 'GET':
      if (query) {
        queryUrl += '?'
        for (const key in query) {
          if (query.hasOwnProperty(key)) {
            queryUrl += `&${key}=${query[key]}`
          }
        }
      }
      break
    case 'JSONPOST':
      query = JSON.stringify(query)
      params.method = 'POST'
      params.body = query
      break
    case 'JSONPUT':
      query = JSON.stringify(query)
      params.method = 'PUT'
      params.body = query
      break
    case 'POST':
    case 'PUT':
      params.body = buildParams(query)
      break
    default: break
  }
  if (download) {
    return downloadFetch(queryUrl, params, filename)
  }
  return fetchJSON(queryUrl, params)
}

export const fetchFormData = (url: string, formData: FormData) => fetchJSON(url, { method: 'POST', body: formData })

export const fetchJSONByGet = fetchJSONByMethod('GET')

export const fetchJSONByPost = fetchJSONByMethod('POST')

export const fetchJSONByPut = fetchJSONByMethod('PUT')

export const fetchJSONByDelete = fetchJSONByMethod('DELETE')

export const fetchJSONStringByPost = fetchJSONByMethod('JSONPOST', { 'Content-Type': 'application/json;charset=UTF-8' })

export const fetchJSONStringByPut = fetchJSONByMethod('JSONPUT', { 'Content-Type': 'application/json;charset=UTF-8' })

export const fetchDownloadByGet = fetchJSONByMethod('GET', true)
