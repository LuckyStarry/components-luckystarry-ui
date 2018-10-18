import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as store from '../../store'
import * as models from '../../models'
import { title } from '..'

@Component
export default class App extends Vue {
  @Getter(`${store.root.types.getters.USER_INFO}`)
  public user: models.LoginUser

  @Getter(`${store.root.types.getters.LOADING_STATE}`)
  public loading: boolean

  @Getter(`${store.root.types.getters.MENUS}`)
  public menus: models.MenuInfo[]

  @Getter(`${store.root.types.getters.ACTIVED_MENUS}`)
  public actived: models.MenuInfo[]

  public get title(): string {
    return title
  }

  public get asides(): models.MenuInfo[] {
    if (this.actived && this.actived.length) {
      return this.actived[0].Children || []
    }
    return []
  }

  public get activedPath(): string {
    if (this.actived && this.actived.length) {
      let menu = this.actived[0]
      if (menu) {
        return menu.Link || menu.Path
      }
    }
    return ''
  }

  public get activedLeaf(): string {
    if (this.asides && this.asides.length) {
      for (let aside of this.asides) {
        if (aside) {
          for (let actived of this.actived) {
            if (actived) {
              if (aside.uuid === actived.uuid) {
                return aside.Link || aside.Path
              }
            }
          }
        }
      }
    }
    return ''
  }

  public get isLogin(): boolean {
    return this.user && !!this.user.UserName
  }

  public get loginButtonText(): string {
    if (this.isLogin) {
      return `欢迎您，${this.user.UserName}`
    } else {
      return '登陆系统'
    }
  }

  @Action(`login`)
  public login: Function

  @Action(`$logout`)
  public logout: Function

  @Action(`/refresh-user-info`)
  public refreshAuth: Function
}
