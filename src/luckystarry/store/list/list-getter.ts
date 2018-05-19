import * as models from '../../models'
import * as frame from '../frame'
import { IListState } from './list-state'
import * as types from './types'

export interface IListGetter<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>
> extends frame.IFrameGetter {
  readonly [types.getters.TABLE_LIST]: Array<TEntity>
  readonly [types.getters.TABLE_LIST_TOTAL]: number
  readonly [types.getters.SEARCHING_STATE]: boolean
  readonly [types.getters.SEARCH_QUERY_MODEL]: TQuery
}
