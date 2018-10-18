import { post } from './post'
import { AxiosRequestConfig } from 'axios'
export async function service(
  name: string,
  url: string,
  data?,
  config?: AxiosRequestConfig,
  options?: { smart?: boolean; stringify?: boolean }
) {
  config = config || {}
  config.headers = config.headers || {}

  return await post(
    `${url}/${name}`,
    data,
    config,
    Object.assign({ smart: false }, options)
  )
}
