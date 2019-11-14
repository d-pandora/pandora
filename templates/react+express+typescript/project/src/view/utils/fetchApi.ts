import { message } from 'antd'
import { PROJECT_TOKERN_NAME } from 'utils/constants'

export function fetchJSON(url: string, params: any) {
  const token = localStorage.getItem(PROJECT_TOKERN_NAME)

  const fetchparam = {
    ...params,
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Connection: 'keep-alive',
      ...params.headers,
      authorization: token,
    },
  }

  return fetch(url, fetchparam)
    .then((resp) => {
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
    })
    .then((resp) => resp.json()).then((result: { status: number; data: any; msg?: string }) => {
      if (result.status) {
        return result.data
      }
      message.error(result.msg, 2)
      return false
    })
}

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

const fetchJSONByMethod = (method: string, headers?: any) => (url: string) => (query?: any) => {
  const params: any = {
    method,
    headers: headers || {},
  }
  let queryUrl = url
  if (method === 'GET') {
    if (query) {
      queryUrl += '?'
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          queryUrl += `&${key}=${query[key] || ''}`
        }
      }
    }
  } else if (method === 'DELETE') {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        queryUrl = queryUrl.replace(`:${key}`, query[key])
      }
    }
  } else if (typeof query === 'string') {
    params.body = query
  } else if (headers && headers['Content-Type'] === 'application/json;charset=UTF-8') {
    params.body = JSON.stringify(query)
  } else {
    params.body = buildParams(query)
  }
  return fetchJSON(queryUrl, params)
}

export const fetchFormData = (url: string, formData: FormData) => fetchJSON(url, { method: 'POST', body: formData })

export const fetchJSONByGet = fetchJSONByMethod('GET', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByPost = fetchJSONByMethod('POST', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByPut = fetchJSONByMethod('PUT', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByDelete = fetchJSONByMethod('DELETE', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONStringByPost = fetchJSONByMethod('POST', { 'Content-Type': 'application/json;charset=UTF-8' })

export const fetchJSONStringByPut = fetchJSONByMethod('PUT', { 'Content-Type': 'application/json;charset=UTF-8' })
