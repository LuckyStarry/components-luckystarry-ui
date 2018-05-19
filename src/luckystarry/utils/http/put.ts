import { request } from './request'
import { AxiosRequestConfig } from 'axios'
import qs from 'qs'
export async function put(
  url: string,
  data?,
  config?: AxiosRequestConfig,
  options?: { smart?: boolean; stringify?: boolean }
) {
  options = Object.assign({ stringify: true }, options)
  let xdata = data
  if (xdata && options.stringify) {
    xdata = qs.stringify(data)
  }
  return await request(
    async client => await client.put(url, xdata, config),
    options
  )
}
