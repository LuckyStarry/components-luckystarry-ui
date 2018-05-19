import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { LsFrame } from '../ls-frame'
import { Table } from 'element-ui'
import { LoginUser } from 'luckystarry/models'
@Component({ components: { LsFrame } })
export class LsFrameList extends Vue {
  $refs: { table: any }

  @Prop({ type: String, required: true })
  namespace: string

  @Prop({ type: Boolean, default: true })
  immediatelySearch: boolean

  @Getter('system/ui/user') user: LoginUser

  get loadingColor(): string {
    if (this.user && this.user.isFemale) {
      return 'rgba(255, 203, 212, 0.8)'
    } else {
      return 'rgba(2, 158, 217, 0.4)'
    }
  }

  get query() {
    return this.$store.getters[`${this.namespace}/query`]
  }

  get searching(): boolean {
    return this.$store.getters[`${this.namespace}/searching`]
  }

  get list() {
    return this.$store.getters[`${this.namespace}/list`]
  }

  get pagination() {
    return this.$store.getters[`${this.namespace}/pagination`]
  }

  async search(pagination?: { pageIndex: number; pageSize?: number }) {
    this.$store.commit(
      `${this.namespace}/pagination-update`,
      Object.assign(
        { pageIndex: 1, pageSize: this.pagination.Size },
        pagination
      )
    )
    await this.$store.dispatch(`${this.namespace}/search`)
    this.afterSearch({ list: this.list, table: this.$refs.table })
  }

  refresh(payload) {
    this.$store.commit(`${this.namespace}/query-refresh`, payload)
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
