import { LoginUser } from 'luckystarry/models'
import { IState } from './state'
export const mutations = {
  ['loading']: (state: IState) => (state.loading = true),
  ['loaded']: (state: IState) => (state.loading = false),
  ['reset-user']: (state: IState, user: LoginUser) => {
    state.user = user
  }
}
