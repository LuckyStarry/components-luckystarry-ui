import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { LsList } from '../ls-list'
import { Table } from 'element-ui'
import { store, models, utils } from '../../..'
@Component({ components: { LsList } })
export class LsListEditable extends Vue {
  @Prop({ type: String, required: true })
  public namespace: string

  @Prop({ type: Boolean, default: true })
  public creatable: boolean

  public async create() {
    let entity: models.IEntity = await this.$store.dispatch(
      `${this.namespace}/${store.list.editable.types.actions.CREATE}`
    )
    this.onCreated(entity)
  }

  @Emit('on-created')
  public onCreated(entity: models.IEntity) {
    utils.noop()
  }

  public async update(entity: models.IEntity) {
    await this.$store.dispatch(
      `${this.namespace}/${store.list.editable.types.actions.UPDATE}`,
      entity
    )
  }
}
