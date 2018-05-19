import * as models from '../../models'
import * as frame from '../frame'
import { IListGetter } from './list-getter'
import { IListState } from './list-state'
import * as types from './types'

export interface IListActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.IFrameActions<TState, TGetter, TRootState> {
  [types.actions.SEARCH](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )
  [types.actions.SEARCH_FIRST_PAGE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  )
}

export abstract class ListActions<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TRootState extends frame.IFrameState = frame.IFrameState
> extends frame.FrameActions<TState, TGetter, TRootState>
  implements IListActions<TEntity, TQuery, TState, TGetter, TRootState> {
  public async [types.actions.SEARCH](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    try {
      context.commit(types.mutations.SEARCHING_STATE_UPDATE, true)
      let response: models.IResponse<
        models.ISearchResultEntity<TEntity>
      > = await context.dispatch(types.actions.API_SEARCH)
      context.commit(types.mutations.TABLE_LIST_RESET, response.Entity)
    } catch (error) {
      context.dispatch(frame.types.actions.ON_EXCEPTION, error)
    } finally {
      context.commit(types.mutations.SEARCHING_STATE_UPDATE, false)
    }
  }
  public async [types.actions.SEARCH_FIRST_PAGE](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ) {
    context.commit(types.mutations.QUERY_MODEL_REFRESH, { PageIndex: 1 })
    await context.dispatch(types.actions.SEARCH)
  }

  public abstract async [types.actions.API_SEARCH](
    context: frame.IFrameActionContext<TState, TGetter, TRootState>
  ): Promise<models.IResponse<models.ISearchResultEntity<TEntity>>>
}
