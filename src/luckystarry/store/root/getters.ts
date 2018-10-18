import * as models from '../../models'
import * as frame from '../frame'
import * as types from './types'
import { IState } from './state'

export class RootGetters extends frame.FrameGetters<IState> {
  public [types.getters.LOADING_STATE](state: IState): boolean {
    return state[types.state.LOADING_STATE]
  }

  public [types.getters.USER_INFO](state: IState): models.LoginUser {
    return state[types.state.USER_INFO]
  }

  public [types.getters.MENUS](state: IState): models.MenuInfo[] {
    return state[types.state.MENUS]
  }

  public [types.getters.ACTIVED_MENUS](state: IState): models.MenuInfo[] {
    return state[types.state.ACTIVED_MENUS]
  }
}
