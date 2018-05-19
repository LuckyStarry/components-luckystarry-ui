import { IState } from './state'
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
