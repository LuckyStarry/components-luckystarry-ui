import { baseUrl } from './index'
import axios, { AxiosInstance, AxiosPromise } from 'axios'
import { MessageBox, Notification } from 'element-ui'
import * as utils from 'luckystarry/utils'

export async function request(
  process: (client: AxiosInstance) => AxiosPromise<any>,
  options?: { smart?: boolean; silence?: boolean }
) {
  options = Object.assign({ smart: true, silence: false }, options)

  try {
    let client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        'If-Modified-Since': '0',
        'Smart-Ajax': '1.0.0.0',
        Authorization: `oauth2 ${utils.cache.token.get()}`
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
    if (options.smart) {
      if (response.data.isSuccess) {
        if (!options.silence && response.data.message) {
          Notification.success({
            title: '系统通知',
            message: response.data.message
          })
        }
        return response.data
      } else {
        if (!options.silence && response.data.message) {
          Notification.warning({
            title: '系统通知',
            message: response.data.message
          })
        }
        throw { response }
      }
    } else {
      return response.data
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 200:
          throw error.response.data
        case 401:
          if (!alerting) {
            MessageBox.alert(
              '错误401 ! 未获取到您的授权信息，您可能尚未登录或登录信息已失效，请重新登录',
              '授权信息',
              {
                callback(selection) {
                  alerting = true
                  if (selection === 'confirm') {
                    // TODO: window.location.href = uri
                  } else {
                    alerting = false
                  }
                }
              }
            )
          }
          return
        case 403:
          if (!alerting) {
            MessageBox.alert(
              `错误403 ! ${error.response.data.message ||
                '您的权限不足，请联系管理员或更换帐号后重试。'}`,
              '授权信息',
              {
                callback() {
                  alerting = false
                }
              }
            )
          }
          return
        case 500:
          if (error.response.data && error.response.data.message) {
            Notification.error({
              title: '系统通知',
              message: `系统捕获了一个未经处理的异常，请联系管理员处理：${
                error.response.data.message
              }`
            })
          } else {
            Notification.error({
              title: '系统通知',
              message: `系统捕获了一个未被发现的异常，请联系管理员处理`
            })
          }
      }
    } else {
      console.error('[ERROR] luckystarry-request:')
      console.error(error)
    }
  }
}

let alerting = false
