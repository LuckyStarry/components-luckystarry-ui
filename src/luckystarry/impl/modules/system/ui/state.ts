import * as utils from 'luckystarry/utils'
import { LoginUser } from 'luckystarry/models/login-user'
import { MenuInfo } from 'luckystarry/models/menu-info'
import { frame } from 'luckystarry/store'

export interface IState extends frame.IFrameState {
  loading: boolean
  screen: {
    width: number
    height: number
  }
  user: LoginUser
  lastUpdate: Date
  menus: MenuInfo[]
}

export const state = (): IState => {
  console.log('luckystarry-STATE:LOAD START')

  let model: IState = {
    loading: false,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    user: new LoginUser(),
    lastUpdate: new Date(),
    menus: []
  }

  let user = utils.cache.user.get()
  if (user) {
    model.user = user
  }

  utils.cache.user.safty()

  setInterval(() => {
    model.screen.width = window.innerWidth
    model.screen.height = window.innerHeight
    model.lastUpdate = new Date()
  }, 1000)

  console.log('luckystarry-STATE:LOAD SUCCESS')

  return model
}
