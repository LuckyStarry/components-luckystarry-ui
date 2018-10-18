import { baseUrl } from '.'
import axios, { AxiosInstance, AxiosPromise } from 'axios'
import { MessageBox, Notification } from 'element-ui'
import { ResponseType, ResponseCode } from '../../models'
import * as utils from '..'
import * as handles from './handles'

export async function request(
  process: (client: AxiosInstance) => AxiosPromise<any>,
  options?: { smart?: boolean; silence?: boolean }
) {
  options = Object.assign({ smart: true, silence: false }, options)
  let factory = new handles.Factory(options)
  let executer = new handles.Executer()

  let client = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: utils.cache.token.get()
    },
    paramsSerializer(params): string {
      let datas = []
      for (let p in params) {
        datas.push(p + '=' + encodeURIComponent(params[p]))
      }
      return datas.join('&')
    }
  })
  let response = await process(client)
  let command = factory.Create(response)
  return await executer.Execute(command)
}
