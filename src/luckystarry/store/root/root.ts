import * as frame from '../frame'
import { IState, CreateState } from './state'
import { RootGetters } from './getters'
import { Actions } from './actions'
import { Mutations } from './mutations'
import { MenuInfo } from '../../models'

export class Root extends frame.Frame<IState> {
  constructor(menus: MenuInfo[], modules: frame.IFrameModules) {
    super({
      state: CreateState(menus),
      getters: new RootGetters(),
      actions: new Actions(),
      mutations: new Mutations(),
      modules
    })
  }
}
