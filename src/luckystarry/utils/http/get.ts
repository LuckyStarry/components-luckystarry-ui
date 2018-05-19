import { request } from './request'
import { AxiosRequestConfig } from 'axios'
export async function get(
  url: string,
  config?: AxiosRequestConfig,
  options?: { smart?: boolean }
) {
  return await request(async client => await client.get(url, config), options)
}
