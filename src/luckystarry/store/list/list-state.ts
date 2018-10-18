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
  // tslint:disable-next-line:semicolon
  public [types.state.TABLE_LIST]: Array<TEntity> = [];
  // tslint:disable-next-line:semicolon
  public [types.state.TABLE_LIST_TOTAL]: number = 0;
  // tslint:disable-next-line:semicolon
  public [types.state.SEARCHING_STATE]: boolean = false;
  public [types.state.SEARCH_QUERY_MODEL]: TQuery

  public constructor(options?: {
    list?: Array<TEntity>
    count?: number
    searching?: boolean
    query?: TQuery
  }) {
    if (options) {
      if (options.list) {
        this[types.state.TABLE_LIST] = options.list
      }
      if (options.count) {
        this[types.state.TABLE_LIST_TOTAL] = options.count
      }
      if (options.query) {
        this[types.state.SEARCH_QUERY_MODEL] = options.query
      }
    }
  }
}
