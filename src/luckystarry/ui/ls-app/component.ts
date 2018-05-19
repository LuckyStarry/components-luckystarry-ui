import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { LoginUser, MenuInfo } from 'luckystarry/models'
import { title, version } from 'luckystarry/ui'
import { build } from 'luckystarry/release'
import { version as luckystarryui } from 'luckystarry/version'
const namespace = 'system/ui'
@Component
export default class App extends Vue {
  @Getter(`${namespace}/user`)
  user: LoginUser

  @Getter(`${namespace}/welcome`)
  welcome: string

  @Getter(`${namespace}/loading`)
  loading: boolean

  @Getter(`${namespace}/menus`)
  menus: MenuInfo[]

  get title(): string {
    return title
  }

  get buildId(): string {
    return `${(build / 86400000).toFixed(0)}.${(build % 86400000) / 1000}`
  }

  get luckystarryUI(): string {
    return luckystarryui
  }

  get version(): string {
    return version
  }

  get isLogin() {
    return this.user && this.user.UserName
  }
  get systemButtonText() {
    return this.isLogin
      ? `${this.welcome}, ${this.user.UserName}`
      : `${this.welcome}, 欢迎您`
  }

  @Action(`${namespace}/login`)
  login: Function

  @Action(`${namespace}/logout`)
  logout: Function

  @Action(`${namespace}/refresh-user-info`)
  refreshAuth: Function
}
