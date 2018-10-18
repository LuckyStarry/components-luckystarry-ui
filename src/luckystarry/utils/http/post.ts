import { request } from './request'
import { AxiosRequestConfig } from 'axios'
import qs from 'qs'
export async function post(
  url: string,
  data?,
  config?: AxiosRequestConfig,
  options?: { smart?: boolean; stringify?: boolean }
) {
  options = Object.assign({ stringify: false }, options)
  let xdata = data
  if (xdata && options.stringify) {
    xdata = qs.stringify(data)
  }
  return await request(
    async client => await client.post(url, xdata, config),
    options
  )
}
