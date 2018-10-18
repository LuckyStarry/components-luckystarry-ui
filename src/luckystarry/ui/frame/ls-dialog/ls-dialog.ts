import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { LsFrame } from '../ls-frame'
import { store, models, utils } from '../../..'
@Component({ components: { LsFrame } })
export class LsDialog extends Vue {
  @Prop({ type: String, required: true })
  namespace: string

  get visible(): boolean {
    return this.$store.getters[
      `${this.namespace}/${store.dialog.types.getters.DIALOG_VISIBLE}`
    ]
  }

  async toggle(visible): Promise<void> {
    if (visible !== this.visible) {
      if (visible) {
        await this.$store.dispatch(
          `${this.namespace}/${store.dialog.types.actions.OPEN}`
        )
      } else {
        await this.$store.dispatch(
          `${this.namespace}/${store.dialog.types.actions.CLOSE}`
        )
      }
    }
  }

  async close(): Promise<void> {
    if (this.visible) {
      await this.$store.dispatch(
        `${this.namespace}/${store.dialog.types.actions.CLOSE}`
      )
    }
  }

  @Watch('visible')
  public visibleOnChange(value: boolean, original: boolean) {
    if (value !== original) {
      if (value) {
        this.onOpen()
      } else {
        this.onClose()
      }
    }
  }

  @Emit('on-open')
  public onOpen() {
    utils.noop()
  }

  @Emit('on-close')
  public onClose() {
    utils.noop()
  }
}
