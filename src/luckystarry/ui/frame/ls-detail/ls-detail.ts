import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { LsFrame } from '../ls-frame'
import { store, utils } from '../../..'
@Component({ components: { LsFrame } })
export class LsDetail extends Vue {
  @Prop({ type: String, required: true })
  public namespace: string

  @Prop({ type: String, required: false })
  public keyName: string

  public get subject() {
    return this.$store.getters[
      `${this.namespace}/${store.detail.types.getters.SUBJECT}`
    ]
  }

  public async load(): Promise<void> {
    await this.$store.dispatch(
      `${this.namespace}/${store.detail.types.actions.LOAD}`
    )
  }

  public async back(): Promise<void> {
    this.$router.back()
  }

  @Emit('on-load')
  public async onLoad(key: string): Promise<void> {
    utils.noop()
  }

  public async mounted() {
    if (this.keyName) {
      let key: string = this.$route.params[this.keyName]
      if (key) {
        await this.onLoad(key)
        await this.load()
      }
    }
  }
}
