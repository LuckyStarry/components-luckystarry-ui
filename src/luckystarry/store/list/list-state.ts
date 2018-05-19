import * as models from '../../models'
import * as frame from '../frame'
import * as types from './types'

export interface IListState<
  T extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery
> extends frame.IFrameState {
  [types.state.TABLE_LIST]: Array<T>
  [types.state.TABLE_LIST_TOTAL]: number
  [types.state.SEARCHING_STATE]: boolean
  [types.state.SEARCH_QUERY_MODEL]: TQuery
}

export class ListState<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery
> implements IListState<TEntity, TQuery> {
  private list: Array<TEntity> = []
  private count: number = 0
  private searching: boolean = false
  private query: TQuery

  public set [types.state.TABLE_LIST](value: Array<TEntity>) {
    this.list = value || []
  }

  public get [types.state.TABLE_LIST](): Array<TEntity> {
    return this.list
  }

  public set [types.state.TABLE_LIST_TOTAL](value: number) {
    this.count = value
  }

  public get [types.state.TABLE_LIST_TOTAL](): number {
    return this.count
  }

  public set [types.state.SEARCH_QUERY_MODEL](value: TQuery) {
    this.query = value
  }

  public get [types.state.SEARCH_QUERY_MODEL](): TQuery {
    return this.query
  }

  public set [types.state.SEARCHING_STATE](value: boolean) {
    this.searching = value
  }

  public get [types.state.SEARCHING_STATE](): boolean {
    return this.searching
  }
}
