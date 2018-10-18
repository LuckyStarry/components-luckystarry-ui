import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { LsDialog } from '../ls-dialog'
import { store, utils } from '../../..'
@Component({ components: { LsDialog } })
export class LsDialogEditable extends Vue {
  @Prop({ type: String, required: true })
  public namespace: string

  public get subject() {
    return this.$store.getters[
      `${this.namespace}/${store.dialog.editable.types.modules.EDITOR}/${
        store.detail.types.getters.SUBJECT
      }`
    ]
  }

  public get original() {
    return this.$store.getters[
      `${this.namespace}/${store.dialog.editable.types.modules.EDITOR}/${
        store.detail.editable.types.getters.ORIGINAL
      }`
    ]
  }

  public get saving(): boolean {
    return this.$store.getters[
      `${this.namespace}/${store.dialog.editable.types.modules.EDITOR}/${
        store.detail.editable.types.getters.SAVING_STATE
      }`
    ]
  }

  public update(payload): void {
    this.$store.commit(
      `${this.namespace}/${store.dialog.editable.types.modules.EDITOR}/${
        store.detail.editable.types.mutations.SUBJECT_UPDATE
      }`,
      payload
    )
  }

  public async save(): Promise<any> {
    return await this.$store.dispatch(
      `${this.namespace}/${store.dialog.editable.types.actions.SAVE}`
    )
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
