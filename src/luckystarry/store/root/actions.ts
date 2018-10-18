import { ActionContext } from 'vuex'
import { LoginUser, IResponse, ResponseType, ResponseCode } from '../../models'
import { FrameActions } from '../frame'
import { http, cache } from '../../utils'
import { IState } from './state'
import * as types from './types'
import { Notification, Loading, MessageBox } from 'element-ui'

export class Actions extends FrameActions<IState> {
  public async [types.actions.LOAD_ACCESS_TOKEN](
    ctx: ActionContext<IState, any>,
    payload: { state: string; code: string; returnUri: string }
  ): Promise<any> {
    let response = await http.service(
      'github',
      '/oauth/authorize',
      payload,
      null,
      { smart: false }
    )
    if (response.entity.token) {
      cache.token.set(response.entity.token)
      await ctx.dispatch(types.actions.LOAD_USER_INFO)
      return response.entity.token
    } else {
      throw new Error('获取TOKEN失败')
    }
  }

  public async [types.actions.LOAD_USER_INFO](
    ctx: ActionContext<IState, any>
  ): Promise<any> {
    let response = await http.service('profile', '/oauth/token', {}, null, {
      smart: false
    })
    let entity = response.entity
    let profile = new LoginUser()
    profile.UserID = entity.userID
    profile.UserName = entity.userName
    profile.Gender = entity.gender
    ctx.commit(types.mutations.USER_INFO_RESET, profile)
    cache.user.set(profile)
  }

  public async [types.actions.ON_EXCEPTION](
    context: ActionContext<IState, any>,
    payload: any
  ): Promise<any> {
    if (payload) {
      Notification.error({
        title: '系统通知',
        message: '发生了未处理的异常，请联系管理员协助处理'
      })
      console.error(payload)
    }
    return await payload
  }

  public async [types.actions.API_PROXY]<T extends IResponse<U>, U>(
    context: ActionContext<IState, any>,
    payload: () => Promise<T>
  ): Promise<T> {
    let loading = Loading.service({ fullscreen: true, text: '执行中...' })
    let closed = false
    try {
      let response = await payload()
      switch (response.Type) {
        case ResponseType.ERROR_AUTH:
          switch (response.Code) {
            case ResponseCode.E9001:
              loading.close()
              closed = true
              await noAuth()
          }
      }
      if (!closed) {
        loading.close()
      }
      return response
    } catch (e) {
      if (!closed) {
        loading.close()
      }
      if (e && e.response && e.response.status) {
        switch (e.response.status) {
          case 401:
            await noAuth()
        }
      }
      context.dispatch(types.actions.ON_EXCEPTION, e)
    }
  }
}

async function noAuth() {
  let loading = {} as { close: () => void }
  try {
    await MessageBox.alert(
      '您当前好像没有登陆系统，点击确定将为您跳转至登录页面。',
      '系统通知',
      { type: 'warning' }
    )
    loading = Loading.service({
      fullscreen: true,
      text: '正在为您跳转至登陆页面...'
    })
    let response = await http.service('oauth2', '/oauth/authorize', {
      provider: 'github',
      refer: window.location.href
    })
    if (response.entity.url) {
      window.location.replace(response.entity.url)
    }
  } catch (e) {
    loading.close()
  }
}
