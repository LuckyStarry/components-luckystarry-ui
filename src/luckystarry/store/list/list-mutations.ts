import * as models from '../../models'
import * as frame from '../frame'
import { IListState } from './list-state'
import * as types from './types'

export interface IListMutations<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>
> extends frame.IFrameMutations<TState> {
  [types.mutations.SEARCHING_STATE_UPDATE](state: TState, status: boolean)
  [types.mutations.QUERY_MODEL_REFRESH](state: TState, payload: any)
  [types.mutations.TABLE_LIST_RESET](
    state: TState,
    result: models.ISearchResultEntity<TEntity>
  )
}

export class ListMutations<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>
> extends frame.FrameMutations<TState>
  implements IListMutations<TEntity, TQuery, TState> {
  public [types.mutations.SEARCHING_STATE_UPDATE](
    state: TState,
    status: boolean
  ) {
    state[types.state.SEARCHING_STATE] = status
  }

  public [types.mutations.QUERY_MODEL_REFRESH](state: TState, payload: any) {
    Object.assign(state[types.state.SEARCH_QUERY_MODEL], payload)
  }

  public [types.mutations.TABLE_LIST_RESET](
    state: TState,
    result: models.ISearchResultEntity<TEntity>
  ) {
    state[types.state.TABLE_LIST] = result.List
    state[types.state.TABLE_LIST_TOTAL] = result.Count
  }
}
