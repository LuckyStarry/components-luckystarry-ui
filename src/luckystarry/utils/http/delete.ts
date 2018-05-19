import { request } from './request'
import { AxiosRequestConfig } from 'axios'
async function Delete(
  url: string,
  config?: AxiosRequestConfig,
  options?: { smart?: boolean }
) {
  return await request(
    async client => await client.delete(url, config),
    options
  )
}

export { Delete as delete }
