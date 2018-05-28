import { frame } from 'luckystarry/store'
import { IState, state } from './state'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { MenuInfo } from 'luckystarry/models'

export default class UI extends frame.Frame<IState> {
  constructor() {
    super({ state, getters, mutations })
  }
}
