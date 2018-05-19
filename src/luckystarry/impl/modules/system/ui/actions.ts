import { MessageBox, Notification } from 'element-ui'
import { LoginUser } from 'luckystarry/models'
import * as utils from 'luckystarry/utils'
import { IState } from './state'
import { ActionContext } from 'vuex'
export const actions = {
  login: async () => {
    let response = await utils.http.get('/users/oauth')
    // TODO: window.location.href = uri
  },
  logout: async () => {
    try {
      await MessageBox.confirm(
        '您将要退出织梦者管理系统，是否继续？',
        '系统消息',
        {
          confirmButtonText: '退出系统',
          cancelButtonText: '取消',
          type: 'info'
        }
      )
    } catch (e) {
      Notification.info('已取消退出')
      return
    }

    let response = await utils.http.post('/users/logout')
    let token = utils.cache.token.get()
    utils.cache.user.clear()
    utils.cache.token.clear()
    window.location.href = `${
      response.entity.OAuthHost
    }/oauth/logout?access_token=${token}`
  },
  ['refresh-token']: async (
    ctx: ActionContext<IState, any>,
    payload: { state: string; code: string; returnUri: string }
  ) => {
    let token = ''
    try {
      let response = await utils.http.get(
        `/users/token/${payload.code}/${payload.state}`
      )
      token = response.entity.OAuthToken.access_token
    } catch (e) {
      if (e && e.message) {
        throw new Error(e.message)
      } else {
        throw e
      }
    }
    if (token) {
      utils.cache.token.set(token)
      await ctx.dispatch('refresh-user-info')
      return token
    } else {
      throw new Error('获取TOKEN失败')
    }
  },
  ['refresh-user-info']: async (ctx: ActionContext<IState, any>) => {
    let token = utils.cache.token.get()
    let response = await utils.http.get('/users/current')
    let user = new LoginUser(response.entity.UserInfo)
    user.Roles = response.entity.RoleNames || []
    user.Token = token
    utils.cache.user.set(user)
    ctx.commit('reset-user', user)
  }
}
