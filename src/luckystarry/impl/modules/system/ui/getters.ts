import { models } from 'luckystarry'
import { frame } from 'luckystarry/store'
import { IState } from './state'
import * as types from './types'
export const getters = {
  welcome: (state: IState) => {
    if (state.lastUpdate.getHours() < 11) {
      return '早上好'
    }
    if (state.lastUpdate.getHours() < 14) {
      return '中午好'
    }
    if (state.lastUpdate.getHours() < 19) {
      return '下午好'
    }
    return '晚上好'
  },
  loading: (state: IState) => state.loading,
  user: (state: IState) => state.user,
  menus: (state: IState) => state.menus
}

export class Getters extends frame.FrameGetters<IState> {
  public [types.getters.LOADING_STATE](state: IState): boolean {
    return state[types.state.LOADING_STATE]
  }

  public [types.getters.USER_INFO](state: IState): models.LoginUser {
    return state[types.state.USER_INFO]
  }

  public [types.getters.MENUS](state: IState): models.MenuInfo[] {
    return state[types.state.MENUS]
  }
}
