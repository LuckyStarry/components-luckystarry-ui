import { Frame } from 'luckystarry/store'
import { IState, state } from './state'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { MenuInfo } from 'luckystarry/models'

export default class UI extends Frame<IState> {
  constructor(configs: { menus: MenuInfo[] }) {
    super({ state })
  }
}
