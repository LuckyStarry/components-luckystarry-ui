import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { LsFrame } from '../../frame'
import { types } from '../../../store/root'
const aisatsu = [
  '正在处理您的登陆信息，请稍候',
  'ログイン情報処理中、少々お待ちください',
  'Processing login information, Please wait'
]
@Component({ components: { LsFrame } })
export default class Callback extends Vue {
  intervalID: number = -1
  index: number = 0
  logining: boolean = true
  error: boolean = false
  message: string

  get text(): string {
    if (this.logining) {
      return aisatsu[this.index]
    } else {
      return this.message
    }
  }

  get returnUri(): string {
    let uri = this.$route.query.returnUri
    if (uri) {
      return uri
    } else {
      return `//${location.host}/`
    }
  }

  @Action(types.actions.LOAD_ACCESS_TOKEN)
  callback: Function

  async mounted() {
    this.logining = true
    this.error = false
    this.intervalID = setInterval(() => {
      this.index = (this.index + 1) % aisatsu.length
    }, 1500)
    try {
      let state = this.$route.query.state
      let code = this.$route.query.code
      let return_uri = this.$route.query.return_uri
      let token = await this.callback({ state, code, return_uri })
      this.message = '登陆成功！即将为您跳转至登陆前的页面。'
      setTimeout(this.back, 2000)
      this.logining = false
    } catch (e) {
      this.error = true
      if (e && e.message) {
        this.message = e.message
        this.logining = false
      } else {
        this.message =
          '登陆信息处理错误，可能需要您重新尝试。如您一直无法正常进入系统，请您联系系统管理员。'
        this.logining = false
        console.log(e)
      }
    }
  }

  back() {
    window.location.replace(this.returnUri)
  }

  destroyed() {
    clearInterval(this.intervalID)
  }
}
