import * as utils from '../../utils'
import * as models from '../../models'
import * as frame from '../frame'
import * as types from './types'

export interface IState extends frame.IFrameState {
  [types.state.LOADING_STATE]: boolean
  [types.state.SCREEN]: {
    width: number
    height: number
  }
  [types.state.USER_INFO]: models.LoginUser
  [types.state.LAST_UPDATE_TIME]: Date
  [types.state.MENUS]: models.MenuInfo[]
  [types.state.ACTIVED_MENUS]: models.MenuInfo[]
}

export function CreateState(menus: models.MenuInfo[]): () => IState {
  return (): IState => {
    let model: IState = {
      [types.state.LOADING_STATE]: false,
      [types.state.SCREEN]: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      [types.state.USER_INFO]: new models.LoginUser(),
      [types.state.LAST_UPDATE_TIME]: new Date(),
      [types.state.MENUS]: menus || [],
      [types.state.ACTIVED_MENUS]: []
    }

    let user = utils.cache.user.get()
    if (user) {
      model[types.state.USER_INFO] = user
    }

    utils.cache.user.safty()

    return model
  }
}
