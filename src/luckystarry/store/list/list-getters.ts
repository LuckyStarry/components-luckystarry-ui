import * as models from '../../models'
import * as frame from '../frame'
import { IListGetter } from './list-getter'
import { IListState } from './list-state'
import * as types from './types'

export interface IListGetters<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery> = IListGetter<TEntity, TQuery>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameGetters<TState, TRootState> {
  [types.getters.TABLE_LIST]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => Array<TEntity>

  [types.getters.TABLE_LIST_TOTAL]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => number

  [types.getters.SEARCHING_STATE]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => boolean

  [types.getters.SEARCH_QUERY_MODEL]: (
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ) => TQuery
}

export class ListGetters<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery> = IListGetter<TEntity, TQuery>,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameGetters<TState, TRootState>
  implements IListGetters<TEntity, TQuery, TState, TGetter, TRootState> {
  public [types.getters.TABLE_LIST](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): Array<TEntity> {
    return state[types.state.TABLE_LIST] || []
  }

  public [types.getters.TABLE_LIST_TOTAL](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): number {
    return state[types.state.TABLE_LIST_TOTAL]
  }

  public [types.getters.SEARCHING_STATE](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): boolean {
    return state[types.state.SEARCHING_STATE]
  }

  public [types.getters.SEARCH_QUERY_MODEL](
    state: TState,
    getters: TGetter,
    rootState: TRootState,
    rootGetters: any
  ): TQuery {
    return state[types.state.SEARCH_QUERY_MODEL]
  }
}
