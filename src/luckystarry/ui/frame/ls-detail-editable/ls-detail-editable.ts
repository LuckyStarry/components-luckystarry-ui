import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { LsDetail } from '../ls-detail'
import { store, models, utils } from '../../..'
@Component({ components: { LsDetail } })
export class LsDetailEditable extends Vue {
  @Prop({ type: String, required: true })
  public namespace: string

  @Prop({ type: String, required: false })
  public keyName: string

  public get original() {
    return this.$store.getters[
      `${this.namespace}/${store.detail.editable.types.getters.ORIGINAL}`
    ]
  }

  public get saving(): boolean {
    return this.$store.getters[
      `${this.namespace}/${store.detail.editable.types.getters.SAVING_STATE}`
    ]
  }

  public update(payload): void {
    this.$store.commit(
      `${this.namespace}/${
        store.detail.editable.types.mutations.SUBJECT_UPDATE
      }`,
      payload
    )
  }

  public async save(): Promise<any> {
    return await this.$store.dispatch(
      `${this.namespace}/${store.detail.editable.types.actions.SAVE}`
    )
  }

  @Emit('on-load')
  public async onLoad(key: string): Promise<void> {
    utils.noop()
  }
}
