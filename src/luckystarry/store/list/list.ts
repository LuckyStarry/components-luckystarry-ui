import * as frame from '../frame'
import * as models from '../../models'
import { IListState } from './list-state'
import { IListGetter } from './list-getter'
import { IListGetters } from './list-getters'
import { IListActions } from './list-actions'
import { IListModules } from './list-modules'
import { IListMutations } from './list-mutations'
export interface IList<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TGetters extends IListGetters<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListGetters<TEntity, TQuery, TState, TGetter, TRootState>,
  TActions extends IListActions<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListActions<TEntity, TQuery, TState, TGetter, TRootState>,
  TMutations extends IListMutations<TEntity, TQuery, TState> = IListMutations<
    TEntity,
    TQuery,
    TState
  >,
  TModules extends IListModules<TRootState> = IListModules<TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends frame.IFrame<
      TState,
      TGetter,
      TRootState,
      TGetters,
      TActions,
      TMutations
    > {}

export class List<
  TEntity extends models.IEntity,
  TQuery extends models.IQuery = models.IQuery,
  TState extends IListState<TEntity, TQuery> = IListState<TEntity, TQuery>,
  TGetter extends IListGetter<TEntity, TQuery, TState> = IListGetter<
    TEntity,
    TQuery,
    TState
  >,
  TGetters extends IListGetters<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListGetters<TEntity, TQuery, TState, TGetter, TRootState>,
  TActions extends IListActions<
    TEntity,
    TQuery,
    TState,
    TGetter,
    TRootState
  > = IListActions<TEntity, TQuery, TState, TGetter, TRootState>,
  TMutations extends IListMutations<TEntity, TQuery, TState> = IListMutations<
    TEntity,
    TQuery,
    TState
  >,
  TModules extends IListModules<TRootState> = IListModules<TRootState>,
  TRootState extends frame.IFrameState = frame.IFrameState
>
  extends frame.Frame<
    TState,
    TGetter,
    TRootState,
    TGetters,
    TActions,
    TMutations,
    TModules
  >
  implements
    IList<
      TEntity,
      TQuery,
      TState,
      TGetter,
      TGetters,
      TActions,
      TMutations,
      TModules,
      TRootState
    > {}
