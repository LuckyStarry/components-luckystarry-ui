import { LoginUser, MenuInfo } from '../../models'
import { FrameMutations } from '../frame'
import { IState } from './state'
import * as types from './types'

export class Mutations extends FrameMutations<IState> {
  [types.mutations.LOADING_STATE_RESET](state: IState, value: boolean): void {
    state[types.state.LOADING_STATE] = value
  }

  [types.mutations.USER_INFO_RESET](state: IState, user: LoginUser): void {
    state[types.state.USER_INFO] = user
  }

  [types.mutations.ACTIVED_MENUS_RESET](
    state: IState,
    menus: MenuInfo[]
  ): void {
    state[types.state.ACTIVED_MENUS] = menus || []
  }
}
