import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { LsFrame } from '../ls-frame'
import { Table } from 'element-ui'
import { store, models } from '../../..'
@Component({ components: { LsFrame } })
export class LsList extends Vue {
  $refs: { table: any }

  @Prop({ type: String, required: true })
  namespace: string

  @Prop({ type: Boolean, default: true })
  immediatelySearch: boolean

  get query() {
    return this.$store.getters[
      `${this.namespace}/${store.list.types.getters.SEARCH_QUERY_MODEL}`
    ]
  }

  get searching(): boolean {
    return this.$store.getters[
      `${this.namespace}/${store.list.types.getters.SEARCHING_STATE}`
    ]
  }

  get list() {
    return this.$store.getters[
      `${this.namespace}/${store.list.types.getters.TABLE_LIST}`
    ]
  }

  get total(): number {
    return this.$store.getters[
      `${this.namespace}/${store.list.types.getters.TABLE_LIST_TOTAL}`
    ]
  }

  async search(pagination?: { index?: number; size?: number }) {
    this.refresh(pagination)
    await this.$store.dispatch(
      `${this.namespace}/${store.list.types.actions.SEARCH}`
    )
    this.afterSearch({ list: this.list, table: this.$refs.table })
  }

  refresh(payload) {
    this.$store.commit(
      `${this.namespace}/${store.list.types.mutations.QUERY_MODEL_REFRESH}`,
      payload
    )
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  afterSearch({ list, table }) {}

  @Emit()
  // tslint:disable-next-line:no-empty
  select(selection, row) {}

  @Emit()
  // tslint:disable-next-line:no-empty
  selectAll(selection) {}

  mounted() {
    if (this.immediatelySearch) {
      this.$nextTick(this.search)
    }
  }
}
